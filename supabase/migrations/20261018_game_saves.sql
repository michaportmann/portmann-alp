begin;
create table if not exists public.game_saves (
 user_id uuid primary key references auth.users(id) on delete cascade,
 save_data jsonb not null,
 revision bigint not null default 0 check (revision >= 0),
 schema_version integer not null default 11,
 updated_at timestamptz not null default now()
);
alter table public.game_saves enable row level security;
drop policy if exists "Read own save" on public.game_saves;
drop policy if exists "Insert own save" on public.game_saves;
drop policy if exists "Update own save" on public.game_saves;
create policy "Read own save" on public.game_saves for select to authenticated using ((select auth.uid()) = user_id);
-- All mutations go through the compare-and-swap RPC below, never a browser upsert.
revoke all on public.game_saves from public, anon, authenticated;
grant select on public.game_saves to authenticated;
create or replace function public.sync_game_save(expected_revision bigint, payload jsonb)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare uid uuid := auth.uid(); current_row public.game_saves; result_row public.game_saves;
begin
 if uid is null then raise exception 'Authentication required' using errcode = '42501'; end if;
 if expected_revision < -1 or expected_revision is null then raise exception 'Invalid revision'; end if;
 if payload is null or jsonb_typeof(payload) <> 'object' or (payload->>'version') is distinct from '11' or octet_length(payload::text) > 250000 then raise exception 'Invalid save payload'; end if;
 -- Serializes even the first INSERT, for which SELECT FOR UPDATE has no row to lock.
 perform pg_advisory_xact_lock(hashtextextended(uid::text, 713));
 select * into current_row from public.game_saves where user_id = uid for update;
 if (found and current_row.revision <> expected_revision) or (not found and expected_revision <> -1) then
  return jsonb_build_object('status','conflict','current',case when current_row.user_id is null then null else to_jsonb(current_row) end);
 end if;
 insert into public.game_saves(user_id, save_data, revision, schema_version, updated_at)
 values(uid, payload, coalesce(current_row.revision, -1) + 1, 11, now())
 on conflict (user_id) do update set save_data = excluded.save_data, revision = excluded.revision, schema_version = 11, updated_at = now()
 returning * into result_row;
 return jsonb_build_object('status','saved','current',to_jsonb(result_row));
end;
$$;
revoke all on function public.sync_game_save(bigint,jsonb) from public, anon;
grant execute on function public.sync_game_save(bigint,jsonb) to authenticated;
-- Game data deletion only. Account deletion requires a separately protected admin service.
create or replace function public.delete_own_game_save()
returns void language plpgsql security definer set search_path = '' as $$
begin
 if auth.uid() is null then raise exception 'Authentication required' using errcode='42501'; end if;
 perform pg_advisory_xact_lock(hashtextextended(auth.uid()::text, 713));
 delete from public.game_saves where user_id = auth.uid();
end;
$$;
revoke all on function public.delete_own_game_save() from public, anon;
grant execute on function public.delete_own_game_save() to authenticated;
commit;

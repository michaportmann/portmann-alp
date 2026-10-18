import {decodeSave} from './save.mjs';
export const CLOUD_URL='https://ifhranjkqetalwbnbulf.supabase.co';
export const CLOUD_KEY='sb_publishable_HlHwC2n7AFCVZMy0RUS62w_LlZ_uAQE';
const SESSION_KEY='portmann-alp-auth-v1';
export function createCloudSave({storage,request=globalThis.fetch,now=()=>Date.now(),redirect='https://portmann-alp-3d.michaportmann.chatgpt.site/'}={}){
 let session=null;
 try{session=JSON.parse(storage.getItem(SESSION_KEY));}catch{}
 if(!session?.access_token||!session?.refresh_token||typeof session?.user?.id!=='string')session=null;
 let status='Gast · nur auf diesem Gerät';
 function keep(s){session=s?{access_token:s.access_token,refresh_token:s.refresh_token,expires_at:s.expires_at||Math.floor(now()/1000)+(s.expires_in||3600),user:s.user}:null;try{storage.setItem(SESSION_KEY,JSON.stringify(session));}catch{status='Anmeldung nur bis zum Schliessen verfügbar.';}}
 async function call(path,{method='GET',body,auth=true}={}){
  if(auth&&session&&session.expires_at<now()/1000+60){const r=await call('/auth/v1/token?grant_type=refresh_token',{method:'POST',body:{refresh_token:session.refresh_token},auth:false});keep(r);}
  if(auth&&!session)throw Error('Bitte zuerst anmelden.');
  let res;const controller=typeof AbortController!=='undefined'?new AbortController():null,timer=controller?setTimeout(()=>controller.abort(),12000):null;try{res=await request(CLOUD_URL+path,{method,...(controller?{signal:controller.signal}:{}),headers:{apikey:CLOUD_KEY,'Content-Type':'application/json',...(auth?{Authorization:'Bearer '+session.access_token}:{})},...(body===undefined?{}:{body:JSON.stringify(body)})});}catch{status='Offline · lokal weiterspielen';throw Error(status);}finally{if(timer)clearTimeout(timer);}
  const data=await res.json().catch(()=>null);
  if(!res.ok){status=res.status===401?'Anmeldung abgelaufen. Bitte erneut anmelden.':res.status===404?'Cloud-Datenbank noch nicht eingerichtet.':'Cloud-Fehler · lokaler Stand bleibt erhalten';throw Error(data?.msg||data?.message||data?.error_description||status);}
  return data;
 }
 return{
 get user(){return session?.user||null;},get status(){return status;},
 async authenticate(email,password,signup=false){const r=await call(signup?'/auth/v1/signup?redirect_to='+encodeURIComponent(redirect):'/auth/v1/token?grant_type=password',{method:'POST',body:{email,password},auth:false});if(r.access_token)keep(r);status=r.access_token?'Angemeldet · Spielstand wählen':'Bitte E-Mail bestätigen und danach anmelden.';return r;},
 async restore(){if(!session)return null;const user=await call('/auth/v1/user');keep({...session,user});return user;},
 async recover(email){await call('/auth/v1/recover?redirect_to='+encodeURIComponent(redirect),{method:'POST',body:{email},auth:false});return'Falls ein Konto existiert, erhältst du eine E-Mail.';},
 async acceptRedirect(hash){const q=new URLSearchParams(hash.replace(/^#/,''));if(!q.get('access_token')||!q.get('refresh_token'))return false;keep({access_token:q.get('access_token'),refresh_token:q.get('refresh_token'),expires_in:Number(q.get('expires_in'))||3600,user:{id:'pending'}});try{const user=await call('/auth/v1/user');keep({...session,user});return q.get('type')==='recovery'?'recovery':'signedin';}catch(e){keep(null);throw e;}},
 async updatePassword(password){await call('/auth/v1/user',{method:'PUT',body:{password}});return'Passwort geändert.';},
 async logout(){try{if(session)await call('/auth/v1/logout',{method:'POST'});}finally{keep(null);status='Gast · nur auf diesem Gerät';}},
 async read(){const rows=await call('/rest/v1/game_saves?select=save_data,revision,updated_at&user_id=eq.'+encodeURIComponent(session.user.id));if(!Array.isArray(rows))throw Error('Ungültige Cloud-Antwort.');const row=rows[0];if(!row)return null;const save=decodeSave(JSON.stringify(row.save_data));if(!save||!Number.isSafeInteger(row.revision)||row.revision<0)throw Error('Cloud-Spielstand ungültig; lokaler Stand bleibt erhalten.');return{...row,save_data:save};},
 async push(state,revision){const clean=decodeSave(JSON.stringify(state));if(!clean)throw Error('Ungültiger Spielstand wird nicht hochgeladen.');const r=await call('/rest/v1/rpc/sync_game_save',{method:'POST',body:{expected_revision:revision,payload:clean}});if(!['saved','conflict'].includes(r?.status))throw Error('Ungültige Synchronisationsantwort.');if(r.current&&(!Number.isSafeInteger(r.current.revision)||!decodeSave(JSON.stringify(r.current.save_data))))throw Error('Ungültiger Server-Spielstand.');status=r.status==='saved'?'Synchronisiert':'Konflikt · Spielstand auswählen';return r;},
 async deleteSave(){await call('/rest/v1/rpc/delete_own_game_save',{method:'POST',body:{}});status='Cloud-Spielstand gelöscht';}
 };
}
// Persisted CAS base belongs to a single account and a single browser installation.
export function createSyncQueue({cloud,storage,snapshot,onConflict=()=>{},onStatus=()=>{}}){
 let busy=false,inFlight=null,pending=false,blocked=true,revision=-1,user=null,generation=0;
 function key(){return'portmann-alp-sync-'+user;}
 function remember(dirty){try{storage.setItem(key(),JSON.stringify({revision,dirty}));}catch{blocked=true;onStatus('Cloud-Synchronisation pausiert: Gerätespeicher gesperrt.');}}
 function flush(){
  if(inFlight)return inFlight.then(()=>pending&&!blocked?flush():undefined);
  if(blocked||!user||!pending)return Promise.resolve();
  busy=true;const epoch=generation;
  inFlight=Promise.resolve().then(async()=>{try{while(pending&&!blocked&&epoch===generation){pending=false;const sent=snapshot(),r=await cloud.push(sent,revision);if(epoch!==generation)return;if(r.status==='conflict'){blocked=true;pending=true;remember(true);onConflict(r.current);break;}revision=r.current.revision;remember(pending);onStatus('Synchronisiert',r.current);}}catch(e){if(epoch===generation){pending=true;onStatus(e.message);}}}).finally(()=>{busy=false;inFlight=null;});
  return inFlight;
 }

 return{
 get revision(){return revision;},get dirty(){return pending;},get blocked(){return blocked;},
 activate(id,base){generation++;user=id;revision=base;blocked=false;pending=false;remember(false);},
 reset(){generation++;blocked=true;user=null;pending=false;},
 metadata(id){try{const m=JSON.parse(storage.getItem('portmann-alp-sync-'+id));return Number.isSafeInteger(m?.revision)&&m.revision>=-1&&typeof m.dirty==='boolean'?m:null;}catch{return null;}},
 mark(){if(!blocked&&user){pending=true;remember(true);}},
 flush,

 };
}

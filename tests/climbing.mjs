import assert from 'node:assert/strict';
import {CLIMBS,startClimb,choices,chooseGrip,restClimb,stepClimb,descendClimb,finishClimb,localClimberPosition} from '../dist/climbing.mjs';
import {freshState,decodeSave,createSaveStore} from '../dist/save.mjs';
import {claimQuest} from '../dist/progression.mjs';
import {createRequire} from 'node:module';
import {createWorld} from '../dist/world.mjs';
import {createRegionWorld} from '../dist/region-world.mjs';
import {blocked,route} from '../dist/logic.mjs';
const require=createRequire(import.meta.url),{createCanvas}=require('/opt/codex/runtimes/codex-primary-runtime/dependencies/node/node_modules/@napi-rs/canvas');globalThis.document={createElement:()=>createCanvas(256,256)};
function atRoute(id){const s=freshState(),r=CLIMBS[id];s.position={x:r.entry[0],z:r.entry[1],inside:false,region:r.region};if(!s.adventure.visited.includes(r.region))s.adventure.visited.push(r.region);return s;}
function equip(s){s.inventory={rope:1,harness:1,boots:1};s.climbing.completed=['training'];return s;}
function frames(s,c,n=60){let event;for(let i=0;i<n;i++){event=stepClimb(s,c,1/60)||event;const p=localClimberPosition(c);assert.ok(Number.isFinite(p.u)&&Number.isFinite(p.v));}return event;}
function complete(s,c){let count=0;while(choices(c).length&&count++<30){if(CLIMBS[c.route].nodes[c.node].rest){restClimb(c);frames(s,c,240);}assert.equal(chooseGrip(s,c,choices(c)[0]).ok,true);frames(s,c,40);}assert.ok(count<30);assert.equal(descendClimb(c,true),true);frames(s,c,200);assert.equal(finishClimb(s,c,true).ok,true);assert.ok(s.climbing.completed.includes(c.route));assert.equal(s.climbing.checkpoint,null);}

assert.equal(startClimb(freshState(),'training').ok,false,'cannot enter remotely');
const noGear=atRoute('waterfall');assert.equal(startClimb(noGear,'waterfall').ok,false);noGear.inventory={rope:1,harness:1,boots:1};assert.equal(startClimb(noGear,'waterfall').ok,false,'training prerequisite');
const s=atRoute('training'),c=startClimb(s,'training').session;
const before=JSON.stringify(s);assert.equal(chooseGrip(s,c,7).ok,false);assert.equal(JSON.stringify(s),before,'unreachable target changes no resources');assert.equal(descendClimb(c,true),false,'cannot claim success at entry');
assert.equal(chooseGrip(s,c,1).ok,true);assert.equal(chooseGrip(s,c,2).ok,false,'cannot double-trigger motion');assert.equal(restClimb(c).ok,false);frames(s,c,40);assert.equal(c.node,1);assert.equal(restClimb(c).ok,false,'no rest on a hanging grip');
s.stamina=.01;const slip=stepClimb(s,c,.04);assert.equal(slip.type,'slip');frames(s,c,50);assert.equal(c.node,0);assert.equal(c.phase,'idle');assert.ok(s.stamina>=30);assert.equal(c.faults,1);
complete(s,c);const cash=s.coins;assert.equal(claimQuest(s,'climb-training').ok,true);assert.equal(s.coins,cash+600);assert.equal(claimQuest(s,'climb-training').ok,false);
for(const id of ['waterfall','eagle']){const player=equip(atRoute(id)),session=startClimb(player,id).session;complete(player,session);assert.deepEqual([player.position.x,player.position.z],CLIMBS[id].exit);assert.ok(decodeSave(JSON.stringify(player)));}

const resting=atRoute('training'),session=startClimb(resting,'training').session;chooseGrip(resting,session,1);frames(resting,session,40);chooseGrip(resting,session,3);frames(resting,session,40);assert.equal(resting.climbing.checkpoint.node,3);
const file=JSON.stringify(resting),restored=decodeSave(file);assert.ok(restored);const resumed=startClimb(restored,'training',{resume:true}).session;assert.equal(resumed.node,3);assert.equal(resumed.time,resting.climbing.checkpoint.time);assert.equal(resumed.faults,session.faults);
assert.equal(descendClimb(resumed,false),true);frames(restored,resumed,200);assert.equal(finishClimb(restored,resumed,false).ok,true);assert.equal(restored.climbing.checkpoint,null);assert.deepEqual([restored.position.x,restored.position.z],CLIMBS.training.entry);assert.ok(!restored.climbing.completed.includes('training'),'abort is not a completion');
const low=atRoute('training'),lowSession=startClimb(low,'training').session;low.energy=0;assert.equal(chooseGrip(low,lowSession,1).ok,false);descendClimb(lowSession,false);frames(low,lowSession,200);assert.equal(finishClimb(low,lowSession,false).ok,true,'zero energy never traps player');
const old=freshState();old.version=3;delete old.climbing;old.coins=4567;const migrated=decodeSave(JSON.stringify(old));assert.equal(migrated.version,11);assert.equal(migrated.coins,4567);assert.deepEqual(migrated.climbing.completed,[]);
for(const mutate of[s=>s.climbing.checkpoint.node=2,s=>s.climbing.checkpoint.route='missing',s=>s.climbing.checkpoint.time=-1,s=>s.position.region='alp-other',s=>s.climbing.completed=['bogus'],s=>s.climbing.best={training:1001}]){const invalid=JSON.parse(file);mutate(invalid);assert.equal(decodeSave(JSON.stringify(invalid)),null,'reject malformed checkpoint');}
const storage={data:new Map(),getItem(k){return this.data.get(k)??null},setItem(k,v){this.data.set(k,v)}},store=createSaveStore(storage);store.load();assert.ok(store.write(resting).ok);const recovered=createSaveStore(storage).load();assert.equal(recovered.climbing.checkpoint.node,3);

for(const id of Object.keys(CLIMBS)){
 const r=CLIMBS[id],world=r.region==='alp'?createWorld():createRegionWorld(r.region),site=world.climbKit.sites.get(id);assert.ok(site);assert.ok(!blocked(...r.entry,world.colliders),'entry free '+id);assert.ok(!blocked(...r.exit,world.colliders),'exit free '+id);assert.ok(route({x:r.entry[0],z:r.entry[1]},{x:r.exit[0],z:r.exit[1]},world.colliders).length||id==='waterfall','ground arrival safe '+id);
 const p=equip(atRoute(id)),cl=startClimb(p,id).session;site.sync(cl);assert.equal(world.climbKit.targets.filter(m=>m.visible).length,choices(cl).length);const start=site.position(cl);chooseGrip(p,cl,choices(cl)[0]);frames(p,cl,20);const moving=site.position(cl);assert.ok(moving.distanceTo(start)>.1,'player truly moves in 3D');assert.ok(site.camera.toArray().every(Number.isFinite));if(r.region!=='alp')world.dispose();
}
console.log('PASS three in-world climbing routes, remote/gear/training gates, reachable choices, motion double-trigger guard, ledge rest, stamina slip and checkpoint recovery, zero-energy abort, real 3D movement, safe exits, unique quest rewards, resume/time persistence, v3 migration, invalid checkpoint rejection, file/device roundtrip, and visible selectable holds. Device graphics/touch remain unverified.');

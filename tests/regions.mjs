import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {REGIONS,GATEWAYS,ADVENTURE_REGIONS,LANDMARKS,TREASURES,travel,discover,turnDial,openSecret,claimTreasure} from '../dist/regions.mjs';
import {createRegionWorld,walkingHeight} from '../dist/region-world.mjs';
import {freshState,decodeSave,createSaveStore} from '../dist/save.mjs';
import {route,blocked} from '../dist/logic.mjs';
const require=createRequire(import.meta.url),{createCanvas}=require('/opt/codex/runtimes/codex-primary-runtime/dependencies/node/node_modules/@napi-rs/canvas');globalThis.document={createElement:()=>createCanvas(512,512)};

assert.equal(ADVENTURE_REGIONS.length,8);assert.equal(Object.keys(REGIONS).length,19);
for(const g of GATEWAYS){assert.ok(REGIONS[g.from]&&REGIONS[g.to]);assert.ok(GATEWAYS.some(back=>back.from===g.to&&back.to===g.from),'reverse edge '+g.id);}
const state=freshState();assert.equal(travel(state,GATEWAYS[0]).ok,false,'cannot travel remotely');state.position={x:-6,z:25,inside:false,region:'alp'};assert.equal(travel(state,GATEWAYS[0]).ok,true);assert.equal(state.position.region,'village');
state.position={x:0,z:-3.4,inside:false,region:'cellar'};state.adventure.visited.push('cellar');assert.equal(travel(state,GATEWAYS.find(g=>g.id==='cellar-passage')).ok,false);assert.equal(openSecret(state).ok,false);discover(state,'cellar-note');turnDial(state,0);turnDial(state,1);turnDial(state,1);assert.deepEqual(state.adventure.dials,[1,2,0]);assert.equal(openSecret(state).ok,true);assert.equal(travel(state,GATEWAYS.find(g=>g.id==='cellar-passage')).ok,true);
assert.equal(openSecret(freshState()).ok,false,'mechanism not usable remotely');
let checked=0,arrivals=0,vertices=0;
for(const id of Object.keys(REGIONS).filter(k=>k!=='alp')){
 const world=createRegionWorld(id);world.sync(state);const start={x:REGIONS[id].spawn[0],z:REGIONS[id].spawn[1]};
 assert.ok(!blocked(start.x,start.z,world.colliders),id+' safe spawn');
 for(const n of world.interactive){assert.ok(!blocked(n.x,n.z,world.colliders),id+' '+n.id+' clear interaction');const path=route(start,n,world.colliders);assert.ok(path.length,id+' '+n.id+' reachable');for(const p of path)assert.ok(!blocked(p.x,p.z,world.colliders),id+' safe route');checked++;}
 for(const g of GATEWAYS.filter(g=>g.to===id)){const [x,z]=g.arrival;assert.ok(!blocked(x,z,world.colliders),'clear arrival '+g.id);assert.ok(route({x,z},start,world.colliders).length,'arrival connects '+g.id);arrivals++;}
 world.scene.traverse(o=>{if(o.geometry){const p=o.geometry.attributes.position;vertices+=p.count;for(const v of p.array)assert.ok(Number.isFinite(v),'finite region geometry');}});
 for(const f of world.animated)for(const time of[0,2,20])f(time);
 if(id==='cellar'){state.adventure.secretOpen=false;world.sync(state);assert.ok(blocked(0,-4.4,world.colliders));state.adventure.secretOpen=true;world.sync(state);assert.ok(!blocked(0,-4.4,world.colliders));}
 if(id==='see'){assert.ok(blocked(12,-4,world.colliders),'lake not walkable');assert.ok(!blocked(7,2,world.colliders),'pier is walkable');assert.equal(walkingHeight(id,7,2),.4);}
 if(id==='schlucht'){assert.ok(blocked(8,0,world.colliders),'water blocks off bridge');assert.ok(!blocked(0,0,world.colliders),'bridge crosses water');assert.equal(walkingHeight(id,0,0),.5);}
 world.dispose();assert.equal(world.scene.children.length,0,'region disposed');
}
const t=TREASURES[0];state.position={x:t.x,z:t.z,inside:false,region:t.region};if(!state.adventure.visited.includes(t.region))state.adventure.visited.push(t.region);assert.equal(claimTreasure(state,t.id).ok,false,'treasure needs discoveries');for(const k of t.requires)discover(state,k);const cash=state.coins;assert.equal(claimTreasure(state,t.id).ok,true);assert.equal(state.coins,cash+t.coins);assert.equal(claimTreasure(state,t.id).ok,false,'treasure cannot pay twice');
const encoded=JSON.stringify(state),decoded=decodeSave(encoded);assert.ok(decoded,'new region state valid');assert.deepEqual(decoded.adventure,state.adventure);assert.deepEqual(decoded.position,state.position);const malformed=JSON.parse(encoded);malformed.position.region='unknown';assert.equal(decodeSave(JSON.stringify(malformed)),null);malformed.position.region='kristall';malformed.adventure.dials=[9,0,0];assert.equal(decodeSave(JSON.stringify(malformed)),null);
console.log(JSON.stringify({result:'PASS',regions:19,adventureRegions:8,directedTransitions:GATEWAYS.length,interactions:checked,safeArrivals:arrivals,geometryVertices:vertices,checks:['no remote travel','two-way graph','secret gate','stone-wheel solution','all interaction routes','all arrival routes','solid lake and walkable pier','solid river and walkable bridge','single treasure reward','region save validation','scene resource disposal']},null,2));

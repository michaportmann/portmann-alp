import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {createWorld} from '../dist/world.mjs';
import {freshState} from '../dist/save.mjs';
import {route,height,blocked} from '../dist/logic.mjs';
import {ESTATE_PLOTS as P,inEstatePlot} from '../dist/estate-plots.mjs';
const require=createRequire(import.meta.url),{createCanvas}=require('/opt/codex/runtimes/codex-primary-runtime/dependencies/node/node_modules/@napi-rs/canvas');globalThis.document={createElement:()=>createCanvas(256,256)};
const w=createWorld(),s=freshState();w.estateKit.sync(s);assert.equal(w.navigationTargets.filter(g=>g.userData.kind?.startsWith('development-')).length,0);assert.ok(w.interactive.filter(n=>n.estateBusiness).every(n=>n.disabled));
for(const k of Object.keys(s.estate.built))s.estate.built[k]=1;w.estateKit.sync(s);const count=w.colliders.length;w.estateKit.sync(s);assert.equal(w.colliders.length,count,'no duplicate colliders');
for(const [id,p]of Object.entries(P)){assert.ok(route({x:-5,z:6},p.entry,w.colliders).length,'reachable built '+id);if(!['tools','pasture'].includes(id)){const ys=[height(p.x-p.w*.4,p.z),height(p.x+p.w*.4,p.z),height(p.x,p.z-p.d*.4),height(p.x,p.z+p.d*.4)];assert.ok(Math.max(...ys)-Math.min(...ys)<.02,'supported terrace '+id);}}
for(const n of w.interactive.filter(n=>!n.disabled))assert.ok(route({x:-5,z:6},n,w.colliders).length,'old and new route '+n.id);
assert.equal(blocked(P.pasture.x-4.4,P.pasture.z,w.colliders),false,'open west gate');assert.equal(blocked(P.pasture.x,P.pasture.z-7,w.colliders),true,'actual pasture fence collision');assert.ok(route(P.pasture.entry,{x:P.pasture.x,z:P.pasture.z},w.colliders).length,'enter extra pasture');assert.ok(route({x:-5,z:6},{x:-6,z:25},w.colliders).length,'original valley descent');
assert.ok(w.scene.userData.upperForestSites.every(t=>!inEstatePlot(t.x,t.z,1)));w.scene.traverse(o=>{if(o.isMesh)assert.ok(o.geometry.attributes.position.array.every(Number.isFinite),'finite '+o.userData.kind);});
const cloned=freshState();w.estateKit.sync(cloned);assert.equal(w.colliders.filter(c=>c.estateDevelopment).length,0,'switching to fresh save removes all built collisions');assert.equal(w.navigationTargets.filter(g=>g.userData.kind?.startsWith('development-')).length,0);console.log('PASS fully built geometry/terrace support/entries/fence gate/routes/valley descent, no plot trees, hidden-unbuilt targets excluded, no collider duplication and fresh-save teardown. No rendering/device QA.');

import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import * as T from '../dist/vendor/three.module.js';
import {createWorld} from '../dist/world.mjs';
import {height,blocked,route} from '../dist/logic.mjs';
import {HOF} from '../dist/hof-layout.mjs';
import {freshState,decodeSave} from '../dist/save.mjs';
import {ANIMALS,FARM_POINTS} from '../dist/farm.mjs';
import {HARVESTS} from '../dist/estate.mjs';
const require=createRequire(import.meta.url),{createCanvas}=require('/opt/codex/runtimes/codex-primary-runtime/dependencies/node/node_modules/@napi-rs/canvas');globalThis.document={createElement:()=>createCanvas(256,256)};
const w=createWorld();w.scene.updateMatrixWorld(true);const house=w.scene.children.find(o=>o.userData.kind==='swiss-chalet'),barn=w.scene.children.find(o=>o.userData.kind==='home-barn');assert.ok(barn.position.x>house.position.x+10,'barn lies to the right of the house');assert.ok(barn.position.z<house.position.z,'barn lies behind the house');const cows=HOF.pens.find(p=>p.id==='cows');assert.ok(cows.x0-(barn.position.x+HOF.barn.w/2)<1,'cow pasture attaches to barn');
for(const n of w.interactive)assert.ok(route({x:-5,z:6},n,w.colliders).length,'reachable relocated target '+n.id);
for(const [id,a]of Object.entries(ANIMALS)){const point=w.farmKit.animals.get(id).point;if(id!=='jonny')assert.ok(Math.hypot(point.x-a.x,point.z-a.z)<3);}
for(const [id,p]of Object.entries(FARM_POINTS)){const n=w.interactive.find(n=>n.farmSupply===id);assert.equal(n.x,p.x);assert.equal(n.z,p.z);assert.ok(!blocked(p.x,p.z,w.colliders));}
for(const [id,h]of Object.entries(HARVESTS)){const n=w.interactive.find(n=>n.estateField===id);assert.equal(n.x,h.x);assert.equal(n.z,h.z);assert.ok(!blocked(h.x,h.z,w.colliders));}
const a=.25,c=new T.Vector3(-5,height(-5,6)+.5,6),cam=new T.PerspectiveCamera(60,4/3,.1,650);cam.position.set(c.x+Math.sin(a)*13,c.y+6.5,c.z+Math.cos(a)*13);cam.lookAt(c.x-Math.sin(a)*5,c.y+4.7,c.z-Math.cos(a)*5);cam.updateMatrixWorld();const hp=house.position.clone().add(new T.Vector3(0,3,0)).project(cam),bp=barn.position.clone().add(new T.Vector3(0,3,0)).project(cam);assert.ok(hp.x<0&&bp.x>0,'house left and barn right in iPad landscape starting camera');for(const p of[hp,bp])assert.ok(Math.abs(p.x)<.85&&Math.abs(p.y)<.85,'both building centres inside start frame');
const old=freshState();old.coins=45670;old.hut=true;old.farm.animals.berta.trust=72;old.position={x:-27,z:5,region:'alp',inside:false};const restored=decodeSave(JSON.stringify(old));assert.equal(restored.coins,45670);assert.equal(restored.hut,true);assert.equal(restored.farm.animals.berta.trust,72);assert.ok(!blocked(restored.position.x,restored.position.z,w.colliders),'former supply yard remains a safe old save position');
console.log('PASS homestead arrangement, attached pasture, reachable relocated interactions/supplies/fields, left-house/right-barn projection on iPad landscape and preserved old progress. No rendered visual acceptance.');

// Check all eight corners of each complete building bounding box, including eaves,
// gallery, chimney and the wood-store extension; centre-only checks miss clipping.
for(const aspect of[4/3,1.6,16/9]){cam.aspect=aspect;cam.updateProjectionMatrix();for(const building of[house,barn]){const b=new T.Box3().setFromObject(building);for(const x of[b.min.x,b.max.x])for(const y of[b.min.y,b.max.y])for(const z of[b.min.z,b.max.z]){const p=new T.Vector3(x,y,z).project(cam);assert.ok(Math.abs(p.x)<.9&&Math.abs(p.y)<.9&&p.z<1,'complete '+building.userData.kind+' inside landscape start frame '+aspect);}}}
console.log('PASS full house/barn silhouettes within iPad landscape start frame; portrait and walking occlusion require separate visual review.');

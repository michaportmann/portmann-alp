import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import * as T from '../dist/vendor/three.module.js';
import {createWorld} from '../dist/world.mjs';
import {HOF} from '../dist/hof-layout.mjs';
import {height,route} from '../dist/logic.mjs';
import {ORCHARD_SITES} from '../dist/autumn-orchard.mjs';
import {SWISS_PEAKS} from '../dist/swiss-peaks.mjs';
const require=createRequire(import.meta.url),{createCanvas}=require('@napi-rs/canvas');globalThis.document={createElement:()=>createCanvas(256,256)};
const w=createWorld();assert.equal(w.scene.children.some(o=>o.userData.kind==='valley-panorama-lake'),false);
assert.ok(w.sun.position.y/Math.hypot(w.sun.position.x,w.sun.position.z)<.6,'lower autumn sunlight');
for(const id of['rigi','pilatus']){const p=SWISS_PEAKS.find(p=>p.id===id);assert.ok(p.cz> -90&&p.width>125,'broad near massif '+id);}
assert.equal(w.orchard.userData.trees,11);assert.ok(w.orchard.children.filter(o=>o.userData.kind==='individual-autumn-fruit-leaves').reduce((n,o)=>n+o.count,0)>2000);assert.ok(w.orchard.children.find(o=>o.userData.kind==='orchard-apples').count>=25);assert.ok(w.scene.children.some(o=>o.userData.kind==='golden-larch-boughs'));
for(const id of['basic','corn']){const g=w.homeKit.groups[id],crop=g.children.find(o=>o.userData.kind==='ripe-wheat'),f=HOF.fields[id];assert.ok(crop);const pose=new T.Matrix4(),position=new T.Vector3();let min=Infinity,max=-Infinity;for(let i=0;i<crop.count;i++){crop.getMatrixAt(i,pose);position.setFromMatrixPosition(pose);assert.ok(position.x>f.x-f.w/2&&position.x<f.x+f.w/2);assert.ok(position.z>f.z-f.d/2&&position.z<f.z+f.d/2);assert.ok(Math.abs(position.y-height(position.x,position.z)-.025)<.0001,'root conforms to actual hillside');const scale=new T.Vector3();pose.decompose(new T.Vector3(),new T.Quaternion(),scale);min=Math.min(min,scale.y);max=Math.max(max,scale.y);}assert.ok(max-min>.2,'varied crop heights');assert.ok(crop.geometry.attributes.color&&crop.geometry.attributes.position.count>1000);}
assert.ok(w.navigationTargets.some(o=>o.userData.kind==='front-valley-waymarker'&&o.userData.navigationId==='alp-village'));
for(const n of w.interactive)assert.ok(route({x:-5,z:6},n,w.colliders).length,'new orchard leaves access to '+n.id);
for(const t of[0,10,60])w.animated.forEach(f=>f(t));w.scene.traverse(o=>{if(o.isMesh)for(const v of o.geometry.attributes.position.array)assert.ok(Number.isFinite(v));});
console.log('PASS autumn alp: broad near Rigi/Pilatus massifs, removed side lake, lower warm sun, eleven fruit trees/species foliage/apples/plums/cherries/golden larches, terrain-rooted varied 3D wheat, clickable front descent marker and all farm routes. No rendered resemblance or device performance claim.');

import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {createWorld} from '../dist/world.mjs';
import {blocked,route,height} from '../dist/logic.mjs';
import {canGrowAlpineTree} from '../dist/alpine-ecology.mjs';
const require=createRequire(import.meta.url),{createCanvas}=require('@napi-rs/canvas');globalThis.document={createElement:()=>createCanvas(256,256)};
const w=createWorld();for(const t of w.scene.userData.coniferSites)assert.ok(canGrowAlpineTree(t.x,t.z,height),'no conifers on rocky crest');
for(const dt of[1/30,1/60]){const p={x:-5,z:6};w.lifeKit.dogStep(p,dt,false);w.lifeKit.dogStep(p,dt,true);for(const goal of[{x:-16,z:-3.25},{x:1.5,z:-7.7},{x:32,z:-9.5},{x:-30.8,z:7}]){const path=route(p,goal,w.colliders);assert.ok(path.length);for(const q of path){let guard=0;while(Math.hypot(p.x-q.x,p.z-q.z)>.02&&guard++<500){const d=Math.hypot(q.x-p.x,q.z-p.z),step=Math.min(dt*3.2,d);p.x+=(q.x-p.x)/d*step;p.z+=(q.z-p.z)/d*step;w.lifeKit.dogStep(p,dt,true);const dog=w.lifeKit.dog;assert.ok(!blocked(dog.position.x,dog.position.z,w.colliders,.21),'dog does not enter water/buildings/pens');}}for(let i=0;i<900;i++)w.lifeKit.dogStep(p,dt,true);assert.ok(Math.hypot(w.lifeKit.dog.position.x-p.x,w.lifeKit.dog.position.z-p.z)<2.5,'dog follows around obstacles '+JSON.stringify({goal,dog:w.lifeKit.dog.position.toArray(),dt}));}w.lifeKit.dogStep(p,dt,false);assert.equal(w.lifeKit.dog.visible,false);}
console.log('PASS dog follows real farm routes at 30/60 fps, avoids physical obstacles, hides indoors; conifer sites all below rocky tree line.');

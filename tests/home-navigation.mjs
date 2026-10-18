import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {createWorld} from '../dist/world.mjs';
import {blocked,route,routeNear,height} from '../dist/logic.mjs';
import {streamZ} from '../dist/landscape-height.mjs';
import {BACKLAND as B} from '../dist/alp-landscape-plan.mjs';
const require=createRequire(import.meta.url),{createCanvas}=require('/opt/codex/runtimes/codex-primary-runtime/dependencies/node/node_modules/@napi-rs/canvas');globalThis.document={createElement:()=>createCanvas(256,256)};
const w=createWorld(),from={x:-5,z:6};let count=0,unreachable=[];for(let x=-50;x<=50;x+=4)for(let z=-46;z<=46;z+=4){if(blocked(x,z,w.colliders))continue;if(!routeNear(from,{x:x+.08,z:z+.12},w.colliders).length)unreachable.push([x,z]);count++;}assert.deepEqual(unreachable,[],'every sampled open surface connects to the meadow, including outside former ±37/30 bounds');
// A free point whose rounded grid node is obstructed must remain reachable.
const obstacles=[{type:'circle',x:1,z:1,r:.2}];assert.equal(blocked(.51,.51,obstacles),false);assert.ok(route({x:0,z:0},{x:.51,z:.51},obstacles).length);
let triangles=0;for(const road of w.scene.children.filter(o=>o.userData.kind==='terrain-path')){const p=road.geometry.attributes.position,ix=road.geometry.index;for(let i=0;i<ix.count;i+=3){const ids=[ix.getX(i),ix.getX(i+1),ix.getX(i+2)];for(let a=0;a<=4;a++)for(let b=0;b<=4-a;b++){const u=a/4,v=b/4,x=p.getX(ids[0])*u+p.getX(ids[1])*v+p.getX(ids[2])*(1-u-v),z=p.getZ(ids[0])*u+p.getZ(ids[1])*v+p.getZ(ids[2])*(1-u-v);assert.ok(!(Math.abs(x-B.stream.bridgeX)<2.3&&Math.abs(z-streamZ(B.stream.bridgeX))<2.2),'no soil across timber crossing');if(x>=B.stream.minX&&x<=B.stream.maxX&&Math.abs(x-B.stream.bridgeX)>2.4)assert.ok(Math.abs(z-streamZ(x))>.65,'no soil through brook water');}triangles++;}}
const jet=[];w.scene.traverse(o=>{if(o.userData.kind==='fountain-water-jet')jet.push(o)});assert.equal(jet.length,1);const impact=jet[0].userData.impact;assert.ok(Math.abs(impact[0])<.7&&Math.abs(impact[2])<.295);assert.ok(impact[1]<.6&&impact[1]>.55,'jet ends on the basin water');
assert.ok(B.stream.minX<=-54);assert.ok(streamZ(B.stream.maxX)<-24,'spring turns uphill into rock instead of ending beside the path');console.log('PASS '+count+' open meadow samples reachable; free endpoint near blocked grid cell; '+triangles+' actual dry road triangles/bridge gap; curved brook to terrain edge and fountain jet into trough.');

import assert from 'node:assert/strict';
import * as T from '../dist/vendor/three.module.js';
import {interiorView,inBarn,INTERIOR_REGIONS} from '../dist/interior-camera.mjs';
for(const [w,h] of[[390,740],[844,390],[1024,768],[1366,900]])for(const floor of[-9.2,-4.6,0,4.6])for(const zoom of[.75,1,1.5])for(const [x,z] of[[110,3.25],[114.2,2.6],[105,-3],[1.5,-12]]){
 const actor={x,y:floor+.03,z},v=interiorView(actor,w/h,zoom),cam=new T.PerspectiveCamera(60,w/h,.1,650);cam.position.set(...Object.values(v.position));cam.lookAt(...Object.values(v.look));cam.updateMatrixWorld();const feet=new T.Vector3(x,actor.y,z).project(cam),head=new T.Vector3(x,actor.y+2,z).project(cam);assert.ok([feet.x,feet.y,head.x,head.y].every(Number.isFinite));assert.ok(Math.abs(head.y)<.8&&Math.abs(feet.y)<.8,'person clear of header and bottom HUD');assert.ok((head.y-feet.y)*h/2>h*.15,'adult occupies at least 15% of canvas height');const child=new T.Vector3(x,actor.y+1.5,z).project(cam);assert.ok((child.y-feet.y)*h/2>h*.11,'child remains visible');
 if(w===390&&zoom===1){const old=new T.PerspectiveCamera(60,w/h,.1,650);old.position.set(113,floor+9,17);old.lookAt(110,floor+.6,-.1);old.updateMatrixWorld();const a=new T.Vector3(110,floor+.03,0).project(old),b=new T.Vector3(110,floor+2.03,0).project(old);assert.ok((head.y-feet.y)/(b.y-a.y)>2,'portrait subject more than twice old size');}
}
assert.equal(INTERIOR_REGIONS.length,4);assert.equal(inBarn({x:1.5,z:-12}),true);assert.equal(inBarn({x:1.5,z:-8.7}),false);assert.equal(inBarn({x:1.5,z:-12},false),false);
console.log('PASS interior framing in iPhone portrait/landscape, iPad and Mac sizes, all storeys/room edges, adult/child, min/max zoom; barn gate boundaries. Projection test, no GPU/browser/device test.');

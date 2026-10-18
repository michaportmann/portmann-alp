import {HOF} from './hof-layout.mjs';
import {buildAlpineRoof} from './alpine-roof.mjs';
import * as T from './vendor/three.module.js';

export function buildHomesteadBarn(scene,height,colliders,materials){
 const {timber,beam,stone,black,cream}=materials;
 const barn=new T.Group();barn.position.set(HOF.barn.x,height(HOF.barn.x,HOF.barn.z),HOF.barn.z);barn.userData.kind='home-barn';scene.add(barn);
 function box(w,h,d,m,x,y,z){const o=new T.Mesh(new T.BoxGeometry(w,h,d),m);o.position.set(x,y,z);o.castShadow=o.receiveShadow=true;barn.add(o);return o;}
 function brace(a,b,r=.045){const u=new T.Vector3(...a),v=new T.Vector3(...b),d=v.clone().sub(u),o=new T.Mesh(new T.CylinderGeometry(r,r,d.length(),10),beam);o.position.copy(u.add(v).multiplyScalar(.5));o.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),d.normalize());o.castShadow=true;barn.add(o);}
 // A broad hay barn and low stone plinth, rather than the former long narrow shed.
 for(const side of[-1,1]){box(.22,1.05,7.2,stone,side*3.19,.525,0);box(2.02,1.05,.24,stone,side*2.29,.525,3.48);}
 box(6.6,1.05,.24,stone,0,.525,-3.48);
 const roofAt=x=>5.07-1.97*Math.abs(x)/3.95-.10*Math.sin(Math.PI*Math.abs(x)/3.95)-.075;
 const wall=new T.Shape();wall.moveTo(-3.3,1.05);wall.lineTo(-1.28,1.05);wall.lineTo(-1.28,2.72);wall.lineTo(1.28,2.72);wall.lineTo(1.28,1.05);wall.lineTo(3.3,1.05);wall.lineTo(3.3,3.15);for(let i=0;i<=24;i++){const x=3.3-i/24*6.6;wall.lineTo(x,roofAt(x));}wall.lineTo(-3.3,3.15);wall.closePath();
 const loft=new T.Path();loft.moveTo(-.83,3.32);loft.lineTo(-.83,4.05);loft.lineTo(.83,4.05);loft.lineTo(.83,3.32);loft.closePath();wall.holes.push(loft);
 const faceGeo=new T.ExtrudeGeometry(wall,{depth:.18,bevelEnabled:false,steps:1});faceGeo.translate(0,0,3.42);const facade=new T.Mesh(faceGeo,timber);facade.castShadow=facade.receiveShadow=true;facade.userData.kind='pierced-barn-facade';barn.add(facade);
 box(6.6,2.1,.18,timber,0,2.1,-3.51);for(const side of[-1,1])box(.18,roofAt(3.3)-1.05,7.02,timber,side*3.21,(roofAt(3.3)+1.05)/2,0);
 const backShape=new T.Shape();backShape.moveTo(-3.3,3.15);backShape.lineTo(3.3,3.15);for(let i=0;i<=24;i++){const x=3.3-i/24*6.6;backShape.lineTo(x,roofAt(x));}backShape.closePath();const backGeo=new T.ExtrudeGeometry(backShape,{depth:.12,bevelEnabled:false,steps:1});backGeo.translate(0,0,-3.6);barn.add(new T.Mesh(backGeo,timber));
 const boards=[],pose=new T.Object3D();for(const side of[-1,1])for(let i=0;i<24;i++)boards.push({x:side*3.315,y:2.1,z:-3.46+i*.3,ry:Math.PI/2});
 for(let i=0;i<22;i++){const x=-3.15+i*.3;boards.push({x,y:2.1,z:-3.62,ry:0});if(Math.abs(x)>1.4)boards.push({x,y:2.1,z:3.62,ry:0});}
 const cladding=new T.InstancedMesh(new T.BoxGeometry(.283,2.08,.042),timber,boards.length);boards.forEach((b,i)=>{pose.position.set(b.x,b.y,b.z);pose.rotation.set(0,b.ry,0);pose.scale.set(1,1,1);pose.updateMatrix();cladding.setMatrixAt(i,pose.matrix);cladding.setColorAt(i,new T.Color().setScalar(.86+(i%7)*.018));});cladding.castShadow=cladding.receiveShadow=true;cladding.userData.kind='barn-board-cladding';barn.add(cladding);
 buildAlpineRoof(barn,materials,{halfWidth:3.95,halfDepth:4.3,ridge:5.07,eave:3.1,rows:14,columns:18,kind:'barn'});
 for(const side of[-1,1]){box(.13,2.18,.15,beam,side*3.31,2.12,3.64);box(.14,.15,7.2,beam,side*3.32,3.12,0);for(const z of[-3.5,0,3.5])brace([side*3.34,1.08,z],[side*3.34,3.08,z],.065);brace([side*.1,4.94,3.89],[side*3.82,3.05,3.89],.065);}
 // Doors sit within the wall opening; the hayloft is recessed and ventilated.
 for(const side of[-1,1]){const start=barn.children.length;box(1.19,2.5,.09,beam,side*.625,1.31,3.47);for(let j=0;j<6;j++)box(.177,2.43,.025,timber,side*.625-.46+j*.184,1.31,3.53);brace([side*.13,.16,3.57],[side*1.13,2.48,3.57]);for(const y of[.46,2.12])box(.32,.045,.035,black,side*1.05,y,3.58);box(.04,.21,.04,black,side*.13,1.4,3.59);const leaf=new T.Group();leaf.position.set(side*1.25,0,3.55);leaf.userData.kind='open-barn-door';const parts=barn.children.slice(start);barn.add(leaf);for(const o of parts){o.position.x-=side*1.25;o.position.z-=3.55;leaf.add(o);}leaf.rotation.y=side*Math.PI*.65;box(.11,2.7,.2,beam,side*1.31,1.37,3.55);}
 box(2.75,.12,.22,beam,0,2.75,3.55);box(1.67,.74,.04,black,0,3.685,3.37);for(let i=0;i<9;i++)box(.118,.7,.07,timber,-.72+i*.18,3.685,3.48);box(1.92,.12,.24,beam,0,3.25,3.64);
 for(const side of[-1,1]){box(.035,.6,1.25,black,side*3.32,2.02,.9);for(let j=0;j<5;j++)box(.05,.59,.055,cream,side*3.35,2.02,.4+j*.25);}
 barn.userData.details=['closed-timber-gables','board-cladding','laid-shingles','braced-double-doors','slatted-hayloft','stone-lower-storey','broad-compact-barn','recessed-doorway','continuous-bellcast-roof'];
 // Physical wall strips leave a clear doorway and a genuine central aisle.
 const bx=HOF.barn.x,bz=HOF.barn.z;for(const side of[-1,1]){colliders.push({x:bx+side*3.2,z:bz,w:.24,d:7.2},{x:bx+side*2.29,z:bz+3.5,w:2.02,d:.25});}colliders.push({x:bx,z:bz-3.5,w:6.6,d:.25});
 const floor=box(6.2,.035,6.8,new T.MeshStandardMaterial({color:'#a38b60',roughness:1}),0,.018,0);floor.userData.kind='walkable-barn-floor';
 const strawMat=new T.MeshStandardMaterial({color:'#bda165',roughness:1});const straw=new T.InstancedMesh(new T.CylinderGeometry(.007,.01,.32,4),strawMat,500),pose2=new T.Object3D();for(let i=0;i<500;i++){const side=i%2?1:-1,x=side*(1.65+(i*31%100)/100*1.15),z=-2.8+(i*43%100)/100*5.6;pose2.position.set(x,.065,z);pose2.rotation.set(1.5,(i*.73)%6.28,i*.91);pose2.updateMatrix();straw.setMatrixAt(i,pose2.matrix);}barn.add(straw);straw.userData.kind='barn-straw-bedding';
 for(const side of[-1,1]){for(const z of[-2.2,0,2.1]){for(const dx of[1.35,2.85])box(.08,.8,.08,beam,side*dx,.4,z);box(1.6,.1,.09,timber,side*2.1,.7,z);}colliders.push({x:bx+side*2.3,z:bz,w:1.65,d:5.1,animalStallArea:true});box(.45,.35,4.6,timber,side*2.75,.2,0);}
 const roofParts=barn.children.filter(o=>o.position.y>2.6||['pierced-barn-facade','barn-board-cladding'].includes(o.userData.kind)||o.userData.kind?.includes('roof')||o.userData.kind==='barn-laid-shingles'||o.isMesh&&o.geometry?.attributes.position&&o.geometry.attributes.position.getY(0)>3);barn.userData.cutawayParts=roofParts;barn.userData.inside=false;barn.userData.details.push('open-walkable-aisle','straw-bedded-stalls','roof-cutaway');return barn;
}

export function makeFlameMaterial(){
 const c=document.createElement('canvas');c.width=128;c.height=256;const ct=c.getContext('2d');
 const grad=ct.createLinearGradient(0,256,0,0);grad.addColorStop(0,'#ef7436');grad.addColorStop(.5,'#ffc86b');grad.addColorStop(1,'#fff4bc');ct.fillStyle=grad;
 ct.beginPath();ct.moveTo(22,245);ct.bezierCurveTo(-4,175,75,122,66,13);ct.bezierCurveTo(115,82,85,145,110,195);ct.quadraticCurveTo(115,248,22,245);ct.fill();
 const map=new T.CanvasTexture(c);map.colorSpace=T.SRGBColorSpace;return new T.MeshBasicMaterial({map,transparent:true,depthWrite:false,side:T.DoubleSide});
}

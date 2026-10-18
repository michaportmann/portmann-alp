import * as T from './vendor/three.module.js';
import {generatedMap} from './generated-materials.mjs';
import {DECOR} from './seasonal-decor.mjs';
import {mergeStaticChildren} from './merge-static.mjs';
export function createDecorModel(id){
 const root=new T.Group();root.userData.kind='crafted-seasonal-decoration';root.userData.decor=id;const mat=(color,e={})=>new T.MeshStandardMaterial({color,roughness:.9,...e}),wood=mat('#8f7049'),green=mat('#536c43'),orange=mat('#c17c38'),red=mat('#a3473d'),gold=mat('#d9b873',{metalness:.35,roughness:.4}),glow=mat('#e8c47b',{emissive:'#ffc675',emissiveIntensity:0});glow.userData.nightWindow=true;
 const add=(g,m,x,y,z)=>{const o=new T.Mesh(g,m);o.position.set(x,y,z);o.castShadow=o.receiveShadow=true;root.add(o);return o;};
 const pumpkin=(x,z,size)=>{const geo=new T.SphereGeometry(size,24,14),p=geo.attributes.position;for(let i=0;i<p.count;i++){const a=Math.atan2(p.getZ(i),p.getX(i)),r=.91+.09*Math.cos(a*10);p.setXYZ(i,p.getX(i)*r,p.getY(i)*.78,p.getZ(i)*r);}geo.computeVertexNormals();add(geo,orange,x,size*.78,z);const stem=add(new T.CylinderGeometry(.035,.055,.16,7),wood,x,size*1.56+.06,z);stem.rotation.z=.2;};
 if(id==='autumnDecor'||id==='halloweenDecor'){for(let i=0;i<4;i++)pumpkin((i%2-.5)*.65,Math.floor(i/2)*.5,.22+(i%3)*.055);if(id==='autumnDecor'){const basket=add(new T.CylinderGeometry(.4,.32,.32,14),wood,1,.16,.1);for(let i=0;i<7;i++)add(new T.SphereGeometry(.11,10,7),mat(i%2?'#9e4132':'#c1aa57'),.8+(i%3)*.2,.4,.05+Math.floor(i/3)*.15);}else{add(new T.CylinderGeometry(.13,.15,.3,12),glow,.85,.2,.4);const l=new T.PointLight('#ffcb7d',0,4);l.position.set(.85,.4,.4);root.add(l);}}
 else if(id==='christmasTree'){
  add(new T.CylinderGeometry(.3,.24,.4,12),wood,0,.2,0);add(new T.CylinderGeometry(.045,.12,2.4,9),wood,0,1.35,0);const needles=mat('#ffffff',{map:generatedMap('fir-bough-v2'),alphaTest:.5,side:T.DoubleSide});
  for(let ring=0;ring<8;ring++){const y=.65+ring*.24,r=.85-ring*.095;for(let j=0;j<7;j++){const a=j/7*Math.PI*2+ring*.9,o=add(new T.PlaneGeometry(r*1.5,.65),needles,Math.sin(a)*r*.5,y,Math.cos(a)*r*.5);o.rotation.set(-.8,a,.18);}}
  for(let i=0;i<24;i++){const a=i*2.399,y=.6+i*.075,r=.78-(y-.6)*.31;add(new T.SphereGeometry(.045+(i%3)*.012,10,7),i%3===0?glow:i%2?gold:red,Math.sin(a)*r,y,Math.cos(a)*r);}add(new T.SphereGeometry(.09,10,8),gold,0,2.62,0);
 }else{
  for(let k=0;k<3;k++){const wreath=add(new T.TorusGeometry(.36,.085,8,24),green,k*.95,1.1,0);wreath.rotation.y=.1;for(let j=0;j<8;j++){const a=j*Math.PI/4;add(new T.SphereGeometry(.035,8,6),j%2?glow:gold,k*.95+Math.sin(a)*.35,1.1+Math.cos(a)*.35,.07);}}
 }
 mergeStaticChildren(root);return root;
}
export function createSeasonalAlpWorld(scene,height){const groups=new Map();for(const id of Object.keys(DECOR)){const g=new T.Group();g.userData.kind='alp-seasonal-decoration';g.userData.decor=id;scene.add(g);for(const[x,z]of id==='christmasTree'?[[-10,4.5]]:id==='christmasDecor'?[[-19,-3.5],[-10,-3.5]]:[[-21,-2.5],[-11.5,-3.1]]){const m=createDecorModel(id);m.position.set(x,height(x,z),z);if(id==='christmasDecor')m.position.y+=.6;g.add(m);}g.visible=false;groups.set(id,g);}return{groups,sync(s){const d=s.estate.decor;for(const[id,g]of groups)g.visible=!!d&&d.season===DECOR[id].season&&d.placed.includes(id)&&(d.unlocked.includes(id)||!!s.inventory[id]);}};}

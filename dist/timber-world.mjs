import {generatedMap} from './generated-materials.mjs';
import * as T from './vendor/three.module.js';
import {RESOURCE_NODES,resourceReady} from './progression.mjs';
// Dedicated coppice trees keep the scenic forest intact and reserve the walking paths.
export function createTimberWorld(scene,height,interactive,resources,animated){
 const bark=new T.MeshStandardMaterial({color:'#766347',roughness:1}),cut=new T.MeshStandardMaterial({color:'#d4ba83',roughness:1}),leaf=new T.MeshStandardMaterial({color:typeof window==='undefined'?'#647446':'#ffffff',map:generatedMap('alpine-bush-atlas',0),alphaTest:.45,side:T.DoubleSide,roughness:1}),iron=new T.MeshStandardMaterial({color:'#61706b',metalness:.6,roughness:.4});
 const add=(p,g,m,x,y,z)=>{const o=new T.Mesh(g,m);o.position.set(x,y,z);o.castShadow=o.receiveShadow=true;p.add(o);return o;};
 const depot=new T.Group();depot.position.set(-22.6,height(-22.6,-1.2),-1.2);depot.userData.kind='alp-wood-and-axe-depot';scene.add(depot);
 for(let row=0;row<3;row++)for(let i=0;i<5-row;i++){const log=add(depot,new T.CylinderGeometry(.12,.14,1.4,9),bark,(i-(4-row)/2)*.28,.15+row*.24,0);log.rotation.x=Math.PI/2;const end=add(depot,new T.CircleGeometry(.115,10),cut,log.position.x,log.position.y,.71);end.rotation.y=0;}
 const axe=new T.Group();depot.add(axe);axe.position.set(1,.1,.3);axe.rotation.z=-.25;add(axe,new T.CylinderGeometry(.025,.035,.9,8),bark,0,.45,0);add(axe,new T.BoxGeometry(.32,.18,.07),iron,.09,.84,0);interactive.push({id:'wood-depot',name:'Holzplatz · Beil und Vorräte',woodDepot:true,x:-22.2,z:.2,range:2});
 for(const node of RESOURCE_NODES.filter(n=>n.tree)){
  const g=new T.Group();g.position.set(node.x,height(node.x,node.z),node.z);g.userData.kind='renewable-timber-tree';scene.add(g);const stump=add(g,new T.CylinderGeometry(.16,.23,.35,10),bark,0,.175,0);add(g,new T.CircleGeometry(.16,10),cut,0,.354,0).rotation.x=-Math.PI/2;
  const crown=new T.Group();crown.position.y=.3;g.add(crown);add(crown,new T.CylinderGeometry(.055,.16,2.7,10),bark,0,1.35,0);add(crown,new T.CylinderGeometry(.166,.166,.12,10),new T.MeshStandardMaterial({color:'#d3ac55'}),0,.6,0);
  for(let i=0;i<6;i++){const a=i*2.4,x=Math.sin(a)*.55,z=Math.cos(a)*.55;const branch=add(crown,new T.CylinderGeometry(.018,.055,.9,7),bark,x*.6,1.5+i*.15,z*.6);branch.rotation.z=Math.sin(a)*.7;branch.rotation.x=Math.cos(a)*.7;const foliage=add(crown,new T.PlaneGeometry(1.65,1.6,2,2),leaf,x,2.1+i*.13,z);foliage.rotation.y=a;foliage.scale.set(1,.9,1);}
  let ready=null,fall=0;
  const n={...node,g,range:1.9,resource:true,syncResource(s){const next=resourceReady(s,node);if(ready===true&&!next)fall=.001;ready=next;stump.visible=true;if(next){crown.visible=true;crown.rotation.z=0;fall=0;}else if(!fall)crown.visible=false;}};
  animated.push((t,dt=.016)=>{if(!fall)return;fall=Math.min(1.6,fall+Math.min(.05,dt||.016));crown.rotation.z=Math.min(1.4,fall*fall);if(fall===1.6){fall=0;crown.visible=false;}});resources.push(n);interactive.push(n);
 }
 return depot;
}

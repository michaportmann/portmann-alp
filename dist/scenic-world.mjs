import * as T from './vendor/three.module.js';
export function createScenicWorld(id,{scene,height,colliders,interactive,nature,label}){
if(!['panorama','valley'].includes(id))return;
const wood=new T.MeshStandardMaterial({color:'#978063',roughness:.92}),pale=new T.MeshStandardMaterial({color:'#c6bea6',roughness:.95});
function add(g,m,p=scene){const o=new T.Mesh(g,m);o.castShadow=true;o.receiveShadow=true;p.add(o);return o;}
function rock(x,z,s){const o=add(new T.IcosahedronGeometry(1,2),nature.rockMaterial);o.position.set(x,height(x,z)+s*.3,z);o.scale.set(s,s*.85,s*.8);o.rotation.y=x;colliders.push({type:'ellipse',x,z,rx:s,rz:s*.8});return o;}
function rod(a,b,r,m=wood){const u=new T.Vector3(...a),v=new T.Vector3(...b),d=v.clone().sub(u),o=add(new T.CylinderGeometry(r,r,d.length(),10),m);o.position.copy(u.add(v).multiplyScalar(.5));o.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),d.normalize());return o;}
if(id==='panorama'){
 // An authored climbing meadow: rocky shoulders alternate with wide switchbacks.
 for(const [x,z,s]of[[-20,9,2.4],[20,0,2.8],[-22,-11,3.2],[19,-19,2.5],[-14,-24,1.9]])rock(x,z,s);
 for(const [x,z]of[[-31,22],[-24,4],[23,12],[25,-10],[-28,-18]]){nature.tree(x,z,1.1);colliders.push({type:'circle',x,z,r:.4});}
 label('Panoramaweg · frei bis zum Gipfel',0,height(0,21)+2,21,4);label('Weiter zur Sonnenalp, zum Grat und Gipfel',0,height(0,-22)+2,-22,4.5);
 const x=14,z=7;rod([x-1,height(x,z)+.65,z],[x+1,height(x,z)+.65,z],.15);interactive.push({id:'panorama-rest',name:'Am Bergweg innehalten',x:12,z:8,range:2,scenic:true});
}else{
 // The path descends on the west bank; the river stays visibly to its right.
 const vertices=[],indices=[];for(let i=0;i<=96;i++){const z=-25+i*.52,x=10+Math.sin(z*.1)*2;for(const side of[-1,1])vertices.push(x+side*1.2,height(x,z)+.055,z);if(i){const k=i*2;indices.push(k-2,k,k-1,k-1,k,k+1);}if(i%5===0){colliders.push({type:'ellipse',x,z,rx:1.5,rz:1.8});rock(x+2,z,.4);}}
 const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(vertices,3));geo.setIndex(indices);geo.computeVertexNormals();const river=add(geo,new T.MeshStandardMaterial({color:'#7baaa3',roughness:.3,metalness:.12,transparent:true,opacity:.72}));river.userData.kind='valley-river';
 for(const [x,z]of[[-29,-9],[-27,4],[-17,15],[22,-8],[26,8],[23,21]]){nature.tree(x,z,1.2);colliders.push({type:'circle',x,z,r:.4});}
 // Distant stone hamlet below the descent, separate from the navigable village.
 for(let i=0;i<9;i++){const g=new T.Group(),x=-25+i%5*9,z=44+Math.floor(i/5)*12;g.position.set(x,height(x,z),z);scene.add(g);const base=add(new T.BoxGeometry(2.5,1.8,2.7),pale,g);base.position.y=.9;for(const side of[-1,1]){const r=add(new T.BoxGeometry(1.7,.1,3.3),wood,g);r.position.set(side*.7,2,0);r.rotation.z=-side*.45;}}
 label('Talweg · dem Wasser zum Dorf folgen',-18,height(-18,-12)+2,-12,4.5);label('Bergdorf · von dort weiter zur Stadt',0,height(0,22)+2,22,4);
}
}

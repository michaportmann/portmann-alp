import {HOF} from './hof-layout.mjs';
import * as T from './vendor/three.module.js';
export const PENS=HOF.pens;
export function createFarmEnclosures(scene,height,colliders){const root=new T.Group();root.userData.kind='farm-enclosures';scene.add(root);const m=new T.MeshStandardMaterial({color:'#978464',roughness:.96});
function log(a,b,r){const u=new T.Vector3(...a),v=new T.Vector3(...b),d=v.clone().sub(u),o=new T.Mesh(new T.CylinderGeometry(r*.91,r,d.length(),9),m);o.position.copy(u.add(v).multiplyScalar(.5));o.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),d.normalize());o.castShadow=true;o.receiveShadow=true;root.add(o);}
function edge(x0,z0,x1,z1){const n=Math.max(1,Math.ceil(Math.hypot(x1-x0,z1-z0)/1.6));for(let i=0;i<=n;i++){const x=x0+(x1-x0)*i/n,z=z0+(z1-z0)*i/n,y=height(x,z);log([x,y-.07,z],[x,y+1.05,z],.055);if(i){const ax=x0+(x1-x0)*(i-1)/n,az=z0+(z1-z0)*(i-1)/n;for(const h of[.4,.82])log([ax,height(ax,az)+h,az],[x,y+h,z],.036);colliders.push({x:(ax+x)/2,z:(az+z)/2,w:Math.abs(x-ax)+.08,d:Math.abs(z-az)+.08,penFence:true});}}}
for(const p of PENS){if(p.northGates){let x=p.x0;for(const gate of p.northGates){edge(x,p.z0,gate-1.35,p.z0);x=gate+1.35;}edge(x,p.z0,p.x1,p.z0);}else edge(p.x0,p.z0,p.x1,p.z0);edge(p.x0,p.z1,p.x1,p.z1);const solid=p.west?p.x1:p.x0,door=p.west?p.x0:p.x1;if(p.westGates&&!p.west){let z=p.z0;for(const gate of p.westGates){edge(solid,z,solid,gate-1.35);z=gate+1.35;}edge(solid,z,solid,p.z1);}else edge(solid,p.z0,solid,p.z1);let at=p.z0;for(const z of [...p.gates].sort((a,b)=>a-b)){edge(door,at,door,z-1.35);at=z+1.35; // Gate leaf is folded back along the fence; the entrance remains open.
log([door,height(door,z-1.35)+.55,z-1.35],[door+(p.west?-.8:.8),height(door,z-1.35)+.55,z-1.35],.04);}edge(door,at,door,p.z1);}
return root;}

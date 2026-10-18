import * as T from './vendor/three.module.js';
import {CLIMBS,choices,localClimberPosition} from './climbing.mjs';

export function climbClearance(region,x,z,margin=1){return Object.values(CLIMBS).filter(r=>r.region===region).some(r=>{
 const dx=x-r.origin[0],dz=z-r.origin[1],u=dx*Math.cos(r.rotation)-dz*Math.sin(r.rotation),d=dx*Math.sin(r.rotation)+dz*Math.cos(r.rotation);
 return Math.abs(u)<r.width/2+margin&&d>-3-margin&&d<1.5+margin||Math.hypot(x-r.entry[0],z-r.entry[1])<2+margin||Math.hypot(x-r.exit[0],z-r.exit[1])<2+margin;
});}
export function createClimbingSites(scene,region,height,rockMaterial,colliders,interactive){
 const sites=new Map(),targets=[];
 for(const r of Object.values(CLIMBS).filter(r=>r.region===region)){
  const base=height(...r.origin),root=new T.Group();root.position.set(r.origin[0],base,r.origin[1]);root.rotation.y=r.rotation;root.userData.kind='climbing-site';root.userData.route=r.id;scene.add(root);
  const add=(g,m,p=root)=>{const o=new T.Mesh(g,m);o.castShadow=true;o.receiveShadow=true;p.add(o);return o;};
  const shape=new T.Shape(),w=r.width/2,h=r.height;shape.moveTo(-w,-.7);shape.lineTo(-w*1.04,h*.2);shape.lineTo(-w*.96,h*.62);shape.lineTo(-w*.79,h*.96);shape.lineTo(-w*.3,h*1.02);shape.lineTo(w*.3,h);shape.lineTo(w*.85,h*.94);shape.lineTo(w,h*.55);shape.lineTo(w*1.06,h*.12);shape.lineTo(w,-.7);shape.closePath();
  const cliff=add(new T.ExtrudeGeometry(shape,{depth:2.4,steps:1,bevelEnabled:true,bevelSegments:3,bevelSize:.22,bevelThickness:.2}),rockMaterial);cliff.position.z=-2.6;
  const sin=Math.sin(r.rotation),cos=Math.cos(r.rotation);colliders.push({x:r.origin[0]-sin*1.3,z:r.origin[1]-cos*1.3,w:Math.abs(cos)*r.width*1.08+Math.abs(sin)*3,d:Math.abs(sin)*r.width*1.08+Math.abs(cos)*3});
  interactive.push({id:'climb-'+r.id,name:r.name+' · Klettern',x:r.entry[0],z:r.entry[1],range:2.2,climbRoute:r.id});
  const gripMaterial=new T.MeshStandardMaterial({color:'#b9ad8b',roughness:.95}),safeMaterial=new T.MeshStandardMaterial({color:'#9b9c8b',roughness:.9}),markers=[];
  function point(p){return new T.Vector3(r.origin[0]+p.u*cos+.55*sin,base+p.v,r.origin[1]-p.u*sin+.55*cos);}
  for(let i=0;i<r.nodes.length;i++){
   const n=r.nodes[i],grip=add(new T.SphereGeometry(.15,14,10),gripMaterial);grip.position.set(n.u,n.v+1.25,-.02);grip.scale.set(1.3,.55,.8);
   const foothold=add(new T.SphereGeometry(.12,12,8),gripMaterial);foothold.position.set(n.u+.17,n.v+.06,.015);foothold.scale.set(1.3,.5,1);
   if(n.rest){const ledge=add(new T.BoxGeometry(i===0?1.5:1.25,.18,1.1),safeMaterial);ledge.position.set(n.u,n.v-.1,.1);}
   const c=document.createElement('canvas');c.width=c.height=160;const ct=c.getContext('2d');ct.clearRect(0,0,160,160);ct.fillStyle=n.rest?'#f7edd1':'#e5dfbd';ct.beginPath();ct.arc(80,80,65,0,Math.PI*2);ct.fill();ct.strokeStyle='#715e3c';ct.lineWidth=7;ct.stroke();ct.fillStyle='#244838';ct.font='bold 65px system-ui';ct.textAlign='center';ct.textBaseline='middle';ct.fillText(String(i+1),80,85);const map=new T.CanvasTexture(c);map.colorSpace=T.SRGBColorSpace;
   const mark=add(new T.PlaneGeometry(.6,.6),new T.MeshBasicMaterial({map,transparent:true,depthTest:false,side:T.DoubleSide}));mark.position.set(n.u,n.v+1.45,.13);mark.userData.grip=i;mark.visible=false;mark.renderOrder=4;markers.push(mark);targets.push(mark);
  }
  // Visible top anchor and the live safety rope are part of the world, not a modal.
  const anchor=add(new T.TorusGeometry(.14,.035,8,16),new T.MeshStandardMaterial({color:'#b1b4aa',metalness:.7,roughness:.35}));anchor.position.set(0,h-.3,.05);
  const ropeGeometry=new T.BufferGeometry();ropeGeometry.setAttribute('position',new T.Float32BufferAttribute(new Float32Array(17*3),3));const rope=new T.Line(ropeGeometry,new T.LineBasicMaterial({color:'#c69c56'}));scene.add(rope);rope.visible=false;rope.frustumCulled=false;
  const belt=new T.Mesh(new T.TorusGeometry(.24,.035,6,20),new T.MeshStandardMaterial({color:'#596b5d'}));belt.rotation.x=Math.PI/2;scene.add(belt);belt.visible=false;
  const plaque=document.createElement('canvas');plaque.width=768;plaque.height=160;const ctx=plaque.getContext('2d');ctx.fillStyle='#756047';ctx.fillRect(0,0,768,160);ctx.fillStyle='#f1e5c8';ctx.font='600 42px Georgia';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(r.name,384,80,720);const plaqueMap=new T.CanvasTexture(plaque);plaqueMap.colorSpace=T.SRGBColorSpace;const sign=new T.Mesh(new T.PlaneGeometry(3.6,.75),new T.MeshBasicMaterial({map:plaqueMap,side:T.DoubleSide}));sign.position.set(r.entry[0]+1,height(...r.entry)+1.7,r.entry[1]);scene.add(sign);
  const site={route:r,base,point,
   position(session){const p=point(localClimberPosition(session));if(session.phase!=='descending')return p;const start=point(session.descentFrom),out=start.clone().add(new T.Vector3(sin*2.8,.25,cos*2.8)),endXZ=session.ending==='success'?r.exit:r.entry,ground=new T.Vector3(endXZ[0],height(...endXZ),endXZ[1]),above=ground.clone();above.y=Math.max(start.y+.25,ground.y+.3);const t=session.progress;if(t<.25)return start.lerp(out,t/.25);if(t<.6)return out.lerp(above,(t-.25)/.35);return above.lerp(ground,(t-.6)/.4);},
   camera:new T.Vector3(r.origin[0]+sin*(r.id==='waterfall'?26:r.id==='eagle'?23:17),base+(r.id==='eagle'?10:r.id==='training'?6:8),r.origin[1]+cos*(r.id==='waterfall'?26:r.id==='eagle'?23:17)),look:new T.Vector3(r.origin[0],base+r.height*.42,r.origin[1]),
   sync(session){const active=session?.route===r.id;const valid=active?choices(session):[];markers.forEach((m,i)=>{m.visible=!!active&&session.phase==='idle'&&valid.includes(i);m.scale.setScalar(valid[session?.selected]===i?1.18:1);});rope.visible=belt.visible=!!active;if(!active)return;const current=site.position(session),top=point({u:0,v:h-.3}).add(new T.Vector3(-sin*.5,0,-cos*.5)),a=ropeGeometry.attributes.position;for(let i=0;i<17;i++){const t=i/16,q=top.clone().lerp(current.clone().add(new T.Vector3(0,.9,0)),t);q.y-=Math.sin(t*Math.PI)*.12;a.setXYZ(i,q.x,q.y,q.z);}a.needsUpdate=true;belt.position.copy(current).add(new T.Vector3(0,.8,0));}
  };
  sites.set(r.id,site);
 }
 return{sites,targets,sync(session){for(const s of sites.values())s.sync(session);}};
}

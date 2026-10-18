import * as T from './vendor/three.module.js';
import {generatedMap} from './generated-materials.mjs';
// Distant image relief sits beyond the physical descending terrain and boundary fence.
// Near meadows, paths, trees, animals and fences remain part of the playable 3D world.
export function createValleyVista(scene){
 const root=new T.Group();root.userData.kind='valley-day-night-panorama';root.userData.beyondPlayableBounds=true;scene.add(root);
 const geometry=new T.BufferGeometry(),p=[],uv=[],ix=[],n=80,radius=205;
 for(let i=0;i<=n;i++){const u=i/n,a=(u-.5)*1.8;for(const y of[-150,75]){p.push(Math.sin(a)*radius,y,Math.cos(a)*radius);uv.push(u,y<0?0:1);}if(i){const a=(i-1)*2;ix.push(a,a+1,a+2,a+2,a+1,a+3);}}
 geometry.setAttribute('position',new T.Float32BufferAttribute(p,3));geometry.setAttribute('uv',new T.Float32BufferAttribute(uv,2));geometry.setIndex(ix);geometry.computeVertexNormals();
 for(const phase of['day','night']){const map=generatedMap('valley-'+phase+'-20261018');if(map){map.wrapS=map.wrapT=T.ClampToEdgeWrapping;}const m=new T.MeshBasicMaterial({map,color:map?'#ffffff':phase==='day'?'#869b91':'#16283f',side:T.DoubleSide,fog:false,transparent:phase==='night',opacity:phase==='night'?0:1,depthWrite:phase==='day'});const o=new T.Mesh(geometry,m);o.userData.valleyPhase=phase;o.renderOrder=phase==='night'?2:0;root.add(o);}
 return root;
}
export const SMALL_FAUNA_SITES=[{kind:'Igel',tile:0,x:-24,z:10,w:.74,h:.56},{kind:'Igel',tile:0,x:-30,z:23,w:.7,h:.52},{kind:'Eichhörnchen',tile:1,x:-21,z:-18,w:.72,h:.82},{kind:'Eichhörnchen',tile:1,x:-30,z:-22,w:.7,h:.8},{kind:'Feldhase',tile:2,x:-32,z:16,w:.68,h:.85},{kind:'Rotkehlchen',tile:3,x:-25,z:2,w:.36,h:.35},{kind:'Rotkehlchen',tile:3,x:21,z:8,w:.36,h:.35}];
export function createSmallFauna(scene,height,animated,allowed){
 const root=new T.Group();root.userData.kind='generated-alpine-small-fauna';scene.add(root);
 for(const site of SMALL_FAUNA_SITES){const map=generatedMap('small-fauna-20261018',site.tile),m=new T.SpriteMaterial({map,color:map?'#ffffff':'#95745a',alphaTest:.25,depthWrite:false});m.userData.nightBackdrop=true;const o=new T.Sprite(m);o.userData.species=site.kind;o.userData.generatedAsset='small-fauna-20261018';o.scale.set(site.w,site.h,1);const perch=site.kind==='Rotkehlchen'?.75:0;o.position.set(site.x,height(site.x,site.z)+site.h/2+perch,site.z);root.add(o);animated.push(t=>{const moving=site.kind==='Igel'||site.kind==='Eichhörnchen',x=site.x+(moving?Math.sin(t*.09+site.x)*.65:0),z=site.z+(moving?Math.cos(t*.07+site.z)*.4:0);if(allowed(x,z)){o.position.set(x,height(x,z)+site.h/2+perch+(site.kind==='Eichhörnchen'?Math.max(0,Math.sin(t*2))*.025:0),z);}});}
 scene.userData.smallFauna=SMALL_FAUNA_SITES.map(s=>({...s}));return root;
}

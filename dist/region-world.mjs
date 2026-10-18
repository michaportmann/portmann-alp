import {buildShopInterior} from './village-shop.mjs';
import {createTerrainSurface} from './terrain-surface.mjs';
import {createTerrainPath} from './terrain-path.mjs';
import {createBoundaryFence} from './world-boundary.mjs';
import {createTrailMargins} from './trail-margins.mjs';
import {buildMountainHut,HUT} from './mountain-hut.mjs';
import {RESOURCE_NODES} from './progression.mjs';
import {buildVillageUpgrade} from './village-upgrade.mjs';
import {generatedMap} from './generated-materials.mjs';
import {PORTMANN_STORE} from './dairy.mjs';
import {createScenicWorld} from './scenic-world.mjs';
import {createPastureWorld} from './pasture-world.mjs';
import {ARCADE_START,MELANIE} from './arcade.mjs';
import {JASS_TABLE,RESTAURANT_COUNTER} from './jass.mjs';
import {TARGET_STARTS} from './target-games.mjs';
import {SKI_START} from './ski.mjs';
import {createVillagePeople} from './village-world.mjs';
import * as T from './vendor/three.module.js';
import {height as alpineHeight,blocked,route,routeNear} from './logic.mjs';
import {createNatureKit} from './nature.mjs';
import {createAlpineKit} from './alpine.mjs';
import {REGIONS,GATEWAYS,LANDMARKS,TREASURES} from './regions.mjs';
import {createClimbingSites,climbClearance} from './climb-world.mjs';
import {CLIMBS} from './climbing.mjs';

export function terrainHeight(id,x,z){
 if(id==='alp')return alpineHeight(x,z);if(['pasture','panorama','valley'].includes(id)){const r=Math.hypot(x,z),h=id==='pasture'?.1*Math.sin(x*.08)*Math.cos(z*.08):id==='panorama'?(24-z)*.17+1.2*Math.sin(x*.1):(24-z)*.11+.4*Math.sin(x*.13),mix=T.MathUtils.smoothstep(r,35,45);return h*(1-mix)+alpineHeight(x,z)*mix;}
 if(['house','restaurant','arcadeshop','villageshop','danielhut','cellar','passage','kristall'].includes(id))return 0;
 const r=Math.hypot(x,z);if(r>45)return alpineHeight(x,z);
 const hill=Math.exp(-((x+18)**2/180+(z+15)**2/300))*4;
 let h=.15*Math.sin(x*.11)*Math.cos(z*.15);
 if(['blumen','hochalp','grat','gipfel'].includes(id))h+=(-z+25)*.07+hill*(id==='gipfel'?1.2:.6);
 if(id==='gipfel'){const dx=Math.max(0,Math.abs(x+15)-4.6),dz=Math.max(0,Math.abs(z+13)-3.6),d=Math.max(dx,dz),t=Math.max(0,Math.min(1,d/3));h+=(7.2-h)*(1-t*t*(3-2*t));}
 if(id==='see')h-=Math.max(0,1-((x-12)/11)**2-((z+4)/10)**2)*2.2;
 if(id==='schlucht')h-=Math.max(0,1-Math.abs(z)/4)*3.5;
 const mix=T.MathUtils.smoothstep(r,35,45);return h*(1-mix)+alpineHeight(x,z)*mix;
}
export function walkingHeight(id,x,z){
 if(id==='alp'&&Math.abs(x+6)<1.75&&Math.abs(z-(17+Math.sin(-6*.16)*1.5))<2.25)return alpineHeight(-6,17+Math.sin(-6*.16)*1.5)+.24;
 if(id==='schlucht'&&Math.abs(x)<2.5&&Math.abs(z)<4.2)return .5;
 if(id==='see'&&x>=-1&&x<=8.5&&Math.abs(z-2)<1.05)return .4;
 return terrainHeight(id,x,z);
}
export function createRegionWorld(id){
 if(!REGIONS[id]||id==='alp')throw Error('Unknown region '+id);
 const meta=REGIONS[id],indoor=['house','restaurant','arcadeshop','villageshop','danielhut','cellar','passage','kristall'].includes(id),scene=new T.Scene();scene.background=new T.Color(indoor?'#303b3b':id==='gipfel'?'#adc7d5':'#c0d9d5');scene.fog=new T.Fog(scene.background,indoor?48:105,indoor?100:480);
 const colliders=[],interactive=[],groundMeshes=[],navigationTargets=[],animated=[],resources=[],herbs=[],paths=[],owned=new Set();let seed=1031+Object.keys(REGIONS).indexOf(id)*7187;
 const rnd=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
 const height=(x,z)=>terrainHeight(id,x,z),walk=(x,z)=>walkingHeight(id,x,z);if(!indoor&&!['see','schlucht'].includes(id))walk.surfaceGrid=createTerrainSurface(height,{width:112,depth:104,nx:112,nz:104}).surfaceGrid;
 const hemi=new T.HemisphereLight(indoor?'#e6dbb7':'#fff0ce',indoor?'#39413e':'#5c7558',indoor?.95:1.6);scene.add(hemi);
 const sun=new T.DirectionalLight(indoor?'#e7bd81':'#ffe6b8',indoor?1.2:2.4);sun.position.set(-22,40,18);sun.castShadow=!indoor;sun.shadow.mapSize.set(1536,1536);Object.assign(sun.shadow.camera,{left:-43,right:43,top:43,bottom:-43,near:1,far:120});sun.shadow.normalBias=.04;scene.add(sun);scene.add(sun.target);
 const cache=new Map();function mat(color,extra={}){const k=color+JSON.stringify(extra);if(!cache.has(k)){const m=new T.MeshStandardMaterial({color,roughness:.92,...extra});cache.set(k,m);owned.add(m);}return cache.get(k);}
 const wood=mat('#877257'),beam=mat('#5e4c39'),cream=mat('#e9debf'),stone=mat('#a9aba0'),metal=mat('#b8aa82',{metalness:.3}),dark=mat('#343d38');
 function add(g,m,p=scene){owned.add(g);const o=new T.Mesh(g,m);o.castShadow=true;o.receiveShadow=true;p.add(o);return o;}
 function box(w,h,d,m,x,y,z,p=scene){const o=add(new T.BoxGeometry(w,h,d),m,p);o.position.set(x,y,z);return o;}
 function ball(r,m,x,y,z,p=scene,sx=1,sy=1,sz=1){const o=add(new T.SphereGeometry(r,18,12),m,p);o.position.set(x,y,z);o.scale.set(sx,sy,sz);return o;}
 function rod(a,b,r,m,p=scene){const u=new T.Vector3(...a),v=new T.Vector3(...b),d=v.clone().sub(u),o=add(new T.CylinderGeometry(r,r,d.length(),8),m,p);o.position.copy(u.add(v).multiplyScalar(.5));o.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),d.normalize());return o;}
 function label(text,x,y,z,size=3,p=scene){const c=document.createElement('canvas');c.width=768;c.height=160;const ct=c.getContext('2d');ct.fillStyle='#6d573f';ct.fillRect(0,0,768,160);ct.strokeStyle='#c2b58e';ct.lineWidth=4;ct.strokeRect(8,8,752,144);ct.font='600 45px Georgia';ct.textAlign='center';ct.textBaseline='middle';ct.fillStyle='#fff2d1';ct.fillText(text,384,80,710);const tex=new T.CanvasTexture(c);tex.colorSpace=T.SRGBColorSpace;owned.add(tex);const m=new T.MeshBasicMaterial({map:tex,side:T.DoubleSide});owned.add(m);const o=add(new T.PlaneGeometry(size,size*160/768),m,p);o.position.set(x,y,z);return o;}
 function lamp(x,z){const y=walk(x,z);box(.1,1.8,.1,beam,x,y+.9,z);box(.3,.4,.3,mat('#e6be72',{emissive:'#bf8740',emissiveIntensity:.6}),x,y+1.9,z);const l=new T.PointLight('#ffd48c',8,10,2);l.position.set(x,y+2,z);scene.add(l);}
 if(id==='city')interactive.push({...PORTMANN_STORE});
 if(id==='arcadeshop')interactive.push({...ARCADE_START},{...MELANIE});
 if(id==='restaurant')interactive.push({...JASS_TABLE},{...RESTAURANT_COUNTER});
 for(const point of Object.values(TARGET_STARTS).filter(p=>p.region===id))interactive.push({...point});
 if(id==='hochalp')interactive.push({...SKI_START});
 const gates=GATEWAYS.filter(g=>g.from===id);for(const g of gates)interactive.push({...g});
 const landmark=LANDMARKS[id];if(landmark)interactive.push({...landmark,id:'landmark-'+landmark.id,name:landmark.title,landmark:true,range:2});
 for(const t of TREASURES.filter(t=>t.region===id))interactive.push({...t,treasure:true,range:1.9});
 const villageKit=id==='village'?createVillagePeople(scene,walk,colliders,interactive,animated,label):null;
 const bounds=meta.bounds||[-34,34,-27,27];
 // Thick enclosing masks also constrain the existing grid pathfinder to indoor rooms.
 const [xmin,xmax,zmin,zmax]=bounds;
 colliders.push({x:(-100+xmin)/2,z:0,w:100+xmin,d:200},{x:(100+xmax)/2,z:0,w:100-xmax,d:200},{x:0,z:(-100+zmin)/2,w:200,d:100+zmin},{x:0,z:(100+zmax)/2,w:200,d:100-zmax});
 const nature=createNatureKit(scene,animated,rnd,{height,flowerCount:indoor?0:id==='blumen'?3000:id==='grat'||id==='gipfel'?450:1600,grassCount:indoor?0:id==='grat'||id==='gipfel'?650:2600,speciesAt:id==='blumen'?((x,z,i)=>i%3===0?3:4):undefined});
 const climbKit=createClimbingSites(scene,id,walk,nature.rockMaterial,colliders,interactive);
 // A detailed continuous surface; all trail vertices use the navigable height.
 const geom=new T.PlaneGeometry(meta.bounds?bounds[1]-bounds[0]:indoor?80:112,meta.bounds?bounds[3]-bounds[2]:indoor?65:104,indoor?16:112,indoor?16:104);geom.rotateX(-Math.PI/2);const p=geom.attributes.position,colors=[];
 for(let i=0;i<p.count;i++){const x=p.getX(i),z=p.getZ(i);p.setY(i,height(x,z));const c=new T.Color(indoor?'#8e9085':id==='grat'||id==='gipfel'?'#c0bba5':'#d0d2b2');c.multiplyScalar(.92+rnd()*.13);colors.push(c.r,c.g,c.b);}geom.setAttribute('color',new T.Float32BufferAttribute(colors,3));geom.computeVertexNormals();if(!indoor&& !['village','city'].includes(id)){const surface=generatedMap(id==='wald'?'meadow-forest':['grat','gipfel'].includes(id)?'meadow-summit':id==='hochalp'?'meadow-autumn':'meadow-lush');if(surface){nature.groundMaterial.map=surface;nature.groundMaterial.bumpMap=surface;nature.groundMaterial.bumpScale=.022;const guv=geom.attributes.uv;for(let i=0;i<p.count;i++)guv.setXY(i,p.getX(i)/6,p.getZ(i)/6);}}const ground=add(geom,nature.groundMaterial);groundMeshes.push(ground);
 if(id==='village'){const paving=new T.PlaneGeometry(58,44,58,44);paving.rotateX(-Math.PI/2);const v=paving.attributes.position,uv=paving.attributes.uv,ix=[];for(let i=0;i<v.count;i++){const x=v.getX(i),z=v.getZ(i)+3;v.setZ(i,z);v.setY(i,height(x,z)+.018);uv.setXY(i,x/2,z/2);}for(let i=0;i<paving.index.count;i+=3){const a=paving.index.getX(i),b=paving.index.getX(i+1),c=paving.index.getX(i+2),x=(v.getX(a)+v.getX(b)+v.getX(c))/3,z=(v.getZ(a)+v.getZ(b)+v.getZ(c))/3;if((x/28)**2+((z-3)/19)**2<1)ix.push(a,b,c);}paving.setIndex(ix);paving.computeVertexNormals();const square=add(paving,mat('#ffffff',{map:generatedMap('swiss-paving-20261018'),roughness:1}));square.userData.kind='swiss-cobblestone-village-square';groundMeshes.push(square);}

 function path(points,width=2){paths.push({points,width});const road=createTerrainPath(points,width,walk,'#b09a79',{surface:indoor?'trail-farm':id==='village'||id==='city'?'swiss-paving-20261018':id==='wald'?'trail-forest':['grat','gipfel'].includes(id)?'trail-scree':'trail-hiking'});road.traverse(o=>{if(o.userData.kind==='terrain-path')o.userData.kind='region-path';});scene.add(road);}

 // Route design avoids every authored solid feature and every water body.
 if(id==='pasture'){path([[0,24],[0,5],[6,3]],2.2);path([[0,5],[-19,5],[-19,14]],2.2);}
 else if(id==='panorama'){path([[0,24],[-11,14],[10,4],[-10,-7],[8,-16],[0,-24]],2.6);}
 else if(id==='valley'){path([[-28,-22],[-20,-10],[-7,0],[0,12],[0,24]],2.5);}
 else if(id==='village'){path([[0,8],[20,18],[28,22]],1.8);path([[0,15],[-12,17],[-25,20]],2);path([[0,15],[1,15]],1.5);path([[0,24],[0,8],[-5,0],[-16,-2.5]]);path([[0,8],[12,4],[20,-8]]);path([[12,4],[14,-6.2]],1.6);path([[0,8],[-7,5]],1.6);path([[12,4],[10,1]],1.6);path([[0,8],[-7,14]],1.6);path([[12,4],[16,10],[19,14],[23,14]],1.6);path([[-5,0],[-4,-6.2]],1.8);path([[-7,5],[-8,12],[-27,11]],1.8);path([[12,4],[13,12],[10,12]],1.7);}
 else if(id==='city'){path([[0,24],[0,8],[-6,2],[-16,-3.25]],2);path([[0,8],[12,4],[20,-8]],2);}
 else if(id==='arcadeshop'){path([[0,3],[0,1],[2,1.8]],1);path([[0,1],[-2,-.4]],1);}
 else if(id==='restaurant'){path([[0,3],[0,1],[-1,-.5]],.8);path([[0,1],[3,1.5]],.8);}
 else if(id==='danielhut'){path([[0,3],[0,1],[2.9,1]],1);}
 else if(id==='house'){path([[0,3],[1,2],[3,1]],.8);}
 else if(id==='cellar'){path([[0,4],[0,0],[0,-3.4]],1.4);}
 else if(id==='passage'){path([[0,24],[2,13],[-2,4],[1,-9],[0,-24]],2.5);}
 else if(id==='wald'){path([[10,-4],[13,1]],1.5);path([[0,24],[0,10],[-4,0],[-9,-4],[-14,-9],[-27,-10]],2.2);path([[-4,0],[10,-4],[27,-10]],2);}
 else if(id==='blumen'){path([[28,16],[14,12],[0,5],[-10,-9],[0,-16],[0,-24]],2.2);}
 else if(id==='see'){path([[-28,16],[-15,12],[-6,5],[-5,-10],[-20,-18],[-20,-24]],2);path([[-6,5],[-2,2],[3,2],[8,2]],1.8);}
 else if(id==='schlucht'){path([[0,24],[-5,12],[0,5],[0,-5],[6,-13],[0,-24]],2);}
 else if(id==='hochalp'){path([[-26,16],[-14,12],[7,12]],2);path([[0,24],[7,12],[-2,0],[-10,-5],[-4,-15],[0,-24]],2);}
 else if(id==='kristall'){path([[0,24],[5,12],[0,0],[-8,-6],[0,-16],[0,-24]],2);path([[0,0],[8,-8]],1.7);}
 else if(id==='grat'){path([[-25,20],[-16,9],[0,1],[0,-9],[0,-24]],2);path([[25,20],[14,10],[0,1]],2);}
 else if(id==='gipfel'){path([[0,24],[8,15],[-6,5],[0,-6],[0,-15]],2);path([[0,-15],[9,-17]],1.8);path([[-6,5],[-12,-2],[-15,-8.5]],1.8);}
 function segmentDistance(x,z,a,b){const dx=b[0]-a[0],dz=b[1]-a[1],d=dx*dx+dz*dz,u=d?Math.max(0,Math.min(1,((x-a[0])*dx+(z-a[1])*dz)/d)):0;return Math.hypot(x-a[0]-u*dx,z-a[1]-u*dz);}
 const nearPath=(x,z,margin=1)=>paths.some(p=>p.points.some((b,i)=>i&&segmentDistance(x,z,p.points[i-1],b)<p.width/2+margin));
 const protectedPoint=(x,z,r=2.6)=>climbClearance(id,x,z,r*.5)||interactive.some(n=>Math.hypot(x-n.x,z-n.z)<r)||GATEWAYS.filter(g=>g.to===id).some(g=>Math.hypot(x-g.arrival[0],z-g.arrival[1])<r);
 for(const c of Object.values(CLIMBS).filter(c=>c.region===id))path([[0,10],[c.entry[0],c.entry[1]]],1.6);
 createScenicWorld(id,{scene,height,colliders,interactive,nature,label});
 const pastureKit=id==='pasture'?createPastureWorld({scene,height,interactive,animated,navigationTargets,nature,label}):null;
 const alpine=createAlpineKit(scene,animated,colliders,label,{height,chaletName:id==='village'?'Dorfhaus':'Portmann Alp'});
 if(id==='house'||id==='restaurant'){const room=alpine.buildRoom();room.position.set(0,0,0);colliders.push({x:-1,z:-2.2,w:3.8,d:1.8},{x:-3.65,z:-2.5,w:.8,d:3},{x:3.35,z:-3.65,w:2.4,d:1.5},{x:-3.75,z:1.75,w:2.8,d:1.1});if(id==='house'){for(let i=0;i<4;i++)box(1.2,.15,1,wood,3,.02-i*.08,1+i*.25);label('Keller',3,1.7,1,1.7);}else{colliders.push({type:'circle',x:-1.8,z:-.6,r:.33},{type:'circle',x:.1,z:-.6,r:.33});label('Sämi · Jasstisch',-1,2.7,-3.8,2.5);label('Speisekarte',3,1.6,.8,1.8);const sami=nature.makePerson({black:dark,beam});sami.g.position.set(-1,.04,-3.35);sami.legs.forEach(l=>l.rotation.x=-.9);sami.arms.forEach(a=>a.rotation.x=-.6);scene.add(sami.g);animated.push(t=>{sami.g.rotation.y=Math.sin(t*.5)*.035;});for(let i=0;i<3;i++){const c=box(.3,.02,.43,cream,-2.1+i*.34,1.18,-2.3);c.rotation.y=(i-1)*.12;}label('A · K · B',-1.75,1.24,-2.15,.7);} }
 if(id==='danielhut'){const room=alpine.buildRoom();room.position.set(0,0,0);colliders.push({x:-1,z:-2.2,w:3.8,d:1.8},{x:-3.65,z:-2.5,w:.8,d:3},{x:3.35,z:-3.65,w:2.4,d:1.5},{x:-3.75,z:1.75,w:2.8,d:1.1});for(const x of[2.4,4.0]){box(1.15,.4,2.2,wood,x,.22,.1);box(1.1,.12,2.1,cream,x,.47,.1);box(1.1,.12,.5,cream,x,.58,-.65);colliders.push({x,z:.1,w:1.2,d:2.25});}interactive.push({id:'hut-sleep',name:'Bei Daniel übernachten',x:1,z:1.6,range:1.7,hutSleep:true});label('Guet Nacht · Tourenhütte',0,2.8,-4.3,3);}
 if(id==='village'){

  const chalet=alpine.buildChalet();chalet.userData.navigationId=id==='village'?'village-house':'city-arcade';navigationTargets.push(chalet);colliders.push({x:-16,z:-8,w:9,d:7.2});
  buildVillageUpgrade(scene,height,colliders,interactive,paths,label,animated,navigationTargets);

 }
 if(id==='city'){
  const chalet=alpine.buildChalet();chalet.userData.navigationId=id==='village'?'village-house':'city-arcade';navigationTargets.push(chalet);colliders.push({x:-16,z:-8,w:9,d:7.2});label('Melanie · Laden & Retro',-16,4.8,-3.8,4.4);
  for(const [x,z]of[[15,-9],[24,10]]){const g=new T.Group();g.position.set(x,height(x,z),z);scene.add(g);box(6,3.4,5,mat('#d2c4a5'),0,1.7,0,g);for(const side of[-1,1]){const roof=box(4,.18,6,beam,side*1.65,3.9,0,g);roof.rotation.z=-side*.45;}for(const xx of[-1.7,1.7])box(.9,1.2,.1,mat('#607b72'),xx,1.8,2.55,g);colliders.push({x,z,w:6.3,d:5.3});}
  label('PORTMANN · Chäs & Schoggi',15,height(15,-9)+2.8,-6.35,4.4);const portmannSign=label('Alpprodukte verkaufen',15,height(15,-5)+1.5,-5,3.6);portmannSign.userData.navigationId=PORTMANN_STORE.id;navigationTargets.push(portmannSign);path([[0,5],[10,5],[15,-5]],1.8);
  const fy=height(4,1);const basin=add(new T.CylinderGeometry(1.1,1.2,.5,24),stone);basin.position.set(4,fy+.25,1);const water=add(new T.CircleGeometry(.94,24),mat('#83aaa8'));water.rotation.x=-Math.PI/2;water.position.set(4,fy+.51,1);colliders.push({type:'circle',x:4,z:1,r:1.2});
 }
 if(id==='villageshop')buildShopInterior(scene,colliders,interactive,navigationTargets,label,animated);
 if(id==='arcadeshop'){
  box(11,.2,9,wood,0,-.1,0);box(11,3.8,.16,cream,0,1.9,-4.5);box(.16,3.8,9,wood,-5.5,1.9,0);for(const x of[-5.3,0,5.3])box(.18,3.7,.2,beam,x,1.85,-4.35);
  box(3,1,.9,wood,-2,.5,-2);colliders.push({x:-2,z:-2,w:3.2,d:1.1});label('Melanie',-2,2.5,-3,2.4);const melanie=nature.makePerson({black:dark,beam});melanie.g.position.set(-2,0,-3);scene.add(melanie.g);animated.push(t=>melanie.arms.forEach((a,i)=>a.rotation.x=Math.sin(t*.7+i)*.045));
  for(let i=0;i<3;i++)box(.65,.12,3.5,wood,-4.6,.6+i*.8,-1.4);colliders.push({x:-4.6,z:-1.4,w:.8,d:3.6});
  box(1.45,2.2,1.05,mat('#3b5c55'),2,1.1,0);box(1.16,.84,.06,mat('#142d2b',{emissive:'#244c3e',emissiveIntensity:.6}),2,1.66,.56);box(1.5,.15,.65,beam,2,1.03,.58);label('ALPEN · RETRO',2,2.55,.1,2.7);colliders.push({x:2,z:0,w:1.6,d:1.3});label('Gratis spielen · Bestwert jagen',0,3,-4.3,4.6);
 }
 let secretDoor=null,dialMeshes=[];const doorCollider={x:0,z:-4.4,w:2.4,d:.5};
 if(id==='cellar'){
  colliders.push(doorCollider);
  box(13,3.6,.4,stone,0,1.8,-5.4);box(.4,3.6,11,stone,-6.4,1.8,0);box(.4,3.6,11,stone,6.4,1.8,0);
  for(const x of[-4.7,4.7])for(let i=0;i<3;i++){const barrel=add(new T.CylinderGeometry(.42,.42,1.1,20),wood);barrel.position.set(x,.55,-3+i*1.25);for(const y of[.2,.85]){const band=add(new T.TorusGeometry(.425,.025,6,24),metal);band.rotation.x=Math.PI/2;band.position.set(x,y,-3+i*1.25);}colliders.push({type:'circle',x,z:-3+i*1.25,r:.44});}
  box(2.2,1.8,.45,beam,-3.1,.9,-3.9);for(const y of[.2,.9,1.7])box(2.25,.1,.6,wood,-3.1,y,-3.8);label('Wasser · Blüte · Berg',-3.1,1.35,-3.42,2);
  interactive.push({id:'cellar-note',name:'Das alte Regal untersuchen',x:-3,z:-2.5,range:1.8,note:true});
  secretDoor=new T.Group();scene.add(secretDoor);box(2.3,2.65,.4,stone,0,1.32,-4.4,secretDoor);for(const x of[-1.4,1.4])box(.4,2.9,.65,beam,x,1.45,-4.4);box(3.2,.3,.65,beam,0,2.95,-4.4);
  for(let i=0;i<3;i++){const group=new T.Group();group.position.set(-1+i,1.1,-3.8);scene.add(group);const wheel=add(new T.CylinderGeometry(.32,.32,.15,24),mat('#bbb8a8'),group);wheel.rotation.x=Math.PI/2;for(let j=0;j<3;j++){const sign=label(['△','≈','✿'][j],Math.sin(j*2.094)*.19,Math.cos(j*2.094)*.19,.09,.25,group);}dialMeshes.push(group);interactive.push({id:'dial'+i,name:'Steinrad '+(i+1)+' untersuchen',x:-1+i,z:-2.5,range:1.2,dial:i});}
  lamp(-5,3);lamp(5,3);
 }
 if(id==='passage'||id==='kristall'){
  // Open cutaway ceiling keeps the entire walkable passage visible to the camera.
  const wallGeo=new T.IcosahedronGeometry(1,2);owned.add(wallGeo);
  for(let z=-27;z<=27;z+=2.4)for(const side of[-1,1]){const x=side*(id==='passage'?6:20)+Math.sin(z*.3)*.8;const o=add(wallGeo,nature.rockMaterial);o.position.set(x,2.2,z);o.scale.set(id==='passage'?2.5:3.2,4.2,2.1);if(id==='passage')colliders.push({x,z,w:4,d:3.8});}
  for(const z of[-19,-7,7,20])lamp(id==='passage'?3.6:13,z);
 }
 if(id==='see'){
  const water=add(new T.CircleGeometry(1,64),mat('#72a9ac',{roughness:.18,metalness:.35,transparent:true,opacity:.9}));water.rotation.x=-Math.PI/2;water.scale.set(11,10,1);water.position.set(12,-.3,-4);colliders.push({type:'ellipse',x:12,z:-4,rx:11,rz:10,passages:[{x:3.7,z:2,w:10,d:2.2}]});
  box(9.5,.18,2.1,wood,3.7,.31,2);for(let x=-.5;x<8;x+=.45)box(.025,.02,2.1,beam,x,.41,2);for(const x of[0,4,8])for(const z of[1.15,2.85])box(.14,1.5,.14,beam,x,-.25,z);
 }
 if(id==='schlucht'){
  const water=add(new T.PlaneGeometry(70,5.5),mat('#77afb0',{roughness:.2,metalness:.2}));water.rotation.x=-Math.PI/2;water.position.y=-1.5;colliders.push({x:-18.65,z:0,w:32.7,d:5.5},{x:18.65,z:0,w:32.7,d:5.5});
  box(4.6,.25,8.4,wood,0,.37,0);for(let z=-4;z<=4;z+=.4)box(4.6,.025,.025,beam,0,.51,z);for(const side of[-1,1]){for(const z of[-4,-2,0,2,4])box(.13,1.1,.13,beam,side*2.25,1,z);rod([side*2.25,1.45,-4],[side*2.25,1.45,4],.07,beam);}
  const sheet=document.createElement('canvas');sheet.width=256;sheet.height=512;const ct=sheet.getContext('2d');ct.fillStyle='#98c6c7';ct.fillRect(0,0,256,512);for(let i=0;i<180;i++){ct.strokeStyle=i%3?'#e3eee1':'#65999d';ct.globalAlpha=.15+rnd()*.4;ct.lineWidth=.5+rnd()*3;const x=rnd()*256,y=rnd()*512;ct.beginPath();ct.moveTo(x,y);ct.lineTo(x+Math.sin(i)*4,y+25+rnd()*90);ct.stroke();}const streaks=new T.CanvasTexture(sheet);streaks.colorSpace=T.SRGBColorSpace;streaks.wrapT=T.RepeatWrapping;owned.add(streaks);const fall=add(new T.PlaneGeometry(5,9),mat('#c0ded6',{map:streaks,transparent:true,opacity:.82,roughness:.2,side:T.DoubleSide}));fall.position.set(-29,2.5,0);fall.rotation.y=Math.PI/2;animated.push(t=>{streaks.offset.y=t*.5;});for(let x=-31;x<=31;x+=5)for(const z of[-6,6]){if(nearPath(x,z,3)||protectedPoint(x,z,3))continue;const rock=add(new T.IcosahedronGeometry(1,2),nature.rockMaterial);rock.position.set(x,height(x,z)+2,z);rock.scale.set(3,3+rnd()*2,2);colliders.push({type:'ellipse',x,z,rx:3,rz:2});}
 }
 if(id==='hochalp'){
  path([[7,12],[12,2],[12,-8]],1.8);const snow=new T.PlaneGeometry(6,7,10,12);snow.rotateX(-Math.PI/2);const sp=snow.attributes.position;for(let i=0;i<sp.count;i++){const x=sp.getX(i)+12,z=sp.getZ(i)-9;sp.setXYZ(i,x,walk(x,z)+.06,z);}snow.computeVertexNormals();add(snow,mat('#e6ecea'));label('Sonnenalp · Ski-Slalom',12,walk(12,-8)+2.5,-9.2,4);for(const x of[10.8,13.2]){const ski=box(.2,2.2,.09,mat('#a36c50'),x,walk(x,-9)+1.1,-9);ski.rotation.z=.1;}
  const y=height(-14,-7);box(5,.2,3.8,wood,-14,y+.1,-7);for(const x of[-16,-12])box(.16,2,.16,beam,x,y+1,-8);const roof=box(6,.16,4.6,beam,-14,y+2.2,-7);roof.rotation.x=.1;box(5,1.8,.15,wood,-14,y+.9,-8.7);colliders.push({x:-14,z:-8.7,w:5,d:.3});
 }
 if(id==='gipfel'){buildMountainHut(scene,height,alpine.materials,label,colliders,navigationTargets,animated);interactive.push({id:'guide-daniel',name:'Mit Bergführer Daniel sprechen',x:-12.3,z:-6.4,range:2.2,mountainGuide:true});
  const y=walk(0,-15);box(.22,3.8,.22,beam,0,y+1.9,-16.1);box(1.6,.13,.8,wood,0,y+.95,-15.8);box(.55,.06,.4,cream,0,y+1.05,-15.65);label('Portmann-Gipfel',0,y+3.3,-15.95,3.8);
  const flag=add(new T.PlaneGeometry(1.3,.9,5,3),mat('#b85e4e',{side:T.DoubleSide}));flag.position.set(.7,y+3.4,-16.1);box(.6,.13,.025,cream,.7,y+3.4,-16.07);box(.13,.55,.025,cream,.7,y+3.4,-16.06);animated.push(t=>flag.rotation.y=Math.sin(t*1.7)*.12);
 }
 for(const t of TREASURES.filter(t=>t.region===id)){const g=new T.Group();g.position.set(t.x,walk(t.x,t.z),t.z);g.userData.treasure=t.id;scene.add(g);box(1.3,.65,.8,wood,0,.33,0,g);g.userData.lid=box(1.4,.15,.9,beam,0,.74,0,g);for(const x of[-.4,.4])box(.08,.8,.91,metal,x,.4,0,g);box(.15,.23,.04,metal,0,.5,.47,g);}
 if(landmark&&!['see','schlucht','hochalp','gipfel'].includes(id)){
  const {x,z}=landmark,y=walk(x,z);const rock=add(new T.IcosahedronGeometry(1,2),nature.rockMaterial);rock.scale.set(.8,.8,.6);rock.position.set(x+.9,y+.4,z-.7);label(landmark.title,x,y+1.7,z-.35,2.6);
 }
 if(id==='kristall')for(let i=0;i<55;i++){const x=(rnd()-.5)*32,z=(rnd()-.5)*47;if(nearPath(x,z,.5)||protectedPoint(x,z,1.8))continue;const crystal=add(new T.CylinderGeometry(.01,.16,.7+rnd()*.7,6),mat(i%3?'#b6d3cf':'#c3b9d0',{roughness:.22,metalness:.15}));crystal.position.set(x,.4,z);crystal.rotation.z=(rnd()-.5)*.5;}
 for(const node of RESOURCE_NODES.filter(n=>n.region===id)){const p=[[node.x,node.z],[-3,20],[5,18],[-5,18]].find(([x,z])=>!blocked(x,z,colliders,.5));if(!p)continue;const [x,z]=p,g=new T.Group();g.position.set(x,height(x,z),z);g.userData.kind='gatherable-mountain-deadwood';scene.add(g);for(let i=0;i<4;i++)rod([-.5+i*.15,.05,-.25],[.45-i*.09,.12,.3+i*.06],.045,wood,g);const n={...node,x,z,g,range:1.65,resource:true};resources.push(n);interactive.push(n);}
 if(!indoor){
  nature.swissMountains();if(id==='wald'){nature.tree(-11,-4,1.8);colliders.push({type:'circle',x:-11,z:-4,r:.65});}const nTrees=id==='wald'?115:id==='blumen'?18:id==='see'?60:id==='village'?30:id==='hochalp'?15:0;
  for(let i=0;i<nTrees*5&&scene.userData.treeCount!==nTrees;i++){const x=(rnd()-.5)*65,z=(rnd()-.5)*50;if((id==='village'&&(x/28)**2+((z-3)/19)**2<1)||nearPath(x,z,1.1)||protectedPoint(x,z)||blocked(x,z,colliders,1))continue;nature.tree(x,z,.75+rnd()*.65);colliders.push({type:'circle',x,z,r:.35});scene.userData.treeCount=(scene.userData.treeCount||0)+1;if(scene.userData.treeCount>=nTrees)break;}
  if(id==='village')for(const[x,z]of[[-11,15],[7,17],[-23,19]]){nature.tree(x,z,.8,true);colliders.push({type:'circle',x,z,r:.3});}nature.finishTrees();
  const rockGeo=new T.IcosahedronGeometry(1,2);owned.add(rockGeo);for(let i=0;i<(id==='pasture'?0:id==='grat'||id==='gipfel'?55:24);i++){const x=(rnd()-.5)*65,z=(rnd()-.5)*50;if(nearPath(x,z,1.8)||protectedPoint(x,z,3)||blocked(x,z,colliders,1))continue;const r=.6+rnd()*.8,o=add(rockGeo,nature.rockMaterial);o.position.set(x,height(x,z)+r*.3,z);o.scale.set(r*1.3,r*.8,r);o.rotation.y=rnd()*6;colliders.push({type:'ellipse',x,z,rx:r*1.3,rz:r});}
  nature.meadow((x,z)=>!(id==='village'&&(x/28)**2+((z-3)/19)**2<1)&&!(id==='pasture'&&Math.abs(x)<25&&z>9&&z<21)&&!nearPath(x,z,.4)&&!protectedPoint(x,z,1.4)&&!blocked(x,z,colliders,.8)&&!(id==='see'&&x>-2&&x<9&&Math.abs(z-2)<1.5));
 }
 for(const point of Object.values(TARGET_STARTS).filter(p=>p.region===id)){label(point.name,point.x,walk(point.x,point.z)+2.1,point.z-1,3.7);box(.13,1.6,.13,beam,point.x+1.7,walk(point.x,point.z)+.8,point.z-1);}
 for(const g of gates){if(g.secret||id==='village'&&['village-house','village-fodder','village-restaurant'].includes(g.id))continue;const y=walk(g.x,g.z);box(.11,1.7,.11,beam,g.x+1.5,y+.85,g.z);const sign=label(REGIONS[g.to].name,g.x+1.5,y+1.9,g.z,3.3);sign.userData.navigationId=g.id;navigationTargets.push(sign);}
 if(id==='village'){const links=paths.splice(0);for(const road of [...scene.children].filter(o=>o.userData.path)){scene.remove(road);road.traverse(o=>{o.geometry?.dispose();if(o.material){o.material.alphaMap?.dispose();o.material.dispose();}});}for(const link of links){const routed=[link.points[0]];let ok=true;for(let i=1;i<link.points.length;i++){const a=routed.at(-1),b=link.points[i];const steps=routeNear({x:a[0],z:a[1]},{x:b[0],z:b[1]},colliders);if(!steps.length){ok=false;break;}routed.push(...steps.map(p=>[p.x,p.z]));}if(ok){const smooth=[routed[0]];let i=0;while(i<routed.length-1){let last=i+1;for(let j=i+2;j<routed.length;j++){const a=routed[i],b=routed[j],count=Math.ceil(Math.hypot(b[0]-a[0],b[1]-a[1])/.2);let free=true;for(let k=1;k<=count;k++)if(blocked(a[0]+(b[0]-a[0])*k/count,a[1]+(b[1]-a[1])*k/count,colliders,.45)){free=false;break;}if(!free)break;last=j;}smooth.push(routed[last]);i=last;}path(smooth,link.width);}else(scene.userData.pathFailures??=[]).push(link.points);}}
 if(id==='village'){const matrix=new T.Matrix4();for(const o of scene.children.filter(o=>['village-botanical-shrubs','village-garden-flowers'].includes(o.userData.kind)))for(let i=0;i<o.count;i++){o.getMatrixAt(i,matrix);const e=matrix.elements,x=e[12],z=e[14];if(paths.some(p=>p.points.some((b,j)=>j&&segmentDistance(x,z,p.points[j-1],b)<p.width/2+.25))){matrix.scale(new T.Vector3(0,0,0));o.setMatrixAt(i,matrix);}}}
 if(!indoor){createTrailMargins(scene,paths,walk);if(!['village','city'].includes(id))createBoundaryFence(scene,bounds,height);}
 villageKit?.populateVisitors?.();

 const allNodes=interactive.map(n=>({x:n.x,z:n.z}));scene.userData.region={id,paths,bounds,landmarks:allNodes};
 return{scene,sun,colliders,interactive,groundMeshes,navigationTargets,animated,resources,herbs,paths,villageKit,climbKit,pastureKit,secretDoor,dialMeshes,
  sync(state){pastureKit?.sync(state);if(secretDoor){secretDoor.position.x=state.adventure.secretOpen?3.1:0;doorCollider.x=state.adventure.secretOpen?3.1:0;}scene.traverse(o=>{if(o.userData.treasure&&o.userData.lid)o.userData.lid.rotation.x=state.adventure.treasures.includes(o.userData.treasure)?-.9:0;});dialMeshes.forEach((g,i)=>g.rotation.z=-state.adventure.dials[i]*Math.PI*2/3);},
  dispose(){const geometries=new Set(),materials=new Set(),textures=new Set();scene.traverse(o=>{if(o.geometry)geometries.add(o.geometry);for(const m of Array.isArray(o.material)?o.material:o.material?[o.material]:[]){materials.add(m);for(const v of Object.values(m))if(v?.isTexture)textures.add(v);}});geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());textures.forEach(t=>t.dispose());sun.shadow.dispose();scene.clear();}
 };
}

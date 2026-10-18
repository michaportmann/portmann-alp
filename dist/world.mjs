import {createSeasonalAlpWorld} from './seasonal-world.mjs';
import {createBoundaryFence} from './world-boundary.mjs';
import {createTimberWorld} from './timber-world.mjs';
import {createTrailMargins} from './trail-margins.mjs';
import {createAlpineShrubs} from './alpine-shrubs.mjs';
import {createEstateDevelopment} from './estate-development-world.mjs';
import {inEstatePlot,ESTATE_LANES} from './estate-plots.mjs';
import {createValleyVista,createSmallFauna} from './alp-valley-fauna.mjs';
import {createForestFoxes} from './forest-fauna.mjs';
import {FOREST_TRAIL,FOREST_CLEARING,forestDistance,createForestUnderstory} from './alpine-forest.mjs';
import {createCozyProps} from './cozy-props.mjs';
import {HAY_FIELD,POND_CAMP} from './alp-life.mjs';
import {createAlpLifeWorld} from './alp-life-world.mjs';
import {createHofPond} from './hof-pond.mjs';
import {streamZ} from './landscape-height.mjs';
import {BACKLAND as B} from './alp-landscape-plan.mjs';
import {createAlpineSky} from './alpine-sky.mjs';
import {alpineForestHabitat,canGrowAlpineTree} from './alpine-ecology.mjs';
import {ALP_PALETTE as P} from './alpine-palette.mjs';
import {HOME_TERRAIN} from './terrain-surface.mjs';
import {HOF,HOF_LANES} from './hof-layout.mjs';
import {pondSurfaceHeight,isHomeWater} from './landscape-height.mjs';
import {createTerrainPath} from './terrain-path.mjs';
import {createAutumnOrchard,ORCHARD_SITES} from './autumn-orchard.mjs';
import {createFarmEnclosures} from './farm-enclosures.mjs';
import {createHomeWorld,homeClearance} from './home-world.mjs';
import * as T from './vendor/three.module.js';
import {height,fences,blocked,route,routeNear} from './logic.mjs';
import {createNatureKit,alpineLandscapeColor} from './nature.mjs';
import {createAlpineKit} from './alpine.mjs';
import {RESOURCE_NODES} from './progression.mjs';
import {GATEWAYS} from './regions.mjs';
import {createClimbingSites,climbClearance} from './climb-world.mjs';
import {createFarmWorld,farmClearance} from './farm-world.mjs';
export function createWorld(){
const scene=new T.Scene();scene.background=new T.Color(P.sky);scene.fog=new T.Fog(P.haze,100,450);
createAlpineSky(scene);
scene.add(new T.HemisphereLight(P.ambient,P.groundBounce,1.25));const sun=new T.DirectionalLight(P.sun,2.7);sun.position.set(-38,23,30);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);Object.assign(sun.shadow.camera,{left:-48,right:48,top:48,bottom:-48,near:1,far:120});sun.shadow.normalBias=.035;sun.shadow.bias=-.0002;scene.add(sun);scene.add(sun.target);
const colliders=[],interactive=[],animated=[],groundMeshes=[],navigationTargets=[],herbs=[],treeGroups=[];let seed=3844;const rnd=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
colliders.bounds=[-54,54,-50,50];
const mat=(color,extra={})=>new T.MeshStandardMaterial({color,roughness:.92,...extra});const M={grass:mat('#86a05d'),darkgrass:mat('#708d4f'),wood:mat('#82603e'),beam:mat('#634930'),pale:mat('#e2d4ad'),roof:mat('#535e58'),stone:mat('#9ba396'),cream:mat('#f5e9c8'),black:mat('#343b34'),white:mat('#f9f5de'),glass:mat('#344e48',{roughness:.2,metalness:.1}),gold:mat('#d1a45c'),stem:mat('#56814d'),water:mat('#6faaa4',{roughness:.26,metalness:.28,transparent:true,opacity:.87})};
M.glass.userData.nightWindow=true;
const nature=createNatureKit(scene,animated,rnd,{meadowWidth:106,meadowDepth:98,flowerCount:7800,grassCount:17000,treeHabitat:(x,z)=>canGrowAlpineTree(x,z,height),speciesAt(x,z,i){if(z< -12&&x>8)return i%4?3:4;const patch=Math.sin(x*.23+z*.19)+Math.cos(z*.31-x*.09);return patch>.8?2:patch<-.7?1:0;},habitatDensity(x,z){return x< -8&&x> -25&&z> -4&&z<7?.2:z>0?.95:.65;}});
function mesh(g,m,parent=scene){const a=new T.Mesh(g,m);a.castShadow=true;a.receiveShadow=true;parent.add(a);return a;}
function box(w,h,d,m,x,y,z,p=scene){const a=mesh(new T.BoxGeometry(w,h,d),m,p);a.position.set(x,y,z);return a;}
function sphere(r,m,x,y,z,p=scene,sx=1,sy=1,sz=1){const a=mesh(new T.SphereGeometry(r,24,16),m,p);a.position.set(x,y,z);a.scale.set(sx,sy,sz);return a;}
function cyl(r1,r2,h,m,x,y,z,p=scene){const a=mesh(new T.CylinderGeometry(r1,r2,h,10),m,p);a.position.set(x,y,z);return a;}
function plank(a,b,r,m,p=scene){const v1=new T.Vector3(...a),v2=new T.Vector3(...b),v=v2.clone().sub(v1);const a1=mesh(new T.CylinderGeometry(r,r,v.length(),7),m,p);a1.position.copy(v1.add(v2).multiplyScalar(.5));a1.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),v.normalize());return a1;}
function texture(kind){const c=document.createElement('canvas');c.width=c.height=256;const ctx=c.getContext('2d');ctx.fillStyle=kind==='wood'?'#9b7950':'#696b5a';ctx.fillRect(0,0,256,256);for(let j=0;j<120;j++){ctx.strokeStyle=kind==='wood'?`rgba(55,34,16,${rnd()*.16})`:`rgba(20,28,20,${rnd()*.2})`;ctx.lineWidth=.3+rnd()*2;ctx.beginPath();let y=rnd()*256;ctx.moveTo(0,y);ctx.bezierCurveTo(70,y-4,180,y+5,256,y);ctx.stroke();}if(kind==='roof'){ctx.strokeStyle='#343e32';ctx.lineWidth=2;for(let y=0;y<256;y+=32){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(256,y);ctx.stroke();for(let x=(y%64?16:0);x<256;x+=32)ctx.strokeRect(x,y,32,32);}}const t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;t.wrapS=t.wrapT=T.RepeatWrapping;t.repeat.set(kind==='wood'?2:3,kind==='wood'?3:3);return t;}
M.wall=mat('#f2d7a2',{map:texture('wood')});M.shingle=mat('#a7a692',{map:texture('roof')});
function label(text,x,y,z,size=2.8,p=scene){const c=document.createElement('canvas');c.width=512;c.height=128;const ct=c.getContext('2d');ct.fillStyle='#6c5038';ct.fillRect(0,0,512,128);ct.fillStyle='#8c6c46';ct.fillRect(7,7,498,114);ct.strokeStyle='#cbb88b';ct.lineWidth=2;ct.strokeRect(15,15,482,98);ct.font='600 40px Georgia';ct.textAlign='center';ct.textBaseline='middle';ct.fillStyle='#fff1cc';ct.fillText(text,256,65,455);const tex=new T.CanvasTexture(c);tex.colorSpace=T.SRGBColorSpace;const a=mesh(new T.PlaneGeometry(size,size/4),new T.MeshBasicMaterial({map:tex,side:T.DoubleSide}),p);a.position.set(x,y,z);return a;}
// A continuous, gently undulating meadow, climbing into a genuine hillside.
const terrain=new T.PlaneGeometry(HOME_TERRAIN.width,HOME_TERRAIN.depth,HOME_TERRAIN.nx,HOME_TERRAIN.nz);terrain.rotateX(-Math.PI/2);const pos=terrain.attributes.position;const colors=[];for(let i=0;i<pos.count;i++){const x=pos.getX(i),z=pos.getZ(i);pos.setY(i,height(x,z));const patch=.5+.3*Math.sin(x*.12+Math.sin(z*.09))+.2*Math.cos(z*.17-x*.06);const col=new T.Color('#c9ddb2').lerp(new T.Color('#f0f1da'),patch).multiplyScalar(.98+rnd()*.04);const edge=Math.min(56-Math.abs(x),52-Math.abs(z)),blend=Math.max(0,Math.min(1,1-edge/13));col.lerp(alpineLandscapeColor(x,z,pos.getY(i),height),blend*blend*(3-2*blend));colors.push(col.r,col.g,col.b);}terrain.setAttribute('color',new T.Float32BufferAttribute(colors,3));terrain.computeVertexNormals();const ground=mesh(terrain,nature.groundMaterial);ground.receiveShadow=true;groundMeshes.push(ground);
// Raised trail strips follow the same terrain function.
const paths=[];function path(points,width,color='#a99978'){paths.push({points,width});const road=createTerrainPath(points,width,height,color,{isWater:isHomeWater,isRoadForbidden:(x,z)=>isHomeWater(x,z)||Math.abs(x-B.stream.bridgeX)<2.4&&Math.abs(z-streamZ(B.stream.bridgeX))<2.3});while(road.children.length)scene.add(road.children[0]);}
const mainpath=[...B.downhill.slice().reverse(),[-5,1],[-16,-3.25],...B.uphill.slice(1)];const trainingTrail=B.uphill;
// Authored 3D alpine horizon after the original composition, with branching conifers.
nature.swissMountains();createValleyVista(scene);
const authoredClearances=[...GATEWAYS.filter(g=>g.from==='alp').map(g=>[g.x,g.z]),...[...RESOURCE_NODES,HOF.kiosk.entry,HOF.kiosk].map(n=>[n.x,n.z]),[-8,4],[-1,-5],[12,-11],[14,-19],[23,-17],[-24,6],[9,7],[-16,-3.25],[17,-20.2]];
function tree(x,z,s=1){if(ORCHARD_SITES.some(([a,b])=>Math.hypot(x-a,z-b)<4.8))return null;if(inEstatePlot(x,z,2)||Math.abs(x-HAY_FIELD.x)<HAY_FIELD.w/2+1&&Math.abs(z-HAY_FIELD.z)<HAY_FIELD.d/2+1)return null;if(forestDistance(x,z,FOREST_TRAIL)<1.5||Math.hypot(x-FOREST_CLEARING.x,z-FOREST_CLEARING.z)<2||homeClearance(x,z)||climbClearance('alp',x,z,1.2)||farmClearance(x,z))return null;if(authoredClearances.some(p=>Math.hypot(x-p[0],z-p[1])<1.5)||mainpath.some((p,i)=>i&&distanceToSegment(x,z,mainpath[i-1],p)<1.8))return null;if(B.uphill.some((p,i)=>i&&distanceToSegment(x,z,B.uphill[i-1],p)<2.1))return null;const root=nature.tree(x,z,s);if(!root)return null;colliders.push({type:'circle',x,z,r:.32*s});return root;}
let layoutSeed=71539;const layoutRnd=()=>{layoutSeed=(Math.imul(layoutSeed,1664525)+1013904223)>>>0;return layoutSeed/4294967296;};
// Irregular multi-age forest above the chalet, with open paths and one small clearing.
const upperForest=[];for(const [cx,cz,rx,rz,count]of[[-17,-19,6,3.3,28],[-32,-20,8,6,50],[-11,-32,11,7,65],[18,-31,10,7,48],[-33,-38,9,7,42]])for(let i=0;i<count;i++){const a=i*2.399,r=Math.sqrt((i+.5)/count),x=cx+Math.cos(a)*rx*r,z=cz+Math.sin(a)*rz*r;if(upperForest.some(p=>Math.hypot(p.x-x,p.z-z)<1.65))continue;const g=tree(x,z,.68+layoutRnd()*.94);if(g)upperForest.push({x,z,scale:g.userData.scale});}
scene.userData.upperForestSites=upperForest;
for(const[x,z,s]of[[-26,-5,1.1],[-24,2,1],[23,-13,1.1],[-31,14,1.2]])tree(x,z,s);
// Grouped forest shoulders below the rock faces; the central valley opening stays clear.
const forestSites=[];for(let i=0;i<980;i++){const x=(layoutRnd()-.5)*310,z=-43-layoutRnd()*160;if(ORCHARD_SITES.some(([a,b])=>Math.hypot(x-a,z-b)<4.8)||!alpineForestHabitat(x,z,height)||forestSites.some(p=>Math.hypot(p.x-x,p.z-z)<2.6))continue;nature.tree(x,z,.72+layoutRnd()*.7,forestSites.length%4===0);forestSites.push({x,z});}
scene.userData.valleyForest=forestSites.length;scene.userData.valleyForestSites=forestSites;
// Characteristic Swiss timber chalet and furnished alpine Stube.
const alpine=createAlpineKit(scene,animated,colliders,label);
const cabin=alpine.buildChalet();cabin.userData.navigationId='hut';navigationTargets.push(cabin);colliders.push({x:-16,z:-8,w:9,d:7.2});interactive.push({id:'hut',name:'Alphütte betreten',x:-16,z:-3.25,range:2.4});
const room=alpine.buildRoom();alpine.landscape();const climbKit=createClimbingSites(scene,'alp',height,nature.rockMaterial,colliders,interactive);
// A sheltered farm pond with irregular banks and a clear, subtly moving surface.
const hofPond=createHofPond(scene,height,animated,nature.rockMaterial);interactive.push({id:'pond-fishing',x:28,z:-9,name:'Am See angeln',range:2.2,cozyActivity:'fishing'});colliders.push({type:'ellipse',...HOF.pond});
function fence(a,b){const n=Math.ceil(Math.hypot(b[0]-a[0],b[1]-a[1])/2.4);let last;for(let i=0;i<=n;i++){const x=a[0]+(b[0]-a[0])*i/n,z=a[1]+(b[1]-a[1])*i/n,y=height(x,z);box(.17,1.25,.17,M.wood,x,y+.625,z);if(last){for(let h of[.48,.95])plank([last.x,last.y+h,last.z],[x,y+h,z],.07,M.pale);colliders.push({x:(last.x+x)/2,z:(last.z+z)/2,w:Math.abs(last.x-x)+.12,d:Math.abs(last.z-z)+.12});}last={x,y,z};}}
// A fully articulated, stylised chestnut horse.
function makeHorse(){return nature.makeHorse(M);}
const horse=makeHorse();scene.add(horse.g);horse.g.position.set(6,height(6,3),3);horse.g.rotation.y=-.5;interactive.push({id:'horse',name:'Jonny begrüssen',x:6,z:3,range:2.7});
function makePerson(){return nature.makePerson(M);}
const player=makePerson();scene.add(player.g);player.g.position.set(-5,height(-5,6),6);
const orchard=createAutumnOrchard(scene,height,colliders,animated);createAutumnOrchard(scene,height,colliders,animated,{grove:true});
const farmKit=createFarmWorld(scene,height,colliders,interactive,animated,horse,M,player);const enclosureKit=createFarmEnclosures(scene,height,colliders);const homeKit=createHomeWorld(scene,height,colliders,interactive,animated,label,nature.rockMaterial,alpine.materials);navigationTargets.push(homeKit.barn);farmKit.well.userData.navigationId='farm-well';navigationTargets.push(farmKit.well);
// Local wildflowers and collectible herbs, distinct from the decorative meadow.
function distanceToSegment(x,z,a,b){const dx=b[0]-a[0],dz=b[1]-a[1],u=Math.max(0,Math.min(1,((x-a[0])*dx+(z-a[1])*dz)/(dx*dx+dz*dz)));return Math.hypot(x-a[0]-u*dx,z-a[1]-u*dz);}
const vegetationPaths=[trainingTrail,mainpath,[[-13,-3],[-11,-1],[-5,0],[1,1],[6,3],[12,4]]];
function allowedPlant(x,z){if(isHomeWater(x,z)||Math.abs(height(x+.3,z)-height(x-.3,z))>.6||Math.abs(height(x,z+.3)-height(x,z-.3))>.6)return false;if(inEstatePlot(x,z,.8))return false;if(Math.abs(x-HAY_FIELD.x)<HAY_FIELD.w/2+.25&&Math.abs(z-HAY_FIELD.z)<HAY_FIELD.d/2+.25||Math.hypot(x-POND_CAMP.x,z-POND_CAMP.z)<2)return false;if(homeClearance(x,z)||farmClearance(x,z))return false;if(RESOURCE_NODES.some(n=>Math.hypot(x-n.x,z-n.z)<.9)||Math.hypot(x-HOF.kiosk.x,z-HOF.kiosk.z)<2.5)return false;if(blocked(x,z,colliders,.75)||Math.hypot(x-HOF.pond.x,z-HOF.pond.z)<5.4||Math.abs(x-17)<3&&Math.abs(z+21)<2.7)return false;return !vegetationPaths.some((points,k)=>points.some((a,i)=>i&&distanceToSegment(x,z,points[i-1],a)<(k===1?1.5:1.15)));}

const herbPositions=[[-8,4],[-1,-5],[12,-11],[14,-19],[23,-17],[-24,6],[9,7]];herbPositions.forEach(([x,z],i)=>{const g=new T.Group();g.position.set(x,height(x,z),z);scene.add(g);for(let j=0;j<5;j++){const a=j*2.4;plank([0,0,0],[Math.cos(a)*.22,.55+Math.sin(j)*.08,Math.sin(a)*.22],.018,M.stem,g);for(let k=0;k<3;k++){const leaf=sphere(.11,mat('#496f43'),Math.cos(a)*.12,.18+k*.1,Math.sin(a)*.12,g,1.7,.32,1);leaf.rotation.z=a;}sphere(.085,mat('#b4a2ce'),Math.cos(a)*.22,.56+Math.sin(j)*.08,Math.sin(a)*.22,g);}const herb={id:'herb'+i,index:i,name:'Bergthymian sammeln',x,z,range:1.8,g};herbs.push(herb);interactive.push(herb);});
const resources=[];
for(const node of RESOURCE_NODES.filter(n=>!n.region||n.region==='alp')){
 if(node.tree)continue;
 const g=new T.Group();g.position.set(node.x,height(node.x,node.z),node.z);g.userData.kind='resource-'+node.item;scene.add(g);
 if(node.item==='wood'){for(let i=0;i<3;i++)plank([-.45+i*.18,.12,-.25],[.3+i*.12,.19,.35],.085,M.wood,g);}
 else if(node.item==='stone'||node.item==='ore'){for(let i=0;i<3;i++){const r=sphere(.25+i*.05,nature.rockMaterial,(i-1)*.25,.16,Math.sin(i)*.16,g,1.3,.8,1);r.rotation.y=i;}if(node.item==='ore')for(let i=0;i<4;i++)sphere(.07,mat('#937d60'),-.25+i*.17,.4,0,g,1.5,.5,1);}
 else if(node.item==='crystal'){for(let i=0;i<4;i++){const c=mesh(new T.CylinderGeometry(.01,.11,.55+i*.07,6),mat('#b6d3d2',{roughness:.2,metalness:.1}),g);c.position.set((i-1.5)*.12,.25,Math.sin(i)*.12);c.rotation.z=(i-1.5)*.12;}}
 else if(node.item==='mushroom'){for(let i=0;i<4;i++){const x=Math.sin(i*2)*.3,z=Math.cos(i*2)*.25;cyl(.03,.04,.2,M.cream,x,.12,z,g);sphere(.13,mat('#a96d48'),x,.25,z,g,1,.4,1);}}
 else {for(let i=0;i<6;i++){const x=Math.sin(i*2.4)*.3,z=Math.cos(i*2.4)*.3;plank([x,0,z],[x,.4+(i%2)*.15,z],.014,M.stem,g);const leaf=sphere(.12,M.stem,x,.25,z,g,1.8,.2,1);leaf.rotation.z=i;if(node.item!=='fiber')sphere(.065,mat(node.item==='berry'?'#843a55':'#e9d6a0'),x,.43+(i%2)*.15,z,g);}}
 const n={...node,g,range:1.65,resource:true};resources.push(n);interactive.push(n);
}

// Observation point on the hillside.
const lookout={x:17,z:-21};const ly=height(17,-21);const lookoutGround=createTerrainPath([[15,-21],[19,-21]],2.7,height,'#b1b0a0');while(lookoutGround.children.length)scene.add(lookoutGround.children[0]);fence([14.5,-22.8],[19.5,-22.8]);for(let x of[15.2,18.8])box(.15,.6,.15,M.beam,x,ly+.4,-21.6);box(4.1,.2,.65,M.wood,17,ly+.75,-21.6);interactive.push({id:'lookout',name:'Das Panorama geniessen',x:17,z:-20.2,range:2.2});
// Distinct insects visiting flowers, birds and articulated grazing sheep.

// Small signs stand on timber posts at trail exits instead of floating above the meadow.
for(const g of GATEWAYS.filter(g=>g.from==='alp')){interactive.push({...g});const x=g.x+1.5,y=height(x,g.z);cyl(.055,.075,1.5,M.wood,x,y+.75,g.z);const sign=label(g.to==='pasture'?'Jonnys Weide →':g.to==='panorama'?'Gipfel ↑':g.to==='valley'?'Tal · Dorf →':'Bergdorf →',x,y+1.25,g.z+.07,1.65);sign.userData.navigationId=g.id;navigationTargets.push(sign);}
const talX=-2.7,talZ=7.4,talY=height(talX,talZ);cyl(.065,.09,1.75,M.wood,talX,talY+.875,talZ);const talSign=label('Talweg · Dorf ↓',talX,talY+1.4,talZ+.05,2.5);talSign.userData.navigationId='alp-village';talSign.userData.kind='front-valley-waymarker';navigationTargets.push(talSign);
const cozyKit=createCozyProps(scene,height,colliders,interactive,animated,{...M,stone:nature.rockMaterial},label);cozyKit.tent.userData.navigationId='tent-roast';cozyKit.shed.userData.navigationId='hay-store';navigationTargets.push(cozyKit.tent,cozyKit.shed,cozyKit.sportGear);path([[28,-9],[30,-10],[32,-9.5]],.8);const fishingSign=label('Angelplatz',28,height(28,-9)+.7,-9,.9);fishingSign.userData.navigationId='pond-fishing';navigationTargets.push(fishingSign);fishingSign.userData.kind='fishing-shore-marker';
const lifeKit=createAlpLifeWorld(scene,height,colliders,interactive,animated,M);label('Heuwiese · Sichel',HAY_FIELD.entry.x,height(HAY_FIELD.entry.x,HAY_FIELD.entry.z)+1.4,HAY_FIELD.entry.z-1.5,1.8);
for(const o of scene.children){if(o.isMesh&&Math.abs(o.position.x+1.5)<2&&Math.abs(o.position.z-24)<.6&&o.position.y-height(o.position.x,o.position.z)>.2){o.userData.navigationId='valley-view';navigationTargets.push(o);}}
nature.finishTrees();path(FOREST_TRAIL,.95);interactive.push({id:'forest-clearing',...FOREST_CLEARING,name:'Die stille Waldlichtung entdecken',range:2,forestDiscovery:'forest-clearing'});createForestUnderstory(scene,height,upperForest,(x,z)=>!homeClearance(x,z)&&!isHomeWater(x,z)&&forestDistance(x,z,FOREST_TRAIL)>1.2&&forestDistance(x,z,B.uphill)>2.2&&!blocked(x,z,colliders,.2),nature.rockMaterial,M.wood);
room.traverse(o=>o.layers.set(1));for(const light of scene.children.filter(o=>o.isLight))light.layers.enableAll();
// Shared farm lane and courtyard: secondary destinations branch off the same route.
const estateKit=createEstateDevelopment({scene,height,colliders,interactive,navigationTargets,animated,materials:alpine.materials,label});
const roadLinks=[...HOF_LANES,...ESTATE_LANES];
function simplifyTrail(points){const result=[points[0]];let i=0;while(i<points.length-1){let next=i+1;for(let j=i+2;j<points.length;j++){const a=points[i],b=points[j],n=Math.ceil(Math.hypot(b[0]-a[0],b[1]-a[1])/.3);let clear=true;for(let k=1;k<=n;k++)if(blocked(a[0]+(b[0]-a[0])*k/n,a[1]+(b[1]-a[1])*k/n,colliders,.55)){clear=false;break;}if(!clear)break;next=j;}result.push(points[next]);i=next;}return result;}
for(const[a,b,width]of roadLinks){let steps=route({x:a[0],z:a[1]},{x:b[0],z:b[1]},colliders);if(!steps.length)steps=routeNear({x:a[0],z:a[1]},{x:b[0],z:b[1]},colliders);if(steps.length)path(simplifyTrail([a,...steps.map(p=>[p.x,p.z])]),width,'#92704d');}
nature.meadow((x,z)=>allowedPlant(x,z)&&!paths.some(p=>p.points.some((b,i)=>i&&distanceToSegment(x,z,p.points[i-1],b)<p.width/2+.3)));
const scenicPath=createTerrainPath([...B.woodland.slice(0,2),[-13.53,-49.4]],1.05,(x,z)=>height(x,z),'#92704d');scenicPath.userData.kind='woodland-ascent-trail';scene.add(scenicPath);scene.userData.uphillTrail=B.uphill;const descent=createTerrainPath(B.villageTrail.slice(0,3),2.2,(x,z)=>height(x,z),'#92704d');descent.userData.kind='village-descent-trail';scene.add(descent);scene.userData.downhillTrail=B.downhill;
const seasonalKit=createSeasonalAlpWorld(scene,height);
const shrubKit=createAlpineShrubs(scene,height,animated,(x,z)=>allowedPlant(x,z)&&!paths.some(p=>p.points.some((b,i)=>i&&distanceToSegment(x,z,p.points[i-1],b)<p.width/2+.85)));
createBoundaryFence(scene,colliders.bounds,height);createTimberWorld(scene,height,interactive,resources,animated,colliders);
nature.livingMeadow(colliders);createSmallFauna(scene,height,animated,(x,z)=>!blocked(x,z,colliders,.3)&&!isHomeWater(x,z));createForestFoxes(scene,height,colliders,animated);
createTrailMargins(scene,paths,height);
scene.userData.style='autumn-orchard-near-massifs-v8';scene.userData.alpineDetails={chalet:cabin.userData.details,interior:room.userData.details};
return{seasonalKit,shrubKit,estateKit,cozyKit,lifeKit,scene,sun,orchard,hofPond,colliders,interactive,animated,groundMeshes,navigationTargets,player,horse,herbs,resources,room,climbKit,farmKit,homeKit,enclosureKit,paths,materials:M};
}

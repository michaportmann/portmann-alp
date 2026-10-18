import {BACKLAND as B} from '../dist/alp-landscape-plan.mjs';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import * as T from '../dist/vendor/three.module.js';
import {createWorld} from '../dist/world.mjs';
import {height} from '../dist/logic.mjs';
import {HOF} from '../dist/hof-layout.mjs';
import {HOME_TERRACES,homeTerrainBaseHeight,streamSurfaceHeight,streamZ} from '../dist/landscape-height.mjs';
import {createTerrainSurface,conformToTerrain} from '../dist/terrain-surface.mjs';
const require=createRequire(import.meta.url),{createCanvas}=require('/opt/codex/runtimes/codex-primary-runtime/dependencies/node/node_modules/@napi-rs/canvas');
globalThis.document={createElement:()=>createCanvas(256,256)};
const w=createWorld();w.scene.updateMatrixWorld(true);const ground=w.groundMeshes[0],ray=new T.Raycaster();
function drawnHeight(x,z){ray.set(new T.Vector3(x,100,z),new T.Vector3(0,-1,0));const hit=ray.intersectObject(ground)[0];assert.ok(hit,'drawn ground exists');return hit.point.y;}
let maxGroundError=0;
for(let i=0;i<170;i++){const x=-35+(i*13.173%70),z=-29+(i*7.271%57);maxGroundError=Math.max(maxGroundError,Math.abs(height(x,z)-drawnHeight(x,z)));}
assert.ok(maxGroundError<.00001,'walking height matches the rendered triangles, including banks and terrace blends');
let maxFoundationGap=0;
for(const id of['house','barn','coop']){const b=HOF[id],base=height(b.x,b.z);for(let i=0;i<=12;i++)for(const side of[-1,1])for(const axis of['x','z']){const x=b.x+(axis==='x'?side*b.w/2:(i/12-.5)*b.w),z=b.z+(axis==='z'?side*b.d/2:(i/12-.5)*b.d),gap=base-drawnHeight(x,z);maxFoundationGap=Math.max(maxFoundationGap,Math.abs(gap));assert.ok(Math.abs(gap)<.002,'continuous support under '+id+' perimeter');}}
// Road faces must remain above ground throughout their interior, not only at vertices.
let roadFaces=0,maxRoadError=0,raySamples=0;
for(const mesh of w.scene.children.filter(o=>o.userData.kind==='terrain-path')){const p=mesh.geometry.attributes.position,ix=mesh.geometry.index;for(let i=0;i<ix.count;i+=3){let x=0,y=0,z=0;for(let j=0;j<3;j++){const k=ix.getX(i+j);x+=p.getX(k)/3;y+=p.getY(k)/3;z+=p.getZ(k)/3;}maxRoadError=Math.max(maxRoadError,Math.abs(y-height(x,z)-.05));if(roadFaces%271===0){assert.ok(Math.abs(y-drawnHeight(x,z)-.05)<.00002,'road face follows actual ground');raySamples++;}roadFaces++;}}
assert.ok(maxRoadError<.00002,'no sunken or floating road triangles');
// Clipping a triangle to the ground must preserve its area and UV mapping.
const fixtureHeight=createTerrainSurface((x,z)=>.1*x*x+Math.sin(z),{width:4,depth:4,nx:4,nz:4}),input={p:[-1.8,0,-1.7,1.7,0,-1.4,-.8,0,1.8],uv:[0,0,1,0,0,1],ix:[0,1,2]},f=conformToTerrain(input,fixtureHeight);
function area(p,a,b,c){return Math.abs((p[b*3]-p[a*3])*(p[c*3+2]-p[a*3+2])-(p[b*3+2]-p[a*3+2])*(p[c*3]-p[a*3]))/2;}
let areaSum=0;for(let i=0;i<f.ix.length;i+=3)areaSum+=area(f.p,...f.ix.slice(i,i+3));assert.ok(Math.abs(areaSum-area(input.p,0,1,2))<1e-8,'road clipping neither loses nor duplicates road area');
for(let i=0;i<f.p.length/3;i++){const u=f.uv[i*2],v=f.uv[i*2+1];assert.ok(Math.abs(f.p[i*3]-(-1.8*(1-u-v)+1.7*u-.8*v))<1e-8);assert.ok(Math.abs(f.p[i*3+2]-(-1.7*(1-u-v)-1.4*u+1.8*v))<1e-8,'UVs retain their original barycentric mapping');}
let maxGrade=0;for(let z=-32;z<=28;z+=.5)for(let x=-32;x<=32;x+=.5){const h=homeTerrainBaseHeight,s=Math.hypot((h(x+.01,z)-h(x-.01,z))/.02,(h(x,z+.01)-h(x,z-.01))/.02);maxGrade=Math.max(maxGrade,s);if(x>=-25&&z>=-22)assert.ok(s<.85,'cultivated farm has no abrupt pad walls');else assert.ok(s<3,'mountain flanks and rear forest ascent remain continuous rather than a vertical boundary');}
for(let x=-16;x<28;x+=.25)assert.ok(streamSurfaceHeight(x+.25)>streamSurfaceHeight(x),'stream falls continuously westward');
const bridge=HOME_TERRACES.find(p=>p.id==='bridge');assert.ok(height(B.stream.bridgeX,streamZ(B.stream.bridgeX))+.14-streamSurfaceHeight(B.stream.bridgeX)>.25,'bridge underside stays above the water');
for(const id of['basic','corn']){const b=HOF.fields[id],field=w.scene.children.find(o=>o.userData.kind==='estate-'+id),soil=field.children.find(o=>o.userData.kind==='cultivated-ground');assert.ok(soil,'cultivated soil uses a terrain-conforming surface');const p=soil.geometry.attributes.position,ix=soil.geometry.index;let area=0;for(let i=0;i<ix.count;i+=3){const ids=[ix.getX(i),ix.getX(i+1),ix.getX(i+2)],x=ids.reduce((sum,k)=>sum+p.getX(k),0)/3,z=ids.reduce((sum,k)=>sum+p.getZ(k),0)/3,y=ids.reduce((sum,k)=>sum+p.getY(k),0)/3;assert.ok(Math.abs(y-height(x,z)-.025)<.00002,'soil lies on the visible slope throughout each face');const[a,c,d]=ids;area+=Math.abs((p.getX(c)-p.getX(a))*(p.getZ(d)-p.getZ(a))-(p.getZ(c)-p.getZ(a))*(p.getX(d)-p.getX(a)))/2;}assert.ok(Math.abs(area-b.w*b.d)<.0001,'whole cultivated area retained');}

console.log('PASS terrain grading: '+roadFaces+' conforming road faces ('+raySamples+' independent ground rays), walking/ground error '+maxGroundError.toFixed(8)+', foundation error '+maxFoundationGap.toFixed(6)+', maximum sampled grade '+maxGrade.toFixed(3)+', supported fields, continuous stream fall and dry bridge. No rendered/device acceptance.');

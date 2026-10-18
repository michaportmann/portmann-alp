import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createRequire} from 'node:module';
import * as T from '../dist/vendor/three.module.js';
import {createWorld} from '../dist/world.mjs';
import {height} from '../dist/logic.mjs';
import {SWISS_PEAKS,swissMountainHeight,peakProfile} from '../dist/swiss-peaks.mjs';
import {alpineForestHabitat} from '../dist/alpine-ecology.mjs';
import {alpineSurfaceWeights} from '../dist/alpine-materials.mjs';
const require=createRequire(import.meta.url),{createCanvas,loadImage}=require('@napi-rs/canvas');
globalThis.document={createElement:()=>createCanvas(256,256)};
for(const asset of['honey-timber-albedo.webp','limestone-albedo.jpg']){const path=new URL('../dist/assets/portmann/'+asset,import.meta.url),image=await loadImage(path.pathname);assert.equal(image.width,asset==='limestone-albedo.jpg'?640:1024);assert.equal(image.height,image.width);assert.ok(fs.statSync(path).size<1500000);}
const world=createWorld();world.scene.updateMatrixWorld(true);
const mountain=world.scene.children.find(o=>o.userData.kind==='authored-alpine-horizon'),surface=mountain.geometry.attributes.alpineSurface;
assert.ok(surface&&surface.count===mountain.geometry.attributes.position.count);
for(const v of surface.array)assert.ok(Number.isFinite(v)&&v>=0&&v<=1);
for(const p of SWISS_PEAKS){const [u,y]=p.profile.reduce((a,b)=>a[1]>b[1]?a:b),x=p.cx+u*p.width*.5;assert.ok(Math.abs(swissMountainHeight(x,p.cz)-y)<.0001,'named skyline preserved '+p.id);let detail=0;for(let i=-8;i<=8;i++){const xx=p.cx+i*p.width/24,z=p.cz+p.depth*.4,offset=z-p.cz,ridge=peakProfile(p,xx+Math.sin(offset*.021)*offset*.12),former=ridge*Math.pow(.6,.72);detail=Math.max(detail,Math.abs(swissMountainHeight(xx,z)-former));}assert.ok(detail>1,'actual side-face relief '+p.id);}
assert.ok(world.scene.userData.valleyForestSites.length>15);
for(const p of world.scene.userData.valleyForestSites)assert.ok(alpineForestHabitat(p.x,p.z,height),'all far trees are on eligible valley shoulders');

const shader={uniforms:{},vertexShader:T.ShaderLib.standard.vertexShader,fragmentShader:T.ShaderLib.standard.fragmentShader};mountain.material.onBeforeCompile(shader);assert.ok(shader.vertexShader.includes('attribute vec2 alpineSurface'));assert.ok(shader.fragmentShader.includes('alpPosition.zy*.115'));assert.ok(!shader.fragmentShader.includes('#include <map_fragment>'));assert.ok(shader.uniforms.alpLimestone.value);
const sky=world.scene.children.find(o=>o.userData.kind==='alpine-daylight-sky');assert.equal(sky.material.depthWrite,false);assert.equal(sky.material.side,T.BackSide);assert.equal(sky.material.fog,false);
assert.equal(world.scene.children.some(o=>o.userData.kind==='valley-panorama-lake'),false);
const flat=alpineSurfaceWeights(0,0,3,()=>3),cliff=alpineSurfaceWeights(0,0,40,x=>x*2);assert.ok(flat.rock<.01&&cliff.rock>.99);
console.log('PASS reference environment structure: local timber/new Swiss limestone assets; preserved named skyline with nonplanar faces; connected low-altitude forests ('+world.scene.userData.valleyForestSites.length+' trees); terrain rock/snow attributes and triplanar shader assembly; daylight sky; removed side lake. No GPU compilation, visual or device acceptance.');
// Exercise the production texture branch without network or a pretend GPU.
const originalLoad=T.TextureLoader.prototype.load;T.TextureLoader.prototype.load=function(url){const t=new T.Texture();t.image={width:2048,height:2048};t.userData.asset=url;return t;};globalThis.window={};
try{const textured=createWorld(),house=textured.scene.children.find(o=>o.userData.kind==='swiss-chalet'),boards=house.children.find(o=>o.userData.kind==='weathered-cladding');assert.ok(boards.material.map.userData.asset.endsWith('honey-timber-albedo.webp'));const shader={uniforms:{},vertexShader:T.ShaderLib.standard.vertexShader,fragmentShader:T.ShaderLib.standard.fragmentShader};boards.material.onBeforeCompile(shader);assert.ok(shader.vertexShader.includes('instanceMatrix*timberPoint'));assert.ok(shader.fragmentShader.includes('timberWorld.x+timberWorld.z'));const horizon=textured.scene.children.find(o=>o.userData.kind==='authored-alpine-horizon');horizon.material.onBeforeCompile(shader);assert.ok(shader.uniforms.alpLimestone.value.userData.asset.endsWith('limestone-albedo.jpg'));console.log('PASS production texture branch: actual chalet world-grain hook and mountain limestone sampler are wired; GPU compilation still unverified.');}finally{T.TextureLoader.prototype.load=originalLoad;delete globalThis.window;}

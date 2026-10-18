import {HOF} from '../dist/hof-layout.mjs';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {height,blocked,route,freshCourse,jumpCourse,stepCourse,loadSave,fences} from '../dist/logic.mjs';
import {createWorld} from '../dist/world.mjs';
const require=createRequire(import.meta.url),{createCanvas}=require('/opt/codex/runtimes/codex-primary-runtime/dependencies/node/node_modules/@napi-rs/canvas');
globalThis.document={createElement:()=>createCanvas(256,256)};
const world=createWorld();let meshes=0,vertices=0;world.scene.updateMatrixWorld(true);world.scene.traverse(o=>{if(o.isMesh){meshes++;const p=o.geometry.attributes.position;vertices+=p.count;for(let i=0;i<p.array.length;i++)assert.ok(Number.isFinite(p.array[i]),'finite geometry');}});
assert.ok(!blocked(-5,6,world.colliders),'spawn free');assert.ok(blocked(-16,-8,world.colliders),'house solid');assert.ok(blocked(HOF.pond.x,HOF.pond.z,world.colliders),'pond solid');
for(const n of world.interactive){assert.ok(!blocked(n.x,n.z,world.colliders),n.id+' interaction point free');const r=route({x:-5,z:6},n,world.colliders);assert.ok(r.length,n.id+' reachable');for(const p of r)assert.ok(!blocked(p.x,p.z,world.colliders),n.id+' path remains clear');}
const bypass=route({x:-16,z:0},{x:-16,z:-15},world.colliders);assert.ok(bypass.length>15,'route navigates around chalet');
let c=freshCourse();while(!c.done)stepCourse(c,1/60);assert.equal(c.faults,4);assert.equal(c.cleared,0);assert.equal(c.score,0);
c=freshCourse();let jumps=0;while(!c.done){const next=fences[c.passed];if(next!==undefined&&next-c.x<2.9&&next-c.x>0&&c.y===0){if(jumpCourse(c))jumps++;}stepCourse(c,1/60);}assert.equal(c.cleared,4);assert.equal(c.faults,0);assert.equal(c.score,400);assert.equal(jumps,4);
c=freshCourse();assert.equal(jumpCourse(c),true);assert.equal(jumpCourse(c),false,'no midair double jump');
assert.equal(loadSave('not json'),null);assert.equal(loadSave('{"version":999}'),null);assert.deepEqual(loadSave('{"version":1,"hut":true,"ride":false,"herbs":[0,0,5,-1,"x"],"best":999}'),{version:1,hut:true,ride:false,herbs:[0,5],best:400});
for(const f of world.animated){for(const t of[0,1,20,100])f(t);}world.scene.traverse(o=>{for(const v of[o.position.x,o.position.y,o.position.z,o.rotation.x,o.rotation.y,o.rotation.z])assert.ok(Number.isFinite(v));});
console.log(JSON.stringify({result:'PASS',checks:['geometry','spawn','solid house and water','all '+world.interactive.length+' interaction routes','chalet bypass','four failed jumps','four successful jumps','double-jump guard','save validation','animation transforms'],meshes,vertices,colliders:world.colliders.length,interactions:world.interactive.length},null,2));

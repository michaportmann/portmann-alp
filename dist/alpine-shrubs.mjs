import {FOREST_TRAIL,forestDistance} from './alpine-forest.mjs';
import * as T from './vendor/three.module.js';
import {generatedMap} from './generated-materials.mjs';
import {HAY_FIELD} from './alp-life.mjs';
import {inEstatePlot,ESTATE_LANES} from './estate-plots.mjs';
import {HOF_LANES} from './hof-layout.mjs';
import {BACKLAND as B} from './alp-landscape-plan.mjs';
const distance=(x,z,a,b)=>{const dx=b[0]-a[0],dz=b[1]-a[1],t=Math.max(0,Math.min(1,((x-a[0])*dx+(z-a[1])*dz)/(dx*dx+dz*dz)));return Math.hypot(x-a[0]-t*dx,z-a[1]-t*dz);};
export function createAlpineShrubs(scene,height,animated,allowed){
 const sites=[],lanes=[...HOF_LANES,...ESTATE_LANES],candidates=[];
 for(const [cx,cz,rx,rz,n]of[[-25,9,3,3,12],[-31,22,5,2,14],[-17,24,6,1.5,12],[17,7.4,4,1,12],[-24,-8,5,5,22],[-14,-17,5,3,16],[-36,-15,5,3,20],[18,-17,4,3,16],[33,-4,2,3,12],[-29,17,6,3,18],[35,-17,3,2,12],[-44,20,7,13,26],[44,-26,6,15,28],[-36,38,12,7,28],[8,42,20,5,30],[-6,-41,18,6,28],[45,42,5,4,12]])for(let i=0;i<n;i++){const a=i*2.399,r=Math.sqrt((i+.5)/n);candidates.push([cx+Math.cos(a)*rx*r,cz+Math.sin(a)*rz*r]);}
 for(const [x,z]of candidates){if(!allowed(x,z)||forestDistance(x,z,FOREST_TRAIL)<1.2||inEstatePlot(x,z,1.3)||Math.abs(x-HAY_FIELD.x)<HAY_FIELD.w/2+1&&Math.abs(z-HAY_FIELD.z)<HAY_FIELD.d/2+1||lanes.some(([a,b,w])=>distance(x,z,a,b)<w/2+.9)||B.uphill.some((b,i)=>i&&distance(x,z,B.uphill[i-1],b)<1.6)||sites.some(p=>Math.hypot(x-p.x,z-p.z)<.9))continue;sites.push({x,z,height:.45+(sites.length%7)*.075});}
 const groups=[];for(let species=0;species<4;species++){const subset=sites.filter((p,i)=>i%4===species);const map=generatedMap('alpine-bush-atlas',species),material=new T.MeshStandardMaterial({color:map?'#ffffff':'#a7824b',map,alphaTest:.42,alphaToCoverage:true,side:T.DoubleSide,roughness:1}),clock={value:0};material.onBeforeCompile=shader=>{shader.uniforms.shrubTime=clock;shader.vertexShader='uniform float shrubTime;\n'+shader.vertexShader;shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\n#ifdef USE_INSTANCING\ntransformed.x+=sin(shrubTime*.9+instanceMatrix[3][0])*.018*uv.y*uv.y;\n#endif');};
 const shrubs=new T.InstancedMesh(new T.PlaneGeometry(1.35,1),material,subset.length*3),pose=new T.Object3D();subset.forEach((p,i)=>{for(let j=0;j<3;j++){pose.position.set(p.x,height(p.x,p.z)+p.height/2-.025,p.z);pose.rotation.set(0,i*2.399+j*Math.PI/3,0);pose.scale.set(.7+(i%5)*.12,p.height,1);pose.updateMatrix();shrubs.setMatrixAt(i*3+j,pose.matrix);}});shrubs.receiveShadow=true;shrubs.castShadow=false;shrubs.userData.kind='generated-alpine-bilberry-shrubs';shrubs.userData.sites=subset;shrubs.userData.species=['Hasel','Wildrose','Heidelbeere','Alpenstrauch'][species];scene.add(shrubs);animated.push(t=>clock.value=t);groups.push(shrubs);}return{shrubs:groups[0],groups,sites};
}

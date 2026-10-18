import {generatedMap} from './generated-materials.mjs';
import * as T from './vendor/three.module.js';
import {botanicalPart as part,mergeBotanical,leafBlade} from './botanical-mesh.mjs';
function wheatPrototype(){
 const parts=[],grain=new T.SphereGeometry(1,6,4),leaf=leafBlade(.32,.025);
 for(let tiller=0;tiller<3;tiller++){
  const dx=[0,.075,-.065][tiller],dz=[0,.035,-.045][tiller],scale=[1,.86,.94][tiller];
  const curve=new T.CatmullRomCurve3([[dx,0,dz],[dx,.4*scale,dz+.012],[dx+.025,.78*scale,dz+.025],[dx+.075,1.16*scale,dz+.035]].map(p=>new T.Vector3(...p)));
  parts.push(part(new T.TubeGeometry(curve,10,.006,5,false),'#b89c51'));
  for(let j=0;j<3;j++)parts.push(part(leaf,j===0?'#8e9149':'#b2a45b',[dx,.26*scale+j*.19,dz],[1,scale,1],[0,j*2.4+tiller,.2]));
  for(let row=0;row<9;row++)for(const side of[-1,1]){const y=(.93+row*.025)*scale,x=dx+.055+side*.016*(1-row/14),z=dz+.03+(row%2)*.006,size=1-row*.045;parts.push(part(grain,row%3?'#d2b36d':'#e2c88b',[x,y,z],[.014*size,.028*scale,.011*size],[.12,0,side*.42]));const awn=new T.BufferGeometry();awn.setAttribute('position',new T.Float32BufferAttribute([x,y,z,x+side*.003,y+.002,z,x+side*.027,y+.105*scale,z+.013],3));awn.computeVertexNormals();parts.push(part(awn,'#d6bf80'));}
 }
 return mergeBotanical(parts);
}
export function createRipeWheat(height,{x,z,w,d,count=360,seed=71},animated){
 const geo=wheatPrototype(),clock={value:0},material=new T.MeshStandardMaterial({vertexColors:true,roughness:.91,side:T.DoubleSide});
 material.onBeforeCompile=shader=>{shader.uniforms.wheatTime=clock;shader.vertexShader='uniform float wheatTime;\n'+shader.vertexShader;shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\n#ifdef USE_INSTANCING\nfloat wheatPhase=wheatTime*1.35+instanceMatrix[3][0]*.3+instanceMatrix[3][2]*.23;\ntransformed.x+=sin(wheatPhase)*.035*position.y*position.y;\ntransformed.z+=cos(wheatPhase*.7)*.018*position.y*position.y;\n#endif');};material.customProgramCacheKey=()=> 'ripe-wheat-grains-awns-wind-v1';animated.push(t=>clock.value=t);
 const crop=new T.InstancedMesh(geo,material,count),pose=new T.Object3D();const rnd=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;},columns=Math.round(Math.sqrt(count*w/d)),rows=Math.ceil(count/columns);
 for(let i=0;i<count;i++){const xx=x-w*.46+((i%columns)+rnd()*.55)/(columns-.4)*w*.92,zz=z-d*.45+(Math.floor(i/columns)+rnd()*.55)/(rows-.4)*d*.9;pose.position.set(xx,height(xx,zz)+.025,zz);pose.rotation.set(0,rnd()*6.28,(rnd()-.5)*.08);const s=.82+rnd()*.28;pose.scale.set(s,s*(.9+rnd()*.23),s);pose.updateMatrix();crop.setMatrixAt(i,pose.matrix);crop.setColorAt(i,new T.Color().setScalar(.87+rnd()*.13));}
 const earMap=generatedMap('wheat-ear');if(earMap){const g=new T.PlaneGeometry(.4,1.17);g.translate(.035,.66,.035);const m=new T.MeshStandardMaterial({map:earMap,alphaTest:.72,side:T.DoubleSide,roughness:1});m.onBeforeCompile=material.onBeforeCompile;m.customProgramCacheKey=()=> 'wheat-photographic-ear-wind-v2';const ears=new T.InstancedMesh(g,m,count*2),matrix=new T.Matrix4(),turn=new T.Matrix4().makeRotationY(Math.PI/2);for(let i=0;i<count;i++){crop.getMatrixAt(i,matrix);ears.setMatrixAt(i*2,matrix);ears.setMatrixAt(i*2+1,matrix.clone().multiply(turn));}ears.userData.kind='photographic-wheat-ears';ears.castShadow=true;crop.add(ears);}
 crop.castShadow=true;crop.receiveShadow=true;crop.userData={kind:'ripe-wheat',tillers:3,grainsPerEar:18,awns:true,wind:true};return crop;
}

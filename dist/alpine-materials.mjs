import * as T from './vendor/three.module.js';
import {mountainSnowline} from './swiss-peaks.mjs';
const smooth=(a,b,x)=>{const t=Math.max(0,Math.min(1,(x-a)/(b-a)));return t*t*(3-2*t);};
export function alpineSurfaceWeights(x,z,y,height){
 const grade=Math.hypot(height(x+.4,z)-height(x-.4,z),height(x,z+.4)-height(x,z-.4))/.8;
 const rock=Math.max(smooth(.38,1.15,grade),smooth(21,65,y)*.72);
 const snowline=mountainSnowline(x,z)+4*Math.sin(x*.07+z*.045)+rock*10;
 const snow=smooth(snowline,snowline+20,y)*(1-rock*.18);
 return{rock,snow,grade};
}
// World-space, three-axis projection prevents cliff textures stretching vertically.
// No camera-facing landscape planes are introduced: all detail stays on the mesh.
export function mountainMaterial(meadowMap,limestoneMap){
 const m=new T.MeshStandardMaterial({vertexColors:true,roughness:.94,map:meadowMap});
 m.userData.kind='triplanar-alpine-material';
 m.onBeforeCompile=shader=>{
  shader.uniforms.alpLimestone={value:limestoneMap||meadowMap};
  shader.vertexShader=shader.vertexShader.replace('#include <common>','#include <common>\nattribute vec2 alpineSurface;\nvarying vec3 alpPosition;\nvarying vec3 alpNormal;\nvarying vec2 alpSurface;').replace('#include <begin_vertex>','#include <begin_vertex>\nalpPosition=(modelMatrix*vec4(position,1.0)).xyz;\nalpNormal=normalize(mat3(modelMatrix)*normal);\nalpSurface=alpineSurface;');
  shader.fragmentShader=shader.fragmentShader.replace('#include <common>','#include <common>\nuniform sampler2D alpLimestone;\nvarying vec3 alpPosition;\nvarying vec3 alpNormal;\nvarying vec2 alpSurface;').replace('#include <map_fragment>',`
   vec3 weights=pow(abs(normalize(alpNormal)),vec3(4.0));weights/=max(.0001,weights.x+weights.y+weights.z);
   vec3 mineral=texture2D(alpLimestone,alpPosition.zy*.115).rgb*weights.x
    +texture2D(alpLimestone,alpPosition.xz*.115).rgb*weights.y
    +texture2D(alpLimestone,alpPosition.xy*.115).rgb*weights.z;
   float edge=max(abs(alpPosition.x)-56.0,abs(alpPosition.z)-52.0);
   float seam=smoothstep(0.0,18.0,edge);
   vec3 grassDetail=texture2D(map,alpPosition.xz*.105).rgb;
   vec3 base=diffuseColor.rgb*mix(grassDetail,vec3(1.0),seam);
   diffuseColor.rgb=mix(base,mineral*1.15,alpSurface.x*(1.0-alpSurface.y)*seam);
   diffuseColor.rgb=mix(diffuseColor.rgb,vec3(.9,.94,.98),alpSurface.y*seam);
  `);
 };
 m.customProgramCacheKey=()=> 'alpine-triplanar-limestone-v1';return m;
}

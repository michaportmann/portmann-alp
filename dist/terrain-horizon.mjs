import * as T from './vendor/three.module.js';
import {HOME_TERRAIN} from './terrain-surface.mjs';
export {HOME_TERRAIN} from './terrain-surface.mjs';
// An outer ring, with exactly the same seam coordinates as the foreground PlaneGeometry.
// There are no horizon triangles underneath the walkable foreground.
export function createHorizonGeometry(height){
 const cfg=HOME_TERRAIN;
 function axis(min,max,steps,half,innerSteps){const values=[];for(let i=0;i<=steps;i++){const v=Math.fround(min+(max-min)*i/steps);if(v< -half||v>half)values.push(v);}for(let i=0;i<=innerSteps;i++)values.push(Math.fround(-half+2*half*i/innerSteps));return [...new Set(values)].sort((a,b)=>a-b);}
 const xs=axis(-260,260,256,cfg.width/2,cfg.nx),zs=axis(-285,155,256,cfg.depth/2,cfg.nz),positions=[],uv=[],indices=[],w=xs.length;
 for(const z of zs)for(const x of xs){positions.push(x,height(x,z),z);uv.push((x+56)/112,(52-z)/104);}
 for(let row=0;row<zs.length-1;row++)for(let col=0;col<xs.length-1;col++){
  if(xs[col]>=-56&&xs[col+1]<=56&&zs[row]>=-52&&zs[row+1]<=52)continue;
  const a=row*w+col,b=a+1,c=a+w,d=c+1;indices.push(a,c,b,b,c,d);
 }
 const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(positions,3));g.setAttribute('uv',new T.Float32BufferAttribute(uv,2));g.setIndex(indices);g.computeVertexNormals();g.userData={kind:'nonoverlapping-terrain-ring',seam:{...cfg}};return g;
}

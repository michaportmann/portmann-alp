import * as T from './vendor/three.module.js';
// Generated surface scans remain materials on lit 3D geometry, never scenery billboards.
const maps=new Map();
export function generatedMap(name,tile=null){
 if(typeof window==='undefined')return null;
 const key=name+':'+tile;if(maps.has(key))return maps.get(key);
 const texture=new T.TextureLoader().load('assets/portmann/'+name+'.webp');texture.colorSpace=T.SRGBColorSpace;texture.anisotropy=4;
 if(tile!==null){texture.repeat.set(.496,.496);texture.offset.set((tile%2)*.5+.002,(tile<2?.5:0)+.002);}
 else texture.wrapS=texture.wrapT=T.RepeatWrapping;
 texture.userData.generatedMaterial=name;maps.set(key,texture);return texture;
}
// Rectangular curved support preserves photographed lobes and alpha silhouettes.
export function cutoutLeaf(length=.34,width=.25){
 const p=[],uv=[],ix=[];for(let j=0;j<=4;j++)for(let i=0;i<=4;i++){const u=i/4,v=j/4;p.push((u-.5)*width,Math.sin(v*Math.PI)*.025,v*length);uv.push(u,v);if(i&&j){const a=j*5+i;ix.push(a-6,a-1,a-5,a-5,a-1,a);}}
 const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(p,3));g.setAttribute('uv',new T.Float32BufferAttribute(uv,2));g.setIndex(ix);g.computeVertexNormals();return g;
}

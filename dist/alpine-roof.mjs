import * as T from './vendor/three.module.js';

// A continuous timber roof with a gentle bellcast at the eaves. Thin, chipped
// shingles sit on the surface; no thick cuboids form the visible roof mass.
export function buildAlpineRoof(parent,materials,{halfWidth,halfDepth,ridge,eave,rows=18,columns=16,kind='chalet'}){
 const drop=ridge-eave;
 const surface=(u,z)=>ridge-drop*u-.10*Math.sin(Math.PI*u)+.018*Math.sin(z/halfDepth*Math.PI)*Math.sin(Math.PI*u);
 const slope=u=>(-drop-.10*Math.PI*Math.cos(Math.PI*u))/halfWidth;
 const tileMaterial=materials.roof.clone();tileMaterial.map=null;tileMaterial.color.set('#747e7c');tileMaterial.roughness=.96;
 const tile=new T.BufferGeometry(),run=Math.hypot(halfWidth,drop)/rows*1.11,span=2*halfDepth/columns*1.03;
 tile.setAttribute('position',new T.Float32BufferAttribute([-run/2,0,-span*.47,run/2,0,-span/2,run*.49,.004,span*.46,run*.34,.004,span/2,-run*.48,.002,span*.48],3));tile.setIndex([0,2,1,0,4,2,2,4,3]);tile.computeVertexNormals();
 const dummy=new T.Object3D();
 for(const side of[-1,1]){
  const positions=[],uv=[],indices=[],segments=24,depthSegments=12;
  for(let j=0;j<=depthSegments;j++)for(let i=0;i<=segments;i++){const u=i/segments,z=-halfDepth+j/depthSegments*2*halfDepth;positions.push(side*u*halfWidth,surface(u,z),z);uv.push(u,(z+halfDepth)/(2*halfDepth));}
  for(let j=0;j<depthSegments;j++)for(let i=0;i<segments;i++){const a=j*(segments+1)+i,b=a+1,c=a+segments+1,d=c+1;indices.push(...(side>0?[a,c,b,b,c,d]:[a,b,c,b,d,c]));}
  const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(positions,3));geo.setAttribute('uv',new T.Float32BufferAttribute(uv,2));geo.setIndex(indices);geo.computeVertexNormals();
  const skin=new T.Mesh(geo,materials.roof);skin.castShadow=skin.receiveShadow=true;skin.userData.kind='continuous-alpine-roof';skin.userData.building=kind;parent.add(skin);
  const underside=new T.Mesh(geo.clone(),materials.beam);underside.position.y=-.075;underside.material=materials.beam.clone();underside.material.side=T.BackSide;underside.receiveShadow=true;parent.add(underside);
  // Finite timber fascia follows the same curve and joins top and underside.
  for(const end of[-1,1]){const p=[],ix=[];for(let i=0;i<=segments;i++){const u=i/segments,x=side*u*halfWidth,z=end*halfDepth,y=surface(u,z);p.push(x,y,z,x,y-.075,z);}for(let i=0;i<segments;i++){const a=i*2;ix.push(a,a+1,a+2,a+1,a+3,a+2);}const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(p,3));g.setIndex(ix);g.computeVertexNormals();const m=materials.beam.clone();m.side=T.DoubleSide;const fascia=new T.Mesh(g,m);fascia.castShadow=true;parent.add(fascia);}
  const shingles=new T.InstancedMesh(tile,tileMaterial,rows*columns);
  for(let row=0;row<rows;row++)for(let col=0;col<columns;col++){const index=row*columns+col,u=(row+.5)/rows,jitter=Math.sin(index*13.731+side)*.014,z=-halfDepth+(col+.5)/columns*2*halfDepth+(row%2?.018:-.018);dummy.position.set(side*u*halfWidth,surface(u,z)+.018+jitter*.15,z);dummy.rotation.set(jitter*.15,0,side*Math.atan(slope(u))+jitter*.12);dummy.scale.set(1+jitter,1,1+jitter*.6);dummy.updateMatrix();shingles.setMatrixAt(index,dummy.matrix);const shade=.88+.10*(.5+.5*Math.sin(index*2.399+side));shingles.setColorAt(index,new T.Color().setScalar(shade));}
  shingles.castShadow=shingles.receiveShadow=true;shingles.userData.kind=kind==='chalet'?'laid-timber-shingles':'barn-laid-shingles';parent.add(shingles);
 }
 return{surface,slope,halfWidth,halfDepth,ridge,eave};
}

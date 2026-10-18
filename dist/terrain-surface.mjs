// Shared topology for the rendered foreground and its physical height sampler.
export const HOME_TERRAIN={width:112,depth:104,nx:144,nz:132};
export function createTerrainSurface(source,cfg=HOME_TERRAIN){
 const {width,depth,nx,nz}=cfg,dx=width/nx,dz=depth/nz;
 const xs=Float32Array.from({length:nx+1},(_,i)=>-width/2+i*dx),zs=Float32Array.from({length:nz+1},(_,i)=>-depth/2+i*dz),ys=new Float32Array((nx+1)*(nz+1));
 for(let j=0;j<=nz;j++)for(let i=0;i<=nx;i++)ys[j*(nx+1)+i]=source(xs[i],zs[j]);
 function height(x,z){
  if(x<xs[0]||x>xs[nx]||z<zs[0]||z>zs[nz])return source(x,z);
  let i=Math.min(nx-1,Math.max(0,Math.floor((x+width/2)/dx))),j=Math.min(nz-1,Math.max(0,Math.floor((z+depth/2)/dz)));
  if(i>0&&x<xs[i])i--;else if(i<nx-1&&x>xs[i+1])i++;
  if(j>0&&z<zs[j])j--;else if(j<nz-1&&z>zs[j+1])j++;
  const u=(x-xs[i])/(xs[i+1]-xs[i]),v=(z-zs[j])/(zs[j+1]-zs[j]),a=j*(nx+1)+i;
  return u+v<=1?ys[a]*(1-u-v)+ys[a+1]*u+ys[a+nx+1]*v:ys[a+nx+2]*(u+v-1)+ys[a+1]*(1-v)+ys[a+nx+1]*(1-u);
 }
 height.surfaceGrid={...cfg,xs,zs};return height;
}

// Clip a road triangle to each ground triangle it crosses. Interpolated UVs keep
// the road texture continuous; every output face then follows one ground face.
export function conformToTerrain(input,height,offset=.05){
 const grid=height.surfaceGrid;if(!grid)return input;
 const {width,depth,nx,nz,xs,zs}=grid,output={p:[],uv:[],ix:[]};
 function clip(poly,a,b){const value=p=>(b[0]-a[0])*(p[1]-a[1])-(b[1]-a[1])*(p[0]-a[0]);const out=[];for(let i=0;i<poly.length;i++){const p=poly[i],q=poly[(i+1)%poly.length],dp=value(p),dq=value(q),pin=dp>=-1e-10,qin=dq>=-1e-10;if(pin)out.push(p);if(pin!==qin){const t=dp/(dp-dq);out.push(p.map((v,j)=>v+(q[j]-v)*t));}}return out;}
 for(let n=0;n<input.ix.length;n+=3){const triangle=input.ix.slice(n,n+3).map(k=>[input.p[k*3],input.p[k*3+2],input.uv[k*2],input.uv[k*2+1]]);
  const imin=Math.max(0,Math.floor((Math.min(...triangle.map(p=>p[0]))+width/2)/width*nx)-1),imax=Math.min(nx-1,Math.floor((Math.max(...triangle.map(p=>p[0]))+width/2)/width*nx)+1),jmin=Math.max(0,Math.floor((Math.min(...triangle.map(p=>p[1]))+depth/2)/depth*nz)-1),jmax=Math.min(nz-1,Math.floor((Math.max(...triangle.map(p=>p[1]))+depth/2)/depth*nz)+1);
  for(let j=jmin;j<=jmax;j++)for(let i=imin;i<=imax;i++)for(const ground of[[[xs[i],zs[j]],[xs[i+1],zs[j]],[xs[i],zs[j+1]]],[[xs[i+1],zs[j]],[xs[i+1],zs[j+1]],[xs[i],zs[j+1]]]]){
   let poly=triangle;for(let k=0;k<3&&poly.length;k++)poly=clip(poly,ground[k],ground[(k+1)%3]);if(poly.length<3)continue;
   for(let k=1;k<poly.length-1;k++){const face=[poly[0],poly[k],poly[k+1]],area=(face[1][0]-face[0][0])*(face[2][1]-face[0][1])-(face[1][1]-face[0][1])*(face[2][0]-face[0][0]);if(Math.abs(area)<1e-9)continue;const rounded=face.map(p=>[Math.fround(p[0]),Math.fround(p[1])]),floatArea=(rounded[1][0]-rounded[0][0])*(rounded[2][1]-rounded[0][1])-(rounded[1][1]-rounded[0][1])*(rounded[2][0]-rounded[0][0]);if(Math.abs(floatArea)<1e-12)continue;const base=output.p.length/3;for(const[x,z,u,v]of face){output.p.push(x,height(x,z)+offset,z);output.uv.push(u,v);}output.ix.push(base,base+1,base+2);}
  }
 }
 return output;
}

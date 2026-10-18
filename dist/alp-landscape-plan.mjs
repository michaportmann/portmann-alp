// One landscape layout: the working farm opens uphill behind its timber house.
export const BACKLAND={
 stream:{minX:-54,maxX:-11,bridgeX:-24,z:-24.5},
 camp:{x:-29,z:-23.2,entry:{x:-28,z:-21.4}},tent:{x:-32,z:-21.4},
 rocks:[[-33,-27.5,1.45],[-35,-28,1.8],[-31.5,-28.5,1.3],[-34,-26.5,1.1]],
 downhill:[[-5,6],[-6,11],[-2,16],[-8,20],[-6,25]],
 villageTrail:[[-6,25],[-3,36],[-13,49],[-5,62],[-15,76]],
 uphill:[[-16,-3.25],[-23,-3.5],[-24,-13],[-24,-24.5],[-22,-27.5],[-17,-28]],
 woodland:[[-17,-28],[-18,-36],[-13,-51],[-5,-74],[8,-101],[0,-135],[5,-168]]
};
// A broad connected shoulder carries the forest trail around the western valley.
export function woodlandShoulder(x,z){
 const elevations=[9,12,16,23,31,40,44];let closest=Infinity,result=null;
 for(let i=1;i<BACKLAND.woodland.length;i++){const a=BACKLAND.woodland[i-1],b=BACKLAND.woodland[i],dx=b[0]-a[0],dz=b[1]-a[1],u=Math.max(0,Math.min(1,((x-a[0])*dx+(z-a[1])*dz)/(dx*dx+dz*dz))),d=Math.hypot(x-a[0]-u*dx,z-a[1]-u*dz);if(d<closest){closest=d;const t=Math.max(0,Math.min(1,(d-3)/14)),weight=1-t*t*(3-2*t);result={weight,height:elevations[i-1]+u*(elevations[i]-elevations[i-1])};}}
 return result;
}

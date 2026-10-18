import {BACKLAND as B} from './alp-landscape-plan.mjs';
// Shared source of truth for the homestead arrangement. x points east, negative z uphill.
export const HOF={
 house:{x:-16,z:-8,w:9,d:7.2,entry:{x:-16,z:-3.25}},
 barn:{x:1.5,z:-13,w:6.8,d:7.4,entry:{x:1.5,z:-7.7}},
 kiosk:{x:-5,z:-3,entry:{x:-5,z:-1}},
 well:{x:-11.6,z:1,entry:{x:-10,z:1}},
 coop:{x:13.5,z:1,w:3.3,d:4.1},
 pond:{x:27,z:-5,rx:4.75,rz:3.45},
 fields:{basic:{x:-20,z:16,w:16,d:10,entry:{x:-19,z:8}},corn:{x:-20,z:16,w:18,d:9,entry:{x:-19,z:13}},cocoa:{x:-5,z:-19,entry:{x:-9,z:-18}}},
 animals:{berta:{x:7.8,z:-9},lotti:{x:7.8,z:-16},hens:{x:16,z:1},goats:{x:25,z:3},jonny:{x:6,z:3}},
 pens:[
  {id:'cows',x0:5.5,x1:11.4,z0:-19,z1:-5.5,gates:[-8,-13]},
  {id:'hens',x0:11,x1:21,z0:-2,z1:5,gates:[1],northGates:[13],westGates:[1]},
  {id:'goats',x0:23,x1:29,z0:1,z1:6.5,gates:[4]},
  {id:'jonny',x0:3.4,x1:10,z0:.3,z1:6.2,gates:[3],west:true}
 ]
};
export const HOF_LANES=[
 [[-5,1],[-10,1],2.1], [[-10,1],[-16,-3.25],1.8], [[-5,1],[1.5,-7.7],1.8],
 [[1.5,-7.7],[10.8,-4],1.4], [[10.8,-4],[9.5,-8],1.1], [[9.5,-8],[9.5,-15],.9],
 [[10.8,-4],[21.8,1],1.3], [[21.8,1],[16,1],1], [[21.8,1],[26.6,4],1.1],
 [[-10,1],[-19,8],1.2], [[-19,8],[-19,13],.85], [[-5,1],[-5,-1],1.4],
 [[-5,1],[6,3],1.2], [[-5,1],[-5,6],1.8], ...B.downhill.slice(1).map((p,i)=>[B.downhill[i],p,2.2]),
 [[-5,6],[12,24],1.15], ...B.uphill.slice(1).map((p,i)=>[B.uphill[i],p,1.35]), [[-24,-13],[B.camp.entry.x,B.camp.entry.z],1],
 [[-5,-1],[-9,-18],.85], [[21.8,1],[30,6],1.45], [[10.8,-4],[17,-20.2],1],
 [[-6,25],[-1.5,22.5],.85]
];

// Art-directed Swiss silhouettes. Profiles are inspired by the named massifs,
// arranged for the game panorama; they are not a surveyed geographical view.
export const SWISS_PEAKS=[
 {id:'rigi',name:'Rigi · breiter bewaldeter Rücken',cx:-55,cz:-74,width:138,depth:48,profile:[[-1,3],[-.8,14],[-.59,30],[-.36,42],[-.13,48],[.08,47],[.29,40],[.5,31],[.76,15],[1,3]],snow:150},
 {id:'pilatus',name:'Pilatus · Tomlishorn, Oberhaupt & Esel',cx:-29,cz:-84,width:132,depth:44,profile:[[-1,4],[-.87,16],[-.7,27],[-.52,49],[-.43,42],[-.28,72],[-.19,66],[-.08,77],[.02,59],[.16,67],[.25,52],[.42,62],[.51,40],[.72,28],[1,4]],snow:104},
 {id:'eiger',name:'Eiger',cx:-55,cz:-135,width:86,depth:48,profile:[[-1,3],[-.76,24],[-.52,47],[-.25,65],[.02,106],[.15,91],[.33,63],[.63,35],[1,3]],snow:89},
 {id:'moench',name:'Mönch',cx:18,cz:-160,width:94,depth:54,profile:[[-1,8],[-.8,30],[-.61,64],[-.39,91],[-.2,108],[-.08,118],[0,120],[.12,117],[.25,105],[.39,87],[.59,61],[.8,29],[1,8]],snow:63},
 {id:'jungfrau',name:'Jungfrau',cx:96,cz:-148,width:120,depth:56,profile:[[-1,9],[-.82,36],[-.63,65],[-.45,92],[-.31,96],[-.18,112],[-.07,124],[.03,132],[.14,129],[.26,119],[.4,104],[.55,84],[.69,74],[.85,41],[1,9]],snow:64},
 {id:'matterhorn',name:'Matterhorn',cx:158,cz:-122,width:84,depth:42,profile:[[-1,3],[-.72,21],[-.4,59],[.01,114],[.09,110],[.28,58],[.55,29],[1,3]],snow:87}
];
for(const p of SWISS_PEAKS){const factor=p.id==='pilatus'?.84:p.id==='rigi'?1:.8;p.profile=p.profile.map(([x,y])=>[x,y*factor]);}
// Shape-preserving cubic interpolation rounds each crest without inventing higher peaks.
export function peakProfile(p,x){const u=(x-p.cx)/(p.width*.5);if(u<=-1||u>=1)return 0;const q=p.profile,delta=i=>(q[i+1][1]-q[i][1])/(q[i+1][0]-q[i][0]);function slope(i){if(i===0)return delta(0);if(i===q.length-1)return delta(i-1);const a=delta(i-1),b=delta(i);return a*b<=0?0:2*a*b/(a+b);}for(let i=1;i<q.length;i++){const a=q[i-1],b=q[i];if(u<=b[0]){const h=b[0]-a[0],t=(u-a[0])/h,t2=t*t,t3=t2*t;return(2*t3-3*t2+1)*a[1]+(t3-2*t2+t)*h*slope(i-1)+(-2*t3+3*t2)*b[1]+(t3-t2)*h*slope(i);}}return 0;}
// Broad massifs keep the named skyline, while branching gullies break up their
// formerly smooth, extruded faces. Detail fades at the ridge and at the foothills.
const fract=x=>x-Math.floor(x);
function hash(x,z){return fract(Math.sin(x*127.1+z*311.7)*43758.5453123);}
function noise(x,z){const ix=Math.floor(x),iz=Math.floor(z),u=x-ix,v=z-iz,a=u*u*(3-2*u),b=v*v*(3-2*v);return (hash(ix,iz)*(1-a)+hash(ix+1,iz)*a)*(1-b)+(hash(ix,iz+1)*(1-a)+hash(ix+1,iz+1)*a)*b;}
export function rockRelief(x,z){return (noise(x*.11,z*.11)-.5)*2.5+(noise(x*.29+71,z*.29)-.5)*1.25+(noise(x*.7,z*.7+17)-.5)*.38;}
export function swissMountainHeight(x,z){
 let mountain=0;
 for(const p of SWISS_PEAKS){
  const offset=z-p.cz,front=offset>=0,depth=p.depth*(front?1:1.45),u=Math.abs(offset)/depth;
  if(u>=1)continue;
  const spine=1-u,warpedX=x+Math.sin(offset*.021)*offset*.12,ridge=peakProfile(p,warpedX);
  if(!ridge)continue;
  const face=front?(u<.18?1-u*.45:u<.52?.919-(u-.18)*1.1:.545-(u-.52)*1.135):Math.pow(spine,.86),envelope=Math.sin(Math.PI*u)*Math.min(1,ridge/24);
  // A domain-warped drainage pattern produces connected ribs and uneven faces.
  const warp=(noise(x*.033+17,z*.037)-.5)*17+(noise(x*.085,z*.071)-.5)*5;
  const drainage=noise((x+warp)*.095+offset*.015,z*.072);
  const channel=Math.pow(Math.max(0,(.55-drainage)/.55),1.7);
  const tributary=Math.pow(Math.max(0,(.48-noise((x+warp)*.22,z*.17+9))/.48),2);
  const erosion=(channel*10+tributary*3.5)*envelope;
  const crags=(rockRelief(x,z)*1.5+(noise(x*.045,z*.047)-.5)*3)*envelope;
  mountain=Math.max(mountain,Math.max(0,ridge*face-erosion+crags));
 }
 // Connected Bernese saddles support a massif, rather than isolated peaks.
 const crest=[[-55,-135,67],[-22,-148,52],[18,-160,80],[53,-153,61],[96,-148,90]];
 for(let i=1;i<crest.length;i++){const a=crest[i-1],b=crest[i],dx=b[0]-a[0],dz=b[1]-a[1],t=Math.max(0,Math.min(1,((x-a[0])*dx+(z-a[1])*dz)/(dx*dx+dz*dz))),xx=a[0]+dx*t,zz=a[1]+dz*t,d=Math.hypot(x-xx,z-zz),f=Math.max(0,1-d/48),h=(a[2]+(b[2]-a[2])*t)*Math.pow(f,.84);mountain=Math.max(mountain,h+rockRelief(x,z)*f*.7);}
 return mountain;
}
export function mountainSnowline(x,z){let best=null,h=0;for(const p of SWISS_PEAKS){const v=peakProfile(p,x)*Math.max(0,1-Math.abs(z-p.cz)/(p.depth*1.5));if(v>h){h=v;best=p;}}return best?.snow??90;}

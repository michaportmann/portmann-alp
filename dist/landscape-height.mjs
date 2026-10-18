import {BACKLAND as B,woodlandShoulder} from './alp-landscape-plan.mjs';
import {HOF} from './hof-layout.mjs';
import {swissMountainHeight} from './swiss-peaks.mjs';
const smooth=(a,b,x)=>{const t=Math.max(0,Math.min(1,(x-a)/(b-a)));return t*t*(3-2*t);};
// One cultivated hillside: uphill to the north/east, falling toward the valley.
// Broad shoulders replace the two isolated Gaussian domes under the farm.
function hillside(x,z){return 3.6-.065*z+.03*x+.8*Math.tanh((-z-16)/12)+.35*Math.sin((x+z*.4)*.035)+10*smooth(22,46,-z)-14*smooth(7,42,z);}
const easing=t=>t*t*t*(t*(t*6-15)+10);
function roundedEdge(x,z,p){const corner=p.corner??.6,qx=Math.abs(x-p.x)-p.rx+corner,qz=Math.abs(z-p.z)-p.rz+corner;return Math.hypot(Math.max(0,qx),Math.max(0,qz))+Math.min(Math.max(qx,qz),0)-corner;}
const upperFarmLevel=hillside(-5,-10),campLevel=hillside(B.camp.x,B.camp.z);
export const HOME_TERRACES=[
 {id:'pond-tent',x:36,z:-12,rx:2.15,rz:2.3,corner:.35,feather:2.2,level:hillside(36,-12)},
 {id:'house',...HOF.house,rx:5.9,rz:4.65,corner:1,feather:6,level:hillside(-16,-7.3)},
 {id:'barn',...HOF.barn,rx:HOF.barn.w/2+.95,rz:HOF.barn.d/2+.95,corner:.3,feather:5,level:upperFarmLevel},
 {id:'coop',...HOF.coop,rx:HOF.coop.w/2+.5,rz:HOF.coop.d/2+.5,corner:.2,feather:4,level:hillside(HOF.coop.x,HOF.coop.z+.5)},
 {id:'kiosk',...HOF.kiosk,rx:2,rz:1.5,corner:.3,feather:4,level:hillside(HOF.kiosk.x,HOF.kiosk.z+.5)},
 {id:'cocoa',x:-5,z:-19,rx:3.4,rz:3.4,corner:.3,feather:8,level:upperFarmLevel},
 {id:'bridge',x:B.stream.bridgeX,z:B.stream.z+Math.sin((B.stream.bridgeX+16)*.1)*.8,rx:2,rz:2.5,corner:.3,feather:5,level:hillside(B.stream.bridgeX,B.stream.z)}
];
export function homeTerrainBaseHeight(x,z){
 // A broad, open western descent replaces the old rectangular notch behind the house.
 const valley=0;
 const westernDrop=8*smooth(27,57,-x)*(1-smooth(2,28,z));
 const natural=hillside(x,z)*(1-valley)+(-8+.008*Math.max(0,-z-80))*valley-westernDrop;
 let sum=natural,total=1;
 for(const p of HOME_TERRACES){const edge=roundedEdge(x,z,p);if(edge<=0)return p.level;if(edge>=p.feather)continue;const w=1-easing(edge/p.feather),weight=w/Math.max(1e-12,1-w);sum+=p.level*weight;total+=weight;}
 return sum/total;
}

export const streamZ=x=>B.stream.z+Math.sin((x+16)*.1)*.8-smooth(-19,-11,x)*4.7-(1-smooth(-54,-34,x))*13;
// A continuous east-to-west fall: building terraces cannot make the stream flow uphill.
const streamDatum=HOME_TERRACES.find(p=>p.id==='bridge').level-.18;
export const streamSurfaceHeight=x=>streamDatum+(x-B.stream.bridgeX)*.023;
export const pondSurfaceHeight=()=>homeTerrainBaseHeight(HOF.pond.x,HOF.pond.z)-.15;
export function homeTerrainHeight(x,z){let h=homeTerrainBaseHeight(x,z);const inStream=smooth(B.stream.minX-1,B.stream.minX,x)*(1-smooth(B.stream.maxX,B.stream.maxX+1,x)),bank=Math.abs(z-streamZ(x)),bridge=Math.abs(x-B.stream.bridgeX)<2.3&&Math.abs(z-streamZ(B.stream.bridgeX))<2.4;if(!bridge&&inStream>0&&bank<1.55){const bed=streamSurfaceHeight(x)-.46;h=h+(bed-h)*(1-smooth(1,1.55,bank))*inStream;}const pond=Math.hypot((x-HOF.pond.x)/HOF.pond.rx,(z-HOF.pond.z)/HOF.pond.rz);if(pond<1.2){const bed=pondSurfaceHeight()-.32;h=h+(bed-h)*(1-smooth(.84,1.2,pond));}return h;}

export function mountainValleyHeight(x,z){const mountain=swissMountainHeight(x,z),shoulder=22*Math.exp(-((x+128)**2/2200+(z+47)**2/1700))+19*Math.exp(-((x-128)**2/2100+(z+59)**2/1900));let h=-6+Math.max(mountain,shoulder)+.7*Math.sin(x*.035)*Math.cos(z*.04);const frontBlend=smooth(30,65,z);h=h*(1-frontBlend)+(-6-.2*Math.max(0,z-30)+3*Math.sin(x*.025))*frontBlend;const shoulderTrail=woodlandShoulder(x,z);if(shoulderTrail?.weight)h=h*(1-shoulderTrail.weight)+Math.max(h,shoulderTrail.height)*shoulderTrail.weight;const drop=smooth(54,135,z);h-=112*drop;h-=74*smooth(58,175,-x)*(1-smooth(-10,25,-z));return h;}

export function isHomeWater(x,z){const bridge=Math.abs(x-B.stream.bridgeX)<2.3;return x>=B.stream.minX&&x<=B.stream.maxX&&!bridge&&Math.abs(z-streamZ(x))<=.96||Math.hypot((x-HOF.pond.x)/HOF.pond.rx,(z-HOF.pond.z)/HOF.pond.rz)<=1;}

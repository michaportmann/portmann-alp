// Local metres within the cutaway house; outdoor coordinates remain at the entrance.
export const HOME_FLOORS=['cave','cellar','stube','bedroom'];
export const HOME_NAMES={cave:'Höhlenkäsekeller · Felsenuntergeschoss',cellar:'Käsewerkstatt · Untergeschoss',stube:'Wohnstube · Erdgeschoss',bedroom:'Schlafzimmer · Obergeschoss'};
export const HOME_FURNITURE={
 table:{floor:'stube',name:'Fondue-Tisch',x:-1.6,z:-1.25,w:2.5,d:1.45},
 bench:{floor:'stube',name:'Eckbank mit Lammfellen',x:-3.35,z:-2.8,w:3.1,d:1.1},
 chair:{floor:'stube',name:'Holzstuhl',x:-1.5,z:.35,w:.7,d:.75},
 chest:{floor:'stube',name:'Geschnitzte Truhe',x:-3.8,z:2,w:1.9,d:.85},
 bed:{floor:'bedroom',name:'Doppelbett',x:-2.8,z:-1.8,w:2.35,d:3.15},
 wardrobe:{floor:'bedroom',name:'Kleiderschrank',x:1.5,z:-3.65,w:2,d:.75},
 bedside:{floor:'bedroom',name:'Nachttisch',x:-4.5,z:-2.4,w:.65,d:.65},
 desk:{floor:'bedroom',name:'Fenstertisch',x:1.4,z:.2,w:1.65,d:.85},
 cheeseTable:{floor:'cellar',name:'Käsetisch',x:-2.6,z:-1.9,w:2.6,d:1.1},
 cheeseRack:{floor:'cellar',name:'Reiferegal',x:-3.2,z:-3.7,w:3.2,d:.7},
 barrel:{floor:'cellar',name:'Milchfass',x:1,z:-3.35,w:.9,d:.9}
};
export const HOME_FIXED={cave:[{x:0,z:-3.6,w:7.6,d:.8},{x:-4.6,z:-.7,w:.7,d:4.8}],stube:[{x:3.5,z:-3.5,w:2,d:1.5}],bedroom:[],cellar:[{x:3.1,z:-2.2,w:1.5,d:1.5}]};
export const freshHome=()=>({floor:'stube',x:0,z:3.25,placements:{},seasonalDecor:null});
export function furniturePose(home,id){return home.placements[id]||{x:HOME_FURNITURE[id].x,z:HOME_FURNITURE[id].z,turn:0};}
export function homeObstacles(home,except){return [...HOME_FIXED[home.floor],...Object.entries(HOME_FURNITURE).filter(([id,v])=>id!==except&&v.floor===home.floor).map(([id,v])=>{const p=furniturePose(home,id);return{x:p.x,z:p.z,w:p.turn%2?v.d:v.w,d:p.turn%2?v.w:v.d};})];}
export function homeBlocked(home,x,z,except,r=.27){return !Number.isFinite(x)||!Number.isFinite(z)||Math.abs(x)>5.1-r||Math.abs(z)>4.25-r||homeObstacles(home,except).some(c=>Math.abs(x-c.x)<c.w/2+r&&Math.abs(z-c.z)<c.d/2+r);}
export function homeRoute(home,to,from=home){if(homeBlocked(home,to.x,to.z))return[];const w=41,h=35,s=.25,at=(x,z)=>({x:x*s-5,z:z*s-4.25}),key=(x,z)=>z*w+x,coord=p=>[Math.max(0,Math.min(w-1,Math.round((p.x+5)/s))),Math.max(0,Math.min(h-1,Math.round((p.z+4.25)/s)))];const [sx,sz]=coord(from),[tx,tz]=coord(to),start=key(sx,sz),end=key(tx,tz),prev=new Int32Array(w*h).fill(-1),q=[start];prev[start]=start;for(let i=0;i<q.length&&prev[end]<0;i++){const k=q[i],x=k%w,z=Math.floor(k/w);for(const [dx,dz]of [[1,0],[-1,0],[0,1],[0,-1]]){const nx=x+dx,nz=z+dz,n=key(nx,nz),p=at(nx,nz);if(nx<0||nz<0||nx>=w||nz>=h||prev[n]>=0||homeBlocked(home,p.x,p.z,undefined,.28))continue;prev[n]=k;q.push(n);}}if(prev[end]<0)return[];const out=[{x:to.x,z:to.z}];let k=end;while(k!==start){out.push(at(k%w,Math.floor(k/w)));k=prev[k];}return out.reverse();}
export function canPlace(home,id,p){const v=HOME_FURNITURE[id];if(!v||v.floor!==home.floor||![p.x,p.z].every(Number.isFinite)||!Number.isInteger(p.turn)||p.turn<0||p.turn>3)return false;const w=p.turn%2?v.d:v.w,d=p.turn%2?v.w:v.d;if(Math.abs(p.x)+w/2>4.95||Math.abs(p.z)+d/2>4.1)return false;
 // Keep the exit, stair landings and a permanent central circulation lane open.
 if(p.x+w/2>3.65||p.z+d/2>2.7||Math.abs(p.x)<w/2+.65&&p.z+d/2>1.25)return false;
 if(homeObstacles(home,id).some(c=>Math.abs(p.x-c.x)<(w+c.w)/2+.12&&Math.abs(p.z-c.z)<(d+c.d)/2+.12))return false;
 const next={...home,placements:{...home.placements,[id]:p}};if(homeBlocked(next,home.x,home.z))return false;
 return homeRoute(next,{x:4.2,z:2.6}).length>0&&homeRoute(next,{x:0,z:3.25}).length>0;
}
export function validHome(v){if(!v||!(v.seasonalDecor===undefined||v.seasonalDecor===null||['autumnDecor','halloweenDecor','christmasDecor','christmasTree'].includes(v.seasonalDecor))||!HOME_FLOORS.includes(v.floor)||!Number.isFinite(v.x)||!Number.isFinite(v.z)||Math.abs(v.x)>5||Math.abs(v.z)>4.2||!v.placements||typeof v.placements!=='object'||Array.isArray(v.placements)||Object.keys(v.placements).length>Object.keys(HOME_FURNITURE).length)return false;for(const [id,p]of Object.entries(v.placements)){const f=HOME_FURNITURE[id];if(!f||!p||![p.x,p.z].every(Number.isFinite)||!Number.isInteger(p.turn)||p.turn<0||p.turn>3)return false;const test={...freshHome(),floor:f.floor,placements:Object.fromEntries(Object.entries(v.placements).filter(([k])=>k!==id))};if(!canPlace(test,id,p))return false;}return !homeBlocked(v,v.x,v.z);}

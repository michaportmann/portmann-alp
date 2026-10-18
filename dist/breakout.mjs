// Fixed substeps keep ball contacts stable at all three speeds and frame rates.
export const BREAKOUT_BRICKS=Array.from({length:32},(_,i)=>({x:20+i%8*55,y:36+Math.floor(i/8)*21,w:50,h:15}));
export function serveBreakout(c,q){c.ball={x:c.paddle,y:270,vx:(c.rng%2?1:-1)*105*q,vy:-235*q};c.wait=.8;}
export function startBreakout(c,q){Object.assign(c,{paddle:240,bricks:Array(32).fill(true),lives:3,wait:0});serveBreakout(c,q);}
export function stepBreakout(c,dt,input,q){
 const steps=Math.max(1,Math.ceil(dt/.004)),h=dt/steps;let event=null;
 for(let k=0;k<steps&&!c.done;k++){
  c.paddle=Math.max(44,Math.min(436,c.paddle+Math.max(-1,Math.min(1,input))*360*h));
  if(c.wait>0){c.wait=Math.max(0,c.wait-h);continue;}
  const b=c.ball,ox=b.x,oy=b.y;b.x+=b.vx*h;b.y+=b.vy*h;
  if(b.x<5){b.x=10-b.x;b.vx=Math.abs(b.vx);}else if(b.x>475){b.x=950-b.x;b.vx=-Math.abs(b.vx);}
  if(b.y<5){b.y=10-b.y;b.vy=Math.abs(b.vy);}
  for(let i=0;i<32;i++){
   if(!c.bricks[i])continue;const r=BREAKOUT_BRICKS[i],nx=Math.max(r.x,Math.min(r.x+r.w,b.x)),ny=Math.max(r.y,Math.min(r.y+r.h,b.y));
   if((b.x-nx)**2+(b.y-ny)**2>25)continue;
   c.bricks[i]=false;event='brick';
   if(oy>=r.y+r.h+5){b.y=r.y+r.h+5;b.vy=Math.abs(b.vy);}
   else if(oy<=r.y-5){b.y=r.y-5;b.vy=-Math.abs(b.vy);}
   else if(ox<=r.x){b.x=r.x-5;b.vx=-Math.abs(b.vx);}
   else{b.x=r.x+r.w+5;b.vx=Math.abs(b.vx);}
   if(!c.bricks.some(Boolean)){c.done=true;c.won=true;}break;
  }
  if(b.vy>0&&oy<=289&&b.y>=289&&Math.abs(b.x-c.paddle)<=49){
   b.y=289;const angle=Math.max(-1,Math.min(1,(b.x-c.paddle)/44))*1.05,speed=285*q;b.vx=Math.sin(angle)*speed;b.vy=-Math.cos(angle)*speed;
  }
  if(b.y>326){c.lives--;event='life';if(!c.lives)c.done=true;else serveBreakout(c,q);}
 }
 return event;
}
export function validBreakout(c){const num=(v,a,b)=>Number.isFinite(v)&&v>=a&&v<=b,b=c.ball;return num(c.paddle,44,436)&&Number.isInteger(c.lives)&&c.lives>=0&&c.lives<=3&&Array.isArray(c.bricks)&&c.bricks.length===32&&c.bricks.every(v=>typeof v==='boolean')&&num(c.wait,0,.8)&&b&&typeof b==='object'&&!Array.isArray(b)&&num(b.x,0,480)&&num(b.y,0,331)&&num(b.vx,-380,380)&&num(b.vy,-380,380)&&c.won===!c.bricks.some(Boolean)&&(c.done||c.lives>0)&&(!c.won||c.lives>0);}

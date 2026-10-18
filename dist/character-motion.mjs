const TAU=Math.PI*2,clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
// +z is forwards; a positive knee bends the heel backwards, never through the shin.
export function solveHikingLeg(z,y){
 const upper=.38,lower=Math.hypot(.37,.008),reach=clamp(Math.hypot(z,y),.16,upper+lower-.001),a=Math.atan2(-z,-y),knee=Math.acos(clamp((reach*reach-upper*upper-lower*lower)/(2*upper*lower),-1,1)),hip=a-Math.atan2(lower*Math.sin(knee),upper+lower*Math.cos(knee));
 const kneeRotation=knee+Math.atan2(.008,.37);return{hip,knee:kneeRotation,ankle:-hip-kneeRotation};
}
export function hikingPose(phase,{weight=1,jog=0,slope=0,time=0}={}){
 weight=clamp(weight,0,1);jog=clamp(jog,0,1);slope=clamp(slope,-.55,.55);
 const stance=.63-jog*.19,stride=.76+jog*.16,lift=.065+jog*.12,hipY=.88-.03-weight*(.065+.03*Math.cos(phase*2)+jog*.035),legs=[];
 for(let i=0;i<2;i++){
  const u=((phase/TAU+i*.5)%1+1)%1,planted=u<stance,t=planted?u/stance:(u-stance)/(1-stance),ease=t*t*(3-2*t);
  const z=weight*(planted?stride*(.5-t):stride*(-.5+ease)),footLift=planted?0:Math.sin(Math.PI*t)*lift*weight;
  const angles=solveHikingLeg(z,.092-hipY+footLift+slope*z),arm=(z/(stride*.5))*(.17+jog*.15);
  legs.push({...angles,z,footLift,planted,arm,elbow:-.13-jog*.9*weight-Math.max(0,-Math.sin(phase+i*Math.PI))*.06*weight,footPitch:-Math.atan(slope)+(planted?(t>.8?(t-.8)*.4:0):-.1*Math.sin(Math.PI*t))*weight});
 }
 return{legs,bodyY:hipY-.88,torsoPitch:weight*(slope*.11+jog*.075),torsoYaw:Math.sin(phase)*.028*weight,torsoRoll:Math.sin(phase)*.013*weight,breath:Math.sin(time*1.7)*.0015*(1-weight),stride,stance};
}
export function createHikingMotion(){
 let phase=0,weight=0,jog=0,speed=0;
 return{reset(){phase=weight=jog=speed=0;},step({moving=false,running=false,distance=0,dt=1/60,scale=1,slope=0,time=0}={}){
  dt=clamp(Number.isFinite(dt)?dt:1/60,0,.05);const blend=1-Math.exp(-dt*11);
  weight+=(Number(moving)-weight)*(1-Math.exp(-dt*(moving?9:5)));jog+=((running?1:0)-jog)*blend;
  const measured=moving&&distance>=0&&distance<.65?distance/Math.max(dt,.001):0;speed+=(measured-speed)*(1-Math.exp(-dt*14));
  const stance=.63-jog*.19,stride=.76+jog*.16,cadence=Math.min(speed*stance/(stride*scale),(1.4+jog*.4)/Math.sqrt(scale));phase=(phase+cadence*dt*TAU)%TAU;
  return{...hikingPose(phase,{weight,jog,slope,time}),weight,jog,speed,phase};
 }};
}

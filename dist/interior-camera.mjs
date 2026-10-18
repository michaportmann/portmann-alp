export const INTERIOR_REGIONS=['house','restaurant','arcadeshop','villageshop','danielhut','cellar'];
export function inBarn(pos,active=true){return active&&Math.abs(pos.x-1.5)<3.05&&Math.abs(pos.z+13)<3.3;}
// Follow the person, not the centre of a distant cutaway model. Open side is south.
export function interiorView(actor,aspect,zoom=1){
 const scale=Math.max(.8,Math.min(1.2,zoom)),wide=Math.min(1,Math.max(0,(aspect-.7)/.8));
 return{position:{x:actor.x+1.1*scale,y:actor.y+(4.7+wide*.5)*scale,z:actor.z+(5.6+wide*.5)*scale},look:{x:actor.x,y:actor.y+.9,z:actor.z-.35}};
}

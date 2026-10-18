import {route} from './logic.mjs';
import * as T from './vendor/three.module.js';
import {VILLAGERS} from './village.mjs';
import {createHumanCharacter} from './human-character.mjs';
export function createVillagePeople(scene,height,colliders,interactive,animated,label){
 const people=new Map(),clickTargets=[];
 for(const [i,n]of Object.values(VILLAGERS).entries()){
  const person=createHumanCharacter(n.id==='anna'?'woman':n.id==='ruth'?'woman':n.id==='sepp'?'grandfather':'boy',{hat:false,backpack:n.id==='dani',pattern:null,jacket:n.coat,hair:n.hair,skin:n.skin,scale:n.id==='dani'?.96:1,glasses:false}),g=person.g;g.userData.kind='walking-village-person';g.position.set(n.x,height(n.x,n.z-1.25),n.z-1.25);scene.add(g);
  g.traverse(o=>{if(o.isMesh)o.userData.villager=n.id;});clickTargets.push(g);const collider={type:'circle',x:g.position.x,z:g.position.z,r:.34};colliders.push(collider);
  const point={id:'npc-'+n.id,name:'Mit '+n.name+' sprechen',npc:n.id,x:n.x,z:n.z,range:2.3};interactive.push(point);people.set(n.id,{g,body:g,arms:person.arms,person,point});
  let previous=0;animated.push(t=>{const dt=Math.min(.05,Math.max(0,t-previous));previous=t;const phase=(t+i*4)%24,moving=phase<8,walk=moving?Math.sin(phase/8*Math.PI*2)*.42:0;const lastX=g.position.x;g.position.x=n.x+walk;g.position.z=n.z-1.25;g.position.y=height(g.position.x,g.position.z);if(Math.abs(g.position.x-lastX)>.0001)g.rotation.y=g.position.x>lastX?Math.PI/2:-Math.PI/2;collider.x=g.position.x;collider.z=g.position.z;person.animate({moving,time:t,dt});});
 }
 function populateVisitors(){for(const [i,from,to]of [[0,{x:0,z:20},{x:12,z:4}],[1,{x:-8,z:12},{x:0,z:8}]]){const road=route(from,to,colliders);if(road.length<2)continue;const person=createHumanCharacter(i?'woman':'boy',{hat:false,jacket:i?'#628875':'#ba8b36',glasses:false,scale:1,hair:i?'#5e493a':'#504435'}),g=person.g;g.userData.kind='roaming-village-visitor';scene.add(g);g.position.set(road[0].x,height(road[0].x,road[0].z),road[0].z);let k=1,direction=1,previous=0;animated.push(t=>{const dt=Math.min(.05,Math.max(0,t-previous));previous=t;const target=road[k],dx=target.x-g.position.x,dz=target.z-g.position.z,d=Math.hypot(dx,dz),step=Math.min(d,dt*.75);if(d>.001){g.position.x+=dx/d*step;g.position.z+=dz/d*step;g.rotation.y=Math.atan2(dx,dz);}if(d<.06){k+=direction;if(k>=road.length){direction=-1;k=road.length-2;}if(k<0){direction=1;k=1;}}g.position.y=height(g.position.x,g.position.z);person.animate({moving:step>.001,time:t,dt});});}}
 return{people,clickTargets,populateVisitors};
}

// Gameplay rules for the in-world climbing routes. This is not real climbing advice.
const N=(u,v,next=[],rest=false,cost=9)=>({u,v,next,rest,cost});
export const CLIMBS={
 training:{id:'training',name:'Übungsfels am Bergweg',region:'panorama',entry:[-6,-9.5],exit:[-6,-9.5],origin:[-6,-12],rotation:0,width:6.6,height:7.2,requires:[],drain:2,energy:1,
  text:'Lerne am gesicherten Übungsfels. Wähle einen leuchtenden Griff direkt am Fels oder mit den Griffknöpfen. Auf breiten Absätzen kannst du Ausdauer zurückgewinnen. Die Sicherung fängt Fehler ab.',
  nodes:[N(0,0,[1,2],true),N(-.65,1.05,[3],false,7),N(.7,1.15,[3],false,10),N(0,2.2,[4,5],true,7),N(-.8,3.2,[6],false,8),N(.75,3.35,[6],false,11),N(0,4.45,[7],true,8),N(.25,5.6,[],true,9)]},
 waterfall:{id:'waterfall',name:'Querung am Wasserfall',region:'schlucht',entry:[-16.5,9],exit:[-16.5,-9],origin:[-18.3,0],rotation:Math.PI/2,width:18,height:6.7,requires:['rope','harness','boots'],drain:4,energy:1.8,
  text:'Quere die Felswand über dem Wasser und seile dich am anderen Ufer ab. Griffe auf gleicher Höhe können kürzer sein; die höher gelegenen Absätze bieten Erholung. Der normale Brückenweg bleibt offen.',
  nodes:[N(-7.4,.2,[1,2],true),N(-5.8,1.1,[3],false,10),N(-6,1.8,[3],false,13),N(-4.5,2,[4],true,10),N(-2.9,2.5,[5,6],false,12),N(-1.4,2,[7],false,10),N(-1.5,3.4,[7],true,15),N(0,2.8,[8],false,12),N(1.7,2.4,[9,10],true,12),N(3.2,2,[11],false,10),N(3,3.6,[11],false,15),N(4.6,2.8,[12],true,12),N(6.2,2.3,[13],false,12),N(7.5,1.3,[],true,11)]},
 eagle:{id:'eagle',name:'Die Adlerwand',region:'grat',entry:[13,-4],exit:[23,-9],origin:[13,-7],rotation:0,width:8,height:10.4,requires:['rope','harness','boots'],drain:5,energy:2.2,
  text:'Steige durch die Adlerwand bis zum oberen Stand. Plane deine nächsten Griffe und nutze die Rastabsätze. Danach führt eine gesicherte Abseilspur auf die andere Seite des Felsens.',
  nodes:[N(0,0,[1,2],true),N(-.8,1.1,[3],false,11),N(.8,1.1,[3],false,13),N(0,2.4,[4,5],true,11),N(-1,3.6,[6],false,12),N(1,3.6,[6],false,15),N(0,4.9,[7,8],true,12),N(-1.1,6.1,[9],false,13),N(1,6.2,[9],false,16),N(0,7.3,[10],true,12),N(.5,8.7,[],true,15)]}
};
export const freshClimbing=()=>({completed:[],best:{},checkpoint:null});
const equipmentNames={rope:'Bergseil',harness:'Klettergurt',boots:'Bergschuhe'};
export function requirements(state,route){const missing=route.requires.filter(k=>!(state.inventory[k]>0));return missing.length?'Es fehlen: '+missing.map(k=>equipmentNames[k]).join(', ')+'.':null;}
export function startClimb(state,id,{resume=false}={}){
 const route=CLIMBS[id];if(!route||state.position.region!==route.region||state.position.inside)return{ok:false,message:'Dieser Kletterfels liegt nicht an deinem Aufenthaltsort.'};
 if(!resume&&Math.hypot(state.position.x-route.entry[0],state.position.z-route.entry[1])>2.3)return{ok:false,message:'Gehe zuerst zum Einstieg am Fels.'};
 const missing=requirements(state,route);if(missing)return{ok:false,message:missing};if(!resume&&state.energy<route.energy)return{ok:false,message:'Iss oder raste vor dem Einstieg. Deine Energie reicht nicht aus.'};if(id!=='training'&&!state.climbing.completed.includes('training'))return{ok:false,message:'Schliesse zuerst den Übungsfels am Bergweg ab.'};
 if(resume&&state.climbing.checkpoint?.route!==id)return{ok:false,message:'Kein gespeicherter Stand dieser Route vorhanden.'};const checkpoint=resume&&state.climbing.checkpoint?.route===id?state.climbing.checkpoint.node:0;
 if(!route.nodes[checkpoint]?.rest)return{ok:false,message:'Kein sicherer Kletterstand vorhanden.'};
 const saved=resume?state.climbing.checkpoint:null;state.climbing.checkpoint={route:id,node:checkpoint,time:saved?.time||0,faults:saved?.faults||0};
 return{ok:true,session:{route:id,node:checkpoint,anchor:checkpoint,from:checkpoint,target:null,progress:0,phase:'idle',time:saved?.time||0,faults:saved?.faults||0,resting:false,selected:0,ending:null}};
}
export function choices(session){return CLIMBS[session.route].nodes[session.node].next;}
export function chooseGrip(state,session,index){
 const r=CLIMBS[session.route];if(session.phase!=='idle')return{ok:false,message:'Warte, bis du den Griff erreicht hast.'};if(!choices(session).includes(index))return{ok:false,message:'Dieser Griff ist von hier nicht erreichbar.'};
 const n=r.nodes[index];if(state.stamina<n.cost+2)return{ok:false,message:'Zu wenig Ausdauer. Nutze einen Rastabsatz oder kehre gesichert zurück.'};if(state.energy<r.energy)return{ok:false,message:'Deine Energie reicht nicht. Kehre zurück und iss oder raste.'};
 state.stamina-=n.cost;state.energy=Math.max(0,state.energy-r.energy);session.from=session.node;session.target=index;session.progress=0;session.phase='moving';session.resting=false;return{ok:true};
}
export function restClimb(session){const n=CLIMBS[session.route].nodes[session.node];if(session.phase!=='idle'||!n.rest)return{ok:false,message:'Hier ist kein Rastabsatz. Wähle einen Griff mit Absatz.'};session.resting=!session.resting;return{ok:true,message:session.resting?'Du stehst sicher und holst Atem.':'Weiter zum nächsten Griff.'};}
export function stepClimb(state,session,dt){
 const r=CLIMBS[session.route];if(!Number.isFinite(dt)||dt<0||dt>.1)return null;session.time+=dt;if(state.climbing.checkpoint){state.climbing.checkpoint.time=session.time;state.climbing.checkpoint.faults=session.faults;}
 if(session.phase==='descending'){session.progress=Math.min(1,session.progress+dt/3.2);return session.progress>=1?{type:'exit',success:session.ending==='success'}:null;}
 if(session.phase==='catching'){session.progress=Math.min(1,session.progress+dt/.75);if(session.progress>=1){session.node=session.anchor;session.phase='idle';session.progress=0;state.stamina=Math.max(30,state.stamina);session.resting=true;return{type:'caught'};}return null;}
 const node=r.nodes[session.node];if(session.phase==='idle'&&node.rest)state.stamina=Math.min(100,state.stamina+dt*(session.resting?24:7));else state.stamina=Math.max(0,state.stamina-r.drain*dt);
 if(state.stamina<=0){session.faults++;session.catchFrom=localClimberPosition(session);session.from=session.node;session.target=null;session.phase='catching';session.progress=0;return{type:'slip'};}
 if(session.phase==='moving'){session.progress=Math.min(1,session.progress+dt/.6);if(session.progress>=1){session.node=session.target;session.target=null;session.phase='idle';session.progress=0;session.selected=0;const arrived=r.nodes[session.node];if(arrived.rest){session.anchor=session.node;state.climbing.checkpoint={route:r.id,node:session.node,time:session.time,faults:session.faults};}return{type:arrived.next.length?'grip':'top',node:session.node};}}
 return null;
}
export function descendClimb(session,success=false){if(session.phase==='descending'||success&&CLIMBS[session.route].nodes[session.node].next.length)return false;session.descentFrom=localClimberPosition(session);session.from=session.node;session.progress=0;session.phase='descending';session.ending=success?'success':'abort';return true;}
export function finishClimb(state,session,success){const r=CLIMBS[session.route];if(success&&(session.ending!=='success'||r.nodes[session.node].next.length))return{ok:false,message:'Der obere Stand wurde noch nicht erreicht.'};state.climbing.checkpoint=null;if(success){if(!state.climbing.completed.includes(r.id))state.climbing.completed.push(r.id);const score=Math.max(0,1000-session.faults*100-Math.floor(session.time*2));state.climbing.best[r.id]=Math.max(state.climbing.best[r.id]||0,score);}const p=success?r.exit:r.entry;state.position={x:p[0],z:p[1],inside:false,region:r.region};return{ok:true,message:success?r.name+' geschafft. Du stehst wieder sicher auf dem Boden.':'Gesichert zum Einstieg zurückgekehrt.'};}
export function localClimberPosition(session){const r=CLIMBS[session.route];if(session.phase==='descending')return session.descentFrom;const a=session.phase==='catching'?session.catchFrom:r.nodes[session.from],b=session.phase==='catching'?r.nodes[session.anchor]:session.target!==null?r.nodes[session.target]:r.nodes[session.node],u=session.phase==='moving'||session.phase==='catching'?session.progress:1,t=u*u*(3-2*u);return{u:a.u+(b.u-a.u)*t,v:a.v+(b.v-a.v)*t};}

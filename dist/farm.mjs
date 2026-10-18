import {HOF} from './hof-layout.mjs';
export const ANIMALS={
 goats:{id:'goats',name:'Maja und Sämi · die Geissen',kind:'goats',...HOF.animals.goats,food:'hay',foodName:'Heu',product:'goatMilk',amount:1},
 berta:{id:'berta',name:'Berta',kind:'cow',...HOF.animals.berta,food:'hay',foodName:'Heu',product:'milk',amount:2},
 lotti:{id:'lotti',name:'Lotti',kind:'cow',...HOF.animals.lotti,food:'hay',foodName:'Heu',product:'milk',amount:2},
 hens:{id:'hens',name:'Die Hühner',kind:'hens',...HOF.animals.hens,food:'grain',foodName:'Körnerfutter',product:'egg',amount:3},
 jonny:{id:'jonny',name:'Jonny',kind:'horse',...HOF.animals.jonny,food:'hay',foodName:'Heu',product:null,amount:0}
};
export const STALLS={berta:{x:-.3,z:-14.4},lotti:{x:-.3,z:-11.4},goats:{x:3.3,z:-11.4},jonny:{x:3.3,z:-14.4},hens:{x:13.5,z:1}};
export function animalPoint(state,id){return state.alpLife?.housed?.[id]?{...ANIMALS[id],...STALLS[id]}:ANIMALS[id];}
export function setHousing(state,id,inside){if(!Object.hasOwn(ANIMALS,id)||typeof inside!=='boolean')return{ok:false,message:'Unbekanntes Tier.'};const current=animalPoint(state,id),atBarn=state.position.region==='alp'&&!state.position.inside&&Math.hypot(state.position.x-HOF.barn.entry.x,state.position.z-HOF.barn.entry.z)<4,atAnimal=state.position.region==='alp'&&!state.position.inside&&Math.hypot(state.position.x-current.x,state.position.z-current.z)<5.2;if(!atBarn&&!atAnimal)return{ok:false,message:'Gehe zum Tier oder zum Stalltor.'};if(state.alpLife.housed[id]===inside)return{ok:false,message:inside?'Bereits im Stall.':'Bereits auf der Weide.'};state.alpLife.housed[id]=inside;return{ok:true,message:ANIMALS[id].name+(inside?(id==='hens'?' geht ins Hühnerhaus.':' geht in die Scheune.'): ' geht wieder auf die Weide.')};}
export const FARM_POINTS={well:{...HOF.well.entry,name:'Alpbrunnen'},barn:{...HOF.barn.entry,name:'Futterscheune'}};
const newAnimal=()=>({feedDay:0,waterDay:0,careDay:0,produceDay:0,trust:20});
export const freshFarm=day=>({day,animals:Object.fromEntries(Object.keys(ANIMALS).map(id=>[id,newAnimal()])),careActions:0,harvests:0,completeDays:0,lastCompleteDay:0,supplyDay:0,wellDay:day,wellPortions:0});
export function dailyStatus(state,id){const a=state.farm.animals[id],day=state.day;return{fed:a.feedDay===day,watered:a.waterDay===day,cared:a.careDay===day,collected:a.produceDay===day};}
export function allCared(state){return Object.keys(ANIMALS).every(id=>{const s=dailyStatus(state,id);return s.fed&&s.watered&&s.cared;});}
function present(state,point,range=5.2){return (state.position.region==='alp'||point.id==='jonny'&&state.position.region==='pasture')&&!state.position.inside&&!state.climbing.checkpoint&&Math.hypot(state.position.x-point.x,state.position.z-point.z)<=range;}
export function careAnimal(state,id,action,exchange){
 const def=Object.hasOwn(ANIMALS,id)?ANIMALS[id]:null,animal=state.farm.animals[id];if(!def||!animal||!present(state,animalPoint(state,id)))return{ok:false,message:'Gehe zuerst zum Tier auf der Alp.'};const status=dailyStatus(state,id);
 const already={feed:status.fed,water:status.watered,care:status.cared,collect:status.collected};if(!['feed','water','care','collect'].includes(action))return{ok:false,message:'Unbekannte Tieraktion.'};if(already[action])return{ok:false,message:action==='collect'?'Heute bereits abgeholt.':'Für heute bereits erledigt.'};
 let cost,field,message;
 if(action==='feed'){cost={take:{[def.food]:1},energy:1};field='feedDay';message=def.name+' hat frisches Futter.';}
 if(action==='water'){cost={take:{bucket:1,water:1},give:{bucket:1},energy:1};field='waterDay';message=def.name+' hat frisches Wasser.';}
 if(action==='care'){cost={energy:2};field='careDay';message=def.name+' wurde gepflegt.';}
 if(action==='collect'){
  if(!def.product)return{ok:false,message:'Jonny freut sich über Pflege und gemeinsame Ausritte.'};
  if(!status.fed||!status.watered||!status.cared)return{ok:false,message:'Versorge das Tier zuerst mit Futter, Wasser und Pflege.'};
  cost={give:{[def.product]:def.amount},energy:def.kind==='hens'?1:3};field='produceDay';message=def.kind==='hens'?def.amount+' Eier aus dem Nest gesammelt.':def.amount+' Portionen Milch gemolken.';
 }
 const outcome=exchange(state,cost);if(!outcome.ok)return outcome;
 animal[field]=state.day;if(action==='water'&&state.activities)state.activities.waterCarried++;if(action==='collect')state.farm.harvests++;else{state.farm.careActions++;animal.trust=Math.min(100,animal.trust+4);}
 if(allCared(state)&&state.farm.lastCompleteDay!==state.day){state.farm.completeDays++;state.farm.lastCompleteDay=state.day;}
 return{ok:true,message};
}
export function advanceFarm(state){state.farm.day=state.day;state.farm.wellDay=state.day;state.farm.wellPortions=0;for(const a of Object.values(state.farm.animals))a.trust=Math.max(0,a.trust-1);}
export function farmSupply(state,source,exchange){
 const point=FARM_POINTS[['drink','bottle'].includes(source)?'well':source],inBarn=source==='barn'&&state.position.region==='alp'&&!state.position.inside&&Math.abs(state.position.x-HOF.barn.x)<1.1&&Math.abs(state.position.z-HOF.barn.z)<2.8;if(!point||!inBarn&&!present(state,point,2.5))return{ok:false,message:'Gehe zuerst zum Alpbrunnen oder zur Futterscheune.'};
 if(source==='drink'){if((state.survival?.thirst??100)>=100&&state.energy>=100)return{ok:false,message:'Du bist bereits erfrischt.'};state.energy=Math.min(100,state.energy+5);if(state.survival)state.survival.thirst=100;return{ok:true,message:'Frisches Quellwasser getrunken.'};}if(source==='bottle'){if((state.inventory.water||0)>=6)return{ok:false,message:'Deine Flaschen sind gefüllt.'};return exchange(state,{give:{water:1}});}if(source==='well'){if(!(state.inventory.bucket>0))return{ok:false,message:'Du brauchst einen Eimer. Einen erhältst du kostenlos bei der Futterscheune.'};if((state.inventory.water||0)>=6)return{ok:false,message:'Du hast bereits genug Wasser für die Versorgung dabei.'};if(state.farm.wellPortions>=12)return{ok:false,message:'Dein Wasserbedarf für heute ist gedeckt. Weiteren Vorrat findest du bei Bedarf im Dorfladen.'};const out=exchange(state,{give:{water:3},energy:1});if(out.ok)state.farm.wellPortions+=3;return out.ok?{ok:true,message:'Drei Portionen frisches Brunnenwasser abgefüllt.'}:out;}
 if((state.inventory.bucket||0)+(state.storage.bucket||0)>0)return{ok:false,message:'Dein Eimer ist wiederverwendbar. Heu mähst du auf der Heuwiese, Körner erntest du am Kornfeld.'};const out=exchange(state,{give:{bucket:1}});return out.ok?{ok:true,message:'Leiheimer eingepackt. Heu mähst du selbst und lagerst es im offenen Heuunterstand ein.'}:out;
}

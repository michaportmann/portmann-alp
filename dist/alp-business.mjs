import {exchangeInventory} from './progression.mjs';
export const STAFF={dairy:{name:'Käsereimitarbeiter',requires:'hut',fee:2500,wage:300},chocolate:{name:'Chocolatier',requires:'cocoa',fee:2500,wage:200},cook:{name:'Koch / Köchin',requires:'restaurant',fee:3500,wage:180},service:{name:'Restaurantservice',requires:'restaurant',fee:2500,wage:120},hotel:{name:'Hotelmitarbeiter',requires:'hotel',fee:4000,wage:200}};
export const freshBusiness=()=>({servedDay:0,served:0,roomDay:0,rooms:0,visitors:0,revenue:0,satisfaction:0,spaDay:0,staff:Object.fromEntries(Object.keys(STAFF).map(k=>[k,false]))});
export function validBusiness(b,day){return b&&['servedDay','roomDay','spaDay'].every(k=>Number.isSafeInteger(b[k])&&b[k]>=0&&b[k]<=day)&&['served','rooms'].every(k=>Number.isSafeInteger(b[k])&&b[k]>=0&&b[k]<=12)&&['visitors','revenue','satisfaction'].every(k=>Number.isSafeInteger(b[k])&&b[k]>=0&&b[k]<=1000000000)&&b.satisfaction<=b.visitors*100&&b.staff&&Object.keys(b.staff).length===5&&Object.keys(STAFF).every(k=>typeof b.staff[k]==='boolean');}
export const guestCapacity=s=>4+(s.estate.built.upperfloor?2:0)+(s.estate.built.restaurantPlus?4:0);
export const roomCapacity=s=>4+(s.estate.built.upperfloor?2:0);
export const guestOrigin=(s,i)=>['Schweiz','Frankreich','Japan','Kanada','Italien','Deutschland','USA','Grossbritannien'][(s.day+i)%8];
export function businessAction(s,id){
 const b=s.estate.business,u=s.estate.built,fail=message=>({ok:false,message});
 if(s.position.region!=='alp')return fail('Dein Betrieb wird auf der Alp geführt.');
 if(id.startsWith('hire:')){const k=id.slice(5),p=STAFF[k];if(!p||!u[p.requires]||b.staff[k])return fail('Stelle noch gesperrt oder bereits besetzt.');const r=exchangeInventory(s,{cost:p.fee,stats:{spent:p.fee},reason:'staff',ref:k});if(r.ok)b.staff[k]=true;return r.ok?{ok:true,message:p.name+' eingestellt. Arbeitslöhne werden nur bei tatsächlich ausgeführten Aufträgen bezahlt.'}:r;}
 if(id==='dairy'||id==='chocolate'){if(!b.staff[id])return fail('Stelle zuerst die passende Fachperson ein.');const take=id==='dairy'?{milk:2,rennet:1}:{cocoa:2,milk:1,honey:1},give=id==='dairy'?{cheese:1}:{chocolate:2},wage=STAFF[id].wage;return exchangeInventory(s,{take,give,cost:wage,stats:{spent:wage,crafts:1},reason:'staff',ref:id});}
 if(id==='spa'){if(!u.spa)return fail('Baue zuerst den Panorama-Badebereich.');if(b.spaDay===s.day)return fail('Das erholsame Bad hast du heute bereits genossen.');s.energy=Math.min(100,s.energy+35);s.stamina=100;b.spaDay=s.day;return{ok:true,message:'Ein warmes Bad mit Alpenblick · bis zu 35 Energie, volle Ausdauer.'};}
 if(id==='serve'){
  if(!u.restaurant)return fail('Baue zuerst das Alp-Restaurant.');const n=b.servedDay===s.day?b.served:0;if(n>=guestCapacity(s))return fail('Alle Tagesgäste sind heute versorgt. Morgen kommen neue Wanderer.');
  const meals=['grilledFish','fondue','soup','omelette','frenchToast','sandwich','porridge'],food=meals.find(k=>s.inventory[k]>0),cook=!food&&b.staff.cook;
  if(!food&&!cook)return fail('Koche zuerst eine Mahlzeit in der Hütte. Ein angestellter Koch kann aus Milch, Mehl und Kräutern eine Suppe zubereiten.');
  const take=food?{[food]:1}:{milk:1,flour:1,herb:1},wage=(cook?STAFF.cook.wage:0)+(b.staff.service?STAFF.service.wage:0),score=Math.min(100,70+(food&&['grilledFish','fondue','soup'].includes(food)?10:0)+(u.spa?5:0)+(u.playground?5:0)+(b.staff.service?10:0)),earn=1200+score*8;
  const r=exchangeInventory(s,{take,cost:wage,earn,energy:b.staff.service?1:3,stats:{earned:earn,spent:wage,sales:1},reason:'hospitality',ref:'restaurant'});if(!r.ok)return r;b.servedDay=s.day;b.served=n+1;b.visitors++;b.satisfaction+=score;b.revenue+=earn;return{ok:true,message:'Gast aus '+guestOrigin(s,n)+' bewirtet · Zufriedenheit '+score+' / 100 · Einnahmen CHF '+(earn/100).toFixed(2)+'.'};
 }
 if(id==='room'){if(!u.hotel)return fail('Baue zuerst das Berghotel.');const n=b.roomDay===s.day?b.rooms:0;if(n>=roomCapacity(s))return fail('Heute sind alle Zimmer vergeben.');const wage=b.staff.hotel?STAFF.hotel.wage:0,earn=3000+(u.spa?500:0),r=exchangeInventory(s,{take:{water:1,bread:1},cost:wage,earn,energy:b.staff.hotel?1:6,stats:{earned:earn,spent:wage,sales:1},reason:'hospitality',ref:'hotel'});if(!r.ok)return r;b.roomDay=s.day;b.rooms=n+1;b.visitors++;b.satisfaction+=u.spa?95:85;b.revenue+=earn;return{ok:true,message:'Zimmer vorbereitet und Übernachtung gebucht. Wasser und Frühstück bereitgestellt.'};}
 return fail('Unbekannter Betriebsauftrag.');
}

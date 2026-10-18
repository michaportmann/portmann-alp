import {freshRides} from './downhill.mjs';
import {freshEnvironment,validEnvironment} from './alpine-weather.mjs';
import {freshActivities,validActivities} from './cozy-activities.mjs';
import {freshAlpLife,validAlpLife} from './alp-life.mjs';
import {freshDairy,validDairy} from './dairy.mjs';
import {freshHome,validHome} from './home-layout.mjs';
import {CHARACTER_IDS} from './character-profiles.mjs';
import {freshEstate,validEstate,UPGRADES} from './estate.mjs';
import {freshArcade,validArcade} from './arcade.mjs';
import {freshJass,validJass,MEALS} from './jass.mjs';
import {freshTargets,validTargets,TARGET_STARTS,TARGET_LEVELS} from './target-games.mjs';
import {freshSki,validSki,SKI_LEVELS} from './ski.mjs';
import {VILLAGERS,ORDERS,freshVillage} from './village.mjs';
import {ANIMALS,freshFarm} from './farm.mjs';
import {ITEMS,QUESTS,RESOURCE_NODES} from './progression.mjs';
import {REGIONS,DISCOVERIES,TREASURES,freshAdventure} from './regions.mjs';
import {CLIMBS,freshClimbing} from './climbing.mjs';
export const SAVE_KEY='portmann-alp-3d-v1';
export const BACKUP_KEY=SAVE_KEY+'-backup';
export function freshState(){return{version:11,environment:freshEnvironment(),activities:freshActivities(),survival:{hunger:100,thirst:100},alpLife:freshAlpLife(),dairy:freshDairy(),home:freshHome(),estate:freshEstate(),arcade:freshArcade(),jass:freshJass(),targets:freshTargets(),ski:freshSki(),village:freshVillage(),farm:freshFarm(1),climbing:freshClimbing(),adventure:freshAdventure(),hut:false,ride:false,herbs:[],best:0,day:1,coins:2500,energy:100,stamina:100,inventory:{bread:2,apple:2,water:2},storage:{},ledger:[],gathered:{},claimed:[],stats:{gathers:0,crafts:0,sales:0,earned:0,spent:0},position:{x:-5,z:6,inside:false,region:'alp'},settings:{radioTrack:0,cameraRevision:2,avatar:'man',musicEnabled:true,musicVolume:.14,soundEnabled:true,volume:.28,angle:.25,zoom:1,overview:false},savedAt:0,revision:0};}
const int=(v,min,max)=>Number.isSafeInteger(v)&&v>=min&&v<=max;
const num=(v,min,max)=>Number.isFinite(v)&&v>=min&&v<=max;
const object=v=>v&&typeof v==='object'&&!Array.isArray(v);
function inventory(v){return object(v)&&Object.entries(v).length<=Object.keys(ITEMS).length&&Object.entries(v).every(([k,n])=>Object.hasOwn(ITEMS,k)&&int(n,1,100000));}
export function decodeSave(raw){try{
 if(typeof raw!=='string'||raw.length>250000)return null;const s=JSON.parse(raw);if(!object(s))return null;
 if(s.version===1){if(!Array.isArray(s.herbs)||!s.herbs.every(n=>int(n,0,6))||typeof s.hut!=='boolean'||typeof s.ride!=='boolean'||!num(s.best,0,400))return null;const migrated=freshState();migrated.hut=s.hut;migrated.ride=s.ride;migrated.herbs=[...new Set(s.herbs)];migrated.best=s.best;if(migrated.herbs.length)migrated.inventory.herb=migrated.herbs.length;for(const i of migrated.herbs)migrated.gathered['herb'+i]=1;return migrated;}
 if(s.version===2){s.version=3;s.adventure=freshAdventure();s.position={...s.position,region:'alp'};}
 if(s.version===3){s.version=4;s.climbing=freshClimbing();}
 if(s.version===4){s.version=5;s.farm=freshFarm(s.day);}
 if(s.version===5){s.version=6;s.village=freshVillage();}
 if(s.version===6){s.version=7;s.ski=freshSki();}
 if(s.version===7){s.version=8;s.targets=freshTargets();}
 if(s.version===8){s.version=9;s.jass=freshJass();}
 if(s.version===9){s.version=10;s.arcade=freshArcade();}
 if(s.version===10){s.version=11;s.estate=freshEstate();if(s.farm?.animals&&!Object.hasOwn(s.farm.animals,'goats'))s.farm.animals.goats=freshFarm(s.day).animals.goats;}
 // Relocate a saved training session from the former farm wall to the mountain trail.
 if(s.climbing?.checkpoint?.route==='training'&&s.position?.region==='alp'&&Array.isArray(s.adventure?.visited)&&Math.hypot(s.position.x+6,s.position.z+9.5)<2.4){s.position.region='panorama';if(!s.adventure.visited.includes('panorama'))s.adventure.visited.push('panorama');}
 if(s.version!==11||typeof s.hut!=='boolean'||typeof s.ride!=='boolean'||!Array.isArray(s.herbs)||!s.herbs.every(n=>int(n,0,6))||new Set(s.herbs).size!==s.herbs.length||!num(s.best,0,400))return null;
 if(!int(s.day,1,100000)||!int(s.coins,0,1000000000)||!num(s.energy,0,100)||!num(s.stamina,0,100)||!inventory(s.inventory)||!inventory(s.storage))return null;
 const nodes=new Set(RESOURCE_NODES.map(n=>n.id).concat(Array.from({length:7},(_,i)=>'herb'+i)));
 if(!object(s.gathered)||!Object.entries(s.gathered).every(([k,v])=>nodes.has(k)&&int(v,1,s.day)))return null;
 if(!Array.isArray(s.claimed)||!s.claimed.every(k=>QUESTS.some(q=>q.id===k))||new Set(s.claimed).size!==s.claimed.length)return null;
 if(!object(s.stats)||!['gathers','crafts','sales','earned','spent'].every(k=>int(s.stats[k],0,1000000000)))return null;
 if(!Array.isArray(s.ledger)||s.ledger.length>60||!s.ledger.every(e=>object(e)&&int(e.day,1,s.day)&&int(e.delta,-1000000000,1000000000)&&(['buy','sell'].includes(e.reason)?Object.hasOwn(ITEMS,e.ref):(e.reason==='build'&&Object.hasOwn(UPGRADES,e.ref)||e.reason==='staff'&&['dairy','chocolate','cook','service','hotel'].includes(e.ref)||e.reason==='hospitality'&&['restaurant','hotel'].includes(e.ref)||e.reason==='quest'&&QUESTS.some(q=>q.id===e.ref)||e.reason==='treasure'&&TREASURES.some(t=>t.id===e.ref)||e.reason==='order'&&ORDERS.some(o=>o.id===e.ref)||e.reason==='meal'&&Object.hasOwn(MEALS,e.ref)||e.reason==='challenge'&&(e.ref==='jass'||Object.keys(SKI_LEVELS).some(k=>e.ref==='ski-'+k)||Object.keys(TARGET_STARTS).some(kind=>Object.keys(TARGET_LEVELS).some(k=>e.ref===kind+'-'+k)))))))return null;
 if(s.environment===undefined)s.environment=freshEnvironment();if(!validEnvironment(s.environment))return null;
 if(s.activities===undefined)s.activities=freshActivities();if(s.activities&&s.activities.starterGiven===undefined)s.activities.starterGiven=false;if(s.activities&&s.activities.camp===undefined)s.activities.camp=null;if(s.activities&&s.activities.rides===undefined)s.activities.rides=freshRides();if(!validActivities(s.activities))return null;if(s.survival===undefined)s.survival={hunger:100,thirst:100};if(!object(s.survival)||!['hunger','thirst'].every(k=>num(s.survival[k],0,100)))return null;
 if(s.estate&&s.estate.decor===undefined)s.estate.decor=freshEstate().decor;if(s.estate&&s.estate.business===undefined)s.estate.business=freshEstate().business;if(s.estate?.built)for(const k of ['hut','restaurant','spa','playground','upperfloor','restaurantPlus','hotel','pasture','tools','silo'])if(!Object.hasOwn(s.estate.built,k))s.estate.built[k]=0;if(!validEstate(s.estate,s.day))return null;if(s.alpLife===undefined)s.alpLife=freshAlpLife();if(s.alpLife&&s.alpLife.hayStored===undefined)s.alpLife.hayStored=0;if(s.alpLife&&s.alpLife.housed===undefined)s.alpLife.housed=freshAlpLife().housed;if(s.alpLife&&s.alpLife.hayCollected===undefined)s.alpLife.hayCollected=s.alpLife.hayTakenDay===s.alpLife.hayCutDay&&s.alpLife.hayTakenDay>0?32:0;if(!validAlpLife(s.alpLife,s.day))return null;
 const a=s.adventure;if(!object(a)||!Array.isArray(a.visited)||!a.visited.includes('alp')||!a.visited.every(k=>Object.hasOwn(REGIONS,k))||new Set(a.visited).size!==a.visited.length||!Array.isArray(a.discoveries)||!a.discoveries.every(k=>DISCOVERIES.includes(k))||new Set(a.discoveries).size!==a.discoveries.length||!Array.isArray(a.treasures)||!a.treasures.every(k=>TREASURES.some(t=>t.id===k))||new Set(a.treasures).size!==a.treasures.length||typeof a.secretOpen!=='boolean'||!Array.isArray(a.dials)||a.dials.length!==3||!a.dials.every(n=>int(n,0,2)))return null;
 if(s.dairy===undefined)s.dairy=freshDairy();if(!validDairy(s.dairy,s.day))return null;
 if(s.home===undefined)s.home=freshHome();if(!validHome(s.home))return null;
 const p=s.position;if(!object(p)||!num(p.x,p.region==='alp'?-54:-37,p.region==='alp'?54:37)||!num(p.z,p.region==='alp'?-50:-30,p.region==='alp'?50:29)||typeof p.inside!=='boolean'||!Object.hasOwn(REGIONS,p.region)||!a.visited.includes(p.region)||p.inside&&p.region!=='alp')return null;
 const c=s.climbing;if(!object(c)||!Array.isArray(c.completed)||new Set(c.completed).size!==c.completed.length||!c.completed.every(k=>Object.hasOwn(CLIMBS,k))||!object(c.best)||!Object.entries(c.best).every(([k,v])=>Object.hasOwn(CLIMBS,k)&&c.completed.includes(k)&&int(v,0,1000)))return null;
 if(c.checkpoint!==null){const cp=c.checkpoint,r=CLIMBS[cp?.route];if(!object(cp)||!r||!int(cp.node,0,r.nodes.length-1)||!r.nodes[cp.node].rest||!num(cp.time,0,10000000)||!int(cp.faults,0,1000000)||p.inside||p.region!==r.region||Math.hypot(p.x-r.entry[0],p.z-r.entry[1])>2.4)return null;}
 const f=s.farm;if(!object(f)||f.day!==s.day||!object(f.animals)||Object.keys(f.animals).length!==Object.keys(ANIMALS).length||!Object.keys(ANIMALS).every(id=>{const a=f.animals[id];return object(a)&&['feedDay','waterDay','careDay','produceDay'].every(k=>int(a[k],0,s.day))&&int(a.trust,0,100);})||!['careActions','harvests'].every(k=>int(f[k],0,1000000000))||!int(f.completeDays,0,s.day)||!int(f.lastCompleteDay,0,s.day)||!int(f.supplyDay,0,s.day)||f.wellDay!==s.day||!int(f.wellPortions,0,12)||f.wellPortions%3!==0)return null;
 const v=s.village,unique=(a,allowed)=>Array.isArray(a)&&a.length<=allowed.length&&new Set(a).size===a.length&&a.every(k=>allowed.includes(k));
 if(!object(v)||!unique(v.met,Object.keys(VILLAGERS))||!unique(v.topics,Object.values(VILLAGERS).flatMap(n=>Object.keys(n.topics).map(k=>n.id+':'+k)))||!unique(v.accepted,ORDERS.map(o=>o.id))||!unique(v.completed,ORDERS.map(o=>o.id))||!v.topics.every(k=>v.met.includes(k.split(':')[0]))||!v.accepted.every(k=>{const order=ORDERS.find(o=>o.id===k);return v.met.includes(order.npc)&&order.requires.every(r=>v.completed.includes(r));})||!v.completed.every(k=>v.accepted.includes(k)))return null;
 if(!validSki(s.ski,s)||!validTargets(s.targets,s)||!validJass(s.jass,s)||!validArcade(s.arcade,s))return null;
 const o=s.settings;if(object(o)&&o.radioTrack===undefined)o.radioTrack=0;if(!int(o?.radioTrack,0,11))return null;if(object(o)&&o.cameraRevision===undefined)o.cameraRevision=0;if(object(o)&&o.avatar===undefined)o.avatar='man';if(!object(o)||![0,2].includes(o.cameraRevision)||!CHARACTER_IDS.includes(o.avatar)||!['musicEnabled','soundEnabled','overview'].every(k=>typeof o[k]==='boolean')||!num(o.musicVolume,0,1)||!num(o.volume,0,1)||!num(o.angle,-Math.PI*2,Math.PI*2)||!num(o.zoom,.75,1.5))return null;
 if(!int(s.savedAt,0,10000000000000)||!int(s.revision,0,1000000000))return null;
 // Copy a whitelist, never merge imported object keys into live application objects.
 const clean=freshState();for(const k of Object.keys(clean))clean[k]=s[k];return JSON.parse(JSON.stringify(clean));
 }catch{return null;}}
export function createSaveStore(storage,now=()=>Date.now()){
 let baselineRaw=null;
 let status={ok:true,recovered:false,blocked:false,lastSavedAt:0,message:'Automatisches Speichern bereit.'};
 function read(key){try{return storage.getItem(key);}catch{status={...status,ok:false,message:'Gerätespeicher ist nicht verfügbar. Sichere den Spielstand als Datei.'};return null;}}
 return{
 get status(){return{...status};},
 load(){const raw=read(SAVE_KEY),backup=read(BACKUP_KEY),a=decodeSave(raw),b=decodeSave(backup);baselineRaw=raw;if(a){status.lastSavedAt=a.savedAt;return a;}if(b){status={...status,recovered:true,lastSavedAt:b.savedAt,message:'Spielstand aus der lokalen Sicherung wiederhergestellt.'};return b;}if(raw!==null||backup!==null)status={...status,ok:false,blocked:true,message:'Gespeicherte Daten sind beschädigt. Automatisches Überschreiben wurde angehalten. Lade eine Spielstanddatei oder beginne ausdrücklich neu.'};return freshState();},
 write(state,{allowReplace=false}={}){if(status.blocked&&!allowReplace)return{ok:false,message:status.message};let previous;try{previous=storage.getItem(SAVE_KEY);}catch{status={...status,ok:false,message:'Gerätespeicher ist gesperrt. Bitte sichere deinen Spielstand als Datei.'};return{ok:false,message:status.message};}const current=decodeSave(previous);if(!allowReplace&&current&&previous!==baselineRaw){status={...status,ok:false,blocked:true,message:'In einem anderen Tab wurde ein Spielstand gespeichert. Lade die Seite neu oder sichere deinen aktuellen Stand als Datei. Automatisches Überschreiben ist angehalten.'};return{ok:false,message:status.message};}const candidate={...state,savedAt:now(),revision:Math.min(1000000000,Math.max(state.revision,current?.revision||0)+1)},raw=JSON.stringify(candidate);if(!decodeSave(raw)){status={...status,ok:false,message:'Dieser Spielstand ist ungültig und wurde nicht gespeichert.'};return{ok:false,message:status.message};}try{if(previous&&decodeSave(previous))storage.setItem(BACKUP_KEY,previous);storage.setItem(SAVE_KEY,raw);if(storage.getItem(SAVE_KEY)!==raw)throw new Error('readback');baselineRaw=raw;state.savedAt=candidate.savedAt;state.revision=candidate.revision;status={ok:true,recovered:false,blocked:false,lastSavedAt:state.savedAt,message:'Automatisch auf diesem Gerät gespeichert.'};return{ok:true,message:status.message};}catch{status={...status,ok:false,message:'Speichern auf diesem Gerät fehlgeschlagen. Bitte Spielstand als Datei sichern.'};return{ok:false,message:status.message};}},
 export(state){const raw=JSON.stringify({...state,savedAt:now()},null,2);if(!decodeSave(raw))throw new Error('Ungültiger Spielstand.');return raw;}
 };
}

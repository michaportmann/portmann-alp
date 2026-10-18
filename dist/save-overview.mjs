import {CHARACTER_CHOICES} from './character-profiles.mjs';
import {REGIONS,ADVENTURE_REGIONS} from './regions.mjs';
import {HOME_NAMES} from './home-layout.mjs';
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function saveOverview(s){
 const discoveries=Number(s.hut)+Number(s.ride)+Number(s.herbs.length>=3);
 return{character:CHARACTER_CHOICES.find(c=>c.id===s.settings.avatar)?.name||'Unbekannt',day:s.day,place:s.position.inside?'Alphütte · '+HOME_NAMES[s.home.floor]:REGIONS[s.position.region]?.name||s.position.region,coins:'CHF '+(s.coins/100).toFixed(2),energy:Math.round(s.energy),items:Object.values(s.inventory).reduce((a,b)=>a+b,0),discoveries,discoveryPercent:Math.round(discoveries/3*100),regions:ADVENTURE_REGIONS.filter(r=>s.adventure.visited.includes(r)).length,orders:s.village.completed.length,quests:s.claimed.length,savedAt:s.savedAt,revision:s.revision};
}
export function saveTime(t){return t?new Date(t).toLocaleString('de-CH',{day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit'}):'Noch nicht gespeichert';}
export function saveCard(title,s,{source='',time=null,cloudRevision=null}={}){
 const v=saveOverview(s),pairs=[['Figur',v.character],['Spieltag','Tag '+v.day],['Ort',v.place],['Geld',v.coins],['Rucksack',v.items+' Gegenstände'],['Energie',v.energy+' / 100']];
 return '<section class="save-card"><h3>'+escape(title)+'</h3>'+(source?'<p class="save-source">'+escape(source)+'</p>':'')+'<dl>'+pairs.map(([k,x])=>'<div><dt>'+escape(k)+'</dt><dd>'+escape(x)+'</dd></div>').join('')+'</dl><label>Erste Entdeckungen: '+v.discoveries+' / 3 · '+v.discoveryPercent+' %<progress max="3" value="'+v.discoveries+'" aria-label="Erste Entdeckungen"></progress></label><p>'+v.regions+' / '+ADVENTURE_REGIONS.length+' Berggebiete · '+v.orders+' Dorfaufträge · '+v.quests+' Aufgabenbelohnungen abgeholt</p><small>Gespeichert: '+escape(saveTime(time??v.savedAt))+(cloudRevision!==null?' · Cloud-Version '+escape(cloudRevision):' · Geräteversion '+v.revision)+'</small></section>';
}

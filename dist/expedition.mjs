import {HOF} from './hof-layout.mjs';
import {exchangeInventory,rest} from './progression.mjs';
export const CAMP_REGIONS=['alp','panorama','wald','blumen','hochalp','grat','gipfel','see','pasture','valley'];
export function validCamp(c){return c===null||!!c&&CAMP_REGIONS.includes(c.region)&&Number.isFinite(c.x)&&Number.isFinite(c.z)&&Math.abs(c.x)<=(c.region==='alp'?54:37)&&c.z>=(c.region==='alp'?-50:-30)&&c.z<=(c.region==='alp'?50:29)&&typeof c.fire==='boolean';}
export function expeditionAction(s,action,safe=true){const c=s.activities.camp;
 if(action==='pitch'){if(!CAMP_REGIONS.includes(s.position.region)||s.position.inside||!safe)return{ok:false,message:'Suche eine freie, ebene Wiesenfläche neben dem Weg. Kein Zelt im Wasser, auf steilen Hängen oder in Gebäuden.'};if(!s.inventory.tent)return{ok:false,message:'Ein kleines Bergzelt erhältst du im Dorfladen.'};s.activities.camp={region:s.position.region,x:s.position.x,z:s.position.z,fire:false};return{ok:true,message:'Bergzelt aufgestellt. Dein Lager wird mit dem Spielstand gespeichert.'};}
 if(!c||c.region!==s.position.region||s.position.inside||Math.hypot(s.position.x-c.x,s.position.z-c.z)>4)return{ok:false,message:'Gehe zuerst zurück zu deinem aufgestellten Bergzelt.'};
 if(action==='pack'){s.activities.camp=null;return{ok:true,message:'Feuer gelöscht und Zelt eingepackt.'};}
 if(action==='fire'){if(c.fire)return{ok:false,message:'Das Lagerfeuer brennt bereits.'};const r=exchangeInventory(s,{take:{wood:2}});if(r.ok)c.fire=true;return r.ok?{ok:true,message:'Zwei Fallholz verbraucht. Dein Lagerfeuer brennt.'}:r;}
 if(action==='sleep'){const r=rest(s,true,true);if(r.ok)c.fire=false;return r;}
 return{ok:false,message:'Unbekannte Lageraktion.'};
}

export function canPitchCamp(pos,region,world,height,blocked){if(!CAMP_REGIONS.includes(region))return false;const y=height(pos.x,pos.z);for(const dx of[-1.4,-.7,0,.7,1.4,2.3])for(const dz of[-1.5,-.7,0,.7,1.5])if(blocked(pos.x+dx,pos.z+dz,world.colliders,.3)||Math.abs(height(pos.x+dx,pos.z+dz)-y)>.28)return false;
 if(region==='alp'&&Object.values(HOF.fields).some(f=>f.w&&Math.abs(pos.x-f.x)<f.w/2+2.3&&Math.abs(pos.z-f.z)<f.d/2+1.5))return false;
 if(world.interactive.some(n=>Math.hypot(pos.x-n.x,pos.z-n.z)<2.5))return false;
 return !(world.paths||[]).some(p=>p.points.some((b,i)=>{if(!i)return false;const a=p.points[i-1],dx=b[0]-a[0],dz=b[1]-a[1],t=Math.max(0,Math.min(1,((pos.x-a[0])*dx+(pos.z-a[1])*dz)/(dx*dx+dz*dz||1)));return Math.hypot(pos.x-a[0]-t*dx,pos.z-a[1]-t*dz)<p.width/2+2.3;}));}

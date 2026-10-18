import {saveButtonResult,paintSaveButton,SAVING_BUTTON} from './save-button.mjs';
import {createCloudSave,createSyncQueue} from './cloud-save.mjs';
import {createDurableSaveStore} from './durable-save.mjs';
import {decodeSave} from './save.mjs';
import {saveCard,saveTime} from './save-overview.mjs';
export function createCloudPanels({storage,$,dialog,closeDialog,snapshot,switchSave,save,download,cloud:providedCloud,onChange=()=>{},notify=()=>{},autoSync=true,getLocalStatus=()=>({ok:true}),waitLocal=()=>Promise.resolve()}){
 const cloud=providedCloud||createCloudSave({storage});
 let current='guest',message=cloud.status,phase='local',source='Gastspielstand · dieses Gerät',loadedAt=Date.now(),cloudStamp=null,recovery=false,changing=false,choosing=false,visible=false,syncTimer=null,manualFeedback=null;
 function cancelScheduled(){if(syncTimer!==null){clearTimeout(syncTimer);syncTimer=null;}}
 function schedule(){if(!autoSync||syncTimer!==null)return;syncTimer=setTimeout(()=>{syncTimer=null;flush();},2000);}
 async function flush(){cancelScheduled();if(!queue.blocked&&queue.dirty)set('syncing','Spielstand wird übertragen …');await queue.flush();}
 const titles={local:'Lokal gespeichert',loading:'Spielstand wird geladen …',syncing:'Wird synchronisiert …',synced:'Synchronisiert',pending:'Lokal gespeichert · Cloud ausstehend',offline:'Offline · lokal weiterspielen',conflict:'Konflikt · Auswahl nötig',selection:'Angemeldet · Spielstand auswählen',confirm:'E-Mail bestätigen',error:'Cloud-Fehler · lokal gesichert'};
 function set(next,text){phase=next;if(manualFeedback?.kind==='busy'&&['synced','offline','error','conflict'].includes(next))manualFeedback=saveButtonResult(getLocalStatus(),next);if(text)message=text;refresh();onChange();}
 function fail(e){set(e.message?.toLowerCase().includes('offline')?'offline':'error',e.message||'Cloud-Anfrage fehlgeschlagen.');}
 const queue=createSyncQueue({cloud,storage,snapshot,onConflict:()=>set('conflict','Zwei Geräte haben unterschiedliche Fortschritte. Wähle bewusst einen Stand.'),onStatus:(text,row)=>{if(row){cloudStamp={revision:row.revision,time:row.updated_at?Date.parse(row.updated_at):Date.now()};set(queue.dirty?'pending':'synced',queue.dirty?'Weitere Änderungen warten auf den Upload.':'Cloud-Version '+row.revision+' gespeichert · '+saveTime(cloudStamp.time));}else fail({message:text});}});
 function refresh(){
  if(!visible)return;
  const status=$('cloud-message');if(!status)return;
  status.textContent=message;
  const heading=$('cloud-state');if(heading)heading.textContent=titles[phase];
  const progress=$('cloud-loading');if(progress)progress.hidden=!['loading','syncing'].includes(phase);
  const account=$('cloud-identity');if(account)account.textContent=cloud.user?('Angemeldet: '+(cloud.user.email||'Spielkonto')+(current===cloud.user.id?' · Kontospielstand aktiv':' · aktuell noch Gast-/anderer Gerätestand')):'Gastmodus · nicht angemeldet';
  const card=$('cloud-active');if(card)card.innerHTML=saveCard('Aktuell im Spiel',snapshot(),{source:source+' · geladen '+saveTime(loadedAt)});
  const stamp=$('cloud-last-sync');if(stamp)stamp.textContent=cloudStamp?'Letzte Cloud-Bestätigung: '+saveTime(cloudStamp.time)+' · Version '+cloudStamp.revision:'Noch keine Cloud-Speicherung in dieser Sitzung bestätigt.';
  for(const id of ['cloud-sync','cloud-select','cloud-logout','cloud-delete','cloud-login','cloud-signup','cloud-recover','cloud-password-save']){const b=$(id);if(b)b.disabled=changing;}if(manualFeedback)paintSaveButton($('cloud-sync'),manualFeedback);
 }
 function view(){
  visible=true;
  dialog('<span class="eyebrow">PORTMANN · DEIN SPIELSTAND</span><h2>Konto & Cloud</h2><p id="cloud-identity"></p><section class="save-state" aria-live="polite"><strong id="cloud-state"></strong><progress id="cloud-loading" aria-label="Cloud-Anfrage läuft" hidden></progress><p id="cloud-message" role="status"></p><small id="cloud-last-sync"></small></section><div id="cloud-active"></div>'+(cloud.user?'<div class="actions"><button id="cloud-sync">Jetzt speichern</button><button id="cloud-select">Spielstände vergleichen</button><button id="cloud-logout">Abmelden</button><button id="cloud-delete">Cloud-Spielstand löschen</button></div>':'<p>Als Gast bleibt dein Fortschritt auf diesem Gerät. Mit einem Konto kannst du auf deinen anderen Geräten weiterspielen.</p><label>E-Mail <input id="cloud-email" type="email" autocomplete="email"></label><label>Passwort <input id="cloud-password" type="password" minlength="8" autocomplete="current-password"></label><div class="actions"><button id="cloud-login">Anmelden</button><button id="cloud-signup">Registrieren</button><button id="cloud-recover">Passwort vergessen</button></div>')+(recovery?'<label>Neues Passwort <input id="cloud-new-password" type="password" minlength="8" autocomplete="new-password"></label><button id="cloud-password-save">Passwort ändern</button>':'')+'<div class="actions"><button id="cloud-play" class="primary">Mit diesem Stand weiterspielen</button><button id="cloud-backup">Spielstanddatei sichern</button></div>');
  $('cloud-backup').onclick=download;$('cloud-play').onclick=()=>{visible=false;closeDialog();};
  const run=fn=>async()=>{if(changing)return;changing=true;refresh();try{await fn();}catch(e){choosing=false;fail(e);if(manualFeedback?.kind==='busy')manualFeedback=saveButtonResult(getLocalStatus(),'error');}finally{changing=false;if(!choosing)view();}};
  if(!cloud.user){
   for(const signup of[false,true])$(signup?'cloud-signup':'cloud-login').onclick=run(async()=>{const email=$('cloud-email').value.trim(),password=$('cloud-password').value;if(!email||password.length<8)throw Error('E-Mail und mindestens 8 Zeichen Passwort eingeben.');set('loading',signup?'Registrierung wird angelegt …':'Konto wird angemeldet …');await cloud.authenticate(email,password,signup);if(cloud.user)await connect();else set('confirm',cloud.status);});
   $('cloud-recover').onclick=run(async()=>{set('loading','Passwort-Mail wird angefordert …');set('confirm',await cloud.recover($('cloud-email').value.trim()));});
  }else{
   $('cloud-sync').onclick=run(async()=>{manualFeedback=SAVING_BUTTON;refresh();save();await waitLocal();if(getLocalStatus().ok)await saveNow();manualFeedback=saveButtonResult(getLocalStatus(),cloud.user?phase:null);refresh();});
   $('cloud-select').onclick=run(choose);
   $('cloud-logout').onclick=run(async()=>{save();cancelScheduled();queue.reset();manualFeedback=null;try{await cloud.logout();}finally{const store=await createDurableSaveStore(storage);await switchSave(store,store.load());current='guest';source='Gastspielstand · dieses Gerät';loadedAt=Date.now();cloudStamp=null;set('local','Abgemeldet. Dein Gastspielstand ist wieder aktiv.');}});
   $('cloud-delete').onclick=()=>{visible=false;dialog('<h2>Cloud-Spielstand löschen?</h2><p>Die lokale Kopie bleibt erhalten. Das Benutzerkonto selbst bleibt bestehen.</p><button id="cloud-delete-confirm">Cloud-Spielstand endgültig löschen</button><button id="cloud-delete-cancel">Abbrechen</button>');$('cloud-delete-cancel').onclick=view;$('cloud-delete-confirm').onclick=async()=>{try{cancelScheduled();queue.reset();await cloud.deleteSave();cloudStamp=null;set('local',cloud.status);}catch(e){fail(e);}view();};};
  }
  if(recovery)$('cloud-password-save').onclick=run(async()=>{const p=$('cloud-new-password').value;if(p.length<8)throw Error('Mindestens 8 Zeichen verwenden.');set('loading','Passwort wird geändert …');await cloud.updatePassword(p);recovery=false;await connect();});
  refresh();
 }
 async function choose(){
  choosing=true;save();cancelScheduled();queue.reset();set('loading','Cloud und Kontospielstand dieses Geräts werden gelesen …');
  const id=cloud.user.id,local=await createDurableSaveStore(storage,{namespace:':account:'+id}),remote=await cloud.read(),localSave=local.load(),guest=snapshot();
  visible=false;phase='selection';message='Vergleiche die Stände und wähle den gewünschten Fortschritt.';
  dialog('<h2>Mit welchem Spielstand weiterspielen?</h2><p>Vergleiche Figur, Spieltag und Fortschritt vor dem Laden. Die Auswahl ersetzt den aktiven Stand; eine Dateisicherung bleibt möglich.</p><div class="save-options">'+(remote?saveCard('Cloud',remote.save_data,{source:'Auf deinen Geräten verfügbar',time:Date.parse(remote.updated_at),cloudRevision:remote.revision})+'<button id="cloud-use-remote">Diesen Cloud-Spielstand laden</button>':'<p>Noch kein Cloud-Spielstand vorhanden.</p>')+saveCard('Kontostand dieses Geräts',localSave,{source:'Lokale Kontokopie'})+'<button id="cloud-use-local">Kontospielstand dieses Geräts verwenden</button>'+(current==='guest'?saveCard('Aktueller Gastspielstand',guest,{source:'Bisher ohne Konto gespielt'})+'<button id="cloud-use-guest">Meinen Gastspielstand übernehmen</button>':'')+'</div><div class="actions"><button id="cloud-select-backup">Aktuellen Stand herunterladen</button><button id="cloud-cancel">Abbrechen</button></div>');
  $('cloud-select-backup').onclick=download;$('cloud-cancel').onclick=()=>{choosing=false;set('selection','Auswahl abgebrochen. Der bisherige Spielstand bleibt aktiv; Cloud-Synchronisierung pausiert.');view();};
  async function use(state,base,push,origin){
   if(changing)return;changing=true;choosing=false;view();set('loading',origin+' wird geladen …');
   try{if(!decodeSave(JSON.stringify(state)))throw Error('Spielstand ungültig.');await switchSave(local,state);current=id;source=origin;loadedAt=Date.now();cloudStamp=remote?{revision:remote.revision,time:Date.parse(remote.updated_at)}:null;queue.activate(id,base);save();if(push){queue.mark();set('syncing','Stand geladen. Cloud-Speicherung läuft …');await flush();}else set('pending','Cloud-Spielstand geladen. Lokale Sicherung aktualisiert.');notify(origin+' geladen · Tag '+state.day);}
   catch(e){fail(e);}finally{changing=false;view();}
  }
  if(remote)$('cloud-use-remote').onclick=()=>use(remote.save_data,remote.revision,false,'Cloud-Spielstand');
  $('cloud-use-local').onclick=()=>use(localSave,remote?.revision??-1,true,'Kontospielstand dieses Geräts');
  if(current==='guest')$('cloud-use-guest').onclick=()=>use(guest,remote?.revision??-1,true,'Übernommener Gastspielstand');
 }
 async function connect(){
  if(manualFeedback?.kind!=='busy')manualFeedback=null;
  const id=cloud.user?.id;if(!id)return;
  save();cancelScheduled();queue.reset();set('loading','Dein Kontospielstand wird automatisch geladen …');
  const guest=snapshot(),meta=queue.metadata(id),local=await createDurableSaveStore(storage,{namespace:':account:'+id});
  if(local.status.blocked){set('error','Lokaler Kontostand beschädigt. Über Spielstände vergleichen eine intakte Kopie wählen.');return;}
  const localState=local.load();
  if(meta){await switchSave(local,localState);current=id;source='Kontospielstand dieses Geräts';loadedAt=Date.now();queue.activate(id,meta.revision);if(meta.dirty)queue.mark();}
  try{
   await cloud.restore();const remote=await cloud.read();
   if(meta?.dirty&&(remote?.revision??-1)!==meta.revision){cancelScheduled();queue.reset();set('conflict','Gerät und Cloud wurden unabhängig verändert. Bitte über Spielstände vergleichen den gewünschten Stand wählen.');return;}
   const incoming=meta?.dirty?localState:remote?remote.save_data:(meta||localState.savedAt>0?localState:guest);
   cancelScheduled();queue.reset();await switchSave(local,incoming);current=id;source=remote&&!meta?.dirty?'Cloud-Spielstand':'Kontospielstand dieses Geräts';loadedAt=Date.now();cloudStamp=remote?{revision:remote.revision,time:Date.parse(remote.updated_at)}:null;
   queue.activate(id,remote?.revision??-1);
   if(!remote||meta?.dirty){queue.mark();set('syncing','Kontospielstand ist aktiv und wird gespeichert …');await flush();}
   else set('synced','Dein Kontospielstand wurde automatisch geladen · '+saveTime(cloudStamp.time));
   notify('Kontospielstand aktiv · Tag '+incoming.day);
  }catch(e){fail(e);}
 }
 async function saveNow(){
  if(!cloud.user)return;
  if(phase==='conflict'){await choose();return;}
  if(current!==cloud.user.id||queue.blocked){await connect();return;}
  queue.mark();await flush();
 }
 return{open:view,get status(){return titles[phase]+' · '+message;},get phase(){return phase;},get identity(){return cloud.user?(current===cloud.user.id?'Konto aktiv':'Angemeldet · Verbindung wird vorbereitet'):'Gast';},overview(){return saveCard('Dein aktiver Spielstand',snapshot(),{source:source+' · '+titles[phase]});},changed(){queue.mark();if(current===cloud.user?.id&&!queue.blocked&&phase!=='loading'){if(phase!=='syncing')set('pending','Auf dem Gerät gespeichert; wird automatisch synchronisiert.');schedule();}else refresh();},flush,saveNow,async init(){
  if(typeof location!=='undefined'&&location.hash.includes('access_token')){set('loading','E-Mail-Bestätigung wird geprüft …');const r=await cloud.acceptRedirect(location.hash);history.replaceState(null,'',location.pathname+location.search);recovery=r==='recovery';if(recovery){set('selection','Neues Passwort in Konto & Cloud eingeben.');return;}await connect();return;}
  if(cloud.user)await connect();
 }};
}

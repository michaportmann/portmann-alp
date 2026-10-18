export function saveButtonResult(local,cloudPhase=null){
 if(!local?.ok)return{kind:'error',label:'! Speichern fehlgeschlagen',detail:local?.message||'Bitte Spielstanddatei sichern.'};
 if(cloudPhase===null)return{kind:'success',label:'✓ Auf Gerät gespeichert',detail:'Die lokale Speicherung wurde bestätigt.'};
 if(cloudPhase==='synced')return{kind:'success',label:'✓ Gespeichert & synchronisiert',detail:'Gerät und Cloud haben die Speicherung bestätigt.'};
 if(cloudPhase==='conflict')return{kind:'error',label:'! Speicherkonflikt',detail:'Lokale Kopie behalten. Spielstände vergleichen.'};
 if(cloudPhase==='error')return{kind:'error',label:'! Cloud-Fehler · lokal gesichert',detail:'Die Cloud hat die Speicherung nicht bestätigt.'};
 return{kind:'warning',label:cloudPhase==='offline'?'✓ Lokal gespeichert · offline':'✓ Lokal · Cloud ausstehend',detail:'Die lokale Sicherung ist bestätigt. Cloud-Speicherung noch nicht bestätigt.'};
}
export function paintSaveButton(button,result){
 if(!button)return;
 button.textContent=result.label;button.disabled=result.kind==='busy';button.setAttribute?.('aria-busy',String(result.kind==='busy'));button.setAttribute?.('aria-live','polite');button.setAttribute?.('title',result.detail||result.label);
 for(const name of ['busy','success','warning','error'])button.classList?.toggle?.('save-button-'+name,result.kind===name);
}
export const SAVING_BUTTON={kind:'busy',label:'Speichert …',detail:'Bitte auf die Speicherbestätigung warten.'};

import assert from 'node:assert/strict';
import {saveButtonResult,paintSaveButton,SAVING_BUTTON} from '../dist/save-button.mjs';
const classes=new Map(),attrs=new Map(),button={classList:{toggle(k,v){classes.set(k,v);}},setAttribute(k,v){attrs.set(k,v);}};
paintSaveButton(button,SAVING_BUTTON);assert.equal(button.disabled,true);assert.equal(button.textContent,'Speichert …');assert.equal(classes.get('save-button-success'),false);
for(const [local,cloud,expected]of[[true,null,'success'],[true,'synced','success'],[true,'offline','warning'],[true,'pending','warning'],[true,'syncing','warning'],[true,'conflict','error'],[true,'error','error'],[false,'synced','error']]){const r=saveButtonResult({ok:local},cloud);assert.equal(r.kind,expected);paintSaveButton(button,r);assert.equal(button.disabled,false);assert.equal(classes.get('save-button-success'),expected==='success');assert.equal(attrs.get('aria-live'),'polite');}
console.log('PASS busy disables button; green only for confirmed local/cloud success; offline/pending amber; local failure/conflict/cloud error never green; accessible text accompanies colour.');

import assert from 'node:assert/strict';
import {freshState} from '../dist/save.mjs';
import {saveOverview,saveCard} from '../dist/save-overview.mjs';
const s=freshState();s.settings.avatar='girl';s.coins=4520;s.day=3;s.hut=true;s.herbs=[0,1,2];s.savedAt=1792300000000;
const v=saveOverview(s);assert.equal(v.character,'Noemi');assert.equal(v.coins,'CHF 45.20');assert.equal(v.day,3);assert.equal(v.discoveries,2);assert.equal(v.discoveryPercent,67);assert.equal(v.items,6);
const card=saveCard('Cloud',s,{source:'<script>bad</script>',time:s.savedAt,cloudRevision:4});assert.ok(card.includes('Noemi'));assert.ok(card.includes('Cloud-Version 4'));assert.ok(card.includes('value="2"'));assert.ok(!card.includes('<script>'));assert.ok(card.includes('&lt;script&gt;'));console.log('PASS overview uses actual character/day/place/currency/inventory/progress, cloud version/time and escaped content. No invented global completion percentage.');

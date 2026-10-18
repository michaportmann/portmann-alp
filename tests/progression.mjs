import assert from 'node:assert/strict';
import {freshState,decodeSave,createSaveStore,SAVE_KEY,BACKUP_KEY} from '../dist/save.mjs';
import {ITEMS,RECIPES,RESOURCE_NODES,SHOP,QUESTS,collect,craft,consume,trade,claimQuest,rest,transfer,tickVitals,sellPrice} from '../dist/progression.mjs';

const mem=()=>{const data=new Map();return{data,getItem:k=>data.get(k)??null,setItem:(k,v)=>data.set(k,v)};};
const storage=mem(),store=createSaveStore(storage,()=>123456),s=store.load();
assert.deepEqual(s,freshState());s.position={x:12,z:-11,inside:true,region:'alp'};s.settings.volume=.61;
assert.equal(store.write(s).ok,true);assert.equal(s.revision,1);s.coins=4500;assert.equal(store.write(s).ok,true);
assert.equal(JSON.parse(storage.getItem(BACKUP_KEY)).coins,2500);
const reopened=createSaveStore(storage).load();assert.equal(reopened.coins,4500);assert.deepEqual(reopened.position,s.position);assert.equal(reopened.settings.volume,.61);
storage.setItem(SAVE_KEY,'truncated');const recovering=createSaveStore(storage),recovered=recovering.load();assert.equal(recovered.coins,2500);assert.equal(recovering.status.recovered,true);assert.equal(recovering.write(recovered).ok,true);
storage.setItem(SAVE_KEY,'bad');storage.setItem(BACKUP_KEY,'bad');const damaged=createSaveStore(storage),fresh=damaged.load();assert.equal(damaged.status.blocked,true);assert.equal(damaged.write(fresh).ok,false);assert.equal(storage.getItem(SAVE_KEY),'bad');assert.equal(damaged.write(fresh,{allowReplace:true}).ok,true);
const unavailable=createSaveStore({getItem(){throw Error('blocked')},setItem(){throw Error('blocked')}});const unsaved=unavailable.load();assert.equal(unavailable.status.ok,false);assert.equal(unavailable.write(unsaved).ok,false);assert.ok(decodeSave(unavailable.export(unsaved)),'export works even if device storage blocked');
const quota=mem(),quotaStore=createSaveStore(quota);quotaStore.load();quotaStore.write(freshState());const previous=quota.getItem(SAVE_KEY);quota.setItem=()=>{throw Error('quota')};assert.equal(quotaStore.write(freshState()).ok,false);assert.equal(quota.getItem(SAVE_KEY),previous,'quota error preserves previous main save');
const shared=mem(),tabA=createSaveStore(shared),tabB=createSaveStore(shared),stateA=tabA.load(),stateB=tabB.load();assert.equal(tabA.write(stateA).ok,true);assert.equal(tabB.write(stateB).ok,false,'another tab cannot silently overwrite the newer save');assert.equal(tabB.status.blocked,true);assert.equal(tabB.write(stateB,{allowReplace:true}).ok,true);assert.equal(stateB.revision,2);
const legacy=decodeSave(JSON.stringify({version:1,hut:true,ride:true,herbs:[0,2],best:400}));assert.equal(legacy.version,11);assert.equal(legacy.inventory.herb,2);assert.equal(legacy.gathered.herb2,1);assert.equal(legacy.ride,true);
const deployedV2=freshState();deployedV2.version=2;delete deployedV2.adventure;delete deployedV2.position.region;deployedV2.coins=3210;const upgraded=decodeSave(JSON.stringify(deployedV2));assert.equal(upgraded.version,11);assert.equal(upgraded.coins,3210);assert.equal(upgraded.position.region,'alp');
for(const mutate of[s=>s.coins=-1,s=>s.energy=NaN,s=>s.day=0,s=>s.inventory={unknown:5},s=>s.inventory={wood:-1},s=>s.position.x=1000,s=>s.claimed=['unknown'],s=>s.gathered={bad:1},s=>s.settings.volume=8,s=>s.version=99]){const malformed=freshState();mutate(malformed);assert.equal(decodeSave(JSON.stringify(malformed)),null);}
assert.equal(decodeSave('no'),null);assert.equal(decodeSave('x'.repeat(250001)),null);

const player=freshState(),wood=RESOURCE_NODES.find(n=>n.item==='wood');assert.equal(collect(player,wood).ok,true);const gathered=JSON.stringify(player);assert.equal(collect(player,wood).ok,false);assert.equal(JSON.stringify(player),gathered,'no duplicate collection');
assert.equal(craft(player,'plank','bench').ok,true);assert.equal(player.inventory.plank,2);assert.equal(player.stats.crafts,1);
const before=JSON.stringify(player);assert.equal(craft(player,'rope','gear').ok,false);assert.equal(JSON.stringify(player),before,'failed craft is atomic');
assert.equal(craft(player,'plank','kitchen').ok,false);player.energy=0;assert.equal(consume(player,'bread').ok,true);assert.equal(player.energy,22);assert.equal(player.inventory.bread,1);player.energy=100;assert.equal(consume(player,'bread').ok,false);assert.equal(player.inventory.bread,1);
player.coins=0;const broke=JSON.stringify(player);assert.equal(trade(player,'pickaxe','buy',true).ok,false);assert.equal(JSON.stringify(player),broke);assert.equal(trade(player,'plank','sell',false).ok,false);assert.equal(trade(player,'plank','sell',true).ok,true);assert.equal(player.stats.sales,1);assert.equal(player.coins,sellPrice('plank'));
assert.equal(claimQuest(player,'trade').ok,true);const rewarded=player.coins;assert.equal(claimQuest(player,'trade').ok,false);assert.equal(player.coins,rewarded,'cannot claim a reward twice');
const day=player.day;assert.equal(rest(player,true,false).ok,false);assert.equal(player.day,day);assert.equal(rest(player,true,true).ok,true);assert.equal(collect(player,wood).ok,true,'renewable resources regenerate after sleep');
assert.equal(transfer(player,'plank',true,true).ok,true);assert.equal(transfer(player,'plank',false,false).ok,false);assert.equal(transfer(player,'plank',false,true).ok,true);
const full=freshState();full.inventory={stone:40};const fullSnapshot=JSON.stringify(full);assert.equal(collect(full,wood).ok,false);assert.equal(JSON.stringify(full),fullSnapshot);assert.equal(trade(full,'bread','buy',true).ok,false);assert.equal(full.coins,2500);
const exhausted=freshState();exhausted.energy=0;assert.equal(collect(exhausted,wood).ok,false);assert.equal(rest(exhausted,false,true).ok,true);assert.equal(collect(exhausted,wood).ok,true);
const miner=freshState(),ore=RESOURCE_NODES.find(n=>n.item==='ore');assert.equal(collect(miner,ore).ok,false);assert.equal(trade(miner,'pickaxe','buy',true).ok,true);assert.equal(collect(miner,ore).ok,true);
assert.equal(RECIPES.length,38);assert.equal(new Set(RECIPES.map(r=>r.id)).size,38);
for(const r of RECIPES){const cook=freshState();cook.inventory={...r.ingredients};assert.equal(craft(cook,r.id,r.station).ok,true,r.id);for(const[k,n]of Object.entries(r.output))assert.ok(cook.inventory[k]>=n);assert.ok(decodeSave(JSON.stringify(cook)),r.id+' serialises');}
const run=freshState();tickVitals(run,100,true);assert.equal(run.stamina,0);assert.ok(run.energy>=0);tickVitals(run,100,false);assert.equal(run.stamina,100);
// Buy/craft/sell must never yield a guaranteed merchant-money loop, even with multistage recipes.
const minimum=Object.fromEntries(SHOP.map(k=>[k,ITEMS[k][2]]));for(let pass=0;pass<30;pass++)for(const r of RECIPES){if(Object.keys(r.ingredients).every(k=>Number.isFinite(minimum[k]))){const cost=Object.entries(r.ingredients).reduce((a,[k,n])=>a+minimum[k]*n,0);for(const[k,n]of Object.entries(r.output))minimum[k]=Math.min(minimum[k]??Infinity,cost/n);}}
for(const[k,cost]of Object.entries(minimum))assert.ok(sellPrice(k)<=cost,k+' has no profitable merchant loop');
// An actual action chain survives a file roundtrip with every progress component intact.
player.position={x:-16,z:-2.7,inside:true,region:'alp'};player.hut=true;claimQuest(player,'hut');const file=store.export(player),roundtrip=decodeSave(file);for(const k of['inventory','storage','claimed','gathered','stats','position','coins','energy','day','ledger'])assert.deepEqual(roundtrip[k],player[k]);
console.log('PASS auto-save/reopen, backup recovery, corrupt-data guard, blocked/quota storage, v1 migration, strict imports, atomic collect/craft/trade, capacity, energy, free recovery, tool gate, 38 recipes, reward idempotency, merchant-loop audit, complete file roundtrip.');

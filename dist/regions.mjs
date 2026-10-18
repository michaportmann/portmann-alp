// Region graph and adventure rules, independent of rendering and storage.
export const REGIONS={
 villageshop:{name:'Dorfladen · Vorräte & Handwerk',kind:'house',map:[164,255],spawn:[0,3],bounds:[-5,5,-4,4],text:'Ein begehbarer Dorfladen mit Käsebedarf, Schokoladenzutaten, Lebensmitteln, Werkzeugen und Saisondekoration.'},
 danielhut:{name:'Daniels Tourenhütte · Gipfel',kind:'house',map:[130,25],spawn:[0,3],bounds:[-5,5,-4,4],text:'Eine warme Bergstube, Trockenplatz und zwei Schlafplätze bei Bergführer Daniel.'},
 alp:{name:'Portmann-Alp',kind:'meadow',map:[65,180],spawn:[-5,6],text:'Dein ruhiger Heimatort: Hütte, Brunnen, Scheune und Bergbach. Reitweide und Dorf sind frei erreichbar.'},
 village:{name:'Bergdorf',kind:'village',map:[130,265],spawn:[0,22],text:'Holzfassaden, ein Dorfbrunnen und ein Haus mit einer alten Geschichte.'},
 house:{name:'Dorfhaus · Stube',kind:'house',map:[195,290],spawn:[0,3],bounds:[-5,5,-4,4],text:'Eine alte Stube. Neben dem Ofen führt die Treppe hinunter in den Keller.'},
 cellar:{name:'Dorfhaus · Keller',kind:'cellar',map:[255,310],spawn:[0,4],bounds:[-6,6,-5,5],text:'Drei Steinräder, ein verborgener Türrahmen und ein Hinweis am alten Regal.'},
 passage:{name:'Verborgener Felsengang',kind:'passage',map:[320,265],spawn:[0,22],text:'Eine alte Verbindung durch den Berg. Kleine Laternen markieren den Rückweg.'},
 wald:{name:'1 · Arvenwald',kind:'forest',map:[365,200],spawn:[0,23],text:'Verzweigte Arven, moosige Felsen und ein Wegzeichen unter den Wurzeln.'},
 blumen:{name:'2 · Alpenrosenhang',kind:'flowers',map:[255,155],spawn:[0,23],text:'Blütenwiesen am Hang. Ein alter Grenzstein erzählt vom Weg zum Grat.'},
 see:{name:'3 · Spiegelsee',kind:'lake',map:[465,180],spawn:[0,23],text:'Ein Steg am klaren Bergsee und ein schmaler Weg am westlichen Ufer.'},
 schlucht:{name:'4 · Wasserfall-Schlucht',kind:'gorge',map:[485,105],spawn:[0,23],text:'Wasser stürzt zwischen Felswänden. Der Weg quert die Schlucht über eine Holzbrücke.'},
 hochalp:{name:'5 · Sonnenalp',kind:'highalp',map:[240,80],spawn:[0,23],text:'Offene Hochweiden, eine alte Unterstandshütte und die Spur eines früheren Hirten.'},
 kristall:{name:'6 · Kristallgrotte',kind:'crystal',map:[390,65],spawn:[0,22],text:'Mineraladern im Fels. Drei Wegzeichen erklären das Siegel einer alten Truhe.'},
 grat:{name:'7 · Adlergrat',kind:'ridge',map:[315,35],spawn:[0,23],text:'Ein ausgesetzter Höhenweg mit einer gesicherten Wanderroute und weitem Blick.'},
 gipfel:{name:'8 · Portmann-Gipfel',kind:'summit',map:[205,22],spawn:[0,23],text:'Der letzte Anstieg. Oben warten Gipfelbuch und ein Blick zurück über deine Route.'},
 restaurant:{name:'Bergrestaurant zum Gipfel',kind:'house',map:[80,315],spawn:[0,3],bounds:[-5,5,-4,4],text:'Eine warme Stube, die Speisekarte und Sämi am Jasstisch.'},
 city:{name:'Stadt · Altstadtplatz',kind:'village',map:[30,260],spawn:[0,22],text:'Ein kleiner Altstadtplatz. Melanies Laden liegt im Chalet im Nordwesten.'},
 arcadeshop:{name:'Melanies Laden · Retro-Ecke',kind:'house',map:[25,205],spawn:[0,3],bounds:[-5,5,-4,4],text:'Melanie, ein Spielautomat und eine Pause vom Bergweg.'},
 pasture:{name:'Jonnys Reitweide',kind:'pasture',map:[120,120],spawn:[0,22],text:'Jonny, offene Weiden und der frei zugängliche Grundparcours. Deinen Reitpark baust du an der Hüttenwerkbank aus.'},
 panorama:{name:'Panoramaweg · bergwärts',kind:'highalp',map:[100,60],spawn:[0,22],text:'Ein frei zugänglicher Serpentinenweg steigt von der Alp zur Hochalp. Weiter führen Grat und Gipfelweg.'},
 valley:{name:'Talweg · Wasser und Weiden',kind:'valley',map:[120,215],spawn:[-25,-20],text:'Ein abfallender Weg führt am Bach entlang ins Bergdorf. Von dort erreichst du die Stadt.'}
};
export const ADVENTURE_REGIONS=['wald','blumen','see','schlucht','hochalp','kristall','grat','gipfel'];
// Every edge includes both physical approach and safe arrival; no remote travel.
const E=(id,from,to,at,arrival,label)=>({id,from,to,x:at[0],z:at[1],arrival,name:label,range:2.1,gateway:true});
export const GATEWAYS=[
 E('village-fodder','village','villageshop',[14,-5.5],[0,2.8],'Dorfladen betreten'),E('shop-village','villageshop','village',[0,3.4],[14,-4.7],'Auf den Dorfplatz'),
 E('summit-hut','gipfel','danielhut',[-15,-8.5],[0,2.6],'Daniels Tourenhütte betreten'),E('hut-summit','danielhut','gipfel',[0,3.4],[-15,-7],'Zurück auf den Gipfelweg'),
 E('alp-village','alp','village',[-6,25],[0,20],'Dem Dorfweg folgen'),E('village-alp','village','alp',[0,24],[-6,22],'Zur Portmann-Alp'),
 E('village-city','village','city',[28,22],[0,20],'Zur Stadt'),E('city-village','city','village',[0,24],[26,21],'Ins Bergdorf zurück'),
 E('city-arcade','city','arcadeshop',[-16,-3.25],[0,2.8],'Melanies Laden betreten'),E('arcade-city','arcadeshop','city',[0,3.4],[-16,-1.5],'Auf den Altstadtplatz'),
 E('village-restaurant','village','restaurant',[19.2,10],[0,2.8],'Ins Bergrestaurant'),E('restaurant-village','restaurant','village',[0,3.4],[18.5,10],'Auf den Dorfplatz'),
 E('village-house','village','house',[-16,-3.25],[0,2.6],'Das Dorfhaus betreten'),E('house-village','house','village',[0,3.4],[-16,-1.5],'Auf den Dorfplatz'),
 E('house-cellar','house','cellar',[3,1],[0,3.8],'Die Kellertreppe hinunter'),E('cellar-house','cellar','house',[0,4],[2,1.7],'Die Treppe zur Stube hinauf'),
 {...E('cellar-passage','cellar','passage',[0,-3.4],[0,21],'Durch die verborgene Steintür'),secret:true},E('passage-cellar','passage','cellar',[0,24],[0,-1.3],'Zurück zum Dorfhaus-Keller'),
 E('passage-wald','passage','wald',[0,-24],[0,20],'Dem Licht zum Arvenwald folgen'),E('wald-passage','wald','passage',[0,24],[0,-21],'Zum Felsengang'),
 E('wald-blumen','wald','blumen',[-27,-10],[25,16],'Zum Alpenrosenhang'),E('blumen-wald','blumen','wald',[28,16],[-24,-10],'In den Arvenwald'),
 E('wald-see','wald','see',[27,-10],[-25,16],'Zum Spiegelsee'),E('see-wald','see','wald',[-28,16],[24,-10],'In den Arvenwald'),
 E('blumen-hochalp','blumen','hochalp',[0,-24],[0,20],'Zur Sonnenalp aufsteigen'),E('hochalp-blumen','hochalp','blumen',[0,24],[0,-21],'Zum Alpenrosenhang absteigen'),
 E('see-schlucht','see','schlucht',[-20,-24],[0,20],'Zur Wasserfall-Schlucht'),E('schlucht-see','schlucht','see',[0,24],[-20,-21],'Zum Spiegelsee zurück'),
 E('schlucht-kristall','schlucht','kristall',[0,-24],[0,20],'Die Kristallgrotte betreten'),E('kristall-schlucht','kristall','schlucht',[0,24],[0,-21],'Zum Wasserfall zurück'),
 E('hochalp-grat','hochalp','grat',[0,-24],[-22,18],'Zum Adlergrat'),E('grat-hochalp','grat','hochalp',[-25,20],[0,-21],'Zur Sonnenalp'),
 E('kristall-grat','kristall','grat',[0,-24],[22,18],'Durch den oberen Grottenausgang'),E('grat-kristall','grat','kristall',[25,20],[0,-21],'Zur Kristallgrotte'),
 E('grat-gipfel','grat','gipfel',[0,-24],[0,20],'Zum Portmann-Gipfel aufsteigen'),E('gipfel-grat','gipfel','grat',[0,24],[0,-21],'Zum Adlergrat absteigen'),
 E('alp-pasture','alp','pasture',[12,24],[0,21],'Zu Jonny und der Reitweide'),E('pasture-alp','pasture','alp',[0,24],[12,21],'Zur ruhigen Portmann-Alp'),
 E('alp-panorama','alp','panorama',[-17,-28],[0,21],'Auf dem Panoramaweg bergwärts'),E('panorama-alp','panorama','alp',[0,24],[-22,-27.5],'Zur Portmann-Alp absteigen'),
 E('panorama-hochalp','panorama','hochalp',[0,-24],[0,21],'Zur Sonnenalp weitersteigen'),E('hochalp-panorama','hochalp','panorama',[-26,16],[0,-21],'Panoramaweg zur Heimat-Alp'),
 E('alp-valley','alp','valley',[30,6],[-25,-20],'Auf dem Talweg absteigen'),E('valley-alp','valley','alp',[-28,-22],[27,6],'Zur Portmann-Alp aufsteigen'),
 E('valley-village','valley','village',[0,24],[0,20],'Ins Bergdorf hinunter'),E('village-valley','village','valley',[-25,20],[0,21],'Talweg zur Portmann-Alp')
];
export const LANDMARKS={
 wald:{id:'arve',x:-9,z:-4,title:'Die alte Arve',text:'Unter der Wurzel steht ein Zeichen: Zuerst steigt das Wasser, dann küsst die Blüte das Licht, zuletzt ruht der Stein. Das erste Wegzeichen ist eine Welle.'},
 blumen:{id:'flowerstone',x:-10,z:-9,title:'Der Blütenstein',text:'Drei Kerben im Stein: Wasser · Blüte · Berg. Eine zweite Markierung gehört zur alten Truhe in der Kristallgrotte.'},
 see:{id:'reflection',x:3,z:2,title:'Der Steg am Spiegelsee',text:'Die Berge stehen doppelt im Wasser. Eine eingeritzte Linie weist zur Brücke am Wasserfall.'},
 schlucht:{id:'bridge',x:0,z:0,title:'Die alte Holzbrücke',text:'Am Brückenkopf liegt das dritte Wegzeichen. Die drei Zeichen öffnen gemeinsam das Kristallsiegel.'},
 hochalp:{id:'shepherd',x:-10,z:-5,title:'Der Hirtenunterstand',text:'Im Balken steht: Der längere Weg ist manchmal der richtige. Von hier führt die westliche Route direkt zum Adlergrat.'},
 kristall:{id:'vein',x:-8,z:-6,title:'Die leuchtende Mineralader',text:'Die Kristalle folgen einer Spalte im Fels. Zwischen den Adern liegt eine Truhe mit drei unterschiedlichen Siegeln.'},
 grat:{id:'eagle',x:0,z:-9,title:'Adlerblick',text:'Zwei Routen treffen sich hier: Sonnenalp und Kristallgrotte. Oberhalb beginnt der letzte Aufstieg.'},
 gipfel:{id:'summitbook',x:0,z:-15,title:'Das Portmann-Gipfelbuch',text:'Du bist über die verborgenen Wege bis hierher gekommen. Trage deinen Weg ein und entdecke auch die zweite Aufstiegsroute. Diese Expedition ist ein Teil deines wachsenden Alpenabenteuers.'}
};
export const DISCOVERIES=['cellar-note',...Object.values(LANDMARKS).map(x=>x.id)];
export const TREASURES=[{id:'crystal-cache',region:'kristall',x:8,z:-8,coins:1800,requires:['arve','flowerstone','bridge'],name:'Die versiegelte Kristalltruhe'},{id:'summit-cache',region:'gipfel',x:9,z:-17,coins:1200,requires:['summitbook'],name:'Das Vermächtnis am Gipfel'}];
export const freshAdventure=()=>({visited:['alp'],discoveries:[],treasures:[],secretOpen:false,dials:[0,0,0]});
export const SYMBOLS=['Berg','Wasser','Blüte'];
export function turnDial(state,index){if(state.position.region!=='cellar')return{ok:false,message:'Die Steinräder stehen im Dorfhaus-Keller.'};if(!Number.isInteger(index)||index<0||index>2)return{ok:false,message:'Ungültiges Steinrad.'};state.adventure.dials[index]=(state.adventure.dials[index]+1)%3;return{ok:true,message:'Steinrad '+(index+1)+': '+SYMBOLS[state.adventure.dials[index]]};}
export function openSecret(state){if(state.position.region!=='cellar')return{ok:false,message:'Die Steintür liegt im Dorfhaus-Keller.'};if(state.adventure.secretOpen)return{ok:true,message:'Die Steintür ist bereits geöffnet.'};if(!state.adventure.discoveries.includes('cellar-note'))return{ok:false,message:'Untersuche zuerst das alte Regal. Dort liegt ein Hinweis.'};if(state.adventure.dials.join(',')!=='1,2,0')return{ok:false,message:'Die Räder rasten nicht ein. Der Hinweis am Regal nennt die Reihenfolge.'};state.adventure.secretOpen=true;return{ok:true,message:'Ein leises Knirschen. Die Steintür gibt den Felsengang frei.'};}
export function visit(state,id){if(!REGIONS[id])return false;if(!state.adventure.visited.includes(id))state.adventure.visited.push(id);return true;}
export function travel(state,gateway){const region=state.position.region||'alp',g=GATEWAYS.find(g=>g.id===gateway?.id);if(!g||g.from!==region||state.position.inside)return{ok:false,message:'Dieser Übergang gehört nicht zu deinem Aufenthaltsort.'};if(Math.hypot(state.position.x-g.x,state.position.z-g.z)>g.range+.1)return{ok:false,message:'Gehe zuerst zum Wegweiser oder Eingang.'};if(g.secret&&!state.adventure.secretOpen)return{ok:false,message:'Die Steintür ist noch verschlossen.'};state.position={x:g.arrival[0],z:g.arrival[1],inside:false,region:g.to};visit(state,g.to);return{ok:true,message:REGIONS[g.to].name};}
export function discover(state,id){if(!DISCOVERIES.includes(id))return{ok:false,message:'Unbekannter Fund.'};if(!state.adventure.discoveries.includes(id))state.adventure.discoveries.push(id);return{ok:true};}
export function claimTreasure(state,id){const t=TREASURES.find(t=>t.id===id);if(!t||state.position.region!==t.region||Math.hypot(state.position.x-t.x,state.position.z-t.z)>2.1)return{ok:false,message:'Du bist nicht bei dieser Truhe.'};if(state.adventure.treasures.includes(id))return{ok:false,message:'Diese Truhe hast du bereits geborgen.'};const missing=t.requires.filter(k=>!state.adventure.discoveries.includes(k));if(missing.length)return{ok:false,message:'Es fehlen '+missing.length+' Wegzeichen. Untersuche die besonderen Orte an beiden Aufstiegsrouten.'};if(state.coins+t.coins>1000000000||state.stats.earned+t.coins>1000000000)return{ok:false,message:'Dieser Geldbetrag kann nicht mehr gutgeschrieben werden.'};state.coins+=t.coins;state.stats.earned+=t.coins;state.ledger=[...state.ledger,{day:state.day,delta:t.coins,reason:'treasure',ref:id}].slice(-60);state.adventure.treasures.push(id);return{ok:true,message:t.name+' geöffnet · CHF '+(t.coins/100).toFixed(2)};}

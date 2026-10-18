const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
export function roastFeedback(r){
 if(!r)return{tone:'neutral',title:'Stock aufstecken und ruhig rösten',hint:'Der grüne Bereich bedeutet angenehme Hitze. Vier Seiten müssen goldbraun werden.',progress:0,sides:[]};
 const fish=r.food&&r.food!=='marshmallow',min=Math.min(...r.brown),max=Math.max(...r.brown),char=Math.max(...r.char),sides=r.brown.map((v,i)=>({percent:Math.round(clamp(v/.38,0,1)*100),tone:r.char[i]>.4||v>1.5?'danger':v>=.38&&v<=1.05?'success':v>1.05?'warning':'neutral'}));
 const base={sides,progress:clamp(min/.38,0,1),canFinish:min>=.38&&max<=1.05&&char<=.4};
 if(r.phase==='result'){const quality=r.quality;return{...base,tone:['perfect','golden'].includes(quality)?'success':'danger',title:quality==='perfect'?'✓ Rundum goldbraun – geschafft!':quality==='golden'?'✓ Fertig geröstet':quality==='burnt'?'✕ Verbrannt – nicht essbar':'✕ Noch nicht fertig',hint:quality==='burnt'?'Mehr Abstand und regelmässiger drehen.':quality==='raw'?(fish?'Der rohe Fisch kommt zurück in den Rucksack.':'Alle vier Seiten brauchen noch etwas Zeit.'):(fish?'Im Rucksack aufbewahren, essen oder im Dorf verkaufen.':'Vom Stock in den Rucksack – danach kannst du essen.')};}
 if(char>.4||max>1.5)return{...base,tone:'danger',canFinish:false,title:'✕ Diese Seite ist bereits verbrannt',hint:'Dieser Versuch ist nicht mehr essbar. Beim nächsten Mal früher wenden und Abstand halten.'};
 if(base.canFinish)return{...base,tone:'success',title:'✓ FERTIG – jetzt vom Feuer nehmen!',hint:'Alle vier Seiten sind goldbraun. Ziehe den Stock vom Feuer und sichere deinen Snack.'};
 if(r.heat>1.05)return{...base,tone:'danger',title:'ZU HEISS – Stock vom Feuer wegziehen!',hint:'Im roten Bereich verbrennt die Oberfläche. Vergrössere sofort den Abstand.'};
 const side=Math.floor((r.rotation+Math.PI/4)/(Math.PI/2))%4;
 if(r.brown[side]>=.7||r.char[side]>.2)return{...base,tone:'warning',title:'JETZT DREHEN – diese Seite wird zu dunkel',hint:'Drehen halten, bis eine helle Seite zum Feuer zeigt. Goldene Seiten brauchen keine weitere Hitze.'};
 if(r.heat<.2)return{...base,tone:'neutral',title:'Zu wenig Hitze – etwas näher ans Feuer',hint:'Stock vorsichtig zum Feuer ziehen, bis die Hitzeanzeige im grünen Bereich liegt.'};
 return{...base,tone:'success',title:'Gute Hitze – langsam und regelmässig drehen',hint:'Jede der vier Anzeigen soll grün werden. Danach sofort vom Feuer nehmen.'};
}
export function fishingFeedback(r){
 if(!r)return{tone:'neutral',title:'Köder wählen und Angel auswerfen',hint:'Nach dem Biss rechtzeitig anschlagen. Beim Einholen die Schnurspannung kontrollieren.',progress:0};
 const base={progress:1-r.distance};
 const phases={casting:['neutral','Angel wird ausgeworfen …','Die Pose fliegt zum Angelplatz.'],waiting:['neutral','Warten – Pose beobachten','Noch nicht anschlagen. Erst wenn die Pose deutlich zuckt.'],bite:['warning','! JETZT ANSCHLAGEN!','Tippe auf Anschlagen oder drücke die Leertaste.'],landed:['success','✓ Fisch gelandet – geschafft!','Fang in den Rucksack nehmen. Am Zeltfeuer rösten oder im Dorfladen verkaufen.'],broken:['danger','✕ SCHNUR GERISSEN','Zu hohe Spannung. Beim nächsten Mal früher rückwärts kurbeln oder Schnur geben.'],escaped:['danger','✕ FISCH ENTKOMMEN','Die Schnur war zu lange locker. Wieder vorsichtig einholen.'],missed:['danger','✕ BISS VERPASST','Zu früh oder zu spät angeschlagen. Beobachte die Pose bis zum deutlichen Biss.']};
 if(phases[r.phase]){const[tone,title,hint]=phases[r.phase];return{...base,tone,title,hint};}
 if(r.tension>=.85)return{...base,tone:'danger',title:'REISSGEFAHR – jetzt Schnur geben!',hint:'Rückwärts kurbeln oder Schnur geben halten. Erst im grünen Bereich wieder einholen.'};
 if(r.tension>=.72)return{...base,tone:'warning',title:'Fisch zieht stark – Einholen unterbrechen',hint:'Kurz Schnur geben, damit die Spannung sinkt.'};
 if(r.tension<.12)return{...base,tone:'warning',title:'SCHNUR ZU LOCKER – jetzt einholen!',hint:'Vorwärts kurbeln oder Einholen halten. Sonst schüttelt der Fisch den Haken ab.'};
 return{...base,tone:'success',title:'Gute Spannung – vorsichtig einholen',hint:'Vorwärts kurbeln: einholen · rückwärts: Schnur geben. Halte die Anzeige im grünen Bereich.'};
}

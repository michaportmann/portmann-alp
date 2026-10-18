# Portmann Alp – Lichtplan und Ausbauphase

Stand: 18. Oktober 2026. Zustände: OFFEN, IN ARBEIT, UMGESETZT, GETESTET. GETESTET nennt ausschliesslich ausgeführte technische Prüfungen, keine visuelle Geräteabnahme.

## Verbindlicher Lichtplan

Alle Gebiete verwenden dieselbe gespeicherte Spielminute und dasselbe Wetter. Ein Spieltag dauert weiterhin 30 Minuten aktiver Spielzeit; Pause stoppt die Uhr. Ein Gebietswechsel setzt die Uhr nicht zurück.

| Bereich | Tagsüber | Dämmerung und Nacht | Umsetzung |
|---|---|---|---|
| Gesamte Aussenwelt | Tageslicht und wetterabhängige Wolken | Abgedunkelter Himmel, Sterne, Mond und schwaches Orientierungslicht | UMGESETZT: eigener Szenencontroller pro Gebiet, gemeinsame Uhr |
| Alp: Haustür, Stall, Hof, Talweg, Waldzugang, Gehege, Lagerplatz | Laternen aus | Warmes Licht auf Geometrie und Wegen; stufenloses Einschalten | UMGESETZT: echte Punktlichter, sichtbare Holz-/Eisenlaternen und Stallpendel |
| Dorf und Stadt | Fenster neutral, Laternen aus | Fenster glühen warm; Eingänge und Verbindungswege beleuchtet | UMGESETZT: Dorfhaus plus sechs neue Chalets und Eingangslaternen |
| Wandergebiete | Freie natürliche Sicht | Wegweiser-/Übergangslaternen und eigene Rucksacklaterne | UMGESETZT: begrenzte Lichtinseln, kein flächig beleuchteter Wald |
| Alphütte: Wohnstube, Schlafzimmer, Werkstatt | Tageslicht | Wandlichter, Stehlaternen und indirekte warme Aufhellung | UMGESETZT: automatisch; Haussteuerung → Licht automatisch/an/aus |
| Dorfhaus, Restaurant, Retro-Laden | Tageslicht | Warme vorhandene Leuchten plus Stehlaterne | UMGESETZT: automatisch |
| Keller, Felsengang, Kristallgrotte | Orientierungslampen bleiben an | Orientierungslampen bleiben an | UMGESETZT: keine künstliche Tageshelligkeit unter Tage |
| Rucksack | Laterne bleibt als Gegenstand sichtbar | Eigene Umgebung wird beleuchtet, solange Laterne im Rucksack ist | UMGESETZT: Dorfladen oder Werkbank; getrennt von erspielter Höhlenlampe |
| Berglager | Zelt am gespeicherten Standort | Feuer nach Verbrauch von zwei Fallholz, eigener Lichtschein | UMGESETZT: Feuer aus nach Schlafen, Einpacken oder Tageswechsel |

Lichtbeginn wird aus der Tageshelligkeit berechnet: unter 65 Prozent Tageslicht beginnt das sanfte Einschalten. Kein harter Lichtwechsel. Auf mobilen Geräten werden höchstens sechs Umgebungs-Punktlichter in der Nähe aktiv berechnet, auf grösseren Geräten acht. Rucksack- und mobiles Lagerlicht kommen bedarfsweise dazu. Sichtbare leuchtende Fenster sind keine zusätzlichen Schattenlichter. Punktlicht-Schatten, echte GPU-Leistung und endgültige Helligkeit auf Geräten sind noch OFFEN. Der Handschalter ist sitzungsbezogen; nach Neuladen gilt wieder Automatik.

## Tatsächlich integrierter Umfang

| Arbeit | Status | Umfang und Nachweis |
|---|---|---|
| Einheitliche Uhr in allen Regionen | GETESTET | Szenenwechsel um Mitternacht bleibt Mitternacht; Sonnenintensität und Leuchten reagieren auf dieselbe Uhr |
| Automatische Laternen und Hausfenster | GETESTET | Tag aus, Dämmerung an, Nacht an; Punktlichtbudget und Wohnstuben-Schalter geprüft |
| Kornfeld tatsächlich viermal grösser | GETESTET | Normales Feld 160 statt 40 m², 1440 statt 360 Halme; ausgebautes Feld 162 statt 40,5 m², 1720 statt 430 Halme. Ausbau ersetzt Grundbestand am gleichen Feld, keine überlagerten Pflanzen. Bestehende Ernteökonomie bleibt erhalten |
| Platz für Alpwirtschaft | GETESTET | Westliche Feldfläche, östliche Restaurant-/Hotel-/Badflächen bleiben getrennt; Gelände-/Wegprüfung bestanden |
| Dorf mit sieben Chalets | GETESTET | Bestehendes Dorfhaus plus sechs neue Modelle; Fensterrahmen, Läden, Balkone, Steindetails und geschindelte Dächer. Drei reine Wohnhäuser einschliesslich Dorfhaus; übrige Bauten tragen Dienste |
| Dorfladen und Restaurant getrennt | GETESTET | Laden bei 14/−5,5; Restaurant bei 23/14. Die beiden Eingänge teilen keine Interaktion mehr |
| Bäckerei, Dorfpraxis und Markt | GETESTET | Bäckerei mit Brot/Haferdrink/veganem Essen, Praxis mit kostenloser Erholung, Markt mit saisonaler Deko und Vorräten. Eingänge und Kauf-/Speicherregeln geprüft. Keine neuen begehbaren Einzelräume für Praxis/Bäckerei behauptet |
| Herbst, Halloween, Weihnachten | GETESTET | Kaufbare Dekorationsobjekte, in der Wohnstube aus dem Rucksack auswählbar, gespeichert und bei Besitz angezeigt. Derzeit ein wählbares Wandarrangement; freie Platzierung mehrerer saisonaler Einzelmöbel bleibt OFFEN |
| Generierte Vorlagen | UMGESETZT | Pflaster und Marktprodukte als Laufzeittexturen integriert. Laternen-, Chalet- und Personenbilder sind Modellierungsreferenzen; sie sind keine Screenshots des Spiels und keine automatisch daraus rekonstruierten 3D-Scans |
| Dorfpersonen | UMGESETZT | Vier bestehende Auftragspersonen mit gegliederten Körpern und Gangsteuerung; Ärztin/Bäcker an Diensten, zwei Besucher folgen echten berechneten Wegen. Individuelle Gesichtsqualität/optische Endabnahme OFFEN |
| Pflaster und Wege | UMGESETZT | Generiertes helles Schweizer Pflaster auf gewölbtem Dorfplatz und Dorf-/Stadtwegen; übrige Aussenwege erhalten helle alpine Wegtextur statt einfarbigem Streifen. Kein vollständiger neuer Wegebau in jedem Gebiet behauptet |
| Ortsnamen und Karten | GETESTET | Ortsname kurz eingeblendet, keine dauerhafte grosse Fläche. Lokale Karte mit auseinandergerückten Nummern, Verbindungslinien und Legende statt überlappender Langtexte; Weltkarte mit Nummernlegende |
| Tragbares Berglager | GETESTET | Zelt besitzen, sichere freie ebene Stelle wählen, aufstellen, zwei Fallholz verbrauchen, schlafen, löschen/einpacken. Standort und Feuerzustand sind Bestandteil des Spielstands; alte Stände werden ergänzt |
| Fallholz in Berggebieten | GETESTET | Zusätzliche Sammelstellen in Panoramaweg, Wald, Blumenhang, See, Hochalp, Grat, Gipfel, Reitweide und Talweg; täglicher Nachschub und vorhandenes Inventarsystem |
| iPhone/iPad/Mac | IN ARBEIT | Vier Viewports im Anwendungsmodell sowie mobile Bedienung geprüft; tatsächliche Safari-/GPU-/Geräteabnahme und gemessene Bildrate OFFEN |

## Bedienung

- Lab: zum Dorfladen im Bergdorf gehen; in der Karte ist er als eigenes Ziel enthalten.
- Rucksacklaterne und leichtes Bergzelt: im Dorfladen kaufen oder nach Rezept an Werkbank/Ausrüstungsplatz herstellen.
- Unterwegs: Menü → Rucksack → Bergzelt & Lagerfeuer. Neben dem Weg eine freie, ausreichend ebene Stelle suchen. Das Zelt ist wiederverwendbar. Feuer braucht zwei Fallholz.
- Innere Beleuchtung: in der Alphütte Haussteuerung öffnen und „Licht: automatisch“ wechseln. Draussen schalten Leuchten automatisch.
- Deko: am Dorfmarkt kaufen; in der Hütte im Rucksack „In der Wohnstube dekorieren“ wählen. Einlagerung entfernt den Besitz aus dem Rucksack und damit die aktive Anzeige bis zum erneuten Einpacken.

## Offene Qualitätsabnahme

Es wurden keine echte iPhone-/iPad-/Mac-Hardware, keine Safari-Browserdarstellung, keine GPU-Screenshots und keine gemessene mobile Bildrate geprüft. Referenzbilder allein beweisen nicht, dass die 3D-Modelle bereits dieselbe fotografische Detailqualität besitzen. Die Bildqualität der neuen Gebäude, Personen, Laternen und Landschaft bleibt im Spiel visuell abzunehmen. Bestehende Käseproduktion, Inventar, Aufgaben und Speichersysteme müssen erhalten bleiben.

Zusatzprüfung: Alle neun neuen Fallholzstellen in ihren tatsächlichen Regionswelten ab dem jeweiligen Einstieg erreichbar; echtes Sammeln gibt drei Holz, und der Spielstand mit den neuen Sammelkennungen bleibt gültig.

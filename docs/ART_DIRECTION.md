# Portmann-Alp · verbindliche Bildrichtung

Die im Gespräch gelieferten Referenzbilder bestimmen die ganze Spielwelt: Landschaft, Gebäude, Innenräume, Menschen, Tiere, Pflanzen, Lebensmittel und Gegenstände. Das Ziel bleibt eine frei begehbare 3D-Welt. Die Fotos und Bildtafeln sind Gestaltungsvorlagen; ein Bild als Kulisse ersetzt keine begehbare Landschaft.

## Gemeinsame Merkmale

- Sonnige Schweizer Bergromantik mit ruhigen Blickachsen, natürlichen Proportionen und sichtbarer Materialstruktur.
- Saftiges Wiesengrün, unterschiedlich hohe Gräser, blauer Enzian, weisse Margeriten, gelbe Blüten und rosa Klee. Pflanzen wachsen in Standortgruppen und bleiben von Wegen frei.
- Kühler grauer Fels mit Gesteinsschichten und Schnee; charakteristische, eigenständige Schweizer Bergsilhouetten. Tannen unterhalb der felsigen Höhen, keine gleichmässig bestreuten Gipfel.
- Sichtbare Höhenstaffelung: Hof am Berghang, tiefer Talkessel mit See und Dorf, Aufstieg zur Hochalp und zum Gipfel. Der See besitzt türkisfarbene Ufer und eine tiefblaue Mitte.
- Helles, warmes Berner Holzhaus mit echten Fensterlaibungen und feinem Schindeldach; daneben ein niedrigerer, breiter Stall. Geordnete Tierweiden und Felder, zusammenhängende braune Bauernwege.
- Bach mit Felsen, Feuerstelle und Zelt als zusammengehöriger Ort. Wasser bleibt unter Brücken und ausserhalb trockener Wege.
- Innenräume: honigfarbenes Holz, Mauerwerk, warmes Lampenlicht, Textilien und sichtbare Berglandschaft durch die Fenster. Laden, Stall, Wohnräume und Gaststube folgen den jeweiligen Vorlagen.
- Tiere erhalten natürliche Körper, Fell-/Federstruktur und Bewegungen. Runde Grundkörper allein erfüllen die Vorlage noch nicht.

## Sechs auswählbare Hauptfiguren

Die Reihenfolge folgt der Figurentafel (oben links nach unten rechts). Beschreibungen ersetzen bis zur Namenszuweisung die Namen.

| Speicher-ID | Vorlage | Kennzeichen |
| --- | --- | --- |
| girl | Mädchen mit roter Jacke | Lange hellbraune Haare, dunkles Oberteil, olivfarbene Hose |
| man | Mann mit grüner Jacke | Brille, kahler Oberkopf, kariertes Hemd, braune Hose |
| boy | Junge mit grüner Jacke | Dunkle Locken, Brille, dunkler Kapuzenpullover |
| woman | Frau mit rostroter Jacke | Rote lange Haare, gemusterte Bluse, olivfarbene Hose |
| teen-girl | Mädchen mit blauer Jacke | Lange hellbraune Haare, gestreiftes Oberteil |
| grandfather | Älterer Mann mit brauner Jacke | Grauer Haarkranz, gestreiftes Hemd, braune Hose |

Alle sechs erhalten den gewünschten Schweizer Wanderrucksack, Wanderschuhe und eine lustige, weich umfallende Zipfelmütze. Die zusätzlichen Personen auf den anderen Tafeln dienen als eigenständige NPC-Vorlagen. Sie ersetzen keine der sechs Hauptfiguren.

## Aktueller Teilstand und offene Abnahme

Technisch eingebaut: sechs gespeicherte Figurenprofile, unterscheidbare Kleidung, Brillen, Haarformen und Wanderzubehör; gemeinsame Naturfarbpalette, Enzian-Trichterblüten, tieferer Talkessel, eigener Alpblick sowie dünnere geschwungene Dächer und kompakter Stall.

Diese Änderungen sind eine Zwischenstufe. Gesichtstreue, natürliche Kleidung und Animationen, realistische Tiere, Felsmodellierung, vollständige Innenraumgestaltung und die Bildqualität der Referenzen sind noch nicht abgeschlossen. Prozedurale Körperformen und rechnerisch sichtbare Berge sind keine visuelle Abnahme. Es fehlen gerenderte Vergleiche mit den Vorlagen und Prüfungen auf echten iPads und Macs.

Abnahme je Bereich: gleiche Farb- und Materialwirkung wie die Vorlage, erkennbare Silhouette und natürliche Proportionen, zusammenhängender begehbarer Raum, passende Kamera, zuverlässige Interaktion und erhaltene Spielstände. Erst nach gerenderter Prüfung darf ein Bereich gestalterisch als erledigt gelten.

## Alp zuerst · Fels, Holz und Tageslicht

Der folgende Umbau betrifft die Portmann-Alp als erste Referenzszene. Die fünf bestehenden Gipfelprofile bleiben die Kompositionsgrundlage. Ihre vormals glatten Flanken besitzen nun unregelmässige, verzweigte Rinnen, Felsrippen und kleinere Ausbrüche. Das äussere Gelände wurde feiner unterteilt; die Naht zum begehbaren Hof bleibt identisch.

Kalkstein wird auf steilen Flächen aus drei Raumrichtungen projiziert, damit die Textur an Felswänden nicht auseinandergezogen wird. Vegetation, Fels und Schnee erhalten getrennte Flächengewichte. Die entfernten Wälder folgen zwei zusammenhängenden Talflanken; steile Felsflächen, Seeufer und Hochlagen bleiben frei.

Hütte und Stall nutzen eine neu erzeugte honigbraune Holztextur mit durchlaufender Maserung über den einzelnen Brettern. Die Fensterfarbe nimmt das Tageslicht auf. Eine räumliche Himmelshülle ergänzt den Hintergrund. Der tiefe See besitzt einen abgesenkten Boden, türkisfarbene Ufer, blaue Mitte, feine bewegte Wasseroberflächennormalen und eine Reflexion des Himmels. Keine Echtzeitreflexion der Berge ist eingebaut.

Materialdateien: `dist/assets/portmann/honey-timber-albedo.jpg` und `dist/assets/portmann/limestone-albedo.jpg`, jeweils 2048 × 2048. Die Bilder wurden mit der eingebauten Bildgenerierung erzeugt, als Bilder betrachtet und als optimierte JPEGs in das Projekt integriert. Prompts und Herkunft stehen in `docs/materials/generated-materials.json`.

Grenzen bleiben wesentlich: Shader wurden zusammengebaut und auf Attribute/Einbindung geprüft, aber nicht auf einer GPU kompiliert. Die Texturen wurden betrachtet; die vollständige gerenderte Alp wurde in dieser Umgebung nicht gesehen. Deshalb keine Behauptung, das Gesamtbild entspreche bereits den Vorlagen.

## Landschaftsumbau · bewohnter Berg statt Wiesenplatte

Die Nutzervorgabe priorisiert die Wiese, die Bergformen und eine verständliche Hanglage. Der Übungsfels steht nicht mehr auf dem Hof: Er liegt am Panoramaweg. Bestehende gespeicherte Übungssitzungen werden mit ihrem Stand dorthin übernommen.

Der Bach liegt nun hinter der Hütte bei z ungefähr -20.5, zwischen x=-34 und -11. Der seitliche Hausweg führt über die Brücke bei x=-24 zum Waldaufstieg; der Bergübergang liegt bei (-17,-28). Eine räumlich anschliessende bewaldete Schulter trägt den sichtbaren Weg weiter zu den Bergen. Die linke Talkesselöffnung bleibt frei. Feuerstelle, Zelt, Felsen, Rastregeln und Kartenpunkt wurden gemeinsam versetzt.

Vor der Alp fällt das Gelände Richtung Dorf ab. Der Hofweg besitzt Kehren und eine sichtbare Fortsetzung im tieferen Gelände. Die Felder liegen als angepasste Flächen auf dem Hang; sie erzwingen keine gemeinsame ebene Wiesenplatte mehr. Gebäude behalten passende Fundamente.

Die Wiese nutzt jetzt eine eigens erzeugte fotografische Gras-/Blatttextur auf dem 3D-Gelände, ergänzt durch die vorhandenen räumlichen Halme und Alpenblumen. Material: `dist/assets/portmann/meadow-albedo.jpg` (1024 × 1024, eingebaute Bildgenerierung). Prompt: Photorealistic seamless tileable PBR diffuse ground texture for a 3D Swiss alpine meadow; orthographic overhead; lush living green grass, varied thin blades and tiny meadow leaves, subtle patchiness and occasional dark earth; evenly lit; no flowers, rocks, objects, perspective, sky, text or borders.

Die Bergmassive wurden verbreitert. Mönch und Jungfrau besitzen breitere, asymmetrische Gipfelbereiche; Eiger, Mönch und Jungfrau werden durch räumliche Sattelgrate verbunden. Die Flanken folgen abgestuften Felswänden und untergliederten Rippen. Es handelt sich weiterhin um gestaltete Spielberge, keine vermessenen Nachbildungen. Die tatsächliche Ähnlichkeit und Gesamtwirkung bleiben gerendert zu prüfen.

## Herbst auf der Alp · Rigi, Pilatus und Zermatt als Form-/Lichtvorbilder

Auf ausdrücklichen Nutzerwunsch wurden die offiziellen Referenzen online aufgerufen: Rigi (https://www.rigi.ch/erleben/herbst), Pilatus (https://pilatus.ch/) und der Herbst-Guide von Zermatt Tourismus (https://blog.zermatt.ch/herbst-guide-zermatt-matterhorn/), einschliesslich der dort verlinkten Bilder. Abruf: 17. Oktober 2026. Sie dienen als Gestaltungsvorbilder; die Bilder werden nicht als Spielkulisse übernommen.

Die nahe Bergstaffel besteht nun aus einem breiten, bewaldeten Rigi-artigen Rücken und einem gegliederten Pilatus-artigen Kalksteingrat direkt hinter dem Hof. Die Spitzen der entfernteren Bergstaffel wurden niedriger und breiter proportioniert. Das ist eine freie Spielkomposition, keine geografisch richtige Zusammenstellung dieser Orte.

Der seitliche Panorama-See und seine tiefe Geländevertiefung sind gemäss der neuesten Nutzervorgabe entfernt. Die zuvor dokumentierte linke Seesichtlinie ist damit überholt. Bach und kleiner Hofteich bleiben eigenständige Gewässer. Der Waldaufstieg hinter dem Haus und der vordere Dorfabstieg bestehen weiter.

Licht und Himmel folgen einer herbstlichen Nachmittagssituation: tiefere, wärmere Sonne, gedämpfteres Himmelslicht, warmer Horizont. Goldene Lärchen ergänzen grüne Nadelbäume. Fünf Obstbäume besitzen echte verzweigte Äste, einzeln modellierte unterschiedlich gefärbte Blätter und sichtbare Äpfel. Sie sind zunächst Landschaftselemente; keine neue Obsternte-Spielregel wurde hinzugefügt.

Die Kornfelder nutzen neue Getreidemodelle mit drei Halmen pro Pflanze, einzelnen Körnern, Grannen, gebogenen Blättern, unregelmässigen Höhen/Abständen und bodenverankerter Windbewegung. Ernte, Ausbau, Zutaten und Spielstand bleiben erhalten.

Der vordere Talweg wurde auf 2.2 Spielmeter verbreitert. Ein bereits am Hof sichtbarer, anklickbarer Wegweiser «Talweg · Dorf ↓» führt zur bestehenden Dorfroute. Die Talblick-Aktion richtet die Übersicht jetzt bergab aus, statt zur nördlichen Bergstaffel. Die tatsächliche gerenderte Erkennbarkeit bleibt auf dem Gerät zu prüfen.

## Begehbares Alp-Zuhause, Käsen und Wasser · 17. Oktober 2026

Die bisherigen quer im Kamerabild liegenden Deckenbalken der Alphütte sind entfernt. Tragholz steht an den Wänden; Vorder- und rechte Seite sind als Schnittansicht offen. Drei Wohn-/Arbeitsgeschosse und ein eigener Höhlenkäsekeller werden einzeln gezeigt. In jedem Bereich ist die Figur sichtbar und läuft auf den Bodenflächen. Andere Dorfhaus-/Restaurant-Innenräume behalten ihren bisherigen separaten Aufbau.

Wohnstube: Eckbank mit räumlichen Lammfellbüscheln, Fondue-Tisch, Truhe mit Herzschnitzerei, Kupferglocke, karierte Textilien, Holz-/Steinkamin, Blumen auf den Fensterbänken. Schlafzimmer: Doppelbett, Schrank, Nachttisch und Fenstertisch. Werkstatt: Kupfer-Chessi, Käsetisch und Reiferegal; Felszugang zur Reifehöhle. Fenster haben ausgesparte Wandflächen, Rahmen und Vorhänge; der dekorative Fensterausblick verwendet die gestalteten Gipfelprofile. Eine realistische Aussicht aus der tatsächlichen Aussenwelt ist damit noch nicht umgesetzt.

Elf bewegliche Möbelgruppen lassen sich im Einrichtungsmodus antippen, auf freien Boden setzen und um Vierteldrehungen drehen. Kollisionsflächen, Tür-/Treppenfreiraum und durchgängige Verbindungen werden vor einer Platzierung geprüft. Gestaltung und Raumposition sind Teil des lokalen Spielstands und Datei-Exports. Einrichtung ist auf das jeweilige Stockwerk begrenzt; tragende Bauteile und Chessi bleiben fest.

Käsen öffnet eine 2D-Arbeitsansicht innerhalb der 3D-Welt: vier Milch, Lab, Salz und Holz bereitstellen, Temperatur wählen, Lab beigeben, Dickete schneiden, rühren, pressen und salzen. Die Temperaturen und Schritte sind vereinfachte Spielregeln, keine Anleitung zur Lebensmittelherstellung. Fertige Laibe liegen sichtbar im Felsenkeller. Drei unterschiedliche Pflegetage und mindestens drei Spielnächte sind für die Reife nötig. Schmieren/Wenden kostet Wasser, Salz und Energie. Reifer Portmann-Alpkäse und bestehende Alpschokolade lassen sich am Portmann-Store der Stadt verkaufen. Tagespflege, Tiermilch und Geld verwenden die vorhandenen Systeme.

Das kompakte Alpradio zeigt den Titel, Wiedergabe/Pause und vorherigen/nächsten Titel. Haupttitel ist die lokal gespeicherte Pixabay-Datei «Summer Walk», folk_acoustic, 152722. Die beiden bestehenden Titel bleiben erhalten. Um das Paket kompakt zu halten, wurden Acoustic Folk und Vogelstimmen neu komprimiert. Tatsächliche Lautstärke/Audioausgabe auf Safari ist ungeprüft.

Die begehbare Heimatfläche umfasst jetzt x=-54…54 und z=-50…50 innerhalb des sichtbaren Nahbodens. Freie Tippziele werden mit sichtbaren Rasterankern verbunden; das Runden auf einen blockierten Rasterpunkt weist eine freie Wiese nicht mehr automatisch zurück. Hindernisse und äussere Gebietsgrenzen bleiben wirksam. Der Bach biegt zur felsigen Quelle und bis an den äusseren Rand; seine Breite variiert. Erdwegdreiecke im Bach-/Brückenbereich werden entfernt. Der Brunnen besitzt einen gebogenen Wasserstrahl mit Auftreffringen im Trog.

Technisch geprüft werden tatsächliche Pointer-Abläufe, Speicherung, Käsekette, Verkauf und Geometrie. Der veröffentlichte Innenraum auf den zuletzt vom Nutzer gesendeten Screenshots ist der Vorgänger dieser Änderungen. Es fehlt weiterhin eine gerenderte Prüfung des neuen Aufbaus und ein echter Safari-/iPad-Test. Weder Referenzqualität noch naturgetreues Wasser oder Geräteflüssigkeit gelten als abgenommen.

## iPhone-Spieloberfläche und begehbarer Stall · 17. Oktober 2026

Die vom Nutzer gelieferten iPhone-Screenshots zeigen grosse überlagerte Raum- und Radiokarten. Die Oberfläche reagiert nun automatisch auf schmale beziehungsweise Touch-Bildschirme. Es gibt keinen erforderlichen Mobile-Schalter. Radio und Haussteuerung sind standardmässig geschlossen. Das Radio wird über den Titelknopf im Kopf geöffnet; vorheriger/nächster Titel und Pause bleiben erhalten. «Summer Walk» ist der Starttitel; eine vom Spieler geänderte Titelauswahl wird weiterhin gespeichert. Kameraoptionen liegen im Menü; feste Kamera-/Kartentasten entfallen auf Touch. Die Aktionstaste wird nur bei verfügbarer Aktion gezeigt. Energie/Ausdauer und Aufgaben sind kleine aufklappbare Anzeigen; freie Flächen bleiben für Tippziele erhalten. Hausfunktionen sind über «Menü → Haus & Einrichten» erreichbar; beim Wechsel oder Antippen des Bodens schliesst das Fenster. Der Einrichtungsmodus verwendet eine kleinere Werkzeugleiste.

Der Hauptstall besitzt nun offene Torflügel, echte Wandkollisionen und einen begehbaren Mittelgang im Aussenraum. Keine zusätzliche teleportierte Raumansicht: Die Figur läuft durch die Tür. Beim Betreten werden die Dach-/oberen Sichtflächen als Schnittansicht ausgeblendet und beim Verlassen wieder sichtbar. Strohboxen und Futterbereiche liegen neben dem Gang. Die Tagesversorgung ist auch im Stall erreichbar; die bestehenden Tiere bleiben auf ihren Weiden. Tierpflegeregeln und tägliche Rationen bleiben gültig.

Der kleine weisse Hühnerstall wurde um 90 Grad zum Hof gedreht, mit Tür/Rampe nach Westen. Er steht 0.5 Spielmeter weiter östlich, damit das westliche Tor freibleibt. Ein zusätzlicher westlicher Zaunzugang ergänzt den bisherigen Ost-/Nordzugang. Gebäudegrundfläche, Geländepad und Kollisionen verwenden die gedrehten Abmessungen.

Der Hofteich ersetzt den gleichförmigen Steinring und drei grossen Radarkreise durch eine unregelmässige Uferlinie, Tiefenfarben, dezente Oberflächennormalen/Himmelsaufhellung, kleinere teilweise versenkte Steingruppen und Seggen am Rand. Der bestehende Wasser-Kollisionsbereich bleibt erhalten; die neue Wasserfläche liegt vollständig darin. Es gibt keine Echtzeitspiegelung der tatsächlichen Berge und keinen zusätzlichen Spiegel-Renderdurchlauf.

Prüfung: simulierte iPhone-Ansichten 390 × 740 und 844 × 390 sowie iPad 1024 × 768, tatsächliche Pointer-/Menü-Handler, Schliessen der Überlagerungen, Radio-Skip, Wechsel der Hausbereiche, Stalltor/Gang/Bodentipps und Speicherung. Geometrie-/Regeltests prüfen Türfreiraum, Stallwände, Dachumschaltung, Vorratsgrenzen, gedrehten Hühnerstall/Westtor und Teichflächen. Das ist keine gerenderte Browserprüfung und kein echter iPhone-/Safari-Test. Die vorgegebenen realistischen Berge, Tiere und Innenraummaterialien gelten weiterhin nicht als visuell fertig.

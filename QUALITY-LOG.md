# Kontrollschleifen · 3D-Alp

## Stand 2 · Natürliche Schweizer Alpenwelt

### Durchgang 1 — Bestand und Ziel
Festgestellte Mängel: erfundene Kegelberge, Kegeltannen, kugelförmige Blütenpunkte, kantige Figuren-/Tierbauteile, einfarbiger Untergrund. Ziel: echtes Schweizer Relief, botanische Formen, organischere Modelle, natürliche Materialien. Ursprüngliche Funktionen bleiben erhalten.

### Durchgang 2 — Implementierung und erste Regression
Implementiert: reliefbasierte Zentralschweizer Berge, lokale PBR-Texturen, Nadelzweige, fünf Blumenarten, Grasbüschel, Wind, organische Pferde-/Personenmodelle, artikulierte Schafe, vier Flügelzeichnungen, neun Vögel. Bestehende Weg-, Hütten-, Sammel-, Speicher- und Parcoursprüfungen bestanden.

### Durchgang 3 — Sichtbare Form und Gelände
Korrigiert: zu dünne Nadelzeichnungen, offener/unpassend verkleideter Giebel, kreisförmige unsichtbare Teichbegrenzung ausserhalb des ovalen Wassers, abrupter Wechsel zwischen Spielboden und umgebendem Relief. Erhöht: Blumen auf 4'200, Gräser auf über 5'000.
Ein begrenztes, vereinfachtes Offline-Modellbild wurde auf Form/Platzierung angesehen. Ein erster zu umfangreicher Software-Render wurde wegen Speicherbedarf beendet und durch eine begrenzte Variante ersetzt. Diese Prüfung ist ausdrücklich keine echte Browsergrafik-Abnahme und enthält nicht alle Pflanzen/Shader.

### Durchgang 4 — Verschärfte Tests finden echte Fehler
- Neue Prüfung der Pfadnormalen fand eine umgefaltete, fast um 180 Grad umkehrende breite Parcours-Zufahrt. Reparatur: schmale Zufahrt und gerader Reitboden als getrennte Oberflächen.
- Regression fand anschliessend einen durch zufällige Baumplatzierung blockierten Kräuterpunkt. Reparatur: eigenständiger Zufallsstrom für den Wald und feste Freiräume um Interaktionen sowie den Bergweg.
- Wege werden nun eng genug unterteilt, folgen der Geländeoberfläche und haben weich auslaufende Ränder.
- Alle 36 Schmetterlinge ändern ihre Weltposition im vollständigen Flugzyklus.

### Durchgang 5 — Innenraum und Pause
Die umgebende Berggeometrie könnte am abseits platzierten Innenraum dessen Boden verdecken. Reparatur: vollständiger Innenraum auf eigener Kameraebene; Innen-/Aussenwechsel wird im Integrationstest geprüft.
Die Animationszeit lief während pausierter Menüs weiter. Reparatur: pausierte/unsichtbare Spielsitzungen lassen die Tierzeit stehen; dadurch kein Zeitsprung beim Wiederaufnehmen.

## Letzte erfolgreiche Prüfungen
- Syntaxprüfung aller eigenen Laufzeitmodule.
- `node tests/prototype.mjs`: endliche Geometrie, sichere Startposition, feste Hütte/Wasser, elf erreichbare Interaktionen, Hütten-Umgehung, vier misslungene/vier gelungene Sprünge, Doppel-Sprungschutz, Spielstandvalidierung und Animationstransformationen.
- `node tests/nature.mjs`: 16'641 Höhensamples, fünf Pflanzenarten, 4'200 Blüten, über 5'000 Grastuffs, freie Interaktionen/Parcours/Aussichtsplatz, Teichgrenzen, Nadeltexturen, organische Modelle, stetiger Geländeverlauf, aufwärts gerichtete über dem Boden liegende Wege, 36 bewegte Schmetterlinge und lokale Materialdateien.
- `node --experimental-vm-modules tests/integration.mjs`: Start, Begrüssung, Render-Schleife mit ersetztem GPU-Renderer, Hütte betreten/verlassen, getrennte Kameraebenen, einfaches Sammeln ohne Doppelvergabe, komplette fehlerfreie Reitrunde, Belohnung, Absteigen, Audio-/Einstellungsmenü.

## Bewusst unverändert
Parcours-Geschwindigkeit, Sprungphysik, Punkte-/Fehlerregeln, lokale Spielstandkennung und Importformat, getrennte Musik-/Geräuschregler, vorhandene Musikstücke. Das ursprüngliche Hauptspiel und dessen öffentliche Site wurden nicht bearbeitet.

## Noch offen
- Echter Browser-/GPU-Test von Schatten, Transparenz, Windshadern und Texturwirkung.
- Visuelle Qualitätsabnahme in Safari auf M1-Mac und iPad, Audioausgabe, Touchverhalten und reale Bildrate.
- Endgültige Abnahme, ob die Gestaltung die gewünschte hochwertige natürliche Ästhetik erreicht.
- Die vollständige Migration der übrigen Spielwelt und Funktionen gemäss DEVELOPMENT.md.

Nächstes inhaltliches Paket: Alp und Tierpflege/Inventar ausbauen, danach Dorf/Stadt. Noch offene Abnahmen werden nicht als bestanden ausgegeben.

## Stand 3 · Alpiner Charakter und vollständiger Produktionsplan

- Verbindlicher Name: Portmann Swiss Alpine Adventure. Der Name des gesicherten früheren Hauptspiels bleibt unverändert.
- MASTERPLAN.md ergänzt die detaillierte Arbeitsliste um den vollständigen Spielkreislauf, acht abhängige Arbeitspakete, Abnahmekriterien sowie konkrete Anfangsregeln für Energie/Ausdauer, CHF-Wirtschaft und Crafting-Ketten.
- Neu modellierte Hütte: Steinsockel, verwittertes Holz mit lokalen CC0-PBR-Karten, tiefes Schindeldach, geschnitzte Galerie, grüne Fensterläden, Geranien, Milchkanne und Holzstapel.
- Neu modellierte Stube: Eckbank, Holzträger, karierte Textilien, gedeckter Fondue-Tisch, Geschirr und Naturstein-Kamin mit animierten Flammentexturen.
- Neue Felsdetails und niedrigere, nähere Standardkamera für eine räumlichere Landschaftsansicht.
- Dekoration respektiert das Navigationssystem: Milchkanne/Holzstapel/Felsen besitzen passende Bodenhindernisse; Pflanzen meiden diese Flächen. Türen und sämtliche bisherigen Interaktionen bleiben erreichbar.
- Geraniendetails werden gemeinsam gezeichnet; die zusätzliche Modellierung erzeugt nicht für jedes Blütenblatt einen eigenen Zeichenaufruf.
- Zusätzliche Prüfung `tests/alpine.mjs`: Hütte/Stube, Innenraum-Ebene, Kaminlicht, Eingang, Kollisionsflächen der neuen Dekoration, Pflanzenabstände, lokale JPEG-Materialien, Titel und Produktionsplan.
- Alle bisherigen Prüfungen sowie die neue Architekturprüfung bestanden. Visuelle Browserkontrolle, GPU-Darstellung und echte Mac/iPad-Abnahme bleiben offen. Die Gestaltung gilt deshalb noch nicht als endgültig abgenommen.
- Nicht umgesetzt durch diese Designphase: umfangreiches Crafting, Energie-/Finanzsystem, weitere Regionen/Kletterpassagen. Diese stehen als nächste abhängige Pakete im Masterplan; eine Planbeschreibung ist keine fertige Spielfunktion.

## Benennung · 16. Oktober 2026
Aktueller verbindlicher Name: Portmann Alp. Untertitel: Chäs, Fondue und Alpenluft. Ersetzt den zwischenzeitlich gewählten Namen Portmann Swiss Alpine Adventure. Oberfläche, Begrüssung, Seitentitel und Masterplan aktualisiert; Spielmechanik und Spielstände unverändert.

## Stand 5 · Automatisches Gerätespeichern und spielbare Herstellungs-/Handelskette

Die verbindliche Gesamtübersicht mit getrennten offenen Gesamtaufträgen und erledigten Teilfunktionen steht in WORK-STATUS.md.

Neu: versionierter v2-Spielzustand mit v1-Migration, automatisches Speichern bei Aktionen/alle zwölf aktiven Spielsekunden/Seitenwechsel, lokale Sicherungskopie und Wiederherstellung, Konfliktschutz zwischen Tabs, validierter Dateiimport mit Vorschau, Download und sichtbarer Speicherstatus. Position/Innenraum, Inventar/Lager, Geld, Energie/Ausdauer, Tag, Aufträge und Einstellungen werden wiederhergestellt.

Neu spielbar: elf zusätzliche Sammelstellen, physischer Alpkiosk mit Einkauf/Verkauf, Geldjournal, sechs Aufträge mit einmaliger Belohnung, Rucksack/Kapazität, Lagertruhe, Essen, kostenlose Rast/Schlaf, Sammelnachschub und 30 Rezepte in vier Arbeitskategorien. Ausrüstungswirkungen für Beil, Schuhe, Rucksack, Hocker und Truhe. Karte folgt den wirklich angelegten Alpwegen.

Die Preisprüfung fand eine profitable Schleife über gekaufte Fasern → Schnur → Seil → Verkauf. Der Faserpreis wurde so korrigiert, dass über alle aus Händlerware herstellbaren Rezeptketten kein garantiertes Geldwachstum entsteht. Sammeln und Verarbeiten selbst gefundener Ressourcen bleibt beabsichtigt lohnend. Das ist keine abschliessende Langzeitbalance.

Zusätzliche Prüfungen: tests/progression.mjs für Speicherfehler, Wiederherstellung, Migration, Datei-Roundtrip, atomare Aktionen, Wirtschaft und 30 Rezepte; erweiterter Anwendungs-Integrationstest für gebundene Schaltflächen, Truhe, Schlaf, Kauf/Verkauf, Belohnung, Einstellungen, Dateiimport, periodisches Speichern und echten Modul-Neustart mit gespeichertem Innenraum. Alle bisherigen Modell-/Natur-/Alpin-/Parcourstests werden beibehalten.

Offen: echtes Safari-/iPad-Dateiverhalten und grafische Bedienabnahme. Kein Browser-Control-Plugin für verwaltete Vorschau verfügbar; keine alternative Browserkontrolle improvisiert. GPU, Ton, Touch und reale M1-Leistung gelten nicht als geprüft. Weitere Regionen/Klettern/Tierpflege/NPC/Minigames sind durch dieses Paket nicht erledigt.

## Stand 6 · Dorfhaus, verborgener Felsengang und acht Berggebiete

Implementiert: 13 Orte einschliesslich Alp, Dorf, Dorfhaus-Stube, Keller, Felsengang und acht unterschiedliche Berggebiete; 26 gerichtete Übergänge mit örtlicher Annäherungsprüfung und Rückwegen. Zwei Wander-Aufstiegsrouten treffen am Adlergrat zusammen und führen weiter zum Portmann-Gipfel. Weitergehende Stadt-/Bähnli-/Originalinhalte bleiben offen.

Ein Kellerrätsel mit auffindbarem Hinweis und drei drehbaren Steinrädern öffnet eine physische Steintür. Acht Ortsentdeckungen bleiben im Journal. Zwei Schatztruhen vergeben nur einmal Geld; eine benötigt Hinweise von beiden Routen. Drei zusätzliche Aufträge ergänzen das bisherige Aufgabenbuch.

Neue lokale Wegekarten und die Regionsübersicht nutzen den tatsächlichen Navigationsgraphen. Verborgene Verbindungen werden erst nach Entdeckung angezeigt. Neue Szenen haben eigene Geländeverläufe/Vegetation, Dorfarchitektur und Brunnen, Arve, Alpenrosen/Enzian, See mit begehbarem Steg, Schlucht mit Holzbrücke/animiertem Wasserfall, Unterstand, Kristalle, Grat und Gipfelbuch. Reale visuelle Qualitätsabnahme bleibt offen.

Spielstandschema v3 übernimmt v1 und das veröffentlichte v2; Region, Position, Besuche, Rätsel und Schätze bleiben erhalten. Verlassene zusätzliche Szenen geben Geometrie/Material/Textur/Schattenressourcen frei; Spielfigur und gemeinsame Markierungen bleiben erhalten. Keine behauptete reale Bildratenmessung.

Neue Prüfung tests/regions.mjs: alle zusätzlichen Ankünfte/Interaktionen erreichbar, Gegengraph, verschlossene/offene Tür, Rätsel, Wasser/Steg/Brücke, Belohnung nur einmal, gültiges Speichern und Freigabe. Erweiterter Integrationstest durchläuft beide vollständigen Routen, Rätsel, Truhen, Aufgabenbelohnung, Rückkehr und Neustart im Arvenwald. Dabei gefunden und behoben: Schatzprüfung nutzte zunächst die zuvor gespeicherte statt der aktuellen Spielerposition.

Sechs Prüfprogramme bestehen. Browser-Control weiterhin nicht verfügbar: kein echter GPU-/Safari-/Touch-/Audio-/M1-Test. Technisches Klettern, Tierpflege und weitere Minigames sind durch diese Wander-/Regionsgrundlage nicht fertiggestellt.

## Stand 7 · Drei echte Kletterrouten mit sicherer Fortsetzung

Übungsfels auf der Alp, Querung am Wasserfall und Adlerwand am Grat ergänzt. 33 Stand-/Griffpunkte mit alternativen Griffwegen, Rastabsätzen, Sicherungsseilen, Hüftgurt und bewegter Spielfigur. Auswahl direkt durch mathematischen Raycast auf den 3D-Griff, über Griffknöpfe oder Tastatur. Fortgeschrittene Routen verlangen Übung, Bergseil, Gurt und Schuhe.

Ausdauer wird pro Griff und während des Hängens verbraucht. Auf Absätzen erholt sie sich. Erschöpfung bringt die Figur gesichert zum letzten Absatz; Abbruch seilt zum Einstieg ab. Erfolg wird erst nach sicherer Landung gebucht. Wasserfallroute erreicht das andere Ufer, Adlerwand eine seitliche Abseilstelle. Bestehende Wanderwege bleiben offen. Drei zusätzliche Aufträge vergeben einmalige Belohnungen.

Schema v4 erhält v1/v2/v3-Daten. Kletterabschluss/Bestwerte sowie letzter sicherer Stand mit Zeit/Fehlern werden gespeichert; Neustart am Absatz ist geprüft. Einstellungen/Dateiimport/-export bleiben integriert. Spielmenüs halten Klettersimulation/Ausdauer an, frei laufende Inventar-/Handelsaktionen sind während des Kletterns gesperrt.

Neue tests/climbing.mjs und erweiterte App-Integration prüfen alle Routen, Ausrüstung, Fehlgriff, Doppelsteuerung, Erschöpfung, Rast, Abbruch bei Energie 0, Neustart, Quest-/Punktezustand, Dateivalidierung und 3D-Bewegung. Die Integration testet zusätzlich einen echten Three.js-Raycaster auf die 3D-Griffgeometrie, alternative Tastaturwahl und die gebundenen Schaltflächen. Rendering und DOM-Layout sind weiterhin ersetzt: keine behauptete reale Safari-/Touch-/GPU-Abnahme.

Aktuelle Arbeitsübersicht bleibt WORK-STATUS.md. Nächstes Gesamtpaket: Tierpflege und lebendige Alp; danach Figuren/Touren/weitere Minigames. Sieben Prüfprogramme bestehen; reale Gerätegrafik, Audio, Touch und Leistung bleiben offen.

## Stand 8 · Tierpflege, Erzeugnisse und Tagesroutine

Berta/Lotti mit dem Quellstand des bisherigen Hauptspiels abgeglichen: beide sind Kühe. Dessen Quelle wurde nur gelesen; das bisherige veröffentlichte Game bleibt unverändert. Zwei organisch modellierte Kühe, drei bewegte Hühner, Scheune, Brunnen, Nester und Versorgungsschalen ergänzt. Jonny und bestehender Parcours werden wiederverwendet. Direkter Tier-Raycaster und örtliche Interaktionen öffnen die Versorgung.

Futter/Wasser/Pflege, Vertrauen, einmalige Tageserzeugnisse (vier Milch, drei Eier), kostenlose Tagesgrundversorgung mit Eimer und begrenztem Brunnenwasser, zusätzliche Vorräte am Kiosk. Keine Verschlechterung während geschlossener Anwendung; Tageswechsel über Schlaf. Kostenlose Versorgung/Wasser sind nicht verkäuflich. Fehlschläge bei voller Tasche/fehlenden Vorräten verbrauchen weder Versorgungstag noch Erzeugnisse.

Zwei zusätzliche Mahlzeiten ergänzen das Crafting auf 32 Rezepte. Drei neue einmalig belohnte Aufgaben ergänzen auf 15 Aufträge. Schema v5 übernimmt v1–v4 und erhält alte Systeme; neue Tier-/Tagesdaten werden vollständig gespeichert. Tierübersicht und Kartenpunkte integriert.

Neue tests/farm.mjs prüfen u.a. drei Versorgungstage, Ressourcen, Grenzen, Speicherung, Migration, Quest-Idempotenz und Modell-Erreichbarkeit. Erweiterte App-Integration prüft tatsächliche Menüs für alle Tiere, produzierte Milch/Eier, Neustart, Raycast auf Berta, Kochen/Essen sowie Tageswechsel/Auto-Save. Alle bisherigen Welt-/Parcours-/Regionen-/Kletter-/Speichertests bleiben im Durchlauf.

Acht Prüfprogramme bestehen. GPU-/Safari-/Touch-/Audio-/M1-Abnahme bleibt offen. Nächste Gesamtpakete: Figuren/ortsgebundene Aufträge, weitere Minigames, Touren/Ausbau und zusätzliche Wildtiere/Naturjournal.


## Stand 9 · Menschen und ein zusammenhängendes Dorfkapitel

Vier artikulierte Dorfmodelle neben freien Interaktionspunkten, acht wählbare Gesprächshinweise und sechs lokale Aufträge verbinden Kräutersammeln, Tierprodukte, Küche, Bergversorgung, Erkundung, Übungsfels und Rückkehr vom Gipfel. Vorgänger werden sichtbar angezeigt; Übergaben erfordern örtliche Nähe und passende Waren/Nachweise. Waren und Geld werden atomar gebucht; Auftragserledigung/Bezahlung ist einmalig. Keine neuen öffentlichen Personen an der privaten Hütte.

Spielstand v6 speichert Begegnungen, Gesprächsthemen, Annahmen und Abschlüsse, inklusive v5-Migration. Dorfpersonen erscheinen auf der Karte; Aufgabenbuch erklärt Bereitschaft und fehlende Voraussetzungen. Geldjournal weist Dorfaufträge getrennt aus. Originalaufträge/Familien-/Dienstfiguren, Touren, Läden und weiteres Adventure bleiben als offen dokumentiert.

Alle neun Prüfprogramme bestehen: bestehende Grafikmodell-/Weg-/Parcours-/Wirtschafts-/Speicher-/Regions-/Kletter-/Farmprüfungen, neue Dorfregeln und erweiterte App-Integration. Geprüft sind örtliche/richtige Personen, fehlende Waren, fehlgeschlagene Zahlung ohne Verlust, sämtliche Auftragsstufen, keine Doppelzahlung, alte gespeicherte Daten, Speichern/Laden/Schlaf, echte gebundene Menüknöpfe und mathematischer Raycast auf Annas Modell. Der sechs Schritte lange UI-Test verwendet vorbereitete Waren und Entdeckungsnachweise; Bergpfade und Klettern werden in den vorherigen Integrationsteilen tatsächlich durchlaufen.

Keine reale Browser-/GPU-/Layout-/Touch-/Audio-/M1-Abnahme: Browsersteuerung ist in dieser Umgebung nicht verfügbar. Weiter geht es mit zusätzlichen Minigames, danach Touren und Ausbau. Vollständige Endabnahme und finales Gesamtspiel bleiben offen.


## Stand 10 · 3D-Ski-Slalom und fortsetzbare Challenge

Sonnenalp-Slalom als weiteres echtes Minigame: Welt-Startpunkt auf einem Schneefeld, durchgehende 3D-Piste, zwölf Tore und drei Stufen, geglättetes Lenken, Bremse, Countdown, Zeit/Treffer/Punkte, Pause und Abbruch. Verzweigte Koniferen und die vorhandenen Schweizer Reliefdaten rahmen die Piste. Eigene Figurenkopie mit Leihski/Helm; sichere Rückkehr in die Welt und Freigabe eigener Pistenressourcen ohne gemeinsame Figurenressourcen zu entsorgen.

Energie kostet nur ein neuer Start; je Stufe begrenzte erste Erfolgsprämie und persistente Bestwerte. Transaktion und Ergebnis sind gegen doppelte Prämien bzw. teilweise Buchung geschützt. v7 speichert den aktiven Lauf mit Countdown, Position, Zeit und Toren; v1–v6 werden übernommen. Fortsetzung nach Neuladen kostet keine weitere Energie. Pause und Fokus-/Sichtbarkeitswechsel stoppen die Simulation und lösen Eingaben.

Alle zehn Prüfprogramme bestehen: alte Welt-/Parcours-/Crafting-/Wirtschafts-/Speicher-/Regions-/Kletter-/Tier-/Dorfprüfungen sowie neue Ski-Regeln und erweiterte App-Integration. Tests fahren alle Tore auf allen Stufen mit echter Lenksimulation, prüfen Sieg/Niederlage/Abbruch/Wiederholung, Bremsen, Countdown, Zahlungsgrenzen, Gerät-/Dateifortsetzung und Geometrien/Freigabe. App-Integration steuert über echte gebundene Tastatur-/Pointerereignisse, prüft Pause/Fokusverlust, Neustart ohne doppelte Energie, Erfolg/Niederlage und einmalige Belohnung, Rückkehr sowie Karten-/Buchanzeigen. Der Renderer und DOM-Layout sind ersetzt; dies bestätigt keine reale Grafik oder Touch-Ergonomie.

Echte Mac-/iPad-/Safari-Abnahme, Audio und gemessene Leistung bleiben offen. Nächste Minigames: Schneeball/Vogelchallenge mit geschützten Zielen; danach weitere Minigames, Touren und Ausbau. Vollständiger Gesamtauftrag bleibt in der Arbeitsübersicht sichtbar.


## Stand 11 · Zwei 3D-Ziel-Challenges mit Schutzregeln

Originalquellen für Hüte/Holzschirme, Personen, weisse Türkentauben und Drei-Fehler-Regel gelesen. Beide Spiele mit Weltzugängen, drei Stufen, deterministischen Zielbewegungen, Punktabzügen, begrenzten Versuchen/Zeit, Countdown, Pause/Abbruch und einmaligen Prämien umgesetzt. Die gemeinsamen 3D-Eingaben benutzen reale mathematische Raycasts, filtern unsichtbare Modelle und respektieren die vordere sichtbare Figur/Abdeckung. Körper zählen nicht als Hut. Schutzfehler beenden die Runde auch bei schon erreichtem Trefferziel.

Aktive Runden in v8 speichern die für Fortsetzung nötigen Werte; Ziel-Wiederkehr und Spielbewegung hängen nur von gespeicherter Spielzeit ab. Kein erneuter Energieabzug nach Neuladen. Trefferhinweise bleiben über mehrere Frames lesbar. Auto-Save nach Aktion/Pause/periodisch/Verlassen, Datei-Roundtrip und alte v1–v7-Daten geprüft. Karten und Aufgaben-/Geldjournal ergänzt. Geteilte Figurenressourcen werden bei Szenenfreigabe erhalten.

Alle elf Prüfprogramme bestehen. Neu: `tests/target-games.mjs` mit sechs gewinnbaren Modi, Schutz-/Abdeckungs-/Munitions-/Score-/Zeit-/Energie-/Prämienregeln, atomarer Geldobergrenze, Migration, inkonsistenten Daten, echten 3D-Ziel-Raycasttreffern und Freigabe. App-Integration prüft beide Spielzugänge, Auslösen per Pointer/Aktionsbutton/E, gehaltenes Fadenkreuz/Loslassen, Pause/Fokusverlust/Neustart, wiederholten Schnee-Erfolg ohne zweite Prämie, Vogelerfolg sowie drei geschützte weisse Tauben per tatsächlichem Raycast, Abbruch und Welt-Rückkehr. Bestehende Farm-/Dorf-/Ski-/Kletter-/Wirtschafts-/Speicher-/Weltprüfungen bleiben erhalten.

Prüfgrenze: Renderer und DOM-Layout sind ersetzt. Keine reale Grafik-/Safari-/iPad-/Touch-/Audio-/Leistungsabnahme. Schnee-Flug ist ein visueller Effekt mit sofortiger Trefferentscheidung; die ursprünglichen Beute-/Kochketten und Schokoladen-/Tagespreise bleiben offen. Weitere Minigames, Touren, Ausbau und übrige Originalinhalte stehen weiterhin im Gesamtplan.


## Stand 12 · Begehbares Bergrestaurant und gespeichertes Jassduell

Originalquelle des vereinfachten Jassduells gelesen: drei Handkarten, drei ausspielende Sämi-Karten, Farbpflicht, Trumpf mit Bube/9, zwei Stiche zum Sieg und CHF 15 Tagespreis. Diese Regeln übernommen; grosse beschriftete Karten, Legalsperre, Stichbestätigung/-erklärung und Historie ergänzt. Kein vollständiger Schieber-Jass behauptet. Kein Einsatz/Energieverbrauch, keine Uhr; Phase und komplette Hand in v9 gespeichert. Alte v1–v8-Stände migriert.

Bergrestaurant mit begehbarer Stube, sitzendem Sämi, erreichbarem Jasstisch/Speisekarte und beiden ursprünglichen Mahlzeiten eingebunden. Tür hin/zurück, 14 Orte/28 gerichtete Übergänge; bestehende Regions-IDs und Zufallsfolgen bleiben erhalten. Karten liegen oberhalb des Tischs; Stühle kollidieren. Menü bezahlt CHF 14/18 und füllt Energie/Ausdauer, verhindert Kauf ohne Mittel bzw. doppelte Bestellung bei vollen Werten. Geldjournal unterscheidet Restaurant/Jass.

Alle zwölf Prüfprogramme bestehen, inklusive neuer Jassregeln (alle Trumpfränge/Farbpflicht, 120 gemischte vollständige Runden, Tageswechsel/Preis, Sieg/Niederlage, Speicherrundlauf, illegale Hände, Ortsbindung, atomare Transaktionen). App-Integration prüft Restauranttüren/Mahlzeit und zufälligen Start, echte Kartenwahl und Stichbestätigung, Pause/Regeln/Abbruch, Neustart ohne Neumischen, Tischbindung, vorbereitete Sieg-/Niederlagenhände über tatsächliche Knöpfe und Tages-/Doppelprämien. Gefundener UI-Fehler: alter Auswertungs-Callback ersetzte die Ergebnisansicht trotz korrekter Geldsperre. Callback jetzt ohne aktive fertige Runde wirkungslos; Integration danach erneut bestanden.

Renderer/DOM-Layout sind ersetzt; keine tatsächliche Mac-/iPad-/Safari-/Grafik-/Touch-/Audio-/Leistungsabnahme. Weitere Restaurantgäste, Witze, Schnupftabak, Retro-Spiele, übrige Stadt/Läden, Touren und Ausbau bleiben offen.


## Stand 13 · Stadt, Melanie, Snake/Pong und Höhlenlampe

Originale Retro-Sammlung gelesen; zwei eigenständige Spiele umgesetzt, weitere ausdrücklich offen. Stadtplatz und Laden als neue 3D-Orte mit sicheren Hin-/Rückwegen, Melanie/Tresen, Regalen/Automat. Wegtest fand blockierte gerundete Zielzelle trotz freiem exaktem Punkt: Automat-Interaktion von z=1.4 auf 1.8 versetzt; Routen erneut bestanden.

Snake/Pong im klassischen 2D-SVG-Bildschirm, je drei Stufen, Countdown, gratis, 120-Sekunden-Grenze, getrennte Bestwerte, Keyboard/Touch/Pong-Drag. Verdeckt kein 3D-Render. Bewegungs-/Zufallsdaten sichern identische Fortsetzung; Fokuswechsel/Pause lösen Eingaben. v10 migriert v1–v9. Einmalige Lampenprämie atomar, volle Tasche mit persistenter späterer Abholung, Verkauf setzt Anspruch nicht zurück. Rucksacklampe aktiviert Höhlenlicht.

Alle dreizehn Prüfprogramme bestehen. Arcadetests gewinnen alle sechs Modi durch reale Simulation und prüfen Regeln, Physik, Countdown, deterministische Fortsetzung, Migration, ungültige Zustände und Belohnung/volle Tasche/Abholung. App-Integration prüft Türen/Person/Automat, echte Richtung/Drag, Pause/Neustart, Kollision/Abbruch und vorbereitete legale Sieg-Endstände über die echte Frame-Schleife, spätere Abholung und Höhlenlicht. Fehlende Retro-Bestwertanzeige im Aufgabenbuch gefunden, ergänzt und erneut geprüft. Vorherige Systeme bleiben im Gesamtdurchlauf.

Prüfgrenze: ersetzter Renderer/DOM-Layout. Kein tatsächlicher Safari-/Mac-/iPad-/SVG-Layout-/Touch-/Audio-/Leistungsnachweis. Weitere Retro-Spiele, Witze/Schnupftabak, Stadtangebote, Touren, Ausbau und Originalaufträge bleiben offen.


## Stand 14 · Alpen-Breakout mit gespeicherter Fortsetzung

Drittes eigenständiges Retro-Spiel bei Melanie ergänzt: 32 Steine, drei Bälle, drei Tempostufen, 120 Sekunden, kostenlos. Echte Ballkontakte mit kleinen Physikschritten, winkelabhängiger Schläger, Tastatur/Touch/Drag. Zehn Punkte je Stein und zwanzig Abzug je Ballverlust, mindestens null. Sieg zählt in derselben einmaligen Lampenvergabe wie Snake/Pong. Bestehendes v10-Format erweitert ohne Verlust alter Bestwerte; Ball, Schläger, Steinbelegung, Bälle, Anspielpause und Uhr sichern deterministische Fortsetzung.

Neue Breakout-Prüfung gewinnt sechs komplette Runden (drei Tempos, zwei Anspielrichtungen) durch reine Eingaben ohne künstliche Positions-/Punktekorrektur; Wiederholungen bestätigen einmalige Lampe. Zusätzlich isolierte Steinseitenkontakte, Wand/Schlägerwinkel, drei Ballverluste, Zeitablauf, ungültige Importe, alte v10-Daten und Datei-/Gerätefortsetzung. Der erste Seitenkontakt-Test lag zwischen benachbarten Steinen und traf mehrere gültige Flächen: Prüfaufbau auf einen isolierten letzten Stein korrigiert; alle vier Seiten bestehen. Kein Spielphysikfehler daraus abgeleitet.

App-Integration prüft Start, echte Touch-/Tastatureingaben, Loslassen, horizontalen Drag in einer breiten Fläche mit seitlichen Rändern, Pause/Neustart/Abbruch sowie einen legal vorbereiteten letzten Stein über die Frame-Schleife. Bestwert und kein Doppelpreis geprüft. Alle vierzehn Programme bestehen; alle Laufzeitmodule parsbar, Diff ohne Whitespacefehler.

Prüfgrenze bleibt ersetztes DOM/Renderer: kein realer GPU-/Safari-/Mac-/iPad-/Touchkomfort-/Audio-/Leistungsnachweis. Sternenwächter, Rallye und übrige Originalaufträge bleiben offen.


## Stand 15 · Kompakte Oberfläche und echter Touch-Zugang zur Alphütte

Nutzerfoto zeigt übergrosse Energie-/Aufgabenkarten und mehrzeilige Hauptnavigation. Beide Anzeigen starten jetzt kompakt, Details und Spielmenü exklusiv aufklappbar, direkter Kartenzugang; 44-Pixel-Touchflächen. Speicherfehler/knappe Versorgung weiterhin sichtbar. Ortsname verkleinert. Kein prozentualer Layoutgewinn behauptet, da Browser-QA hier nicht verfügbar ist.

Nutzer konnte Hütte nicht betreten und vermutete Tutorial-Sperre. Code bestätigt: keine solche Sperre. Dach/Fassade wurden bisher ignoriert und nur Boden unter dem Haus als Laufziel ausgewertet; Kollision verhindert dort Route. Explizite Haus-/Wegweiser-Raycastziele führen zur sicheren Tür und lösen die lokale Aktion nach Ankunft aus. Keine Teleportation. Ursprüngliche Tastatur/Interaktion und Rätselsperren erhalten; Laufvorhaben bei manueller Steuerung, neuem Bodentipp oder Dialog beendet.

Integration ergänzt einen vollständigen frischen Touch-Lauf ohne direkten Positionswechsel: Wiese anklicken und Bewegung messen; Dach anklicken, bis zur Tür laufen, automatisch eintreten und speichern; wieder verlassen, Dorfwegweiser anklicken, hinlaufen und wechseln. Kräuter/Reiterfolg bleiben dabei null/false. HUD-Startzustand/exklusive Details/Menü/Kartenknopf geprüft. Technischer Modelltest kontrolliert gefaste Fassadenbretter, 144 instanzierte Einzelschindeln und helleren Holzbasiston. Alle bisherigen 14 Programme, Syntax und Diffprüfung bestehen.

Hüttenfarbe/Schattierung war im Foto stark dunkel; Albedo-Multiplikation reduziert, Umgebungslicht neutraler/heller, unregelmässige Einzelbauteile ergänzt. Optische Qualitätsabnahme bleibt ausdrücklich offen: kein echter Renderer, Safari, iPad oder Mac in dieser Prüfumgebung. Kein behaupteter Fotorealismus oder gemessener Performancegewinn.


## Stand 16 · Die Alp als Heimat, freie Wege nach oben/unten und Crafting-Ausbau

Originale 2D-Assets tatsächlich angesehen: Sommer-Alp, Sommer-Bauplatz und Hüttenatlas. Die frühere Arbeit konzentrierte sich zu stark auf einzelne Systeme statt deren sichtbare Weltbeziehung. ART-DIRECTION.md dokumentiert den Vergleich, die erhaltene 3D-Anforderung und das noch offene grafische Qualitätsziel. Keine Originalbilder als flache Welt eingesetzt.

19 Orte/42 Übergänge: Panoramaweg ist von der Alp aus frei bis zur Hochalp/Grat/Gipfel und zurück; Talweg führt frei über Dorf zur Stadt und zurück. Alle Orte benötigen weiterhin nur lokale Zugänge; Kartenknöpfe setzen einen echten Lauf zum gewählten Eingang um. Alte geheime Alternativroute erhalten. Berg-/Talterrain hat reale Steigungen; Heimat-Hügel, niedrigere Erkundungskamera, Hüttenunterstand, warme Fenster und gerundeter Steinsockel ergänzt. Der Parcours befindet sich jetzt auf einer eigenen frei zugänglichen Reitweide.

Heimat um Bach, Brücke, neun animierte Fische, steinige Ufer, Rastfeuerstelle, Talblick und grössere Scheune ergänzt. Hühner in den Hofbereich versetzt. Zwei Geissen ergänzt; Versorgung fünf Gruppen, produktive Geissenmilch pro Spieltag, ausreichende kostenlose Grundration und keine doppelten Erzeugnisse. Drei dauerhafte Herstellungsprojekte für Reitpark, grösseres Kornfeld und geschütztes Bohnengewächshaus. Ernten erst ab Folgetag neuer Anlagen und einmal am Tag; voller Rucksack lässt Anspruch unberührt. Mehl und Portmann-Alpschokolade ergänzen die Rezepte auf 34. v11 migriert alte v1–v10-Stände und erhält bereits bezahlte Farmaufträge/Retro-Belohnungen.

Gefunden/behoben: ursprünglicher Bohnen-Erntepunkt lag auf dem Übungsfels-Collider; seitlich auf freien Punkt versetzt. Nach Ergänzung der Geissen erwarteten alte Testzahlen noch drei produktive Stellen/vier Gruppen; tatsächlichen vier Erzeugnisstellen/fünf Gruppen angepasst. Neue Gegenstandsdefinition wurde beim ersten Einfügen wegen abweichendem Leerzeichen nicht übernommen; Produkt-/Saat-/Schokoladen-IDs korrigiert und geprüft. Nach neuem Geländetyp ferner DEM-Hintergrund zunächst vom lokalen Steigungsansatz betroffen; lokale Geländeform innerhalb des Bereichs weich ins bestehende Relief überblendet.

Alle 16 Programme bestehen. Estate-Regeln, v10-Migration, Bau-/Tages-/Taschen-/Orts-/Dateischutz neu geprüft. Journey läuft beide vollständigen Gipfel-/Stadt-Rundwege ohne Ausrüstung/Tutorial/Geheimnis mit 9754 kollisionsfreien Bewegungsteilschritten. Alle 68 zusätzlichen Interaktionspunkte/38 Ankunftspunkte erreichbar. App prüft Bau-/Ernte-/Feuerrastknöpfe, Anlagen nach Neustart, tatsächlichen Karten-Lauf zur Weide und zurück sowie alle vorherigen Spielsysteme.

Grenze bleibt echter Renderer/DOM/iPad/Mac/Safari. Keine geprüfte optische Gleichwertigkeit zum Original, kein Fotorealismus und keine nahtlose Open World behauptet. Landschaftskomposition, Hütten-/Scheunenwirkung, Talblick, Kamera und Performance bleiben visueller Abnahmeschwerpunkt vor weiteren Minispielen.


## Stand 17 · Räumliche Reparatur statt weiterer Funktionsausbau

Nutzerkritik an ebener Kulisse, abgestellten Objekten, klotzigem Innenraum, fehlendem Panorama und unfertigen Wegen aufgenommen. Gefunden: breite alte Parcours-Bodenfläche noch vorhanden; dargestellte Wege nicht aus den aktuellen Zugängen abgeleitet; Bandkehren erzeugten nach unten gewendete Dreiecke; Blumen wurden vor den tatsächlichen Wegen gesetzt; feste Gebäude auf geneigtem Untergrund; keine Tiergehege. Diese Punkte korrigiert, mit runden Weganschlüssen, Steintrittstufen, finalen Freihaltezonen, begehbaren Holztoren, angepasstem Hühnerstandort und Geländepolstern.

Terrassenüberlappung an Hühnerstall/Futterplatz und zu steiler Übergang zwischen Kornbeeten durch gemeinsames Höhenniveau behoben. Neue Berg-/Talkulisse ist bewusst gestaltete 3D-Geometrie nach dem Originalbild, keine neue Behauptung vermessener Zentralschweizer Topografie. Kamera-/Sichtlinienprüfungen zeigten zunächst Gipfel ausserhalb des Bilds und See hinter einem Vordergrundhang; Blickziel, Bildwinkel und Talöffnung angepasst. Mehrere hohe Gipfel und Gelände-unverdeckter See liegen im Standard-Landschaftsausschnitt. Grasmenge, Höhenvariation und Blumenverteilung überarbeitet. Stube mit Dielen und abgerundeten Bauteilen modellseitig verbessert.

17 Programme bestehen; neue Kompositionsprüfung überprüft diese konkreten räumlichen Eigenschaften. Unverändert keine echte Browser-/GPU-/iPad-/Mac-/Safari-Ansicht. Geprüfte Sichtlinie ist kein Nachweis schöner Grafik. Der Nutzerauftrag zur Originalbildqualität bleibt offen; weitere Minigames zurückgestellt.


## Schweizerische Alp · Landschaft beruhigen und zusammenführen

Auslöser: Nutzer fordert eine aufgeräumtere, schweizerisch-alpine Gestaltung, bessere Berge und schöneres Grün. Kein neues Spielsystem in diesem Durchgang.

- Gelbliche Gras-/Felsfototextur auf der Heimatwiese durch eine fein gekörnte, neutrale Wiesentextur ersetzt. Grossflächige Grünvariationen folgen zusammenhängenden Zonen statt zufälliger Farbwechsel je Geländepunkt. Grashalme in abgestimmten kühlen und warmen Grüntönen.
- Bergprofil mit stärker zugespitzten Flanken und längeren Kämmen überarbeitet. Felsfarbe folgt der Steilheit; Schneegrenze variiert mit Höhe, Lage und Flanken statt gleichmässiger heller Kuppen. Gruppierte Nadelwälder an den äusseren Talschultern; zentrale Seeöffnung ausgespart. Helle blaue Luft-/Nebelabstimmung, weniger gelbes Sonnenlicht.
- Schwebende Tier-, Brunnen-, Scheunen-, Feld- und Aussichtsschilder entfernt. Alpkiosk trägt eine kleine Tafel am Tresen, Ausgangswegweiser stehen auf Holzpfosten. Kugelförmige Wolken und dekorative Verkaufskugeln entfernt. Interaktionen bleiben über Tiere/Objekte und die vorhandene Bedienoberfläche zugänglich.
- Gemeinsame Hofzufahrt mit Abzweigen; Nebenpfade schmaler als die Hauptwege. Kollisionsgeprüfte Sichtverbindungen glätten unnötige Gitterknicke. Wege folgen weiterhin dem Gelände und erhalten Steintrittstufen. Holzplatte unter dem Aussichtspunkt durch einen geländefolgenden Stein-/Kiesbereich ersetzt.
- Scheunenwände mit feiner Bretterteilung statt grober durchgehender Streifen. Alpbrunnen mit steinerner Randfassung. Keine Änderung am Speicherformat oder an Bau-/Versorgungsregeln.

Geprüft: composition, nature, prototype, alpine, journey und App-Integration, dazu Syntax der geänderten Module und Diff-Prüfung. Erreichbare Hofziele, offene Gehegetore, freie Rundreisen zum Gipfel und in die Stadt, Speicher-/Spielintegration sowie geometrische Sicht auf Berge und Talsee bestehen.

**Qualitätsgrenze:** Keine verfügbare Browser-/GPU-Sichtprüfung; die Übereinstimmung mit der Schönheit des 2D-Originals, iPad-Bildwirkung und Bildrate bleiben offen. Dies ist ein veröffentlichter grafischer Überarbeitungsstand, keine visuelle Endabnahme.


## Verbindlicher Umbau nach detailliertem Landschaftsbrief · 16.10.2026

**Umgesetzt:** Eigene Gratprofile nach Pilatus (mehrteiliger Kamm), Eiger, Mönch, Jungfrau und Matterhorn ersetzen die generischen runden Bergmassen. Nordflanken, verschieden hohe Schneegrenzen, Waldschultern und instanziertes Geröll. Geografisch neu komponierte Spielkulisse, kein vermessener Nachbau. Talsee nach links versetzt, linke Geländerinne geöffnet; Kamera schaut höher in den Horizont. Standard-Landschaftsausschnitt enthält geometrisch Pilatus, Eiger, Mönch und Jungfrau sowie links einen durch das Gelände unverdeckten See. Matterhorn gehört zum weiter rechts liegenden Rundumblick.

**Heimathof:** Lichtes honigbraunes Holz statt grauer Fassadenfarbkarte, grüner abgestimmte Läden, zusätzliche Seitenfenster, geschwungener Berner Giebelschmuck (Ründi), geschlossene Giebelspitze und feinere einzeln gelegte Dachschindeln (576). Stall und Gehege bleiben zusammen an der westlichen Hofkante; deutlich grösserer Grundanbau (8 × 5 statt 4.8 × 3 Spieleinheiten) und Erweiterung (9 × 4.5) unmittelbar südlich des Hauses/östlich des Tierhofs auf gemeinsamer Erdterrasse. Erntepunkte bleiben am zugänglichen Feldrand. Saftigeres Grün, Blüten mit deutlicher individueller Höhenvariation. Braune Erdwege mit zwei Fahrspuren und grüner Mitte auf breiteren Hofzufahrten; weiche Randanschlüsse statt grauer Kiesstreifen.

**Bachlager:** Feuerkreis an die nördliche Uferkante des tatsächlich vorhandenen Bachs versetzt. Sitzstämme, ein separat modelliertes beiges Giebelzelt und ein Felsrücken bilden eine gemeinsame Lichtung. Rastpunkt und Karte auf (8,15) aktualisiert, Gratisrast erhalten. Keine verstreuten Dekoschafe mehr im Hof: zwei Steinböcke und drei Murmeltiere auf äusseren Berg-/Talschultern, zusätzlich bestehende Vögel/Schmetterlinge.

**Figuren:** Vier prozedurale 3D-Modelle Mann/Frau/Junge/Mädchen, kontinuierliche Körperprofile, ausgearbeiteter Kopf mit Kinn/Nase/Augen/Brauen/Ohren, Hände/Finger, Kleidung und Schuhe, kleinere Kinderproportionen. Wahl direkt im Willkommen und unter Einstellungen. Wechsel erhält Spielfortschritt, Animationsteile und Höhlenlampe; Lampenhöhe folgt der Figur. Während laufender Kletter-/Actionrunden ist ein Modellwechsel gesperrt. Auswahl speichert automatisch im bestehenden Gerätespielstand und Dateiexport; alte v11-Stände erhalten Standardfigur Mann ohne Verlust. Speicherschlüssel unverändert.

**Prüfung:** 18 Programme einschliesslich neuer Figurenprüfung. Prüft vier Varianten, Grössenunterschiede, stabile Modellwurzel/Lampe, automatische Speicherung/Datei/Neustart und Altdaten; echte Willkommen-/Einstellungsbedienung; Hofziele und Tore, Bachlager neben Wasser, linke Seeprojektion und vier sichtbare Referenzgipfel, freie Gipfel-/Stadtrundreisen, alle bestehenden Spielsysteme. Ski-/Zielspielprüfung sucht die weiter gemeinsam verwendete Modellgeometrie jetzt innerhalb der neuen Modellgruppe und prüft unverändert deren Erhalt beim Szenenabbau. Syntax und Diff geprüft.

**Offen:** Gerenderte Sichtprüfung auf iPad/Mac, Bildrate und ästhetische Abnahme gegenüber dem ursprünglichen 2D-Design. Prozedurale Anatomie ist keine zugesicherte fotorealistische Menschenfigur; die modellierten Bergvorbilder sind keine garantierte fotografische Silhouettenreproduktion. Kein vollständiger Innenraum-Neubau in diesem Durchgang. Weitere Bearbeitung richtet sich zuerst nach tatsächlicher Bildwirkung.


## Referenzabgleich nach IMG_0679 / IMG_0680 · 16.10.2026

Die am 16.10. gezeigte ursprüngliche Alp ist eine verbindliche Kompositions- und Materialreferenz. Ihre Dunkelheit ist Abendstimmung; der 3D-Tag bleibt heller. Dies ist eine gezielte Weiterbearbeitung des bestehenden 3D-Spiels, kein Austausch des spielbaren Projekts gegen ein Hintergrundbild.

Umgesetzt:
- Normale Begleitkamera von 32 auf 25 Einheiten herangeholt; Höhe 12.5, Blickvorschub 10 und Blickhöhe 11.5. Vorschub und Blickhöhe skalieren mit dem Zoom, damit beim Heranzoomen keine nach oben kippende Kamera die Figur abschneidet. Überblick und Drehung bleiben verfügbar. Geometrischer Nachweis: Figur mindestens 20 % höher im Bild als zuvor; Kopf/Füsse bei Zoom 0.75–1.5 und mehreren Seitenverhältnissen im Bild. Vier Referenzgipfel sowie nicht vom Wohnhang verdeckter See im normalen Landschaftsausschnitt.
- Stall vollständig ausgearbeitet: geschlossene Holzgiebel, Steinuntergeschoss, getrennte Bretter, gedecktes Schindeldach mit First-/Traufhölzern, verstrebtes Doppeltor mit Beschlägen und vergitterter Heuboden. Hütte und Stall teilen die vorhandenen Holz-, Stein- und Dachmaterialien. Bretter und 368 Dachschindeln in Instanzen gebündelt. Bestehender Standort und Gebäude-Kollision erhalten.
- Hohler Holzbrunnen mit getrenntem Boden, Seitenwänden und Stirnbrettern, Steinfüssen, dunklen Spannbändern, Wasserspiegel, Zulauf und animiertem Ring. Passt in den bisherigen Kollisionsradius; Wasserholen unverändert.
- Bachquerschnitte waagerecht statt quer zum Ufer geneigt; nach oben gerichtete Normalen; neun Fische unter derselben Oberflächenhöhe. Gebündelte animierte Strömungsspuren. Feuerstelle mit gekreuzten transparenten Flammenflächen statt eines orangefarbenen Kegels; Zelt, Felsrücken und Rastfunktion erhalten.
- Blumenarten folgen zusammenhängenden Standortgruppen. Im Hof vor dem Haus niedrigere Grasbüschel und geringere Wahrscheinlichkeit für Blüten; höhere Randvegetation. Kein zusätzlicher pauschaler Baumteppich: Fernwald nur unter 35 Höhen-Einheiten auf sanfteren Flächen und stärker gebündelten Talschultern.
- Heimatwiese bekommt am äusseren Rand dieselben Höhen-/Hang-/Farbregeln wie die Fernlandschaft. Der weiche Farbübergang ersetzt den abrupten Wechsel der beiden Gelände-Materialien; bestehende Gelände- und Weggeometrie bleibt.
- Tageslicht neu abgestimmt: kühlere Himmelsaufhellung, grüneres Bodenlicht und wärmere gerichtete Sonne mit deutlicherer Trennung von Licht/Schatten. Feinere neutralere Wiesen-Farbkarte; keine Abdunklung nach dem Abendfoto.

Prüfgrenze: numerische Kamera-/Sichtachsen-, Geometrie-, Kollisions- und Spielablaufprüfung. Keine verfügbare Browser-/GPU-Sichtprüfung; kein behaupteter fotorealistischer Endstand, keine zugesicherte M1-Bildrate und keine ästhetische Endabnahme. Die Nähe zur Referenz muss am gerenderten Spiel geprüft werden.

Validierung dieses Stands: alle 18 vorhandenen Prüfprogramme bestanden; Syntax und lokale Modulreferenzen aller 39 Anwendungsmodule sowie `git diff --check` bestanden. Der Wegweiser-Klicktest wechselt für das vom Hüttenstandort entfernte Schild ausdrücklich in die Übersicht und zielt auf die sichtbare Schildmitte. Nach der abschliessenden Wasserhöheneinstellung wurden Komposition und freie Rundreisen erneut geprüft.


## Fehlerkorrektur nach iPad-Rückmeldung · 16.10.2026

Nutzer meldet unzuverlässiges Touch, Wasser auf Wegen, zu entfernte Kamera und weiter unzureichende Übereinstimmung mit dem Original. Gestalterische Abnahme bleibt ausdrücklich offen. Die beiden Referenz-Screenshots IMG_0679.jpeg und IMG_0680.jpeg wurden in dieser Sitzung direkt als Bilder geöffnet. Sie zeigen einen ruhigen Hof mit grossem Haus links, Stall rechts dahinter und gestaffelten Wald-/Felsbergen. Die aktuelle Gebäudeanordnung und Bergmodellierung erreichen diese Komposition noch nicht.

**Korrigiert:**
- Gemeinsame Pointer-Eingabe verfolgt eine Fingerkennung, nutzt Pointer Capture, akzeptiert bis 28 CSS-Pixel natürliche Fingerbewegung und verwirft echte Ziehbewegungen, Mehrfingergesten, Abbrüche und veraltete Capture-Ereignisse. Blur/Seitenwechsel räumen Eingaben auf. Trefferkoordinaten stammen aus dem tatsächlichen Canvas-Rechteck, auch im Zielspiel. Leere Footerflächen blockieren den Spielbereich nicht mehr.
- Bei einem Tipp knapp auf kleine Hindernisse wird im Umkreis von höchstens 1.2 Spieleinheiten ein erreichbares Ziel gesucht. Tiefer im Wasser oder in grossen Gebäuden entsteht weiterhin kein begehbares Ziel.
- Normale Erkundungskamera: Abstand 13 statt 25/32, Höhe 6.5, kleiner Vorblick auf die Spielfigur. Die ganze erwachsene Figur bleibt bei allen Zoomstufen sichtbar; bei Standardzoom geometrisch mehr als doppelt so gross wie in der früheren Fernansicht. Die bestehende Übersicht behält ihre eigene erhöhte Kamera. Alte Kamerastände werden einmal auf Nahansicht und Standardzoom zurückgesetzt; Fortschritt und Figur bleiben erhalten. Spätere eigene Kameraeinstellungen bleiben gespeichert.
- Bach und Teich erhalten echte Vertiefungen unter der Wasserfläche. Wasserhöhen sind gemeinsam definiert statt über die Wiese gelegt. Keine Wasserfläche/Strömungsstriche durch die Brücke; Fische tauchen dort unter. Wegkanten werden an Wasserflächen begrenzt.

**Nachweise:** 19 Prüfprogramme inklusive neuer Touch-Prüfung. Echte App-Eingabe mit versetztem Canvas und Fingerdrift, Dach-/Tür-/Tier-/Kletter-/Wegzielinteraktionen, Spielstände und bisherige Spielsysteme. Geometrisch: Wasser über abgesenktem Bett, keine Wassergeometrie unter der Brückenfahrbahn und keine Erdwegpunkte innerhalb der Wasserfläche. Kamera prüft ganze Figur und Bildschirmgrösse. Die vier Gipfel werden nur noch in einem separaten Landschafts-Referenzwinkel geprüft; dies wird ausdrücklich nicht als Standard-Spielkamera ausgegeben. Reale iPad-/Safari-Berührung und GPU-Darstellung sind weiterhin nicht geprüft.

**Weiter offen / nicht als erledigt melden:** Bergformen, natürliche Hangübergänge, bewusst komponierte Waldsäume und Neuordnung von Haus/Stall/Tierhof nach der Referenz. Es erfolgte in diesem Fehlerpaket keine weitere kosmetische Berg-/Haus-Fertigmeldung. Keine zusätzlichen Minispiele.


## Arbeitsauftrag · Pakete 1–3, erster Umsetzungsschritt

- **Paket 1 umgesetzt:** Verbindliche räumliche Anordnung in `dist/hof-layout.mjs`. Stall rechts hinter dem bestehenden Wohnhaus, Kuhweide direkt angeschlossen. Hühner und Geissen in benachbarte Gehege verlegt. Versorgung am Hauptstall; separater Futterunterstand entfernt. Kiosk und Teich aus den neuen Tier-/Gebäudeflächen verlegt, freier Bohnen-Erntezugang westlich des Gewächshauses. Modelle, Hofwege, Pflege-/Versorgungsregeln, Karte und Interaktionspunkte gemeinsam angepasst. Fortschritt/IDs unverändert.
- **Prüfbarer Plan:** `docs/Portmann-Alp-Hofplan.png` und SVG zeigen die tatsächlichen Spielkoordinaten und berechneten Wege. Der Plan wurde betrachtet; er ist kein gerendertes Spielbild. Hintergründe und Positionsliste: `docs/HOFPLAN.md`.
- **Paket 2 begonnen:** Im geometrisch berechneten iPad-Startbild liegen Haus und Stall links beziehungsweise rechts innerhalb des Bildes. Kameraabstimmung im gerenderten Bild steht aus. Gebäudeformen sind unverändert.
- **Paket 3 teilweise umgesetzt:** Veraltete Heimat-Parcoursfreifläche und zugehörige Testforderung entfernt. Das Umgebungsnetz ist ein Geländering und liegt nicht mehr unter dem Nahgelände. 552 gemeinsame Randpunkte und 675 Innenstrahlen ohne Überlagerung geprüft. UV-Massstab am Rand abgestimmt; GPU-Materialwirkung bleibt offen. Die natürliche Hanggestaltung ist nicht abgeschlossen.
- **Geprüft:** Neue Hofprüfung, Gelände-Randprüfung, alle Interaktionswege, freie Gipfel-/Talrundreisen, Tierpflege, Versorgung, Ernten, Speicherung und bestehende App-Integration. Testdaten verwenden die neuen tatsächlichen Orte; die Prüfung falscher alter Koordinaten wurde nicht beibehalten.
- **Offen:** Reale Grafik-/Geräteabnahme, Kameraverdeckungen, Geländeformen, Haus-/Stallarchitektur, Bergmassive und übrige Arbeitspakete. Keine grafische Fertigmeldung. Bestehende Gestaltungsmängel werden durch diese räumliche Neuordnung nicht als erledigt betrachtet.

# Portmann Alp · Vollständiges 3D-Spiel

Verbindlicher Spielname: **Portmann Alp**. Untertitel: **Chäs, Fondue und Alpenluft** (vom Nutzer bestätigt). Portmann Fondue Chaos bleibt der Name der gesicherten bisherigen Version.

## Verbindliches Ziel
Ein vollständiges Schweizer Alpen-Adventure für Mac und iPad M1 oder neuer. Natürliche, hochwertige alpine Gestaltung; umfangreiches Crafting; abwechslungsreiche Minispiele; Tiere und lebendige NPC; Bergtouren, Kletterpassagen, Schatzsuche und versteckte Durchgänge; zusammenhängende Energie- und Finanzsysteme. Eine kleine Demonstrationsregion erfüllt dieses Ziel nicht.

Die bisherigen Aufträge in DEVELOPMENT.md bleiben verbindlich. Dieser Plan ergänzt sie um Abhängigkeiten, Systemregeln und konkrete Abnahmen. Das bestehende Hauptspiel wird als gesicherte Referenz erhalten.

## Spielkreislauf
Erkunden → Ressourcen und Hinweise finden → Essen/Werkzeuge/Ausrüstung herstellen → neue Wege/Kletterpassagen erschliessen → Schätze und Belohnungen erhalten → verkaufen oder weiterverarbeiten → Alp, Laden und Ausrüstung ausbauen → grössere Touren und Geheimnisse entdecken.

Jedes grössere System muss diesen Kreislauf unterstützen. Neue Gebiete benötigen einen Grund für den Besuch, eigene Begegnungen und eine sinnvolle Rückkehr.

## Stand, ohne Beschönigung

**Aktualisierung 16. Oktober 2026:** Der untenstehende Ausgangsstand bleibt als Historie. Die verbindliche aktuelle Paketübersicht und Prüfnachweise stehen in WORK-STATUS.md. Neu umgesetzt sind ein versionierter gemeinsamer Spielzustand, Gerätespeicherung mit Sicherungskopie/Dateiexport, Rucksack/Lager, Energie/Ausdauer, 30 Rezepte, physischer Alpkiosk mit CHF-Handel und sechs belohnte Aufträge. Dorfhaus/Keller/Felsengang und acht verbundene Gebiete wurden im folgenden Regionspaket ergänzt; drei technische Kletterrouten wurden anschliessend ergänzt; Tierpflege wurde im Farm-Paket ergänzt. Das Dorfpaket ergänzt vier Figuren, Gespräche und sechs verbundene Aufträge; zahlreiche weitere Originalaufträge bleiben offen.
Vorhanden: eine 3D-Alp, begehbare Hütte, Kräutersammeln, Jonny mit erster Parcourswertung, Naturmodelle/Relief, lokaler getrennter Spielstand. Noch kein vollständiges 3D-Hauptspiel; insbesondere kein integriertes umfangreiches Crafting, Wirtschaftssystem, Energiehaushalt oder vollständiges Regionsnetz. Diese Aufgaben werden nicht als erledigt markiert.

## Reihenfolge und Abnahme

### 1 · Alpines Erscheinungsbild und robuste technische Grundlage — AKTIV
- [ ] Schweizer Hütte mit verwittertem Holz, Steinsockel, Schindeldach, grünen Läden und charakteristischen Details.
- [ ] Stimmige Stube mit Holzmöbeln, warmen Textilien, Geschirr, Kamin und passenden Proportionen.
- [ ] Gelände, Pflanzen, Tiere, Beleuchtung und Landschaft zu einem konsistenten Stil verbinden.
- [ ] Kamera, Kollisionen, Eingaben, Speichern und Zustandsänderungen als gemeinsame Grundlage stabilisieren.
- Abnahme: Tür und Rückweg funktionieren; keine neuen Blockaden; sämtliche bisherigen Logikprüfungen bestehen. Visuelle Geräteabnahme bleibt bis tatsächlicher Durchführung offen.

### 2 · Gemeinsamer Spielzustand, Rucksack, Energie und Finanzen — GRUNDLAGE IMPLEMENTIERT
- [ ] Ein zentraler versionierter Spielzustand für Geld, Gegenstände, Energie, Aufgaben, Regionen, Tiere und Ausbau.
- [x] Inventar mit nachvollziehbaren Mengen, Kategorien, Stapeln, Essen, Werkzeugen und Lagertruhen. (technisch geprüft; Geräteabnahme offen)
- [x] Geld in ganzen Rappen intern speichern; Ein-/Ausgänge mit Begründung buchen. (technisch geprüft; Geräteabnahme offen)
- [x] Transaktionen prüfen und vollständig ausführen oder vollständig verwerfen; keine halben Käufe/Herstellungen. (technisch geprüft; Geräteabnahme offen)
- [x] Ausdauer und langfristige Energie verständlich trennen; Erholung und Nahrung integrieren. (technisch geprüft; Geräteabnahme offen)
- [x] Datei-Export/Import und alte Daten sicher migrieren; Fehlermeldungen und Speicherfehler behandeln. (technisch geprüft; Geräteabnahme offen)
- Abnahme: keine negativen Bestände; kein Geld durch Laden/Abbrechen/Doppelklick; Testlauf Sammeln → Essen → Kaufen → Speichern → Neuladen.

### 3 · Umfangreiches Crafting und funktionierende Wirtschaft — ERSTE KETTEN IMPLEMENTIERT
- [ ] Sammelbare Rohstoffe, nachwachsende Pflanzen, Holz, Pilze, Mineralien und Kristalle.
- [ ] Rezeptbuch mit mindestens 30 sinnvoll unterschiedlichen Rezepten in Nahrung, Tee/Tinkturen, Materialien, Werkzeugen, Ausrüstung und Einrichtung.
- [ ] Stationen: Kochen, Werkbank, Kräutertisch und Ausrüstungsplatz; passende kleine Arbeitsanimationen.
- [ ] Rezepte zeigen vorhandene, benötigte und exakt fehlende Zutaten, Energie und Werkzeuganforderungen.
- [ ] Werkzeuge verbessern Möglichkeiten; beschädigte Ausrüstung reparieren lassen.
- [ ] Händler mit unterschiedlichen Sortimenten und nachvollziehbaren Preisen; eigener Stadtladen.
- [ ] Herstellung, direkter Verkauf und Nutzung der Ressourcen müssen jeweils sinnvolle Entscheidungen sein.
- Abnahme: vollständige Herstellungsketten bis zur Ausrüstung; Prüfung auf unbeabsichtigte Kauf-/Verkaufs- und Rezept-Geldschleifen.

### 4 · Zusammenhängende Welt und erkundbare Bergwelt
- [ ] Dorf, Stadt, Geschäfte, Restaurant, Wald, See, Alp und Bergwelt räumlich verbinden.
- [x] Dorfhaus → Keller → geheimer Felsengang → acht unterscheidbare Abenteuergebiete → Portmann-Gipfel. (Regionspaket technisch/integrativ geprüft; visuelle Geräteabnahme offen)
- [ ] Karte mit Standort, besuchten Orten, logischen Wegen, Abkürzungen und zunächst verborgenen Geheimnissen.
- [ ] Auf jeder Route interessante Funde/Beobachtungen, Interaktionen und Rückkehr ermöglichen.
- [ ] Geländekollisionen, Brücken, Steigungen, Wasser und Wegbegrenzungen überall prüfen.
- Abnahme: jede reguläre Route in beide Richtungen durchspielen, keine versehentlichen Sackgassen oder falschen Zielgebiete.

### 5 · Klettern, Schatzsuche und Action
- [ ] Begehbare Felswege, Griffpunkte, gesicherte Querungen und Seilpassagen.
- [x] Einführung im sicheren Übungsfels; anspruchsvollere Routen schrittweise freischalten. (drei Routen technisch/integrativ geprüft)
- [x] Sichtbare Griff-/Trittziele, Ausdauerverbrauch, Halt zum Erholen, sichere Abbruch- und Rücksetzpunkte. (drei Routen; Geräteabnahme offen)
- [x] Seil, Gurt und Bergschuhe mit klaren Anforderungen an Wasserfall-Querung und Adlerwand. Weitere Ausrüstung bleibt ausbaubar.
- [ ] Abwechslung durch Geröll, schmale Wege, Sprünge und passende Wetterbedingungen.
- [ ] Schatzhinweise über Gespräche, alte Karten, Naturmerkmale und zusammenhängende Rätsel.
- [ ] Versteckte Eingänge und Durchgänge tatsächlich öffnen; Schätze nur einmal pro Fortschrittszustand vergeben.
- [ ] Kristalle gezielt aus Fels lösen; keine wahllos aufgestellten Belohnungssymbole.
- Abnahme: Erschöpfung, Fehler, Abbruch und Neuladen führen zu sicheren, konsistenten Zuständen. Kein Fortschritt ohne die vorgesehenen Voraussetzungen.

### 6 · Eigenständige, hochwertige Minispiele
- [ ] Jonny: ausgereifter Parcours und freies Reiten.
- [x] Ski-Slalom: 3D-Piste mit zwölf Toren, drei Stufen, Countdown, Bremse, Pause/Abbruch, gespeicherter Fortsetzung, Bestwerten und einmaligen Prämien. (technisch/integrativ geprüft; echte Geräteabnahme offen)
- [x] 3D-Schneeball- und Vogelchallenge: je drei Stufen, geschützte Ziele/Drei-Fehler-Regel, Punkte, Pause/Abbruch, gespeicherte Fortsetzung und einmalige Prämien. (technisch/integrativ geprüft; Original-Beute-/Tagespreise und Geräteabnahme offen)
- [x] Vereinfachtes Drei-Stiche-Jassduell gegen Sämi im begehbaren Bergrestaurant, Farbpflicht/Trumpf, gespeicherte Hand, Bestwert und Tagespreis. (technisch/integrativ geprüft; kein vollständiger Schieber, Geräteabnahme offen)
- [x] Erster Stadtplatz/Melanies Laden mit Snake und Pong, je drei Stufen, Speicherung/Bestwert und einmaliger Höhlenlampe. (technisch/integrativ geprüft; Geräteabnahme offen)
- [x] Alpen-Breakout bei Melanie: 32 Steine, drei Bälle, drei Tempostufen, Tastatur/Touch, Speicherung und Bestwerte. (technisch/integrativ geprüft; Geräteabnahme offen)
- [ ] Witze, Schnupftabak und weitere originale Retro-Games (Sternenwächter, Rallye).
- [ ] Unterschiedliche Aufgaben, Tempi, Hindernisse, geschützte Ziele und angemessene Fehlerfolgen.
- [ ] Einheitlicher Rahmen für Anleitung, Schwierigkeit, Punkte, Zeit, Bestwert, Belohnung, Pause und Ausstieg.
- [ ] Ergebnisse mit Wirtschaft/Quests verbinden, ohne die Haupterkundung durch Pflicht-Minispiele zu blockieren.
- Abnahme: jede Challenge vollständig gewinnen, verlieren, abbrechen, wiederholen und danach speichern/laden. Anzeigen dürfen auf keiner Zielansicht das Spielfeld verdecken.

### 7 · Menschen, Tiere, Alp und Geschichten
- [ ] Familienfiguren, Gastwahl, eigene Händler/Arzt/Wirt und verschiedene Touristen.
- [x] Erstes Dorfkapitel mit vier Personen, je zwei Gesprächsthemen und sechs aufeinander aufbauenden lokalen Aufträgen. (technisch/integrativ geprüft; weitere Originalfiguren/-geschichten und visuelle Geräteabnahme offen)
- [ ] Dani und Hund, Gratis-Tour und grössere Touren mit transparenter Vorbereitung, Rast und Biwak.
- [x] Berta und Lotti zuverlässig anklickbar; Füttern, Wasser, Pflege und verständliche Tierzustände. (ursprüngliche Kühe, drei Hühner und Jonny; technisch/integrativ geprüft)
- [ ] Hühner, Nutztiere und Wildtiere in passenden Lebensräumen; natürliche Bewegung und Flucht.
- [ ] Feldstecher, Naturjournal und Beobachtungen belohnen.
- Abnahme: alle Figuren/Tiere erreichbar; keine Rollenverwechslung mit Hauptfiguren; Interaktionen ändern und speichern den richtigen Zustand.

### 8 · Ausbau, Langzeitmotivation und Gesamtqualität
- [ ] Hütte und Alp ausbauen; Möbel/Truhen platzieren, eigener Laden, neue Werkstätten.
- [ ] Saisonale Veränderungen, Tageszeit, Wetter und wiederkehrende Ereignisse.
- [ ] Klare Gesamtfortschrittsanzeige aus echten Zielen statt beliebigem Klickzähler.
- [ ] Umfangreiche Spieltests auf M1-Mac und iPad, inklusive langer Sitzungen und Speicherzyklen.
- [ ] Schwierigkeits-/Wirtschaftsanpassungen erst anhand tatsächlicher Spielverläufe.
- [ ] Abschliessende Prüfung aller früheren Aufträge; offene Mängel sichtbar halten.
- Abnahme: kompletter Weg vom neuen Spiel über Herstellung/Handel bis Bergtour, Kletterpassage, Schatz, Rückkehr und Ausbau ohne manuelles Reparieren des Spielstands.

## Erste konkrete Systemregeln (Startwerte, noch zu balancieren)

### Energie und Ausdauer
- Energie 0–100: längerfristige Versorgung durch Essen, Schlaf und Rast; anstrengende Aktionen verbrauchen nachvollziehbare Mengen.
- Ausdauer 0–100: kurzfristig für Rennen, Springen und Klettern; erholt sich bei Ruhe bzw. leichter Bewegung.
- Sammeln kleiner Pflanzen 2 Energie, Holzarbeit 4, Steinabbau 8; Herstellung je Rezept. Kosten vor Ausführung prüfen und anzeigen.
- Springen zunächst 18 Ausdauer; Klettern abhängig von Dauer/Griff und Ausrüstung. Diese Werte sind für Tests, keine behauptete fertige Balance.
- Essen liefert genau beschriebene Energie; Tee/Tinkturen erhalten unterschiedliche, begrenzte Wirkungen. Effekte nicht beliebig stapeln.
- Keine Sackgasse bei Energie 0: normales langsames Zurückgehen und kostenlose Erholung bleiben möglich.
- Rast/Sitzen in sicherem Bereich bringt Erholung; Schlaf ermöglicht einen neuen Spieltag. Kein Zwang, reale Stunden zu warten.
- Kälte/Wetter beeinflussen exponierte Touren erst, wenn Kleidung, Schutz und Warnanzeigen verständlich integriert sind.

### Finanzen
- Währung CHF, intern Rappen. Kein heimlicher Schuldenstand oder stiller Ressourcenverlust.
- Einkommen: Rohstoffe, hergestellte Produkte, Aufträge, Challenges und Schätze.
- Ausgaben: Nahrung, Material, Werkzeug, Reparatur, Ausrüstung, grössere Touren und Ausbau.
- Einstieg bleibt bezahlbar; kostenlose Tour und grundlegende Erholung bleiben verfügbar.
- Verkaufspreise liegen unter Händler-Kaufpreisen. Verarbeitete Produkte können gegenüber den selbst gesammelten Zutaten einen nachvollziehbaren Mehrwert haben.
- Kostenanzeige nennt Geld und Material getrennt, inklusive exakter Fehlmenge.
- Seltene Schätze sind besondere Belohnungen; sie dürfen den gesamten weiteren Handel nicht überflüssig machen.
- Wiederholbare Challenges dürfen Einkommen liefern, müssen aber gegen missbräuchliche Sofortwiederholung und doppelte Belohnung gesichert sein.

### Crafting-Ketten
1. Kräuter/Blüten → getrocknete Kräuter → unterschiedliche Tees/Tinkturen.
2. Pilze/Nahrungsmittel → Mahlzeiten für kurze und lange Touren.
3. Holz/Fasern → Bretter/Seile → Werkzeuge, Reparatur und Einrichtung.
4. Erz/Mineralien → Bauteile → bessere Werkzeuge und Ausrüstung.
5. Ausrüstung + Versorgung + Hinweise → anspruchsvolle Route → Schatz/seltenes Material → weiterer Ausbau.

## Selbstkontrolle je Paket
ANALYSIEREN → klaren Fehler bzw. fehlende Funktion benennen → IMPLEMENTIEREN → positive/negative Abläufe TESTEN → Fehler BEHEBEN → Regression TESTEN → Version SICHERN → Status aktualisieren.

Ein Punkt gilt erst als fertig, wenn sein Abnahmekriterium tatsächlich geprüft wurde. Logiktests beweisen keine schöne Grafik; ein Screenshot beweist keine funktionierende Wirtschaft. Browser-, Audio-, Touch- und Leistungstests werden separat ausgewiesen.

Keine unbegrenzte Hintergrundarbeit behaupten. Während aktiver Arbeit wird am nächsten offenen abhängigen Paket weitergearbeitet; der dokumentierte Stand ermöglicht eine sichere Fortsetzung.


### Vorgezogene Korrekturen aus Nutzerfoto
- [x] Energie/Aufgaben kompakt, Details und Menü auf Tipp, direkte Karte; technische Bedienintegration geprüft.
- [x] Hütte/Häuser/Wegweiser als echte Tippziele, vollständiger Lauf zur Tür und automatischer Eintritt; ohne Tutorial-Voraussetzung geprüft.
- [x] Alphütte mit hellerer Holzabstimmung, gefasten Brettern und instanzierten Einzelschindeln überarbeitet; Geometrie und Wege geprüft.
- [ ] Neue HUD-Anordnung und Hüttenästhetik auf echtem iPad/Mac visuell abnehmen; Gesamtwelt weiter verfeinern.


### Vorrang · Der Zauber der zusammenhängenden 3D-Bergwelt

Massstab ist ART-DIRECTION.md: originale 2D-Bildsprache in begehbares 3D übersetzen. Landschaftsqualität hat vor weiteren Minispielen Vorrang.
- [x] Freie Hauptroute Alp → Panoramaweg → Hochalp → Grat → Gipfel und Rückweg; frisch ohne Tutorial/Geheimgang geprüft.
- [x] Freier Abstieg Alp → Talweg → Dorf → Stadt und Rückweg; echte steigende/fallende Geländeformen und Wegziele in der Karte.
- [x] Heimat als ruhiger Ort: Wohnhügel, Brunnen erhalten, Scheunenbereich, Bergbach/Brücke/Fische, Feuerstelle mit Rast und Talblick.
- [x] Kühe/Geissen/Hühner am Hof; Jonny und Grundparcours frei, Reitpark auf eigenständiger Weide.
- [x] Reitpark, Kornfelderweiterung und geschützter Portmann-Bohnenanbau durch gespeicherte Herstellung, tägliche Ernte sowie Mehl-/Schokoladenkette.
- [ ] Visuelle Abnahme und Verfeinerung von Landschaftstiefe, Original-Hüttenwirkung, Talöffnung, Fels-/Wegübergängen und Kamera auf echtem iPad/Mac. Technische Tests reichen für diese Abnahme nicht.


### Räumliche Korrektur aus erneuter Nutzerkritik
- [x] Alte Parcours-Bodenbahn auf Heimat entfernt; Wege verbunden, Kehren ohne umgedrehte Flächen, runde Enden und Steintrittstufen.
- [x] Tiergehege mit offenen erreichbaren Toren; Hühnerstall im eigenen Bereich.
- [x] Gebäudeböden/Hanganschlüsse, gestaffelte Wiese, Berg-/Talkulisse und Standard-Kamerasichtlinien modellseitig korrigiert.
- [x] Stube mit Holzdielen und abgerundeten Kanten modellseitig überarbeitet.
- [ ] Diese Änderungen tatsächlich gerendert gegen das Originalbild prüfen. Landschaft und Innenraum bleiben ohne diese Abnahme grafisch offen.

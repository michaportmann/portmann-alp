# Portmann Alp · Verbindliche Arbeitsliste

Der übergeordnete Ablauf, die Systemregeln und Abnahmen stehen in MASTERPLAN.md.

Aktueller paketweiser Stand: **WORK-STATUS.md**. Das Speicher-/Inventar-/Wirtschaftspaket vom 16. Oktober ergänzt die ältere Checkliste; nicht abgehakte Gesamtaufträge bleiben verbindlich.

## Gestalterische Vorgabe
Eine natürliche, üppige Schweizer Alpenwelt mit Blumen, Kräutern, Wald, Wasser und glaubwürdigen Tieren. Keine sichtbaren Bauklotz-Figuren, Kegel-Bäume oder austauschbaren Pyramidenberge. Räumliche Objekte, stimmige Materialien, nachvollziehbare Landschaft. Bestehende Stärken des Hauptspiels bewahren.

## Kontrollschleife pro Arbeitspaket
1. Bestand und konkreten Mangel prüfen.
2. Ziel und überprüfbare Abnahmekriterien festlegen.
3. In der separaten 3D-Version gezielt implementieren.
4. Logik-, Integrations- und Datenprüfungen ausführen.
5. Beobachtete Fehler beheben und betroffene Tests wiederholen.
6. Ergebnis, Prüfnachweis und Grenzen dokumentieren.
7. Geprüfte Version sichern und veröffentlichen, dann nächstes Paket.

Eine bestandene Logikprüfung ersetzt weder visuelle Browserkontrolle noch einen Test am M1-Gerät. Solche Prüfungen bleiben offen, bis sie tatsächlich durchgeführt wurden. Keine behaupteten Hintergrundarbeiten oder unbegrenzten autonomen Schleifen.

## A · Natur und grafische Grundlage (aktuelles Paket)

Abgehakt bedeutet in diesem Paket: implementiert und technisch geprüft. Die abschliessende visuelle Qualitätsabnahme wird separat unter A12 geführt und ist noch offen.
- [x] A1 Charakteristische Schweizer Bergkulisse auf echten Höhendaten aufbauen; Herkunft dokumentieren.
- [x] A2 Geländematerial mit Gras, Erde und Steinen statt einfarbiger Fläche.
- [x] A3 Kegeltannen durch verzweigte Nadelbäume mit transparenten Nadeltexturen ersetzen.
- [x] A4 Blumen mit Stängeln, Blättern, Blütenblättern und unterschiedlichen Arten statt Farbkugeln.
- [x] A5 Grasbüschel und räumlich plausible Pflanzenverteilung: keine Wege, Hütte, Wasser oder Parcours überwachsen.
- [x] A6 Jonny organisch modellieren; Beine, Hals, Hufe, Mähne und Schweif überarbeiten.
- [x] A7 Spielfigur von kantigen Körperbauteilen auf weichere, zusammenpassende Formen umstellen.
- [x] A8 Schafe anatomisch verbessern und Beine beim Gehen animieren.
- [x] A9 Schmetterlinge mit unterscheidbaren Flügeln und Blütenanflug; Vogelmodelle und Flugbewegung verbessern.
- [ ] A10 Licht, Nebel, Texturauflösung und Vorder-/Hintergrund aufeinander abstimmen.
- [x] A11 Technikprüfungen für Geometrie, Vegetationsplatzierung, Materialzuordnung und alte Spielfunktionen.
- [ ] A12 Visuelle Abnahme in Safari auf M1-Mac und iPad; Bildrate messen.

## B · Bewegung, Kamera und Kollisionen
- [x] Grundlegende Klick-/Touch-Wegfindung, WASD, Kameraschwenk und Zoom.
- [x] Haus-, Baum-, Zaun- und Wasserkollisionen in der ersten Testregion.
- [ ] Natürliches Laufen, Steigungen, Anhalten, Drehen und Reiten fertig animieren.
- [ ] Kamera darf nicht in festen Objekten verschwinden.
- [ ] Türen mit Annäherung, Eintritt und sicherem Rückweg; alle Richtungen testen.
- [ ] Sämtliche späteren Regionen mit zu ihrer Grafik passenden Kollisionen ausstatten.

## C · Alp, Bauernhof und Innenräume
- [x] Erste Hütte mit eigenem Innenraum und Rückkehr.
- [ ] Hochwertiges Chalet und Einrichtung ohne Prototyp-Charakter vervollständigen.
- [x] Berta/Lotti als Kühe, drei Hühner und Jonny mit Pflege, Futter, Wasser, Energie und gespeicherten Tageszuständen. Weitere Nutz-/Wildtiere bleiben offen; echte visuelle Geräteabnahme offen.
- [ ] Jonny auf der eigenen Weide; freies Reiten und vollständiger Parcours.
- [ ] Alpbrunnen: wiederverwendbarer Eimer und Wasserportionen umgesetzt; die ursprünglich gewünschte Glasflaschen-Variante bleibt offen.
- [ ] Truhen und Einrichtung platzieren, Gegenstände lagern.
- [x] Vor der privaten Hütte keine öffentlichen NPC; neue Dorfpersonen stehen ausschliesslich im Bergdorf. (technisch geprüft)

## D · Figuren und NPC
- [x] Erstes Dorfpaket: Anna, Sepp, Ruth und Dani als ansprechbare 3D-Figuren, acht gespeicherte Gesprächsthemen und sechs verbundene lokale Liefer-/Erkundungsaufträge. Technisch/integrativ geprüft; weitere Originalfiguren und Dienste bleiben offen.
- [ ] Sechs Familienfiguren anhand verfügbarer Originalreferenzen gestalten.
- [ ] Gastwahl Mann/Frau/Kind.
- [ ] Eigene Verkäuferin, Arzt, Wirt, Käsehändler, Melanie, Dani und Hund.
- [ ] Verschiedene Gäste, Wandernde, Familien und Touristen je Region.
- [ ] Gehen, Sitzen, Stehen, Gespräche und ortsspezifische abwechslungsreiche Texte.
- [ ] Einheitliche Proportionen; keine Figuren auf Tischen oder über Interaktionsflächen.

## E · Zusammenhängende Welt
- [ ] Sämtliche Orte aus Version 44 katalogisieren und im Navigationsgraphen abbilden.
- [x] Bergrestaurant mit Stube/Jasstisch/Sämi, Speisekarte und zwei ursprünglichen Mahlzeiten räumlich eingebunden; technisch/integrativ geprüft, Geräteabnahme/weitere Gäste offen.
- [ ] Übrige Dorf-/Stadtbereiche, alle Läden und Innenräume übernehmen.
- [ ] Gelateria bleibt Eisverkauf am Wagen; keine Verknüpfung mit Schlafzimmer.
- [x] Erster Stadtplatz und Melanies begehbarer Laden mit Snake/Pong, Steuerung/Bestwert/Speicherung und erster Höhlenlampe; technisch/integrativ geprüft.
- [ ] Übrige Stadtangebote, weitere originale Retro-Spiele und eigener Stadtladen.
- [ ] See, erreichbarer Steg und Sitzbank mit Aussicht.
- [ ] Wald mit unterschiedlichen Abschnitten, Zelt, Lichtungen und Aussichtsposten.
- [ ] Bergwelt, Blumenwiesen, Dani-Hütte und freie Gipfelroute.
- [x] Dorfhaus → Keller → geheimer Gang → acht eigenständige Abenteuergebiete → Portmann-Gipfel; zwei Wander-Aufstiegsrouten mit Kellerrätsel, Ortsentdeckungen und zwei bedingten Schatztruhen. Technisch/integrativ geprüft, visuelle Geräteabnahme und weitere Abenteueraktivitäten offen.
- [ ] Kristallhöhle mit glaubwürdigem Eingang und Abbau aus dem Felsen.
- [ ] Wege laufen logisch weiter; Bähnli und alle Rückwege funktionieren.
- [ ] Gebietsentdeckung und sinnvolle Erschliessung bestimmter Bereiche.

## F · Fauna und Beobachtung
- [ ] Lebensräume für Schweizer Wild-/Nutztiere nach Höhenlage und Tageszeit.
- [ ] Artenbezogene Lauf-, Flug-, Ruhe-, Fress- und Fluchtbewegungen.
- [ ] Murmeltierbauten, Waldtiere, Insekten, Vögel und Abendtiere.
- [ ] Viele Schmetterlinge auf der Schmetterlingswiese.
- [ ] Beweglicher Feldstecher, passende Schweizer Bergnamen und Naturjournal.
- [ ] Tiere meiden Hindernisse, Türen, Tafeln und das Wasser.

## G · Inventar, Handwerk und Wirtschaft
- [x] Rucksack mit essbarer Energieversorgung, Kapazität und Lagertruhe; weitere Gesamtspielinhalte folgen.
- [ ] Sichtbare Fundgegenstände, Sammelanimation, Mengenanzeige und erneuerbare Pflanzen.
- [ ] Werkzeuge/Gegenstände ablegen und wieder aufnehmen.
- [ ] Logische Rezepte, Tees, Tinkturen und klare fehlende Zutaten.
- [ ] Kauf, Verkauf, eigener Laden und verständliche Preis-/Materialanzeigen.
- [ ] Bildvorschauen für Ausbau, Speisekarte und Inventar.

## H · Touren und Challenges
- [x] Erster Vier-Hindernis-Parcours mit Punkten, Fehlern und Wiederholung.
- [ ] Dani: wiederholbare Gratis-Tour, genaue Voraussetzungen der grösseren Touren.
- [ ] Bergtouren mit Höhenfortschritt, Geröll, Sprüngen, Rast und Biwak.
- [x] Ski als 3D-Sonnenalp-Slalom mit zwölf Toren, drei Stufen, Steuerung/Bremse, Energie, Pause/Abbruch, gespeicherter Fortsetzung und einmaligen Prämien umgesetzt. Technisch/integrativ geprüft, visuelle Geräteabnahme offen.
- [x] Schneeball-/Vogelchallenge in 3D mit je drei Stufen, geschützten Personen/Kind bzw. weissen Tauben, Hüten/Holzschirmen, Drei-Fehler-Regel, Wertung und gespeicherter Fortsetzung. Technisch/integrativ geprüft; echte Geräteabnahme offen.
- [ ] Originale Vogelbeute-/Kochketten und Schneeball-Tagespreise/Schokolade in die gemeinsame Wirtschaft übernehmen.
- [x] Originales vereinfachtes Jassduell mit drei Stichen, Farbpflicht/Trumpf, gespeichertem Fortschritt und CHF-15-Tagespreis; technisch/integrativ geprüft.
- [ ] Witze und Schnupftabak überarbeiten/übernehmen.
- [x] Melanie: Snake und Pong als eigenständige Retro-Minispiele, je drei Tempostufen, Pause/Abbruch, fortsetzbarer Zustand und getrennte Bestwerte. Technisch/integrativ geprüft, Geräteabnahme offen.
- [x] Breakout: 32 Steine, drei Bälle, drei Tempostufen, Bestwerte und gespeicherte Fortsetzung; technisch/integrativ geprüft.
- [ ] Weitere originale Retro-Spiele: Sternenwächter und Alpen-Rallye.
- [ ] Unterschiedliche grafische Abenteuer-Rätsel statt gleichartiger Textauswahl.
- [ ] Alle Challenges: Anleitung, Zähler, faire Fehler, Schwierigkeitsgrade, Belohnung, Pause/Abbruch.
- [x] Geschützte weisse Tauben/Drei-Fehler-Regel und unbeteiligtes Kind in der höchsten Schneeballstufe implementiert; technisch/integrativ geprüft, Geräteabnahme offen.
- [ ] Anzeigen ausserhalb der Spielfläche; alle Eingabemethoden prüfen.

## I · Oberfläche, Karte und Fortschritt
- [ ] Desktop-/Touch-Bedienung ohne doppelte oder nutzlose Buttons.
- [ ] Übersichtliches Inventar/Crafting auch in grosser Ansicht.
- [ ] Hochwertige Weltkarte mit geografischen Beziehungen, Standort, Wegen und gespeicherten Entdeckungen.
- [ ] Geheimnisse erst nach Entdeckung zeigen; sichere Rücknavigation.
- [ ] Einheitliche Tafeln neben Eingängen; keine Brunnen oder Wege verdecken.
- [ ] Exakte Fehlmengen und Voraussetzungen überall nennen.
- [ ] Fortschritt des gesamten Spiels nachvollziehbar berechnen.

## J · Ton, Wetter und Licht
- [x] Getrennte Musik-/Geräuschregler in der Testwelt; zwei übernommene Musikstücke und Vogelton.
- [ ] Gute bestehende Sounds übernehmen; passende Untergrundschritte und Aktionsgeräusche.
- [ ] Räumliches Feuer, Wasser, Wald, Wind und Tierstimmen abstimmen.
- [ ] Glaubwürdiges Kaminfeuer, korrekt positionierte Fensterlichter und Brunnenwasser.
- [ ] Bewegter Regen/Schnee, Tageszeit und jahreszeitliche Pflanzen-/Tierwelt.
- [ ] Keine Rückkehr der unerwünschten Lichtschalter.

## K · Speicherung, Leistung und vollständige Abnahme
- [x] Versionierter Spielstand mit automatischer Gerätespeicherung alle 12 Spielsekunden/bei Aktionen/bei Seitenwechsel; lokale Sicherungskopie, validierter JSON-Import/Export, v1-Migration und Schutz vor Konflikten zwischen Tabs. Logisch/integrativ geprüft, echtes Safari-Dateiverhalten offen.
- [ ] Alle künftigen Inhalte vollständig speichern und nach Browser-Neustart wiederherstellen.
- [ ] Übernahme bestehender Spielstände sachlich prüfen; Hauptspielstände nicht beschädigen.
- [ ] Echte Safari-/Touch-/M1-Tests, Grafik-/Audioausgabe und längere Spielsitzungen.
- [ ] Leistung mit vielen Tieren, NPC und Wetter messen, dann gezielt optimieren.
- [ ] Jede Region, Tür, Challenge, Belohnung und Rückkehr vollständig durchspielen.
- [ ] Nach jeder Reparatur Regression prüfen; versionierte Sicherung und ehrlicher Prüfbericht.


## Rückmeldung Spielfläche / Hütte
- [x] Kompakte, aufklappbare Energie-/Aufgabenanzeigen und Spielmenü.
- [x] Echte Tippziele für Chalet/Wegweiser, Laufweg zum Eingang und automatischer Eintritt; frischer Start ohne Einführungsziele geprüft.
- [x] Hellerer Chalet-Materialaufbau, gefaste Fassadenbretter, 144 einzelne Dachschindeln.
- [ ] Visuelle iPad-/Mac-/Safari-Abnahme dieser Korrekturen und weiterer Alpenästhetik.


## Verbindliche Hauptrichtung nach erneuter Originalbild-Analyse

ART-DIRECTION.md konkretisiert den vollständig dreidimensionalen Heimatort nach den schönen 2D-Originalbildern. Freie Panorama-/Gipfelroute und Tal-/Dorf-/Stadtroute sind implementiert und vollständig auf Wege geprüft. Ruhige Heimat mit Wohnhügel, Brunnen, Scheune, Geissen/Hühnern/Kühen, Bergbach mit Fischen, Feuerstelle und Talblick; separate frei zugängliche Reitweide. Reitpark, erweitertes Kornfeld und Portmann-Bohnengewächshaus mit einmaligen Baukosten, täglichen Ernten und v11-Spielständen. 34 Rezepte, 19 Orte, 42 Übergänge. 16 technische Programme bestehen; echte visuelle Originalqualität ist weiterhin abzuarbeiten. Weitere Minispiele nach dieser landschaftlichen Hauptpriorität.

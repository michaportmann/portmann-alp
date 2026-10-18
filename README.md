# Portmann Alp

Eigenständiges, begehbares 3D-Alpenadventure in Entwicklung. Das ursprüngliche Spiel und dessen Speicher bleiben unverändert.

## Enthalten
- Echte polygonale Landschaft mit Höhenprofil, Bergweg, Alphütte und eigenem Innenraum.
- Klick-/Touch-Wegfindung mit Haus-, Baum-, Zaun- und Wasserkollisionen; WASD/Pfeiltasten kameraorientiert.
- Schwenkbare Kamera, Zoom und Überblicksansicht.
- Artikulierte Spielfigur, Jonny, Schmetterlinge, Vögel und vier Schafe.
- Vier Reithindernisse mit Sprungphysik, Prüfung der gesamten Überquerung, Wertung, Fehlern und Wiederholung.
- 19 verbundene Orte, 21 Aufgaben, Farmversorgung, 34 Rezepte, CHF-Handel und zusätzliche Challenges.
- Lokale automatische Speicherung mit Sicherungskopie, Datei-Export/Import und Migration alter 3D-Spielstände.
- Zwei übernommene Musikstücke als Playlist; separater Regler für Geräusche/Vogelstimmen.

## Bedienung
Klick oder Tipp auf die Wiese setzt ein Laufziel. WASD oder Pfeile bewegen direkt. E aktiviert die nahe Aktion. Leertaste oder Springen löst im Reitparcours den Sprung aus. Goldene Bodenlinien markieren den Absprungbereich. Kamera über ↶ / ↷ und Ansicht; Mausrad oder Einstellungen zum Zoomen.

## Technische Grundlage
Buildless ES-Module mit lokal gebündeltem Three.js 0.180.0 (MIT, Lizenz in dist/vendor/LICENSE). Keine CDN-Laufzeitabhängigkeit. Prozedurale stilisierte Modelle; keine aus den bisherigen Landschaften automatisch rekonstruierten 3D-Modelle. Getrennte Speicherkennung `portmann-alp-3d-v1`.

## Überprüfung
- `node tests/prototype.mjs`: Geometrie, Animationstransformationen, Kollisionen, sämtliche Interaktionsrouten, sichere Umgehung der Hütte, Erfolg/Fehler aller vier Sprünge, Save-Validierung.
- `node --experimental-vm-modules tests/integration.mjs`: Anwendung startet und durchläuft Begrüssung, Betreten/Verlassen, Sammeln, Reitrunde, Belohnung und Einstellungen; WebGL-Renderer ist für diesen Test ersetzt.
- Testumgebung nutzt @napi-rs/canvas aus dem Codex-Runtime-Paket. Dies ist keine Laufzeitabhängigkeit der Site.

## Grenzen
Kein vollständiger Umbau des bestehenden Spiels: übrige Regionen, Inventarwirtschaft, bekannte Challenges, Figurenwahl und Hauptspielstände sind noch nicht migriert. Browsergrafik, Audioausgabe, Touchverhalten und reale Bildrate auf M1-Mac/iPad sind noch nicht am Gerät geprüft. Die bekannten ursprünglichen Aufträge gelten dadurch nicht als abgeschlossen. Tier- und Figurenmodelle sind stilisierte Prototyp-Modelle und keine finalen Charaktermodelle.

## Audio
Unverändert aus den vorhandenen Assets von Version 44 übernommen: desifreemusic / Alpine Echoes (316615), kulakovka / Acoustic Folk (276657), sspsurvival / Bird Voices (7716). Ursprüngliche Quelldateinamen sind hier zur Zuordnung erhalten. Die Test-Site bleibt privat.

## Natur-Durchgang 2
- Gestaltete dreidimensionale Alpenkulisse mit Bergketten und Talöffnung nach dem 2D-Referenzbild. Die früheren 16'641 Zentralschweizer Höhenwerte bleiben Quellenreferenz; die neue Kulisse ist keine vermessene Wiedergabe dieser Topografie.
- Fünf modellierte Blütenarten mit 4'200 Pflanzen, über 5'000 Grastuffs, Windbewegung und freigehaltenen Wegen/Interaktionen.
- Verzweigte, texturierte Nadelbäume; organischere Figuren/Tiere; 36 fliegende Schmetterlinge, neun Vögel, vier Schafe.
- Lokale CC0-PBR-Naturtexturen; Material- und Höhendatenquellen in `dist/credits.html`.
- Eigene Render-Ebene für die Hütte, damit das umliegende Bergrelief den Innenraum nicht verdeckt.
- Zusätzlich `node tests/nature.mjs` für Relief, Vegetationsverteilung, Tierbewegung, Wassergrenzen, Pfad-Geometrie und lokale Assets.
- Visuelle Safari-Abnahme und tatsächliche M1-Bildrate bleiben offen. Ein begrenztes Offline-Modellbild ist keine Browser-/GPU-Prüfung.

Die vollständige, fortgeführte Arbeitsliste steht in DEVELOPMENT.md; konkrete Prüfdurchgänge in QUALITY-LOG.md.

## Alpiner Durchgang 3
Der bestätigte Name lautet Portmann Alp. MASTERPLAN.md führt die Entwicklung zum vollständigen Spiel über Energie/Finanzen, umfangreiches Crafting, Regionen, Klettern, Schätze und Minispiele. Die aktuelle Hütte/Stube wurden mit alpinen Architekturdetails neu aufgebaut; die bisherige Spielmechanik bleibt erhalten. Zusätzlicher Test: `node tests/alpine.mjs`.

## Aktuelles Paket · Gerätespeicherung, Rucksack und Wirtschaft

WORK-STATUS.md enthält die verbindliche aktuelle Gesamtübersicht. Die ältere Prototypbeschreibung oben dokumentiert den Ausgangsstand.

Neu: automatisches Speichern auf dem Gerät, lokale Sicherungskopie, Datei-Export/-Import, Positions-/Innenraumwiederherstellung und gespeicherte Einstellungen. Dazu Rucksack und Lager, Energie/Ausdauer, Nahrung/Rast/Schlaf, Alpkiosk mit CHF-Handel/Geldjournal, elf neue Ressourcenstellen, sechs belohnte Aufträge, 30 Rezepte und Orientierungskarte.

Kernablauf: Sammeln → Hütte betreten → Rezepte/Werkbank → Herstellen → am Alpkiosk verkaufen → Aufgabenbelohnung abholen → automatisch speichern → neu öffnen. Die Oberfläche enthält Rucksack, Rezepte, Aufgaben und Karte. In der Hütte stehen im Rucksack die Lager-/Rast-/Schlafaktionen bereit.

Zusätzlicher Test: `node tests/progression.mjs`. Der Integrationstest prüft zusätzlich die neuen Menüaktionen, Dateiimport, Automatik und Neustart. Die reale Safari-/iPad-Abnahme und das vollständige weitere Adventure bleiben offen.

## Regionspaket

Vom südlichen Dorfweg auf der Alp gelangst du zum Bergdorf. Betritt dort das Dorfhaus, gehe in den Keller und untersuche das Regal. Drei Steinräder öffnen den geheimen Felsengang. Dahinter liegen acht Berggebiete auf zwei verbundenen Aufstiegsrouten bis zum Portmann-Gipfel. Alle Übergänge besitzen Rückwege.

Rätsel, Ortsentdeckungen, zwei bedingte Schatztruhen und Region/Position werden automatisch gespeichert. Schema v3 übernimmt vorhandene v1/v2-Spielstände. Aufgabenbuch und Karte enthalten jetzt Entdeckungen und Regionsverbindungen. Neuer Test: `node tests/regions.mjs`; der Integrationstest durchläuft die gesamte Expedition einschliesslich Rückkehr/Neustart.

Die Gebiete sind eine erste zusammenhängende Erkundung. Technisches Klettern, zusätzliche Fauna, weitere Minigames und ursprüngliche Stadt-/Bähnli-Inhalte bleiben offen. Visuelle Safari-/M1-/iPad-Abnahme ist weiterhin nicht durchgeführt.

## Kletterpaket

Der Übungsfels liegt nördlich der Alphütte-Wiese und ist auf der lokalen Karte markiert. Am Einstieg «Klettern» wählen. Erreichbare Griffe direkt am Fels antippen oder die Griffknöpfe verwenden; am Mac mit links/rechts wählen und Enter greifen. Absätze erlauben Erholung, Pause hält die Simulation an. Gesichertes Abbrechen führt zum Einstieg zurück.

Nach abgeschlossener Übung und mit Seil/Gurt/Bergschuhen stehen die Wasserfall-Querung und die Adlerwand am Grat bereit. Sie enden nach dem Abseilen am anderen Ufer beziehungsweise an einer seitlichen Landestelle. Ein Neustart setzt am letzten sicheren Stand fort. Schema v4 erhält die bisherigen v1/v2/v3-Spielstände. Zusätzlicher Test: `node tests/climbing.mjs`.

## Tierpflegepaket

Berta und Lotti bleiben wie im ursprünglichen Hauptspiel Kühe. Drei Hühner und die Versorgung von Jonny ergänzen die Alp. Tiere anklicken oder in ihrer Nähe die Versorgung öffnen. «Tiere» zeigt jederzeit die Tagesübersicht.

Bei der Futterscheune gibt es täglich eine kostenlose Grundration und einen wiederverwendbaren Eimer. Am Alpbrunnen Wasser abfüllen, Tiere füttern/tränken/pflegen und danach Milch/Eier abholen. In der Hütte sind Kräuteromelette und goldenes Eierbrot herstellbar. Schlaf beginnt den nächsten Versorgungstag. Offline-Zeit verändert die Tiere nicht.

Schema v5 übernimmt bestehende v1–v4-Spielstände. Neue Prüfung: `node tests/farm.mjs`. Echte Grafik-/Safari-/iPad-/Audio-/Leistungsabnahme bleibt offen.


## Dorfpersonen und Aufträge

Vom südlichen Alpweg ins Dorf gehen. Anna, Sepp, Ruth und Dani stehen an ausgeschilderten Gesprächspunkten und auf der Dorfkarte. In der Nähe sprechen oder direkt auf die Figur klicken. Jede Person hat zwei wählbare Gesprächsthemen.

Anna beginnt mit drei Portionen Bergthymian. Nach der Übergabe folgen Sepps Milch, Ruths Omelette, Danis Vorräte/Arvenweg, eine Sicherheitsaufgabe und die Rückkehr vom Gipfel. Aufträge bei der Person annehmen, Fortschritt im Aufgabenbuch lesen und zur Übergabe zurückkehren. Waren werden erst dann verbraucht; keine Frist und keine automatische Reservierung. Der Lohn landet einmalig im Geldjournal.

Schema v6 übernimmt v1–v5-Spielstände. Gespräche und Aufträge werden automatisch auf dem Gerät und in exportierten Spielstanddateien gespeichert. `node tests/village.mjs` prüft Regeln/Migration; `node --experimental-vm-modules tests/integration.mjs` ergänzt die tatsächlichen Menüs und Modellklicks mit ersetztem Renderer. Zusammen mit den bisherigen Prüfungen sind es neun Programme. Reale Mac-/iPad-/Safari-Grafik bleibt offen.


## Sonnenalp-Slalom

Über die Bergwege zur Sonnenalp gehen. Der ausgeschilderte Slalomstart liegt bei x=12, z=−8 und erscheint auf der Karte. Ski und Helm werden gestellt; ein neuer Lauf kostet 8 Energie. Wähle Gemütlich (8/12 Treffer), Sportlich (10/12) oder Alpin (11/12). Nach dem Countdown automatisch abfahren, mit A/D oder Pfeil links/rechts lenken und mit S/Pfeil runter bremsen. Auf dem iPad die Steuerknöpfe halten. Pause über den sichtbaren Knopf, E, Leertaste oder Escape; dort ist auch Abbruch möglich.

Zwölf Tore, Zeit und Punkte bestimmen das Ergebnis. Die erste erfolgreiche Fahrt pro Stufe zahlt CHF 10.00 / 18.00 / 25.00; spätere Fahrten verbessern nur den Bestwert. Fehlerhafte Fahrten enden ohne Prämie. Nach dem Ziel/Abbruch stehst du wieder am Start. Fensterfokusverlust oder versteckte Seite pausiert.

Spielstand v7 speichert auch aktive Fahrten, Countdown, Tore, Zeit, Bestwerte und erhaltene Prämien. Auto-Save an Toren, Pause, beim Verlassen und periodisch; die Spielstanddatei enthält denselben Lauf. Neuladen setzt ihn ohne erneute Energiekosten fort. v1–v6-Spielstände werden übernommen. Zusatzprüfung: `node tests/ski.mjs`; insgesamt zehn Prüfprogramme. Echte Safari-/M1-/iPad-Grafik, Touchkomfort und Leistung bleiben offen.


## Schneeball- und Vogelchallenge

Im Dorf liegt der Schneeballzugang bei x=1/z=15; im Arvenwald die Vogelchallenge bei x=13/z=1. Beide stehen auf der Karte. Am Platz die Anleitung öffnen und eine von drei Stufen wählen. Ein neuer Start kostet 5 Energie.

Mit Klick/Tipp auf das 3D-Ziel werfen/schiessen. Alternativ das Fadenkreuz mit WASD/Pfeilen oder den Richtungsknöpfen bewegen und mit E/Leertaste/Aktion auslösen. Nur freie Hüte zählen im Schneeballspiel; Körper und Holzschirme sind Fehlwürfe. Personen und das Kind in der höchsten Stufe schützen. Weisse Türkentauben sind in der Vogelchallenge geschützt. Drei Schutzfehler beenden die Runde. Treffer +10, Fehlversuch −5, Schutzfehler −20. Zeit und Versuche sind begrenzt.

Pause friert die Simulation ein; Escape oder der sichtbare Pausenknopf öffnet Fortsetzung, Abbruch und Datei-Export. v8 speichert aktive Runden, Zielzustände und Fortschritt. Neuladen kostet keine weitere Startenergie. Einmalige Erfolgsprämie je Spiel/Stufe CHF 10/18/25, danach Bestwertjagd. Alte v1–v7-Stände werden übernommen. Originale Beute-/Kochketten und Tagespreise werden noch ausgebaut.

`node tests/target-games.mjs` und die erweiterte `tests/integration.mjs` prüfen Regeln, echte Modell-Raycasttreffer und die gebundenen Eingaben. Insgesamt elf Prüfprogramme. Reale Grafik, Safari/iPad/Mac, Touchkomfort, Audio und Leistung bleiben offen.


## Bergrestaurant und Jass

Vom Dorf bei x=14/z=−6.2 ins Bergrestaurant gehen. Jasstisch bei x=−1/z=−0.5, Speisekarte bei x=3/z=1.5. Beide Orte stehen auf der lokalen Karte. Waldsuppe & Alpbrot kosten CHF 14, der Älplerteller CHF 18; sie füllen Energie und Ausdauer vollständig. Bei bereits vollen Werten wird nicht erneut bezahlt.

Sämi spielt ein bewusst vereinfachtes Duell mit drei Karten und drei Stichen. Zwei Stiche gewinnen. Farbe bedienen, falls vorhanden; sonst beliebig spielen. Trumpf schlägt andere Farben. Bei Trumpf gilt Bube, 9, Ass, König, Dame, 10, 8, 7, 6; sonst Ass bis 6. Gesperrte Karten sind sichtbar, jeder Stich wird vor dem nächsten bestätigt und erklärt. Regeln/Pause/Abbruch sind eingebaut. Die Figur bleibt während einer offenen Runde am Tisch.

Kein Einsatz oder Energieabzug. Erster Rundensieg pro Spieltag CHF 15, Wiederholung am selben Tag ohne weitere Prämie. Speichern v9 erhält Hand, Gegenspielkarten, Trumpf, Auswahl-/Reviewphase, Bestwert und Preistag. Ein Neustart mischt keine neue Hand. Alte v1–v8-Stände werden übernommen. `node tests/jass.mjs` prüft die Regeln einschliesslich 120 gemischter Runden; App-Integration prüft die gebundenen Karten-/Restaurantknöpfe. Insgesamt zwölf Prüfprogramme. Reale Safari-/Mac-/iPad-/Grafik-/Touch-/Audio-/Leistungsabnahme bleibt offen.


## Stadt und Melanies Retro-Ecke

Im Südosten des Bergdorfs führt der Weg zur Stadt. Melanies Laden liegt im Chalet am Altstadtplatz. Hinter dem Tresen steht Melanie, rechts der Spielautomat. Karten zeigen beide Orte.

Alpen-Snake, Pong und Alpen-Breakout sind in drei Tempostufen gratis spielbar. Snake: zwölf Beeren mit Pfeilen/WASD oder Touch sammeln; Wände/eigener Körper verlieren die Runde, Umkehr ist gesperrt. Pong: linken Schläger hoch/runter, W/S, Touch oder durch Ziehen im Feld bewegen; zuerst fünf Punkte gewinnen. Breakout: 32 Steine mit drei Bällen abräumen; unterer Schläger mit links/rechts, A/D, Touchknöpfen oder horizontalem Ziehen. Zehn Punkte pro Stein, zwanzig Abzug je Ballverlust, mindestens null. Alle Steine gewinnen; drei Ballverluste oder Zeitablauf verlieren. Countdown, 120 Sekunden Limit, Pause über P/Escape/Leertaste/Button, Abbruch/Export. Während der 2D-Retroanzeige wird die verdeckte 3D-Welt nicht gerendert.

Erster Sieg: einmalig eine Höhlenlampe. Bei vollem Rucksack Ergebnis sichern und Anspruch später am Automaten abholen. Lampe im Rucksack leuchtet automatisch in Felsengang/Kristallgrotte; Verkauf/Einlagerung erzeugt keinen neuen Anspruch. v10 speichert aktive Spiele, RNG, Eingaben, Bestwerte und Lampenstatus und übernimmt v1–v9. Prüfungen `node tests/arcade.mjs` und `node tests/breakout.mjs`; insgesamt vierzehn Programme. Bestehende v10-Stände bleiben ohne Schemawechsel kompatibel; Breakout speichert zusätzlich Steinbelegung, verbleibende Bälle und Schläger-/Ballzustand. Echte Gerätegrafik, SVG-Layout, Touchkomfort, Audio und Leistung bleiben offen.


## Kompakte Anzeige und Eingänge

Energie/Ausdauer und Aufgaben bleiben beim Erkunden als schmale Statusknöpfe sichtbar. Antippen öffnet Details; Geld, Tag und Gerätespeicherung stehen unter Versorgung. «Menü» öffnet Tiere, Rucksack, Rezepte, Aufgaben, Karte und Einstellungen. Der Kartenknopf bleibt direkt erreichbar. Nur ein Detailbereich ist gleichzeitig offen.

Zum Laufen auf die Wiese tippen. Ein Tipp auf die Alphütte oder einen sichtbaren Wegweiser führt zum freien Eingang und löst die Aktion nach Ankunft aus. Die ersten drei Entdeckungen sind freiwillige Einführungsziele; weder Hütte noch Dorf setzen deren Abschluss voraus. Neue Steuerung/anderes Ziel unterbricht den bisherigen Weg. Die Hütte verwendet hellere Holzmaterialien, gefaste Fassadenbretter und 144 versetzte Dachschindeln. Reale Grafik-/Touch-/Safari-Abnahme bleibt offen.


## Heimat, Gipfel und Tal · aktueller Ausbau

Die Welt bleibt vollständig begehbares 3D; `ART-DIRECTION.md` hält den Vergleich mit den tatsächlich untersuchten 2D-Originalbildern und die offenen visuellen Qualitätsziele fest.

Von der Alp führt der neue Panoramaweg frei zur Sonnenalp, dann über den Adlergrat zum Gipfel. Der Talweg führt bergab zum Dorf und weiter zur Stadt. Rückwege sind frei; der Geheimgang ist keine Voraussetzung. Unter «Karte» kannst du einen lokalen Weg wählen: Die Figur läuft zur Tür oder zum Übergang, statt zu teleportieren. 19 Orte / 42 gerichtete Übergänge.

Die Heimat hat einen Bergbach mit Brücke, Steinen und neun animierten Fischen, eine Feuerstelle mit kostenloser Rast, einen Talblick und den bestehenden Alpbrunnen. Eine grössere Scheune und Kühe, zwei Geissen und Hühner bilden den Hofbereich. Jonny und der einfache Parcours bleiben ab Beginn zugänglich; der Parcours liegt nun in der eigenen Reitweide.

Im Rezeptbuch öffnet «Alp & Weide ausbauen» drei Herstellungsprojekte: Reitpark, grösseres Kornfeld und geschütztes Portmann-Schokoladenbohnen-Gewächshaus. Herstellung in der Alphütte, einmalige Materialkosten, gespeicherte Bauzustände. Der kleine Kornstreifen ist bereits nutzbar; grosse Anlagen reifen erst nach der nächsten Nacht. Ernte höchstens einmal pro Spieltag, kein Zeitfortschritt bei geschlossenem Spiel. Getreidemahlen und Portmann-Alpschokolade ergänzen das Rezeptbuch auf 34 Rezepte. v11 übernimmt v1–v10 einschliesslich bisheriger Belohnungen und ergänzt die neue Geissenversorgung ohne deren Rücknahme.

16 technische Prüfprogramme, darunter `tests/estate.mjs` und `tests/journey.mjs`. Echte visuelle Grafik-/Safari-/iPad-/Mac-/Leistungsabnahme bleibt offen; die Originalbildqualität ist weiterhin das gestalterische Ziel.


## Räumlicher Korrekturstand

Tierbereiche sind eingefasst und über offene Tore erreichbar. Heimatwege folgen den tatsächlichen Zugängen, haben runde Anschlüsse und an steilen Stellen Steinstufen. Die alte breite Parcours-Bodenbahn ist entfernt. Haus-/Scheunenböden besitzen angepasste Erdterrassen. Wiese mit unterschiedlicher Grashöhe und Blumeninseln, neue gestaltete 3D-Bergketten/Talsee, vorausblickende Erkundungskamera. Stube mit einzelnen Holzdielen und abgerundeten Möbelkanten.

17 technische Programme einschliesslich `node tests/composition.mjs`. Diese Prüfung beurteilt Geometrie und Sichtlinien. Die tatsächliche gerenderte Originalbildwirkung ist weiterhin offen; keine grafische Fertigmeldung.

Aktueller Landschaftsstand: benannte Schweizer Gratvorbilder, linker Talsee, Berner Holzhaus mit heller Fassade, geordneter Hof und grösserer Kornanbau, braune Bauernwege, Bachlager mit Zelt/Felsrücken. Vier gespeicherte Figurenvarianten im Willkommen und unter Einstellungen. `node tests/characters.mjs` ergänzt die Prüfprogramme; jetzt 18 Programme. Gerenderte visuelle Abnahme bleibt offen. Details: WORK-STATUS.md und ART-DIRECTION.md.

Bedienkorrektur: Näher geführte Erkundungskamera, getrennte Übersicht, Pointer-Capture mit Fingerkennung/Abbruchbehandlung und canvasbezogenen Touch-Koordinaten, abgesenkte Gewässerbetten und trockene Weg-/Brückenflächen. `node tests/touch-input.mjs` ergänzt die Suite auf 19 Prüfprogramme. Reale iPad-/Safari- und gestalterische Abnahme bleiben offen.

Hofumbau: zentrale Positionen in `dist/hof-layout.mjs`, konkreter Lageplan und Positionsänderungen in `docs/HOFPLAN.md`. Hauptstall rechts hinter dem Haus; Tierhof, Kiosk und Teich gemeinsam neu zugeordnet. Umgebung als nicht überlappender Geländering. Neue Prüfungen: `tests/hof-layout.mjs`, `tests/terrain-horizon.mjs`. Visuelle 3D-Abnahme steht aus.

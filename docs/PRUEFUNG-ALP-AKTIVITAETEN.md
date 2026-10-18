# Nachweise · Alp, Wald und Bild-Minispiele

17. Oktober 2026. Prüfungen werden lokal mit Node durchgeführt. Es stehen keine Browsersteuerung, keine reale WebGL-Abnahme und keine iPhone-/iPad-/Mac-Hardwaretests zur Verfügung.

## Bestandene Prüfungen

- `tests/characters.mjs`: sechs Profile, Modelldaten, Ausrüstung, Wechsel und Fortschrittsspeicherung. Keine gerenderte Ähnlichkeitsabnahme.
- `tests/cozy-activities.mjs`: Bräunung an vier Seiten bei 30/60 fps, Abstand/Hitze, Wenden, perfekt/roh/verbrannt, Essen und Energie, drei Fischarten mit erfolgreichem Spannungskontrollspiel, frühes Anschlagen/Schnurbruch, Inventar, Kochen, Verkauf und Quests. Volle Taschen und doppelte Belohnungen werden abgefangen. Einmaliges Willkommenspäckli und Altstandmigration geprüft.
- `tests/cozy-ui.mjs`: tatsächliche Canvas2D-Zeichnung mit den erzeugten Bilddateien bei vier Flächengrössen, Pointer-/Tasteneingaben, Bildladen, Schliessen/Fortsetzen und erfolgreiche Fischaufnahme. Das prüft die Zeichenfunktion und Eingabehandler, nicht die CSS-Darstellung eines Browsers.
- `tests/integration.mjs --cozy-games-only`: echter Hauptprogrammablauf vom 3D-Zelt/Angelplatz in die 2D-Szene und zurück; perfekte Röstung/Fischaufnahme und gespeichertes Inventar bei simuliertem iPhone-Hoch-/Querformat und iPad-Viewport.
- `tests/integration.mjs --movement-only`: Hinunter-/Seitwärtslaufen, Loslassen/Abbruch, Bergübergang/Rückweg und Wiederaufnahme eines alten Standes hinter der früheren Grenze.
- `tests/integration.mjs --mobile-only`: kompakte HUD-Bedienung, Radio, Haus-/Stallzugänge und Speicherung an drei simulierten Bildschirmformaten.
- `tests/development-world.mjs`: dichter Wald mit unterschiedlicher Höhe, Unterholz/Wurzeln/Äste/Füchse/Teichfische; sämtliche bestehenden und neuen Interaktionspunkte sowie Lichtungsweg geometrisch erreichbar. Zelt und Brunnen sind tatsächliche Klickziele. Brunnenfunktionen und Schutz gegen Verkauf kostenloser Leihangeln geprüft.
- `tests/composition.mjs` und `tests/terrain-grading.mjs`: Geländeanpassung, Wasser-/Wegeabstände und erreichbare Hofobjekte.
- `tests/generated-materials.mjs` und `tests/alpine-reference.mjs`: neue/erhaltene Materialkarten sind auf Weltgeometrie angeschlossen; vorhandene Shaderbausteine und lokale Bilddateien geprüft. Keine GPU-Shaderkompilierung.
- `tests/progression.mjs`, `tests/farm.mjs`, `tests/cozy-alp.mjs`, `tests/autumn-alp.mjs`: Speicherung, strikte Imports, 38 Rezepte, Wirtschaft/Belohnungen, Versorgung und Tierunterbringung bleiben nutzbar.

## Offene Abnahmen

Echte Safari-Gesten; CSS-Layout einschliesslich Browserleisten und Rotation; WebGL-Reflexion, Schatten und transparentes Unterholz; Klang; gemessene Bildrate/Speicherlast; visuelle Übereinstimmung mit den Portmann-Referenzen. Keine dieser Prüfungen wird als durchgeführt bezeichnet.

## Herkunft der Bilder

Built-in ImageGen. Prompts und Originale: `docs/materials/adventure-scenes-generation.json`, `docs/materials/alpine-path-light.json` und Originaldateien. Die eigene Hochformat-Lagerszene hält Zelt und Feuer im Bild. Kompakte Laufzeitkopien liegen in `dist/assets/portmann/`; hochwertige Originale bleiben im Quellprojekt. Bestehende Audiotitel wurden für diesen Ausbau nicht erneut komprimiert.

Die vollständige Hauptprogramm-Regression `node --experimental-vm-modules tests/integration.mjs` ist ebenfalls bestanden. Nach den letzten Änderungen wurden die betroffenen Aktivitäts-, Speicher- und 3D-/2D-Übergangsprüfungen zusätzlich bestanden. Der helle Wegmaterialwechsel betrifft die Bildkarte und ersetzt keine Gelände- oder Kollisionsprüfung.

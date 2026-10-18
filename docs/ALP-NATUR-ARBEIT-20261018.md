# Portmann Alp – Wegränder, Talblick, Hofnatur und Arbeitsanzeigen

## Implementierung

| Auftrag | Zustand | Konkret integriert |
| --- | --- | --- |
| Laternen neben Wegen | UMGESETZT / geometrisch GETESTET | Finale Alp-Wege und Kollisionen bestimmen freie Standorte. 1,10 m Abstand ab Wegkante für den gesamten Laternenkörper. Kleine Pfostenkollision ausserhalb der Wege. |
| Tal hinter der Begrenzung | UMGESETZT / logisch GETESTET | Neu generiertes Tages- und Nachtpanorama jenseits des südlichen Zauns; geometrisch abfallendes Aussengelände. Dorflichter im Nachtbild, Überblendung mit vorhandener Weltzeit. |
| Obstbäume getrennt vom Tannenwald | UMGESETZT / GETESTET | 4,80 m freier Kronenbereich um sämtliche Obstbaumstandorte, sowohl für Hofwald als auch Fernwald. |
| Sträucher | UMGESETZT / GETESTET | 238 Standorte, vier generierte Arten; zusätzliche Gruppen am Obstgarten, Wiesenrand und Hühnerauslauf. Bauplätze, Feld und Wege bleiben frei. |
| Kleintiere | UMGESETZT / technisch GETESTET | Generierter transparenter Atlas: Igel, Eichhörnchen, Feldhase, Rotkehlchen. Sieben kleine animierte, kamerazugewandte Bildfiguren in der 3D-Welt; keine Behauptung vollständiger 3D-Tiermodelle. |
| Hühnerhaus und Hühner | UMGESETZT / GETESTET | Tür/Rampe zur offenen Ostseite gedreht, drei Hühner im freien Auslauf, Augen ergänzt. Hineinholen/Zurücklassen erhalten. |
| Mähen/Melken | UMGESETZT / VM-GETESTET | Kompakte Balken, Schritte und Prozentwerte; Tagesversorgung und Abholstatus. Melken erfordert sechs Bewegungen. Abbruch gibt keine Milch, Vergütung und Speicherung erst nach Abschluss. Heu-Sammelmenge sichtbar. |

## Bildquellen

Built-in Bildgenerierung, keine Fremdquelle. Originale in `docs/materials/`, tatsächlich geladene WebP-Kopien in `dist/assets/portmann/`.

- `valley-day-20261018`: Blick von einer erhöhten Schweizer Alp ins tiefe Herbsttal, Dorf, Fluss, ferner See und geschichtete Bergzüge, fotografisch, ohne UI/Text.
- `valley-night-20261018`: dieselbe Bildkomposition als mondhelle Nacht mit kleinen warmen Dorflichtern; Geometrie/Framing möglichst erhalten.
- `small-fauna-20261018`: transparenter 2×2-Atlas mit Igel, Eichhörnchen, Feldhase und Rotkehlchen, naturgetreu, ganze Körper, ohne Beschriftung.

Die kleinteilige Tierdarstellung verwendet Bildfiguren, das Tal einen fernen Hintergrund. Begehbare Flächen, Wegführung, Hof und Gebirge bleiben 3D. Die Talbilder sind keine neue begehbare Spielregion.

Bestehende ausgewählte Bilddateien wurden für das feste Veröffentlichungslimit kompakter ausgeliefert; alle vorherigen Fassungen sind im Quellprojekt erhalten. Musik, Laufzeiten und Spielstände bleiben erhalten. Neues Offline-Manifest wird aus dem finalen Laufzeitstand erzeugt.

## Prüfungen und Grenzen

- `tests/alp-verges-valley-fauna.mjs`: Laternenfreiheit, Erreichbarkeit sämtlicher Alp-Interaktionspunkte, Baumabstände, Sträucher, Talüberblendung, Aussengelände, Hühnerausrichtung/Bewegung/Stall und Freilassen.
- `tests/integration.mjs --farm-progress-only`: tatsächliche UI-Aktionen in 390×740, 844×390, 1024×768, 1366×900 simulierten Viewports. Fortschritt bei 5/6, kein vorzeitiges Produkt, Abbruch, Abschluss, gespeicherte Milch, keine doppelte Auszahlung.
- `tests/integration.mjs --mobile-only`: vorhandene kompakte mobile Bedienelemente, Raumwechsel, Stall, Radio und Speicherung.
- `tests/cozy-redesign-world.mjs`, `tests/terrain-grading.mjs`, `tests/nature.mjs`: erreichbare Interaktionen, trockene Brücke, Geländeübergänge und Botanik.
- PASS: village-decoration, lighting-village-expedition, generated-materials, nature-timber-bike, offline-cache und vollständiger integration.mjs-Lauf.

Diese Prüfungen sind Node-/Canvas-/DOM-VM- und Geometrieprüfungen. Kein WebGL-Bildtest, kein physischer iPhone-/iPad-/Mac-Test und keine abschliessende visuelle Abnahme. Die Darstellung des Talhintergrunds und der kleinen Bildtiere bleibt im echten Spiel zu prüfen.

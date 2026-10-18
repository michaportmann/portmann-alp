# Portmann Alp – Bergdorf-Umsetzung

## 18.10.2026 – Bergdorf, begehbarer Dorfladen und Saison-Crafting

| Anforderung | Zustand | Tatsächliche Umsetzung |
| --- | --- | --- |
| Dorfladen betreten | UMGESETZT / GETESTET | Eigener Innenraum, Eingang am sichtbaren Chalet, freies Herumlaufen, Verkaufstheke, vier interaktive Warenregale, Verkäuferin und Rückweg auf den Dorfplatz. Kein blosses Einkaufsfenster vor einer geschlossenen Fassade mehr. |
| Sortiment | UMGESETZT / GETESTET | Käsebedarf mit Lab, Milch, Salz; Schokoladenbedarf mit Kakao, Honig, Zucker und Haferdrink; Werkzeuge/Baumaterial; Proviant, vegane Speisen und Saisondekor. Kürbisse und Weihnachtsbaum im Sortiment. Käufe/Verkäufe nutzen echte Münzen, Inventar, Lagergrenzen und Speicherung. |
| Dorfplatz und Brunnen | UMGESETZT / GETESTET | Neuer erkennbarer Naturstein-Dorfbrunnen mit gefasstem Becken, sichtbarem Wasserstrahl und animierten Ringen. Interaktion füllt Quellwasser in den Rucksack und stillt den Durst, sofern Platz vorhanden. Sitzbänke am Platz. |
| Wege und Häuser | UMGESETZT / GETESTET | Alle geplanten Pflasterabzweigungen nach Fertigstellung der Hauskollisionen neu um Hindernisse geführt und geglättet. Kleine Chalets und Bäckerei mit niedrigeren Dächern, erhaltenen normal hohen Türen und ohne den grossen Balkon der mehrstöckigen Gebäude. Bäckerei, Restaurant und Wohnhäuser zum Dorf hin gedreht; Eingänge und Kollisionen entsprechend angepasst. |
| Tafeln und Orientierung | UMGESETZT / GETESTET | Zusätzliche Eingangstafeln am Dorfhaus, Laden und Restaurant entfernt. Dorfhaus trägt seinen Namen; Laden und Restaurant sind über ihre Fassade anklickbar und in der Karte als Gehziel erreichbar. |
| Grünes Dorf und Markt | UMGESETZT / GETESTET | Acht bepflanzte Inseln, vier Buscharten und Blumen, zusätzliche Lärchen. Pflanzinstanzen aus den neuen Pflaster-Lauflinien entfernt. Markt mit sichtbaren Waren auf dem Tresen und dreidimensionalen Kürbislichtern zusätzlich zu vorhandenen Warenvorlagen. Markt, Bäckerei und Praxis bleiben ansprechbar. |
| Platzlaternen | UMGESETZT / GETESTET | Fünf gezielte Laternenstandorte am zentralen Platz zusätzlich zu den Eingängen. Automatische Dämmerungsbeleuchtung mit höchstens sechs gleichzeitig aktiven mobilen Punktlichtern bleibt erhalten. |
| Deko erspielen | UMGESETZT / GETESTET | Neuer Unterbereich im Crafting: Herbstschmuck, Kürbislichter, Winterkränze/Lichter und Weihnachtsbaum. Materialien und Energie werden nur beim ersten Herstellen verbraucht; Sets bleiben dauerhaft freigeschaltet. Käufliche Sets können ebenfalls benutzt werden. |
| Deko auf Haus und Alp | UMGESETZT / GETESTET | Echte 3D-Kürbisse, Erntekörbe, Kränze und geschmückte Tanne statt der bisherigen gedruckten Dekotafel im Haus. Aufstellen/Wegräumen auf der Alp und Auswahl in der Wohnstube gespeichert. Dekosaison Herbst/Winter manuell wählbar; kein behaupteter Jahreszeitenkalender und keine Änderung des globalen Wetterrhythmus. |

Zugang: Im Dorf das Chalet mit der Aufschrift DORFLADEN anklicken und zum Eingang laufen. Im Laden öffnen Theke und beschriftete Regale den Einkauf. Über den unteren Ausgang gelangt man zurück auf den Platz.

Deko: Crafting → Dekorationen für Haus & Alp → Materialien besorgen → an der Werkbank in der Alphütte herstellen. Danach auf der Alp aufstellen beziehungsweise in der Wohnstube auswählen. Herbst/Winter lässt sich in diesem Menü wechseln.

Prüfungen: Neuer Welt-/Regeltest für sämtliche Dorf-/Laden-Interaktionen, beide Übergänge, alle Pflasterzweige, Häuserausrichtung, zentralen Brunnen, Pflanzen und Laternenbudget. Tatsächlicher Hauptspiel-Code im VM-Test: Laden betreten, Theken-Einkauf von Lab/Laterne/Zelt, Rückweg, Bäckerei, Praxis, Markt, Speichern an vier simulierten Bildschirmgrössen. Deko-UI an iPhone-/iPad-/Mac-grossen Viewports: Materialabzug, Baum-Freischaltung, Innen-/Aussenmodelle, Saisonauswahl, exaktes Speichern/Neustart. Alte Save-Migration, ungültige Dekodaten, bestehende Ausbau-, Alp-, Gelände-, Licht-, Wetter- und Speicherprüfungen bestanden.

OFFEN: Visuelle Abnahme in einem echten Browser mit GPU sowie echte iPhone-/iPad-/Mac-Bedienung und Performance. Diese Umgebung bietet dafür keinen freigegebenen Browser. Die verwendeten Natur-/Waren-/Holz-/Steintexturen stammen aus bereits erzeugten Projektvorlagen; diese Phase hat echte 3D-Modelle ergänzt, keine neuen Bildgenerierungen behauptet.

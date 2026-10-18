# Portmann Alp – Entwicklungsnachweis

## 18.10.2026 – Jonny, Abfahrten und Gipfelhütte

UMGESETZT: Jonny mit drei wählbaren Stufen. Einfach benötigt 3 von 4 Hürden für die Aufgabe. Sportlich und Profi verlangen 4 von 4 und höhere Geschwindigkeit bzw. Hürden. Vordergrund-Pferd während der Ich-Perspektive ausgeblendet. Geschlossener Ergebnisdialog lässt sich wieder öffnen; unterer Ausstieg beendet die Runde jederzeit. Untere Ausstiege auch für Ski, Zielspiel, Arcade, Klettern, Jass und die Cozy-Minispiele.

UMGESETZT: Fahrrad und Schlitten im Unterstand, eigenständige 480-m-Abfahrten mit Lenken, Bremsen, Sprüngen, Hindernissen, Kontrolltoren und speicherbarer Fortsetzung. Einmalige Aufgabenbelohnungen. Shop mit Lab, Salz, Milch, Kakao, Zucker, Werkzeugen und Baumaterialien; vegane Schokolade als Rezept. Neue generierte Wander-, Wald-, Bauern- und Geröllwegtexturen sowie vier Wiesenvarianten technisch eingebunden. Kies am Wegrand ohne neue Kollisionsbarrieren.

UMGESETZT: Daniels Gipfelhütte mit begehbarem Innenraum, zwei Betten, Übernachten und Rückweg; Daniel als ansprechbarer Bergführer. Gipfelzugang und Fundament angepasst. Winterpanorama und Schneetextur im Ski- und Schlittenbereich. Daniel- und Hüttenbilder dienen als Gestaltungsvorlagen für die gebauten 3D-Modelle, nicht als behauptete originalgetreue Rekonstruktion. Sommer-/Winterabfahrten sind separat wählbar; ein Jahreszeitenkalender ist damit nicht umgesetzt.

GETESTET: vollständige bestehende Node/VM-Integration; fokussierte Jonny-Prüfung im iPhone-Hoch-/Querformat einschließlich 3/4-Erfolg, Dialog schließen/wieder öffnen und Ausstieg; tatsächliche untere Ausstiege in Ski, Zielspiel, Arcade, Klettern und Jass; Schlafen/Speichern in Daniels Hütte. Regeltests für beide Abfahrten, Tore, Bremsen, Sprünge, Kollisionen, Belohnungen und Save-Migration. UI-Ereignisse in vier Bildschirmgrößen mit Renderer-Stub; Weltgeometrie, erreichbare Interaktionen und endliche Kameramatrizen. Cozy-Canvas-Prüfungen bestanden. Geländeprüfung: 23.255 Straßenflächen, 86 unabhängige Bodenstrahlen, trockene Brücke und kontinuierlicher Bachabfall. Cloud-/Speicher-/Wetter-Regressionsprüfung bestanden; keine neue authentifizierte Live-Supabase-Prüfung behauptet.

OFFEN: visuelle Abnahme mit echtem Browser/GPU und echten iPhone-, iPad- und Mac-Geräten. Diese Umgebung erlaubt nur Node/VM-/Canvas-Prüfungen; daraus folgt keine bestätigte Geräteperformance oder endgültige Bildqualität. Weitere Natur-/Charakter-Verfeinerung bleibt Teil des Gesamtauftrags.

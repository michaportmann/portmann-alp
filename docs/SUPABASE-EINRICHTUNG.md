# Supabase einrichten – Stand 18.10.2026

## Tatsächlicher Stand

Die Datenbankmigration ist **vorbereitet, nicht ausgeführt**. Live-Anmeldung, E-Mail-Zustellung, Passwort-Rücksetzung, RLS und die Synchronisation zwischen echten Geräten sind **OFFEN**. Die Anwendung enthält die Anbindung und verwendet ausschliesslich den bereitgestellten öffentlichen Publishable Key. Keine Secret- oder service_role-Schlüssel werden benötigt oder ausgeliefert.

Das im Chat gepostete SQL ist eine Grundlage für Zugriffsschutz, enthält aber noch keine Revisionsprüfung. Die vollständige Migration ersetzt die drei genannten Policies und entzieht direkte INSERT-/UPDATE-Rechte. Schreiben ist ausschliesslich über `sync_game_save(expected_revision,payload)` möglich. Lesen erfolgt unter RLS mit dem angemeldeten Benutzer. Die Funktion ermittelt den Benutzer aus `auth.uid()`, nimmt keine frei wählbare Benutzer-ID entgegen, fixiert den Suchpfad und serialisiert auch den ersten Schreibzugriff. Ein Konflikt liefert den aktuellen eigenen Stand zurück, ohne ihn zu überschreiben.

## Genau diese Schritte durchführen

1. Im Supabase-Dashboard das Projekt mit der URL `https://ifhranjkqetalwbnbulf.supabase.co` öffnen.
2. **SQL Editor → New query** öffnen.
3. Den gesamten Inhalt von `supabase/migrations/20261018_game_saves.sql` einfügen und **Run** drücken. Das Skript kann erneut ausgeführt werden und erhält bestehende Spielstände. Nicht zusätzlich das alte SQL mit denselben Policy-Namen ausführen.
4. Das Ergebnis muss erfolgreich sein. Bei Fehlern den vollständigen Fehlertext sichern; ein ausgeführter Teil darf nicht als erfolgreiche Migration gelten. Das Skript verwendet eine Transaktion.
5. Unter **Authentication → Providers / Sign In** E-Mail und Passwort aktivieren, E-Mail-Bestätigung einschalten. Die Menübezeichnungen können sich im Dashboard ändern.
6. Unter **Authentication → URL Configuration** als Site URL `https://portmann-alp-3d.michaportmann.chatgpt.site/` und als erlaubte Redirect URL dieselbe Adresse eintragen. Für eine spätere eigene öffentliche Adresse beide Einträge und den Redirect in `dist/cloud-save.mjs` anpassen.
7. Im Spiel **Menü → Konto & Cloud → Registrieren**. Bestätigungsmail öffnen, danach anmelden. Nach der Anmeldung lädt das Spiel den Kontostand automatisch. Bei einem neuen Konto wird der aktuelle Stand automatisch zugeordnet; eine zusätzliche Gastübernahme ist nicht nötig. Der bisherige Gaststand bleibt auf dem Gerät erhalten. Ein Dateiexport ist eine freiwillige Zusatzsicherung.
8. Auf dem zweiten Gerät dieselbe Spieladresse im Browser öffnen, mit demselben Konto anmelden. Der vorhandene Cloud-Spielstand wird automatisch geladen; ungesendete lokale Änderungen werden bei abweichender Cloud-Revision nicht automatisch verworfen.
9. Vor einem Gerätewechsel **Jetzt speichern** verwenden und auf den Status achten. Im Offline-Modus bleibt die lokale Kopie erhalten. Synchronisierung wird nach der nächsten Speicherung erneut versucht. Zwei gleichzeitig laufende Geräte können eine bewusste Konfliktauswahl erfordern.

**Zugriff auf die Spieladresse:** Die Sites-Freigabe wurde nicht geändert und war beim Abgleich nur für den Eigentümer freigegeben. Ein Supabase-Konto ersetzt diese Sites-Zugriffsberechtigung nicht. Eine öffentliche Freigabe muss ausdrücklich eingerichtet werden.

## Prüfliste für die tatsächliche Datenbank

- Nicht angemeldet: `game_saves` darf nicht lesbar oder schreibbar sein.
- Benutzer A: ausschliesslich eigene Zeile lesen; Benutzer B darf diese nicht lesen.
- Direkte INSERT-/UPDATE-Aufrufe als authenticated müssen abgewiesen werden.
- Zwei RPC-Aufrufe mit derselben Ausgangsrevision: genau einer darf speichern; der andere muss `conflict` liefern.
- Offline auf Gerät A ändern, online auf B ändern, A wieder verbinden: keine automatische Überschreibung von B.
- Abmelden, mit anderem Konto anmelden: keine automatische Übernahme des vorherigen Kontospielstands.
- Passwort-Rücksetzung und E-Mail-Bestätigung auf der freigegebenen Spieladresse prüfen.

## Grenzen, die noch bearbeitet werden müssen

- **Kein serverautoritäres Wirtschaftssystem.** Der Save ist weiterhin ein offlinefähiger Einzelspielerstand. Clientvalidierung, RLS und Revisionsprüfung verhindern keine absichtlich veränderten Geld-/Inventarwerte des eigenen Kontos. Manipulationsschutz für Belohnungen benötigt serverseitig geprüfte Spielaktionen und ist OFFEN.
- **Kontolöschung:** Die Spieloberfläche kann nach einer Rückfrage den eigenen Cloud-Spielstand löschen. Das Auth-Konto selbst kann derzeit nur über die Supabase-Verwaltung gelöscht werden. Ein sicherer Self-Service mit erneuter Authentifizierung ist OFFEN.
- IndexedDB und localStorage gehören zum selben Browserprofil. Löschen aller Browserdaten kann beide Kopien entfernen. Eine exportierte Datei bleibt als unabhängige Sicherung sinnvoll.
- Die Supabase-Instanz wurde weder mit einem privaten Datenbankzugang verbunden noch durch diesen Arbeitsstand verändert.

## Offizielle Referenzen

- https://supabase.com/docs/guides/database/postgres/row-level-security
- https://supabase.com/docs/guides/database/functions
- https://supabase.com/docs/guides/auth/passwords
- https://supabase.com/docs/reference/javascript/auth-resetpasswordforemail

## Direkte Links für Micha

- Projekt: https://supabase.com/dashboard/project/ifhranjkqetalwbnbulf
- Neue SQL-Abfrage: https://supabase.com/dashboard/project/ifhranjkqetalwbnbulf/sql/new
- Authentication / Sign In / Providers: https://supabase.com/dashboard/project/ifhranjkqetalwbnbulf/auth/providers
- Authentication / URL Configuration: https://supabase.com/dashboard/project/ifhranjkqetalwbnbulf/auth/url-configuration

Die URL mit `.supabase.co` ist die technische API-Adresse, nicht die Verwaltungsoberfläche. Im Spiel sind API-Adresse und öffentlicher Schlüssel bereits eingetragen.

### E-Mails für Familienkonten

Der Supabase-Standardversand verschickt Auth-E-Mails nur an Adressen der Supabase-Projektorganisation. Für weitere Familien-/Spielerkonten einen eigenen SMTP-Versand unter Authentication / Emails einrichten. SMTP-Zugangsdaten ausschliesslich dort hinterlegen, niemals im Spielcode. Anleitung: https://supabase.com/docs/guides/auth/auth-smtp

### Speichern und Figuren

- Die Figuren heissen Micha, Nancy, Noemi, Niklas, Lenja und Werner. Ihre bestehenden technischen IDs bleiben erhalten, vorhandene Saves funktionieren weiter.
- Ein Konto besitzt einen gemeinsamen Spielstand inklusive aktuell gewählter Figur. Die Figurenauswahl erzeugt keine sechs unabhängigen Speicherplätze. Mehrere echte Spieler verwenden eigene Konten. Ohne Anmeldung gibt es einen Gaststand pro Browser.
- Autosave alle 30 aktiven Spielsekunden, bei wichtigen Aktionen und beim Wechseln/Verlassen. Manuell: Menü → Einstellungen → Jetzt speichern (lokal und bei Anmeldung direkt in die Cloud). Unabhängige Dateisicherung: Spielstand herunterladen. Dateiname enthält nun den Figurennamen.
- Offline speichert der Browser lokal. Nach der ersten erfolgreichen Online-Vorbereitung werden auch die Spieldateien über einen Service Worker vorgehalten. Der Status steht in den Einstellungen. Browser können lokale Daten entfernen; Dateisicherung bleibt deshalb wichtig.
- Erster Start und erste Registrierung benötigen Internet. Cloud-Abgleich benötigt Internet. Ein vorhandenes Konto kann seinen bereits lokalen Stand offline öffnen.
- Noch nicht auf einem echten iPhone/iPad/Mac offline gestartet: diese Abnahme bleibt OFFEN.


## Vereinfachter Standardablauf

Anmelden genügt: bestehender Kontostand lädt automatisch; ein neues Konto erhält den aktuellen lokalen Stand. Automatische lokale Speicherungen lösen bei aktivem Konto kurz darauf einen Cloud-Abgleich aus. «Jetzt speichern» sichert lokal und startet die Cloud-Übertragung direkt. Offline bleibt lokal gesichert; beim Wiederverbinden wird erneut abgeglichen. «Spielstand herunterladen» und Dateiimport bleiben als zusätzliche Sicherung verfügbar. Nur echte voneinander abweichende Offline-/Cloud-Änderungen erfordern eine Auswahl. «Spielstände vergleichen» ist eine freiwillige Verwaltungsfunktion.

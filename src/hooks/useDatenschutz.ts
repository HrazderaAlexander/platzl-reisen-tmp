import { useState, useEffect } from 'react';
import { strapiApi } from '../lib/api/strapiClient';
import { dataTransformers } from '../lib/api/dataTransformers';

interface DatenschutzAbschnitt {
  titel: string;
  inhalt: string;
  sortierung: number;
}

interface DatenschutzRecht {
  text: string;
  beschreibung?: string;
  sortierung: number;
}

interface DatenschutzData {
  titel: string;
  untertitel: string;
  firmenname: string;
  adresse: string;
  plz_ort: string;
  telefon: string;
  email: string;
  letzte_aktualisierung: string;
  aufsichtsbehoerde_titel: string;
  aufsichtsbehoerde_name: string;
  aufsichtsbehoerde_adresse: string;
  ihre_rechte_titel: string;
  ihre_rechte_liste: DatenschutzRecht[];
  abschnitte: DatenschutzAbschnitt[];
}

export const useDatenschutz = () => {
  const [datenschutzData, setDatenschutzData] = useState<DatenschutzData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usingMockData, setUsingMockData] = useState(false);

  // Mock data mit vollständigem Inhalt von platzl-reisen.at
  const mockDatenschutzData: DatenschutzData = {
    titel: 'DATENSCHUTZ AUF EINEN BLICK',
    untertitel: 'Informationen zum Schutz Ihrer persönlichen Daten',
    firmenname: 'Platzl Reisen GmbH',
    adresse: 'Böhmerwaldstrasse 18',
    plz_ort: 'A-4020 Linz',
    telefon: '+43 (0) 732/272717',
    email: 'info@platzl-reisen.at',
    letzte_aktualisierung: 'Januar 2025',
    aufsichtsbehoerde_titel: 'Aufsichtsbehörde',
    aufsichtsbehoerde_name: 'Österreichische Datenschutzbehörde',
    aufsichtsbehoerde_adresse: 'Wickenburggasse 8\n1080 Wien',
    ihre_rechte_titel: 'Ihre Rechte',
    ihre_rechte_liste: [
      { text: 'Auskunft über Ihre Daten', beschreibung: 'Recht auf Information über gespeicherte Daten', sortierung: 0 },
      { text: 'Berichtigung von Daten', beschreibung: 'Recht auf Korrektur falscher Daten', sortierung: 1 },
      { text: 'Löschung von Daten', beschreibung: 'Recht auf Löschung Ihrer Daten', sortierung: 2 },
      { text: 'Widerspruch gegen Verarbeitung', beschreibung: 'Recht auf Widerspruch', sortierung: 3 },
      { text: 'Datenübertragbarkeit', beschreibung: 'Recht auf Datenportabilität', sortierung: 4 }
    ],
    abschnitte: [
      {
        titel: '1. ALLGEMEINE HINWEISE',
        inhalt: `Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie unsere Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.

**DATENERFASSUNG AUF UNSERER WEBSITE**

**Wer ist verantwortlich für die Datenerfassung auf dieser Website?**
Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.

**Wie erfassen wir Ihre Daten?**
Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z.B. um Daten handeln, die Sie in ein Kontaktformular eingeben.

Andere Daten werden automatisch beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z.B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie unsere Website betreten.

**Wofür nutzen wir Ihre Daten?**
Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.

**Welche Rechte haben Sie bezüglich Ihrer Daten?**
Sie haben jederzeit das Recht unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung, Sperrung oder Löschung dieser Daten zu verlangen. Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit unter der im Impressum angegebenen Adresse an uns wenden. Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.`,
        sortierung: 1
      },
      {
        titel: '2. ALLGEMEINE HINWEISE UND PFLICHTINFORMATIONEN',
        inhalt: `**DATENSCHUTZ**
Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.

Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben. Personenbezogene Daten sind Daten, mit denen Sie persönlich identifiziert werden können. Die vorliegende Datenschutzerklärung erläutert, welche Daten wir erheben und wofür wir sie nutzen. Sie erläutert auch, wie und zu welchem Zweck das geschieht.

Wir weisen darauf hin, dass die Datenübertragung im Internet (z.B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich.

**HINWEIS ZUR VERANTWORTLICHEN STELLE**
Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:

Platzl Reisen GmbH
Böhmerwaldstrasse 18
A-4020 Linz
Telefon: +43 (0) 732/272717
E-Mail: info@platzl-reisen.at

Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten (z.B. Namen, E-Mail-Adressen o. Ä.) entscheidet.

**WIDERRUF IHRER EINWILLIGUNG ZUR DATENVERARBEITUNG**
Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Dazu reicht eine formlose Mitteilung per E-Mail an uns. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.

**BESCHWERDERECHT BEI DER ZUSTÄNDIGEN AUFSICHTSBEHÖRDE**
Im Falle datenschutzrechtlicher Verstöße steht dem Betroffenen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu. Zuständige Aufsichtsbehörde in datenschutzrechtlichen Fragen ist der Landesdatenschutzbeauftragte des Bundeslandes, in dem unser Unternehmen seinen Sitz hat.

**SSL- BZW. TLS-VERSCHLÜSSELUNG**
Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte, wie zum Beispiel Bestellungen oder Anfragen, die Sie an uns als Seitenbetreiber senden, eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von "http://" auf "https://" wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.`,
        sortierung: 2
      },
      {
        titel: '3. DATENSCHUTZBEAUFTRAGTER',
        inhalt: `**Gesetzlich vorgeschriebener Datenschutzbeauftragter**

Wir haben für unser Unternehmen einen Datenschutzbeauftragten bestellt:

Harald Platzl
Bäckerweg 1
4502 St. Marien
Telefon: 07227 8198 13
E-Mail: info@platzl-reisen.at`,
        sortierung: 3
      },
      {
        titel: '4. DATENERFASSUNG AUF UNSERER WEBSITE',
        inhalt: `**COOKIES**
Die Internetseiten verwenden teilweise so genannte Cookies. Cookies richten auf Ihrem Rechner keinen Schaden an und enthalten keine Viren. Cookies dienen dazu, unser Angebot nutzerfreundlicher, effektiver und sicherer zu machen. Cookies sind kleine Textdateien, die auf Ihrem Rechner abgelegt werden und die Ihr Browser speichert.

Die meisten der von uns verwendeten Cookies sind so genannte "Session-Cookies". Sie werden nach Ende Ihres Besuchs automatisch gelöscht. Andere Cookies bleiben auf Ihrem Endgerät gespeichert bis Sie diese löschen. Diese Cookies ermöglichen es uns, Ihren Browser beim nächsten Besuch wiederzuerkennen.

**SERVER-LOG-DATEIEN**
Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:

- Browsertyp und Browserversion
- verwendetes Betriebssystem
- Referrer URL
- Hostname des zugreifenden Rechners
- Uhrzeit der Serveranfrage
- IP-Adresse

Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen.

**KONTAKTFORMULAR**
Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.

Die Verarbeitung der in das Kontaktformular eingegebenen Daten erfolgt somit ausschließlich auf Grundlage Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). Sie können diese Einwilligung jederzeit widerrufen. Dazu reicht eine formlose Mitteilung per E-Mail an uns. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitungsvorgänge bleibt vom Widerruf unberührt.

Die von Ihnen im Kontaktformular eingegebenen Daten verbleiben bei uns, bis Sie uns zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung entfällt (z.B. nach abgeschlossener Bearbeitung Ihrer Anfrage). Zwingende gesetzliche Bestimmungen – insbesondere Aufbewahrungsfristen – bleiben unberührt.`,
        sortierung: 4
      },
      {
        titel: '5. ANALYSE TOOLS UND WERBUNG',
        inhalt: `**GOOGLE ANALYTICS**
Diese Website nutzt Funktionen des Webanalysedienstes Google Analytics. Anbieter ist die Google Inc., 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA.

Google Analytics verwendet so genannte "Cookies". Das sind Textdateien, die auf Ihrem Computer gespeichert werden und die eine Analyse der Benutzung der Website durch Sie ermöglichen. Die durch den Cookie erzeugten Informationen über Ihre Benutzung dieser Website werden in der Regel an einen Server von Google in den USA übertragen und dort gespeichert.

**IP ANONYMISIERUNG**
Wir haben auf dieser Website die Funktion IP-Anonymisierung aktiviert. Dadurch wird Ihre IP-Adresse von Google innerhalb von Mitgliedstaaten der Europäischen Union oder in anderen Vertragsstaaten des Abkommens über den Europäischen Wirtschaftsraum vor der Übertragung in die USA gekürzt. Nur in Ausnahmefällen wird die volle IP-Adresse an einen Server von Google in den USA übertragen und dort gekürzt.

**WIDERSPRUCH GEGEN DATENERFASSUNG**
Sie können die Erfassung Ihrer Daten durch Google Analytics verhindern, indem Sie auf folgenden Link klicken. Es wird ein Opt-Out-Cookie gesetzt, der die Erfassung Ihrer Daten bei zukünftigen Besuchen dieser Website verhindert: Google Analytics deaktivieren.

Mehr Informationen zum Umgang mit Nutzerdaten bei Google Analytics finden Sie in der Datenschutzerklärung von Google: https://support.google.com/analytics/answer/6004245?hl=de.`,
        sortierung: 5
      },
      {
        titel: '6. NEWSLETTER',
        inhalt: `**NEWSLETTERDATEN**
Wenn Sie den auf der Website angebotenen Newsletter beziehen möchten, benötigen wir von Ihnen eine E-Mail-Adresse sowie Informationen, welche uns die Überprüfung gestatten, dass Sie der Inhaber der angegebenen E-Mail-Adresse sind und mit dem Empfang des Newsletters einverstanden sind. Weitere Daten werden nicht bzw. nur auf freiwilliger Basis erhoben. Diese Daten verwenden wir ausschließlich für den Versand der angeforderten Informationen und geben diese nicht an Dritte weiter.

Die Verarbeitung der in das Newsletteranmeldeformular eingegebenen Daten erfolgt ausschließlich auf Grundlage Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). Die erteilte Einwilligung zur Speicherung der Daten, der E-Mail-Adresse sowie deren Nutzung zum Versand des Newsletters können Sie jederzeit widerrufen, etwa über den "Austragen"-Link im Newsletter. Die Rechtmäßigkeit der bereits erfolgten Datenverarbeitungsvorgänge bleibt vom Widerruf unberührt.

Die von Ihnen zum Zwecke des Newsletter-Bezugs bei uns hinterlegten Daten werden von uns bis zu Ihrer Austragung aus dem Newsletter gespeichert und nach der Abbestellung des Newsletters gelöscht. Daten, die zu anderen Zwecken bei uns gespeichert wurden (z.B. E-Mail-Adressen für den Mitgliederbereich) bleiben hiervon unberührt.`,
        sortierung: 6
      },
      {
        titel: '7. PLUGINS UND TOOLS',
        inhalt: `**GOOGLE WEB FONTS**
Diese Seite nutzt zur einheitlichen Darstellung von Schriftarten so genannte Web Fonts, die von Google bereitgestellt werden. Beim Aufruf einer Seite lädt Ihr Browser die benötigten Web Fonts in ihren Browsercache, um Texte und Schriftarten korrekt anzuzeigen.

Zu diesem Zweck muss der von Ihnen verwendete Browser Verbindung zu den Servern von Google aufnehmen. Hierdurch erlangt Google Kenntnis darüber, dass über Ihre IP-Adresse unsere Website aufgerufen wurde. Die Nutzung von Google Web Fonts erfolgt im Interesse einer einheitlichen und ansprechenden Darstellung unserer Online-Angebote. Dies stellt ein berechtigtes Interesse im Sinne von Art. 6 Abs. 1 lit. f DSGVO dar.

Wenn Ihr Browser Web Fonts nicht unterstützt, wird eine Standardschrift von Ihrem Computer genutzt.

Weitere Informationen zu Google Web Fonts finden Sie unter https://developers.google.com/fonts/faq und in der Datenschutzerklärung von Google: https://www.google.com/policies/privacy/.

**GOOGLE MAPS**
Diese Seite nutzt über eine API den Kartendienst Google Maps. Anbieter ist die Google Inc., 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA.

Zur Nutzung der Funktionen von Google Maps ist es notwendig, Ihre IP Adresse zu speichern. Diese Informationen werden in der Regel an einen Server von Google in den USA übertragen und dort gespeichert. Der Anbieter dieser Seite hat keinen Einfluss auf diese Datenübertragung.

Die Nutzung von Google Maps erfolgt im Interesse einer ansprechenden Darstellung unserer Online-Angebote und an einer leichten Auffindbarkeit der von uns auf der Website angegebenen Orte. Dies stellt ein berechtigtes Interesse im Sinne von Art. 6 Abs. 1 lit. f DSGVO dar.

Mehr Informationen zum Umgang mit Nutzerdaten finden Sie in der Datenschutzerklärung von Google: https://www.google.de/intl/de/policies/privacy/.`,
        sortierung: 7
      }
    ]
  };

  useEffect(() => {
    const fetchDatenschutzData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('=== LOADING DATENSCHUTZ DATA ===');
        
        const settingsResponse = await strapiApi.get('/datenschutz-settings', {
          params: {
            populate: {
              abschnitte: {
                sort: 'sortierung:asc'
              },
              ihre_rechte_liste: {
                sort: 'sortierung:asc'
              }
            }
          }
        });
        
        console.log('=== DATENSCHUTZ API RESPONSE ===');
        console.log('Settings Response:', settingsResponse.data);
        
        if (settingsResponse.data?.data) {
          const settingsData = settingsResponse.data.data;
          
          // Transform abschnitte
          const transformedAbschnitte = settingsData.abschnitte?.map((abschnitt: any) => ({
            titel: abschnitt.titel,
            inhalt: dataTransformers.richTextToHtml(abschnitt.inhalt),
            sortierung: abschnitt.sortierung
          })).sort((a: any, b: any) => a.sortierung - b.sortierung) || [];
          
          // Transform ihre_rechte_liste
          const transformedRechte = settingsData.ihre_rechte_liste?.map((recht: any) => ({
            text: recht.text,
            beschreibung: recht.beschreibung,
            sortierung: recht.sortierung
          })).sort((a: any, b: any) => a.sortierung - b.sortierung) || [];
          
          const transformedSettings: DatenschutzData = {
            titel: settingsData.titel || mockDatenschutzData.titel,
            untertitel: settingsData.untertitel || mockDatenschutzData.untertitel,
            firmenname: settingsData.firmenname || mockDatenschutzData.firmenname,
            adresse: settingsData.adresse || mockDatenschutzData.adresse,
            plz_ort: settingsData.plz_ort || mockDatenschutzData.plz_ort,
            telefon: settingsData.telefon || mockDatenschutzData.telefon,
            email: settingsData.email || mockDatenschutzData.email,
            letzte_aktualisierung: settingsData.letzte_aktualisierung || mockDatenschutzData.letzte_aktualisierung,
            aufsichtsbehoerde_titel: settingsData.aufsichtsbehoerde_titel || mockDatenschutzData.aufsichtsbehoerde_titel,
            aufsichtsbehoerde_name: settingsData.aufsichtsbehoerde_name || mockDatenschutzData.aufsichtsbehoerde_name,
            aufsichtsbehoerde_adresse: settingsData.aufsichtsbehoerde_adresse || mockDatenschutzData.aufsichtsbehoerde_adresse,
            ihre_rechte_titel: settingsData.ihre_rechte_titel || mockDatenschutzData.ihre_rechte_titel,
            ihre_rechte_liste: transformedRechte.length > 0 ? transformedRechte : mockDatenschutzData.ihre_rechte_liste,
            abschnitte: transformedAbschnitte.length > 0 ? transformedAbschnitte : mockDatenschutzData.abschnitte,
          };
          
          setDatenschutzData(transformedSettings);
          setUsingMockData(transformedAbschnitte.length === 0);
        } else {
          console.log('No datenschutz data, using mock data');
          setDatenschutzData(mockDatenschutzData);
          setUsingMockData(true);
        }
      } catch (err) {
        console.error('Error fetching datenschutz data:', err);
        setError(err instanceof Error ? err.message : 'Fehler beim Laden der Datenschutz-Daten');
        setDatenschutzData(mockDatenschutzData);
        setUsingMockData(true);
      } finally {
        setLoading(false);
      }
    };

    fetchDatenschutzData();
  }, []);

  return { 
    datenschutzData, 
    loading, 
    error, 
    usingMockData
  };
};
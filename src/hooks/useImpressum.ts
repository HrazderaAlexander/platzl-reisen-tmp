import { useState, useEffect } from 'react';
import { strapiApi } from '../lib/api/strapiClient';
import { dataTransformers } from '../lib/api/dataTransformers';

interface ImpressumData {
  titel: string;
  untertitel: string;
  firmenname: string;
  buero_linz_titel: string;
  buero_linz_adresse: string;
  buero_linz_email: string;
  buero_st_marien_titel: string;
  buero_st_marien_adresse: string;
  buero_st_marien_email: string;
  telefon: string;
  fb_nummer: string;
  fb_gericht: string;
  behoerde_text: string;
  uid: string;
  geschaeftsfuehrer: string;
  konzession: string;
  wirtschaftskammer: string;
  webdesign_titel: string;
  webdesign_agentur: string;
  haftungsausschluss_titel: string;
  zugang_download: string;
  copyright: string;
  inhalt_onlineangebotes: string;
  verweise_links: string;
  urheber_kennzeichenrecht: string;
  rechtswirksamkeit: string;
  online_streitbeilegung: string;
  aussergerichtliche_streitbeilegung: string;
  beschwerdestelle_titel: string;
  beschwerdestelle_name: string;
  beschwerdestelle_adresse: string;
}

export const useImpressum = () => {
  const [impressumData, setImpressumData] = useState<ImpressumData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usingMockData, setUsingMockData] = useState(false);

  // Mock data basierend auf den Bildern
  const mockImpressumData: ImpressumData = {
    titel: 'PLATZL REISEN',
    untertitel: 'Impressum und rechtliche Informationen',
    firmenname: 'PLATZL REISEN GMBH',
    buero_linz_titel: 'BÜRO LINZ',
    buero_linz_adresse: 'Böhmerwaldstrasse 18 · A-4020 Linz',
    buero_linz_email: 'linz(a)platzl-reisen.at',
    buero_st_marien_titel: 'BÜRO ST. MARIEN (FIRMENSITZ)',
    buero_st_marien_adresse: 'Bäckerweg 1 · A-4502 St.Marien',
    buero_st_marien_email: 'info(a)platzl-reisen.at',
    telefon: 'Tel.: +43 (0) 732 / 27 27 17',
    fb_nummer: 'FB-Nr: 31205s',
    fb_gericht: 'FB-Gericht: Landesgericht Linz',
    behoerde_text: 'Behörde gem. ECG: Bezirkshauptmannschaft: Bezirkshauptmannschaft Linz-Land',
    uid: 'UID: ATU22825806',
    geschaeftsfuehrer: 'Geschäftsführer: Harald Platzl',
    konzession: 'Konzession im Fachbereich Reisebüro',
    wirtschaftskammer: 'Mitglied der oö. Wirtschaftskammer (A)',
    webdesign_titel: 'WEBSITE KONZEPTION, WEBDESIGN',
    webdesign_agentur: 'Fredmansky Maureder + Ornetzeder GmbH (Werbeagentur)',
    haftungsausschluss_titel: 'HAFTUNGSAUSSCHLUSS',
    zugang_download: '<h3>Zugang und Download</h3><p>Wir übernehmen keine Haftung für die Zugangsmöglichkeit oder deren Zugangsqualität sowie die Art der Darstellung. Downloaden erfolgt auf eigene Gefahr. Für den Inhalt unserer Webseite haften wir nur bezüglich Vorsatz und grober Fahrlässigkeit sowie begrenzt für den typisch vorhersehbaren Schaden. Für die Inhalte verlinkter Seiten außerhalb unseres Angebots übernehmen wir keine Haftung.</p>',
    copyright: '<h3>Copyright</h3><p>Sämtliche Texte, Bilder, Zeichnungen und andere auf der Internetseite veröffentlichten Werke unterliegen - sofern nicht anders vermerkt - dem Copyright von Platzl-Reisen. Jede Vervielfältigung, Verbreitung, Übermittlung, Sendung und Wieder- bzw. Weitergabe der Inhalte ist ohne unsere schriftliche Genehmigung ausdrücklich untersagt.</p>',
    inhalt_onlineangebotes: '<h3>Inhalt des Onlineangebotes</h3><p>Der Autor übernimmt keinerlei Gewähr für die Aktualität, Korrektheit, Vollständigkeit oder Qualität der bereitgestellten Informationen. Haftungsansprüche gegen den Autor, welche sich auf Schäden materieller oder ideeller Art beziehen, die durch die Nutzung oder Nichtnutzung der dargebotenen Informationen bzw. durch die Nutzung fehlerhafter und unvollständiger Informationen verursacht wurden, sind grundsätzlich ausgeschlossen, sofern seitens des Autors kein nachweislich vorsätzliches oder grob fahrlässiges Verschulden vorliegt.</p>',
    verweise_links: '<h3>Verweise und Links</h3><p>Bei direkten oder indirekten Verweisen auf fremde Internetseiten ("Links"), die außerhalb des Verantwortungsbereiches des Autors liegen, würde eine Haftungsverpflichtung ausschließlich in dem Fall in Kraft treten, in dem der Autor von den Inhalten Kenntnis hat und es ihm technisch möglich und zumutbar wäre, die Nutzung im Falle rechtswidriger Inhalte zu verhindern.</p>',
    urheber_kennzeichenrecht: '<h3>Urheber- und Kennzeichenrecht</h3><p>Der Autor ist bestrebt, in allen Publikationen die Urheberrechte der verwendeten Grafiken, Tondokumente, Videosequenzen und Texte zu beachten, von ihm selbst erstellte Grafiken, Tondokumente, Videosequenzen und Texte zu nutzen oder auf lizenzfreie Grafiken, Tondokumente, Videosequenzen und Texte zurückzugreifen.</p>',
    rechtswirksamkeit: '<h3>Rechtswirksamkeit dieses Haftungsausschlusses</h3><p>Dieser Haftungsausschluss ist als Teil des Internetangebotes zu betrachten, von dem aus auf diese Seite verwiesen wurde. Sofern Teile oder einzelne Formulierungen dieses Textes der geltenden Rechtslage nicht, nicht mehr oder nicht vollständig entsprechen sollten, bleiben die übrigen Teile des Dokumentes in ihrem Inhalt und ihrer Gültigkeit davon unberührt.</p>',
    online_streitbeilegung: '<h3>Online-Streitbeilegung</h3><p>Die Europäische Kommission stellt unter <a href="https://ec.europa.eu/consumers/odr/" target="_blank">ec.europa.eu/consumers/odr/</a> eine Plattform zur Online-Streitbeilegung bereit, die Verbraucher für die Beilegung einer Streitigkeit nutzen können und auf der weitere Informationen zum Thema Streitschlichtung zu finden sind.</p>',
    aussergerichtliche_streitbeilegung: '<h3>Außergerichtliche Streitbeilegung</h3><p>Wir sind weder verpflichtet noch dazu bereit, im Falle einer Streitigkeit mit einem Verbraucher an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>',
    beschwerdestelle_titel: 'Bestehen eines Beschwerderechts bei einer Aufsichtsbehörde',
    beschwerdestelle_name: 'Österreichische Datenschutzbehörde',
    beschwerdestelle_adresse: 'Wickenburggasse 8\n1080 Wien'
  };

  useEffect(() => {
    const fetchImpressumData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('=== LOADING IMPRESSUM DATA ===');
        
        // Impressum Settings laden
        const settingsResponse = await strapiApi.get('/impressum');
        
        console.log('=== IMPRESSUM API RESPONSE ===');
        console.log('Settings Response:', settingsResponse.data);
        
        if (settingsResponse.data?.data) {
          // Transform settings
          const settingsData = settingsResponse.data.data;
          const transformedSettings: ImpressumData = {
            titel: settingsData.titel || mockImpressumData.titel,
            untertitel: settingsData.untertitel || mockImpressumData.untertitel,
            firmenname: settingsData.firmenname || mockImpressumData.firmenname,
            buero_linz_titel: settingsData.buero_linz_titel || mockImpressumData.buero_linz_titel,
            buero_linz_adresse: settingsData.buero_linz_adresse || mockImpressumData.buero_linz_adresse,
            buero_linz_email: settingsData.buero_linz_email || mockImpressumData.buero_linz_email,
            buero_st_marien_titel: settingsData.buero_st_marien_titel || mockImpressumData.buero_st_marien_titel,
            buero_st_marien_adresse: settingsData.buero_st_marien_adresse || mockImpressumData.buero_st_marien_adresse,
            buero_st_marien_email: settingsData.buero_st_marien_email || mockImpressumData.buero_st_marien_email,
            telefon: settingsData.telefon || mockImpressumData.telefon,
            fb_nummer: settingsData.fb_nummer || mockImpressumData.fb_nummer,
            fb_gericht: settingsData.fb_gericht || mockImpressumData.fb_gericht,
            behoerde_text: settingsData.behoerde_text || mockImpressumData.behoerde_text,
            uid: settingsData.uid || mockImpressumData.uid,
            geschaeftsfuehrer: settingsData.geschaeftsfuehrer || mockImpressumData.geschaeftsfuehrer,
            konzession: settingsData.konzession || mockImpressumData.konzession,
            wirtschaftskammer: settingsData.wirtschaftskammer || mockImpressumData.wirtschaftskammer,
            webdesign_titel: settingsData.webdesign_titel || mockImpressumData.webdesign_titel,
            webdesign_agentur: settingsData.webdesign_agentur || mockImpressumData.webdesign_agentur,
            haftungsausschluss_titel: settingsData.haftungsausschluss_titel || mockImpressumData.haftungsausschluss_titel,
            zugang_download: dataTransformers.markdownToHtml(settingsData.zugang_download) || mockImpressumData.zugang_download,
            copyright: dataTransformers.markdownToHtml(settingsData.copyright) || mockImpressumData.copyright,
            inhalt_onlineangebotes: dataTransformers.markdownToHtml(settingsData.inhalt_onlineangebotes) || mockImpressumData.inhalt_onlineangebotes,
            verweise_links: dataTransformers.markdownToHtml(settingsData.verweise_links) || mockImpressumData.verweise_links,
            urheber_kennzeichenrecht: dataTransformers.markdownToHtml(settingsData.urheber_kennzeichenrecht) || mockImpressumData.urheber_kennzeichenrecht,
            rechtswirksamkeit: dataTransformers.markdownToHtml(settingsData.rechtswirksamkeit) || mockImpressumData.rechtswirksamkeit,
            online_streitbeilegung: dataTransformers.markdownToHtml(settingsData.online_streitbeilegung) || mockImpressumData.online_streitbeilegung,
            aussergerichtliche_streitbeilegung: dataTransformers.markdownToHtml(settingsData.aussergerichtliche_streitbeilegung) || mockImpressumData.aussergerichtliche_streitbeilegung,
            beschwerdestelle_titel: settingsData.beschwerdestelle_titel || mockImpressumData.beschwerdestelle_titel,
            beschwerdestelle_name: settingsData.beschwerdestelle_name || mockImpressumData.beschwerdestelle_name,
            beschwerdestelle_adresse: settingsData.beschwerdestelle_adresse || mockImpressumData.beschwerdestelle_adresse,
          };
          
          setImpressumData(transformedSettings);
          setUsingMockData(false);
        } else {
          console.log('No impressum data, using mock data');
          setImpressumData(mockImpressumData);
          setUsingMockData(true);
        }
      } catch (err) {
        console.error('Error fetching impressum data:', err);
        setError(err instanceof Error ? err.message : 'Fehler beim Laden der Impressum-Daten');
        setImpressumData(mockImpressumData);
        setUsingMockData(true);
      } finally {
        setLoading(false);
      }
    };

    fetchImpressumData();
  }, []);

  return { 
    impressumData, 
    loading, 
    error, 
    usingMockData
  };
};
import { useState, useEffect } from 'react';
import { strapiApi } from '../lib/api/strapiClient';
import { dataTransformers } from '../lib/api/dataTransformers';

interface AboutUsData {
  titel: string;
  untertitel: string;
  hero_bild: string;
  oeffnungszeiten_titel: string;
  oeffnungszeiten_text: string;
  montag_donnerstag: string;
  freitag: string;
  betriebsurlaub: string;
  service_titel: string;
  service_punkte: Array<{
    text: string;
    sortierung: number;
  }>;
  reisen_komfort_titel: string;
  reisen_komfort_text: string;
  buero_linz_titel: string;
  buero_linz_text: string;
  buero_linz_adresse: string;
  buero_linz_plz_ort: string;
  buero_linz_telefon: string;
  thermenreisen_titel: string;
  thermenreisen_text: string;
  thermenreisen_link_text: string;
  stadte_kultur_titel: string;
  stadte_kultur_text: string;
  stadte_kultur_link_text: string;
  kreuzfahrten_titel: string;
  kreuzfahrten_text: string;
  kreuzfahrten_auszeichnung: string;
  kreuzfahrten_link_text: string;
  gruppenreisen_titel: string;
  gruppenreisen_text: string;
  gruppenreisen_arten: Array<{
    text: string;
    sortierung: number;
  }>;
  kontakt_link_text: string;
}

export const useAboutUs = () => {
  const [aboutUsData, setAboutUsData] = useState<AboutUsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usingMockData, setUsingMockData] = useState(false);

  // Mock data basierend auf den Bildern
  const mockAboutUsData: AboutUsData = {
    titel: 'PLATZL REISEN',
    untertitel: 'Ihr zuverlässiger Partner für unvergessliche Busreisen',
    hero_bild: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=1200',
    oeffnungszeiten_titel: 'ÖFFNUNGSZEITEN',
    oeffnungszeiten_text: '<p>ZU FOLGENDEN ZEITEN SIND WIR GERNE TELEFONISCH UND PERSÖNLICH FÜR SIE DA:</p>',
    montag_donnerstag: 'MONTAG BIS DONNERSTAG VON 8:30 BIS 14:00 UHR',
    freitag: 'FREITAG (NUR TELEFONISCH) VON 08:30 BIS 12:00 UHR',
    betriebsurlaub: 'BETRIEBSURLAUB: 28.07. – 01.08. 2025 IN LINZ & 11. – 15.08. IN ST. MARIEN',
    service_titel: 'MASSGESCHNEIDERTE BUSREISEN MIT "PLATZL-SERVICE" SEIT 80 JAHREN',
    service_punkte: [
      { text: 'erfahrene Reiseleiter & freundliche Fahrer', sortierung: 0 },
      { text: 'moderne & komfortable Reisebusse', sortierung: 1 },
      { text: 'Ihr Urlaub beginnt schon zu Hause – ohne Auto, Stress und Hektik', sortierung: 2 },
      { text: 'interessante Reiseziele zu den besten Plätzen in ganz Europa', sortierung: 3 },
      { text: 'persönliche Beratung für Ihren Kultur- oder Gesundheitsurlaub', sortierung: 4 },
      { text: 'sehr günstige Kreuzfahrten inkl. Transfer und Platzl-Reisebegleitung', sortierung: 5 },
      { text: 'mehrfach ausgezeichnet bei der internationalen Veranstaltung "Protagonisti del Mare" von Costa Kreuzfahrten', sortierung: 6 }
    ],
    reisen_komfort_titel: 'REISEN MIT KOMFORT',
    reisen_komfort_text: '<p>Wir sind ein regionaler Familienbetrieb, der den persönlichen Kontakt zum Kunden an oberste Stelle setzt. Wir bemühen uns stets Ihren Wünschen nachzukommen, indem wir versuchen, die bestehenden Reiseangebote zu verbessern und bei neuen Reisen beste Hotels für Sie zu wählen. Der freundliche Fahrer, die persönliche Betreuung und der sichere Reisebus mit höchstem Komfort ist für uns ein Muss.</p>',
    buero_linz_titel: 'BÜRO IN LINZ',
    buero_linz_text: '<p>Seit September 2015 steht Ihnen unser Büro in Linz zur Verfügung:</p>',
    buero_linz_adresse: 'Böhmerwaldstraße 18',
    buero_linz_plz_ort: '4020 Linz',
    buero_linz_telefon: 'Telefon: 0732/272717',
    thermenreisen_titel: 'Thermenreisen',
    thermenreisen_text: '<p>Seit 1981 beschäftigt sich unser Unternehmen mit Fahrten zu den Thermen nach Slowenien. Als einer der größten österreichischen Slowenienpartner haben wir das ganze Jahr Zimmerkontingente zur Verfügung.</p>',
    thermenreisen_link_text: 'ZU DEN THERMENREISEN',
    stadte_kultur_titel: 'Städte-, Kultur- und Naturreisen',
    stadte_kultur_text: '<p>In unserem Angebot finden Sie jedoch nicht nur Thermenreisen nach Österreich und Slowenien sondern auch Busreisen sowie Bus-Flugkombinationen mit Destinationen in ganz Mitteleuropa.</p>',
    stadte_kultur_link_text: 'ZU DEN BESICHTIGUNGSREISEN',
    kreuzfahrten_titel: 'Kreuzfahrten',
    kreuzfahrten_text: '<p>In unserem Angebot finden Sie jedoch nicht nur Thermenreisen sondern auch ausgewählte Kreuzfahrten zu traumhaften Destinationen auf der ganzen Welt.</p>',
    kreuzfahrten_auszeichnung: '<p>Costa Kreuzfahrten zeichnet jedes Jahr im Rahmen der internationalen Veranstaltung "Protagonisti del Mare" die besten Reisebüro Partner aus. Wir freuen uns, diese Auszeichnung bereits 3 Mal erhalten zu haben.</p>',
    kreuzfahrten_link_text: 'ZU DEN KREUZFAHRTEN',
    gruppenreisen_titel: 'Gruppenreisen',
    gruppenreisen_text: '<p>In unserem Angebot finden Sie jedoch nicht nur Thermenreisen nach Österreich und Slowenien sondern auch Busreisen sowie Bus-Flugkombinationen mit Destinationen in ganz Mitteleuropa.</p>',
    gruppenreisen_arten: [
      { text: 'Vereinsfahrten', sortierung: 0 },
      { text: 'Betriebsausflüge', sortierung: 1 },
      { text: 'Gesellschaftsreisen', sortierung: 2 },
      { text: 'Schulausflüge', sortierung: 3 },
      { text: 'Familienausflüge', sortierung: 4 },
      { text: 'Sportreisen (Golf, Rad...)', sortierung: 5 },
      { text: 'Eventreisen', sortierung: 6 }
    ],
    kontakt_link_text: 'KONTAKTIEREN SIE UNS'
  };

  useEffect(() => {
    const fetchAboutUsData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('=== LOADING ABOUT US DATA ===');
        
        // About Us Settings laden
        const settingsResponse = await strapiApi.get('/about-us', {
          params: {
            populate: {
              hero_bild: true,
              service_punkte: {
                sort: 'sortierung:asc'
              },
              gruppenreisen_arten: {
                sort: 'sortierung:asc'
              }
            }
          }
        });
        
        console.log('=== ABOUT US API RESPONSE ===');
        console.log('Settings Response:', settingsResponse.data);
        
        if (settingsResponse.data?.data) {
          // Transform settings
          const settingsData = settingsResponse.data.data;
          const transformedSettings: AboutUsData = {
            titel: settingsData.titel || mockAboutUsData.titel,
            untertitel: settingsData.untertitel || mockAboutUsData.untertitel,
            hero_bild: dataTransformers.getMediaUrl(settingsData.hero_bild) || mockAboutUsData.hero_bild,
            oeffnungszeiten_titel: settingsData.oeffnungszeiten_titel || mockAboutUsData.oeffnungszeiten_titel,
            oeffnungszeiten_text: dataTransformers.richTextToHtml(settingsData.oeffnungszeiten_text) || mockAboutUsData.oeffnungszeiten_text,
            montag_donnerstag: settingsData.montag_donnerstag || mockAboutUsData.montag_donnerstag,
            freitag: settingsData.freitag || mockAboutUsData.freitag,
            betriebsurlaub: settingsData.betriebsurlaub || mockAboutUsData.betriebsurlaub,
            service_titel: settingsData.service_titel || mockAboutUsData.service_titel,
            service_punkte: settingsData.service_punkte?.sort((a: any, b: any) => a.sortierung - b.sortierung) || mockAboutUsData.service_punkte,
            reisen_komfort_titel: settingsData.reisen_komfort_titel || mockAboutUsData.reisen_komfort_titel,
            reisen_komfort_text: dataTransformers.richTextToHtml(settingsData.reisen_komfort_text) || mockAboutUsData.reisen_komfort_text,
            buero_linz_titel: settingsData.buero_linz_titel || mockAboutUsData.buero_linz_titel,
            buero_linz_text: dataTransformers.richTextToHtml(settingsData.buero_linz_text) || mockAboutUsData.buero_linz_text,
            buero_linz_adresse: settingsData.buero_linz_adresse || mockAboutUsData.buero_linz_adresse,
            buero_linz_plz_ort: settingsData.buero_linz_plz_ort || mockAboutUsData.buero_linz_plz_ort,
            buero_linz_telefon: settingsData.buero_linz_telefon || mockAboutUsData.buero_linz_telefon,
            thermenreisen_titel: settingsData.thermenreisen_titel || mockAboutUsData.thermenreisen_titel,
            thermenreisen_text: dataTransformers.richTextToHtml(settingsData.thermenreisen_text) || mockAboutUsData.thermenreisen_text,
            thermenreisen_link_text: settingsData.thermenreisen_link_text || mockAboutUsData.thermenreisen_link_text,
            stadte_kultur_titel: settingsData.stadte_kultur_titel || mockAboutUsData.stadte_kultur_titel,
            stadte_kultur_text: dataTransformers.richTextToHtml(settingsData.stadte_kultur_text) || mockAboutUsData.stadte_kultur_text,
            stadte_kultur_link_text: settingsData.stadte_kultur_link_text || mockAboutUsData.stadte_kultur_link_text,
            kreuzfahrten_titel: settingsData.kreuzfahrten_titel || mockAboutUsData.kreuzfahrten_titel,
            kreuzfahrten_text: dataTransformers.richTextToHtml(settingsData.kreuzfahrten_text) || mockAboutUsData.kreuzfahrten_text,
            kreuzfahrten_auszeichnung: dataTransformers.richTextToHtml(settingsData.kreuzfahrten_auszeichnung) || mockAboutUsData.kreuzfahrten_auszeichnung,
            kreuzfahrten_link_text: settingsData.kreuzfahrten_link_text || mockAboutUsData.kreuzfahrten_link_text,
            gruppenreisen_titel: settingsData.gruppenreisen_titel || mockAboutUsData.gruppenreisen_titel,
            gruppenreisen_text: dataTransformers.richTextToHtml(settingsData.gruppenreisen_text) || mockAboutUsData.gruppenreisen_text,
            gruppenreisen_arten: settingsData.gruppenreisen_arten?.sort((a: any, b: any) => a.sortierung - b.sortierung) || mockAboutUsData.gruppenreisen_arten,
            kontakt_link_text: settingsData.kontakt_link_text || mockAboutUsData.kontakt_link_text,
          };
          
          setAboutUsData(transformedSettings);
          setUsingMockData(false);
        } else {
          console.log('No about us data, using mock data');
          setAboutUsData(mockAboutUsData);
          setUsingMockData(true);
        }
      } catch (err) {
        console.error('Error fetching about us data:', err);
        setError(err instanceof Error ? err.message : 'Fehler beim Laden der Über uns-Daten');
        setAboutUsData(mockAboutUsData);
        setUsingMockData(true);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutUsData();
  }, []);

  return { 
    aboutUsData, 
    loading, 
    error, 
    usingMockData
  };
};
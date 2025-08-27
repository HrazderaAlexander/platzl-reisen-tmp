import { useState, useEffect } from 'react';
import { strapiApi } from '../lib/api/strapiClient';
import { dataTransformers } from '../lib/api/dataTransformers';

interface GutscheinArt {
  name: string;
  beschreibung: string;
  preis_von: number;
  preis_bis: number;
  icon: string;
  farbe: string;
  beliebt: boolean;
  sortierung: number;
}

interface GutscheinSettings {
  titel: string;
  untertitel: string;
  hauptbild: string;
  intro_text: string;
  gutschein_arten_titel: string;
  gutschein_arten: GutscheinArt[];
  bestellung_titel: string;
  bestellung_text: string;
  kontakt_titel: string;
  kontakt_text: string;
  telefon: string;
  email: string;
  gueltigkeitsdauer: string;
  mindestbetrag: number;
  hoechstbetrag: number;
}

export const useGutscheine = () => {
  const [gutscheinSettings, setGutscheinSettings] = useState<GutscheinSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usingMockData, setUsingMockData] = useState(false);

  // Mock data basierend auf den Bildern
  const mockGutscheinSettings: GutscheinSettings = {
    titel: 'GUTSCHEINE',
    untertitel: 'Verschenken Sie unvergessliche Reiseerlebnisse',
    hauptbild: 'https://images.pexels.com/photos/264547/pexels-photo-264547.jpeg?auto=compress&cs=tinysrgb&w=1200',
    intro_text: '<p>Bereiten Sie Ihren Liebsten eine besondere Freude mit unseren Reise-Gutscheinen. Ob für Thermenreisen, Besichtigungstouren oder Kreuzfahrten - unsere Gutscheine sind für alle Reisen einlösbar.</p>',
    gutschein_arten_titel: 'Unsere Gutschein-Arten',
    gutschein_arten: [
      {
        name: 'Wertgutschein',
        beschreibung: 'Flexibler Gutschein mit frei wählbarem Betrag für alle unsere Reisen',
        preis_von: 50,
        preis_bis: 1000,
        icon: 'gift',
        farbe: 'pink',
        beliebt: true,
        sortierung: 0
      },
      {
        name: 'Thermenreisen-Gutschein',
        beschreibung: 'Speziell für Wellness und Entspannung in den schönsten Thermen',
        preis_von: 200,
        preis_bis: 800,
        icon: 'heart',
        farbe: 'blue',
        beliebt: false,
        sortierung: 1
      },
      {
        name: 'Besichtigungsreisen-Gutschein',
        beschreibung: 'Für kulturelle Entdeckungen und historische Sehenswürdigkeiten',
        preis_von: 150,
        preis_bis: 600,
        icon: 'star',
        farbe: 'purple',
        beliebt: false,
        sortierung: 2
      },
      {
        name: 'Premium-Gutschein',
        beschreibung: 'Exklusiver Gutschein für besondere Anlässe und Luxusreisen',
        preis_von: 500,
        preis_bis: 2000,
        icon: 'award',
        farbe: 'orange',
        beliebt: false,
        sortierung: 3
      }
    ],
    bestellung_titel: 'Gutschein bestellen',
    bestellung_text: '<p>Bestellen Sie Ihren Gutschein ganz einfach telefonisch oder per E-Mail. Wir erstellen ihn individuell für Sie mit persönlicher Widmung.</p>',
    kontakt_titel: 'So bestellen Sie',
    kontakt_text: '<ul><li><strong>Telefonisch:</strong> Rufen Sie uns an und wir beraten Sie gerne</li><li><strong>Per E-Mail:</strong> Schreiben Sie uns Ihre Wünsche</li><li><strong>Persönlich:</strong> Besuchen Sie uns in unserem Büro</li><li><strong>Individuelle Gestaltung:</strong> Mit persönlicher Widmung möglich</li></ul>',
    telefon: '0732 27 27 17',
    email: 'linz@platzl-reisen.at',
    gueltigkeitsdauer: '3 Jahre ab Ausstellungsdatum',
    mindestbetrag: 50,
    hoechstbetrag: 1000
  };

  useEffect(() => {
    const fetchGutscheinData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('=== LOADING GUTSCHEIN DATA ===');
        
        // Gutschein Settings laden
        const settingsResponse = await strapiApi.get('/gutschein-settings', {
          params: {
            populate: {
              hauptbild: true,
              gutschein_arten: {
                sort: 'beliebt:desc,sortierung:asc'
              }
            }
          }
        });
        
        console.log('=== GUTSCHEIN API RESPONSE ===');
        console.log('Settings Response:', settingsResponse.data);
        
        if (settingsResponse.data?.data) {
          // Transform settings
          const settingsData = settingsResponse.data.data;
          const transformedSettings: GutscheinSettings = {
            titel: settingsData.titel || mockGutscheinSettings.titel,
            untertitel: settingsData.untertitel || mockGutscheinSettings.untertitel,
            hauptbild: dataTransformers.getMediaUrl(settingsData.hauptbild) || mockGutscheinSettings.hauptbild,
            intro_text: dataTransformers.richTextToHtml(settingsData.intro_text) || mockGutscheinSettings.intro_text,
            gutschein_arten_titel: settingsData.gutschein_arten_titel || mockGutscheinSettings.gutschein_arten_titel,
            gutschein_arten: settingsData.gutschein_arten?.sort((a: any, b: any) => {
              if (a.beliebt && !b.beliebt) return -1;
              if (!a.beliebt && b.beliebt) return 1;
              return a.sortierung - b.sortierung;
            }) || mockGutscheinSettings.gutschein_arten,
            bestellung_titel: settingsData.bestellung_titel || mockGutscheinSettings.bestellung_titel,
            bestellung_text: dataTransformers.richTextToHtml(settingsData.bestellung_text) || mockGutscheinSettings.bestellung_text,
            kontakt_titel: settingsData.kontakt_titel || mockGutscheinSettings.kontakt_titel,
            kontakt_text: dataTransformers.markdownToHtml(settingsData.kontakt_text) || mockGutscheinSettings.kontakt_text,
            telefon: settingsData.telefon || mockGutscheinSettings.telefon,
            email: settingsData.email || mockGutscheinSettings.email,
            gueltigkeitsdauer: settingsData.gueltigkeitsdauer || mockGutscheinSettings.gueltigkeitsdauer,
            mindestbetrag: settingsData.mindestbetrag || mockGutscheinSettings.mindestbetrag,
            hoechstbetrag: settingsData.hoechstbetrag || mockGutscheinSettings.hoechstbetrag,
          };
          
          setGutscheinSettings(transformedSettings);
          setUsingMockData(false);
        } else {
          console.log('No gutschein data, using mock data');
          setGutscheinSettings(mockGutscheinSettings);
          setUsingMockData(true);
        }
      } catch (err) {
        console.error('Error fetching gutschein data:', err);
        setError(err instanceof Error ? err.message : 'Fehler beim Laden der Gutschein-Daten');
        setGutscheinSettings(mockGutscheinSettings);
        setUsingMockData(true);
      } finally {
        setLoading(false);
      }
    };

    fetchGutscheinData();
  }, []);

  return { 
    gutscheinSettings, 
    loading, 
    error, 
    usingMockData
  };
};
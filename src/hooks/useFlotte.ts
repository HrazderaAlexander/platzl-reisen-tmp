import { useState, useEffect } from 'react';
import { strapiApi } from '../lib/api/strapiClient';
import { dataTransformers } from '../lib/api/dataTransformers';

interface Fahrzeug {
  id: string;
  name: string;
  marke: string;
  modell: string;
  baujahr: number;
  sitzplaetze: number;
  reiseleiter_sitz: boolean;
  kategorie: 'reisebus' | 'kleinbus' | 'pkw';
  sterne: number;
  hauptbild: string;
  galerie_bilder: string[];
  beschreibung: string;
  ausstattung: Array<{
    name: string;
    icon: string;
    sortierung: number;
  }>;
  technische_daten: Array<{
    bezeichnung: string;
    wert: string;
    sortierung: number;
  }>;
  sortierung: number;
  aktiv: boolean;
  featured: boolean;
}

interface FlottenSettings {
  titel: string;
  untertitel: string;
  hauptbild: string;
  ausstattung_titel: string;
  allgemeine_ausstattung: Array<{
    name: string;
    icon: string;
    sortierung: number;
  }>;
  sicherheit_titel: string;
  sicherheit_text: string;
}

export const useFlotte = () => {
  const [fahrzeuge, setFahrzeuge] = useState<Fahrzeug[]>([]);
  const [flottenSettings, setFlottenSettings] = useState<FlottenSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usingMockData, setUsingMockData] = useState(false);

  // Mock data basierend auf den Bildern
  const mockFahrzeuge: Fahrzeug[] = [
    // SETRA Busse
    {
      id: '1',
      name: 'SETRA S 516 HD',
      marke: 'SETRA',
      modell: 'S 516 HD',
      baujahr: 2025,
      sitzplaetze: 48,
      reiseleiter_sitz: true,
      kategorie: 'reisebus',
      sterne: 4,
      hauptbild: 'https://images.pexels.com/photos/1098365/pexels-photo-1098365.jpeg?auto=compress&cs=tinysrgb&w=800',
      galerie_bilder: [
        'https://images.pexels.com/photos/1098365/pexels-photo-1098365.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1098364/pexels-photo-1098364.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1098363/pexels-photo-1098363.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      beschreibung: 'Modernster 4-Sterne Reisebus mit höchstem Komfort für Mehrtagesreisen.',
      ausstattung: [
        { name: 'Klimaanlage', icon: 'air-conditioning', sortierung: 0 },
        { name: 'Heißgetränkeautomat', icon: 'coffee', sortierung: 1 },
        { name: 'ABS', icon: 'safety', sortierung: 2 },
        { name: 'ASR', icon: 'safety', sortierung: 3 },
        { name: 'Voith Retarder (verschleißfreie Zusatzbremse)', icon: 'safety', sortierung: 4 },
        { name: 'Satellitennavigation', icon: 'navigation', sortierung: 5 },
        { name: 'Video- oder DVD Player', icon: 'tv', sortierung: 6 },
        { name: 'RDS Radio und CD-Player', icon: 'radio', sortierung: 7 },
        { name: 'WC', icon: 'toilet', sortierung: 8 },
        { name: 'Schlafsessel', icon: 'seats', sortierung: 9 }
      ],
      technische_daten: [
        { bezeichnung: 'Baujahr', wert: '2025', sortierung: 0 },
        { bezeichnung: 'Sitzplätze', wert: '48 Sitzplätze, 1 Reiseleitersitz', sortierung: 1 },
        { bezeichnung: 'DVD', wert: 'Ja', sortierung: 2 },
        { bezeichnung: 'Liegesitze', wert: 'Ja', sortierung: 3 },
        { bezeichnung: 'Toilette', wert: 'Ja', sortierung: 4 },
        { bezeichnung: 'Klimaanlage', wert: 'Ja', sortierung: 5 },
        { bezeichnung: 'Kühlschrank', wert: 'Ja', sortierung: 6 },
        { bezeichnung: 'Fernseher', wert: 'Ja', sortierung: 7 },
        { bezeichnung: 'Kaffeemaschine', wert: 'Ja', sortierung: 8 }
      ],
      sortierung: 0,
      aktiv: true,
      featured: true
    },
    // VOLVO Busse
    {
      id: '2',
      name: 'VOLVO 9700',
      marke: 'VOLVO',
      modell: '9700',
      baujahr: 2017,
      sitzplaetze: 44,
      reiseleiter_sitz: true,
      kategorie: 'reisebus',
      sterne: 4,
      hauptbild: 'https://images.pexels.com/photos/1098366/pexels-photo-1098366.jpeg?auto=compress&cs=tinysrgb&w=800',
      galerie_bilder: [
        'https://images.pexels.com/photos/1098366/pexels-photo-1098366.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1098367/pexels-photo-1098367.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      beschreibung: 'Bewährter VOLVO Reisebus mit komfortabler Ausstattung.',
      ausstattung: [
        { name: 'DVD', icon: 'tv', sortierung: 0 },
        { name: 'Ambiente - Lederbestuhlung', icon: 'seats', sortierung: 1 },
        { name: 'Theaterbestuhlung', icon: 'seats', sortierung: 2 },
        { name: 'Liegesitze', icon: 'seats', sortierung: 3 },
        { name: 'Toilette', icon: 'toilet', sortierung: 4 },
        { name: 'Klimaanlage', icon: 'air-conditioning', sortierung: 5 },
        { name: 'Kühlschrank', icon: 'fridge', sortierung: 6 },
        { name: 'Fernseher', icon: 'tv', sortierung: 7 },
        { name: 'Kaffeemaschine', icon: 'coffee', sortierung: 8 }
      ],
      technische_daten: [
        { bezeichnung: 'Baujahr', wert: '2017', sortierung: 0 },
        { bezeichnung: 'Sitzplätze', wert: '44 Sitzplätze mit 83,5 Sitzabstand, 1 Reiseleitersitz + 1 Sitz in der Mitte - letzte Reihe', sortierung: 1 }
      ],
      sortierung: 1,
      aktiv: true,
      featured: false
    },
    // Starliner Busse
    {
      id: '3',
      name: 'Starliner',
      marke: 'Starliner',
      modell: 'Premium',
      baujahr: 2020,
      sitzplaetze: 49,
      reiseleiter_sitz: false,
      kategorie: 'reisebus',
      sterne: 5,
      hauptbild: 'https://images.pexels.com/photos/1098368/pexels-photo-1098368.jpeg?auto=compress&cs=tinysrgb&w=800',
      galerie_bilder: [
        'https://images.pexels.com/photos/1098368/pexels-photo-1098368.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1098369/pexels-photo-1098369.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1098370/pexels-photo-1098370.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1098371/pexels-photo-1098371.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      beschreibung: 'Premium Starliner Bus mit luxuriöser Ausstattung für besondere Reisen.',
      ausstattung: [
        { name: 'Premium Ausstattung', icon: 'seats', sortierung: 0 },
        { name: 'Klimaanlage', icon: 'air-conditioning', sortierung: 1 },
        { name: 'Entertainment System', icon: 'tv', sortierung: 2 },
        { name: 'Komfort-Sitze', icon: 'seats', sortierung: 3 }
      ],
      technische_daten: [
        { bezeichnung: 'Baujahr', wert: '2020', sortierung: 0 },
        { bezeichnung: 'Sitzplätze', wert: '49 Sitzplätze', sortierung: 1 }
      ],
      sortierung: 2,
      aktiv: true,
      featured: true
    }
  ];

  const mockFlottenSettings: FlottenSettings = {
    titel: 'FLOTTE',
    untertitel: 'Unsere Busse werden immer am aktuellen Stand der Sicherheitstechnik und Ausstattung gehalten und laufend gegen die modernsten Modelle ausgetauscht.',
    hauptbild: 'https://images.pexels.com/photos/1098365/pexels-photo-1098365.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ausstattung_titel: 'Ausstattungshighlights',
    allgemeine_ausstattung: [
      { name: 'Klimaanlage', icon: 'air-conditioning', sortierung: 0 },
      { name: 'Heißgetränkeautomat', icon: 'coffee', sortierung: 1 },
      { name: 'ABS', icon: 'safety', sortierung: 2 },
      { name: 'ASR', icon: 'safety', sortierung: 3 },
      { name: 'Voith Retarder (verschleißfreie Zusatzbremse)', icon: 'safety', sortierung: 4 },
      { name: 'Satellitennavigation', icon: 'navigation', sortierung: 5 },
      { name: 'Video- oder DVD Player', icon: 'tv', sortierung: 6 },
      { name: 'RDS Radio und CD-Player', icon: 'radio', sortierung: 7 },
      { name: 'WC', icon: 'toilet', sortierung: 8 },
      { name: 'Schlafsessel', icon: 'seats', sortierung: 9 },
      { name: 'uvm.', icon: 'power', sortierung: 10 }
    ],
    sicherheit_titel: 'Sicherheit & Komfort',
    sicherheit_text: '<p>Alle unsere Fahrzeuge entsprechen den höchsten Sicherheitsstandards und werden regelmäßig gewartet und überprüft.</p>'
  };

  useEffect(() => {
    const fetchFlottenData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('=== LOADING FLOTTEN DATA ===');
        
        // Fahrzeuge laden
        const fahrzeugeResponse = await strapiApi.get('/fahrzeuge', {
          params: {
            populate: {
              hauptbild: true,
              galerie_bilder: {
                populate: '*'
              },
              ausstattung: true,
              technische_daten: true
            },
            filters: {
              aktiv: true
            },
            sort: ['kategorie:asc', 'featured:desc', 'sortierung:asc', 'baujahr:desc']
          }
        });
        
        // Flotten Settings laden
        const settingsResponse = await strapiApi.get('/flotten-settings', {
          params: {
            populate: {
              hauptbild: true,
              allgemeine_ausstattung: true
            }
          }
        });
        
        console.log('=== FLOTTEN API RESPONSES ===');
        console.log('Fahrzeuge Response:', fahrzeugeResponse.data);
        console.log('Settings Response:', settingsResponse.data);
        
        // Debug galerie_bilder
        if (fahrzeugeResponse.data?.data) {
          fahrzeugeResponse.data.data.forEach((fahrzeug: any, index: number) => {
            const fahrzeugData = fahrzeug.attributes || fahrzeug;
            console.log(`Fahrzeug ${index + 1} (${fahrzeugData.name}):`);
            console.log('- Hauptbild:', fahrzeugData.hauptbild);
            console.log('- Galerie Bilder Raw:', fahrzeugData.galerie_bilder);
            console.log('- Galerie Bilder Data:', fahrzeugData.galerie_bilder?.data);
            console.log('- Galerie Bilder Count:', fahrzeugData.galerie_bilder?.data?.length || 0);
            
            // Detaillierte Galerie-Debug-Info
            if (fahrzeugData.galerie_bilder?.data) {
              fahrzeugData.galerie_bilder.data.forEach((img: any, imgIndex: number) => {
                console.log(`  Bild ${imgIndex + 1}:`, img.attributes?.url || img.url);
              });
            }
          });
        }
        
        if (fahrzeugeResponse.data?.data && settingsResponse.data?.data) {
          // Transform fahrzeuge
          const transformedFahrzeuge: Fahrzeug[] = fahrzeugeResponse.data.data.map((fahrzeug: any) => {
            const fahrzeugData = fahrzeug.attributes || fahrzeug;
            return {
              id: fahrzeug.id.toString(),
              name: fahrzeugData.name || '',
              marke: fahrzeugData.marke || '',
              modell: fahrzeugData.modell || '',
              baujahr: fahrzeugData.baujahr || 2020,
              sitzplaetze: fahrzeugData.sitzplaetze || 0,
              reiseleiter_sitz: fahrzeugData.reiseleiter_sitz || false,
              kategorie: fahrzeugData.kategorie || 'reisebus',
              sterne: fahrzeugData.sterne || 4,
              hauptbild: dataTransformers.getMediaUrl(fahrzeugData.hauptbild),
              galerie_bilder: (() => {
                console.log('=== PROCESSING GALERIE BILDER ===');
                console.log('Raw galerie_bilder:', fahrzeugData.galerie_bilder);
                
                if (!fahrzeugData.galerie_bilder) {
                  console.log('No galerie_bilder field');
                  return [];
                }
                
                let images = [];
                if (fahrzeugData.galerie_bilder.data && Array.isArray(fahrzeugData.galerie_bilder.data)) {
                  images = fahrzeugData.galerie_bilder.data;
                } else if (Array.isArray(fahrzeugData.galerie_bilder)) {
                  images = fahrzeugData.galerie_bilder;
                }
                
                console.log('Images array:', images);
                console.log('Images count:', images.length);
                
                const processedUrls = images.map((img: any, index: number) => {
                  const url = dataTransformers.getMediaUrl(img);
                  console.log(`Image ${index + 1} URL:`, url);
                  return url;
                }).filter((url: string) => url && url.length > 0);
                
                console.log('Final processed URLs:', processedUrls);
                console.log('Final count:', processedUrls.length);
                
                return processedUrls;
              })(),
              beschreibung: dataTransformers.richTextToHtml(fahrzeugData.beschreibung) || '',
              ausstattung: fahrzeugData.ausstattung?.sort((a: any, b: any) => a.sortierung - b.sortierung) || [],
              technische_daten: fahrzeugData.technische_daten?.sort((a: any, b: any) => a.sortierung - b.sortierung) || [],
              sortierung: fahrzeugData.sortierung || 0,
              aktiv: fahrzeugData.aktiv !== false,
              featured: fahrzeugData.featured || false,
            };
          });
          
          // Transform settings
          const settingsData = settingsResponse.data.data;
          const transformedSettings: FlottenSettings = {
            titel: settingsData.titel || mockFlottenSettings.titel,
            untertitel: settingsData.untertitel || mockFlottenSettings.untertitel,
            hauptbild: dataTransformers.getMediaUrl(settingsData.hauptbild) || mockFlottenSettings.hauptbild,
            ausstattung_titel: settingsData.ausstattung_titel || mockFlottenSettings.ausstattung_titel,
            allgemeine_ausstattung: settingsData.allgemeine_ausstattung?.sort((a: any, b: any) => a.sortierung - b.sortierung) || mockFlottenSettings.allgemeine_ausstattung,
            sicherheit_titel: settingsData.sicherheit_titel || mockFlottenSettings.sicherheit_titel,
            sicherheit_text: dataTransformers.richTextToHtml(settingsData.sicherheit_text) || mockFlottenSettings.sicherheit_text,
          };
          
          setFahrzeuge(transformedFahrzeuge);
          setFlottenSettings(transformedSettings);
          setUsingMockData(false);
        } else {
          console.log('No flotten data, using mock data');
          setFahrzeuge(mockFahrzeuge);
          setFlottenSettings(mockFlottenSettings);
          setUsingMockData(true);
        }
      } catch (err) {
        console.error('Error fetching flotten data:', err);
        setError(err instanceof Error ? err.message : 'Fehler beim Laden der Flotten-Daten');
        setFahrzeuge(mockFahrzeuge);
        setFlottenSettings(mockFlottenSettings);
        setUsingMockData(true);
      } finally {
        setLoading(false);
      }
    };

    fetchFlottenData();
  }, []);

  // Helper functions
  const getFahrzeugeByCategory = (category: Fahrzeug['kategorie']) => {
    return fahrzeuge.filter(fahrzeug => fahrzeug.kategorie === category);
  };

  const getCategoryTitle = (category: Fahrzeug['kategorie']) => {
    const titles = {
      reisebus: 'REISEBUSSE',
      kleinbus: 'KLEINBUSSE',
      pkw: 'PKW'
    };
    return titles[category];
  };

  const getFeaturedFahrzeuge = () => {
    return fahrzeuge.filter(fahrzeug => fahrzeug.featured);
  };

  return { 
    fahrzeuge, 
    flottenSettings, 
    loading, 
    error, 
    usingMockData,
    getFahrzeugeByCategory,
    getCategoryTitle,
    getFeaturedFahrzeuge
  };
};
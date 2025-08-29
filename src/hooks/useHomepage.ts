import { useState, useEffect } from 'react';
import { homepageService } from '../lib/api/homepageService';

interface HomepageData {
  hero_titel: string;
  hero_untertitel: string;
  hero_bilder: string[];
  diashow_geschwindigkeit: number;
  features_titel: string;
  features: Array<{
    titel: string;
    beschreibung: string;
    icon: string;
    sortierung: number;
  }>;
  cta_therme_text: string;
  cta_sightseeing_text: string;
  telefon: string;
  email: string;
}

export const useHomepage = () => {
  const [homepageData, setHomepageData] = useState<HomepageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usingMockData, setUsingMockData] = useState(false);

  // Mock data fallback
  const mockData: HomepageData = {
    hero_titel: "Platzl Reisen",
    hero_untertitel: "Platz(l) nehmen und wohlfühlen",
    hero_bilder: [
      'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg?auto=compress&cs=tinysrgb&w=1600'
    ],
    diashow_geschwindigkeit: 5000,
    features_titel: "Warum Platzl Reisen wählen?",
    features: [
      {
        titel: "Erfahrene Reiseleitung",
        beschreibung: "Unsere erfahrenen Reiseleiter sorgen für unvergessliche Erlebnisse und stehen Ihnen während der gesamten Reise zur Verfügung.",
        icon: "users",
        sortierung: 0
      },
      {
        titel: "Premium Komfort",
        beschreibung: "Moderne 4* Reisebusse mit höchstem Komfort, klimatisiert und mit bequemen Sitzen für entspannte Fahrten.",
        icon: "star",
        sortierung: 1
      },
      {
        titel: "Flexible Termine",
        beschreibung: "Vielfältige Reisetermine das ganze Jahr über, passend zu Ihren Urlaubsplänen und Bedürfnissen.",
        icon: "calendar",
        sortierung: 2
      }
    ],
    cta_therme_text: "Jetzt buchen",
    cta_sightseeing_text: "Mehr erfahren",
    telefon: "0732 27 27 17",
    email: "linz@platzl-reisen.at"
  };

  useEffect(() => {
    const fetchHomepageData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('=== LOADING HOMEPAGE DATA ===');
        console.log('Strapi URL:', import.meta.env.VITE_STRAPI_URL);
        
        const response = await homepageService.getHomepageData();
        console.log('=== HOMEPAGE RESPONSE ===');
        console.log('Response:', response);
        
        if (response && response.data) {
          // Transform Strapi data
          const data = response.data;
          const transformedData: HomepageData = {
            hero_titel: data.hero_titel || mockData.hero_titel,
            hero_untertitel: data.hero_untertitel || mockData.hero_untertitel,
            hero_bilder: data.hero_bilder?.data?.map((img: any) => {
              const url = img.attributes?.url;
              if (!url) return '';
              return url.startsWith('http') ? url : `${import.meta.env.VITE_STRAPI_URL}${url}`;
            }).filter(url => url) || mockData.hero_bilder,
            diashow_geschwindigkeit: data.diashow_geschwindigkeit || mockData.diashow_geschwindigkeit,
            features_titel: data.features_titel || mockData.features_titel,
            features: data.features?.sort((a: any, b: any) => a.sortierung - b.sortierung) || mockData.features,
            cta_therme_text: data.cta_therme_text || mockData.cta_therme_text,
            cta_sightseeing_text: data.cta_sightseeing_text || mockData.cta_sightseeing_text,
            telefon: data.telefon || mockData.telefon,
            email: data.email || mockData.email,
          };
          
          setHomepageData(transformedData);
          setUsingMockData(false);
        } else if (response && !response.data) {
          console.log('Homepage data is null, using mock data');
          setHomepageData(mockData);
          setUsingMockData(true);
        } else {
          throw new Error('No homepage data received from Strapi');
        }
      } catch (err) {
        console.error('Error fetching homepage data:', err);
        setError(err instanceof Error ? err.message : 'Fehler beim Laden der Homepage-Daten');
        setHomepageData(mockData);
        setUsingMockData(true);
      } finally {
        setLoading(false);
      }
    };

    fetchHomepageData();
  }, []);

  return { homepageData, loading, error, usingMockData };
};
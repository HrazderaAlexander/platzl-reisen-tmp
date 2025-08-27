import { useState, useEffect } from 'react';
import { umweltbeitragService } from '../lib/api/umweltbeitragService';

interface UmweltbeitragData {
  titel: string;
  untertitel: string;
  haupttext: string;
  massnahmen_titel: string;
  massnahmen: Array<{
    text: string;
    sortierung: number;
  }>;
  schlusswort: string;
  zertifikat_bilder: string[];
  info_link_text: string;
  info_link_url: string;
}

export const useUmweltbeitrag = () => {
  const [umweltbeitragData, setUmweltbeitragData] = useState<UmweltbeitragData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usingMockData, setUsingMockData] = useState(false);

  // Mock data fallback basierend auf dem Bild
  const mockData: UmweltbeitragData = {
    titel: "UNSER LEITBILD",
    untertitel: "Nachhaltigkeit und Umweltschutz bei Platzl Reisen",
    haupttext: `
      <p>Wir sind ein regionaler Familienbetrieb sowie ein nachhaltig ausgerichtetes Unternehmen, das die Verantwortung für unsere Umwelt ernst nimmt. Wir bemühen uns in allen Bereichen Verbesserungen zu erreichen um auch künftigen Generationen eine lebenswerte und gesunde Umwelt zu erhalten.</p>
      
      <p>Es ist uns auch wichtig, alle unsere Mitarbeiter, Partner und Kunden aktiv in die von uns gesetzten Maßnahmen einzubeziehen und ihnen die Bedeutung der Nachhaltigkeit näher zu bringen. Mit den Kriterien des Österreichischen Umweltzeichens sollen die größten Umweltbelastungen, die im Laufe der drei Phasen des Lebenszyklus der Dienstleistung (Kauf, Bereitstellung, Entsorgung) entstehen, so gering wie möglich gehalten werden.</p>
      
      <p>Um unsere Umweltleistungen auch nach außen stärker zu kommunizieren, erfüllen (einige) unserer Reiseangebote die Anforderungen des Österreichischen Umweltzeichens.</p>
    `,
    massnahmen_titel: "Maßnahmen:",
    massnahmen: [
      {
        text: "Es wurde eine Fläche von 3ha mit 1.450 Stück schnellwachsenden Blauglockenbäumen gepflanzt",
        sortierung: 0
      },
      {
        text: "Wir schulen unsere Mitarbeiter in ressourcenschonendem und umweltfreundlichem Verhalten und der Erstellung umweltfreundlicher Reisen",
        sortierung: 1
      },
      {
        text: "Wir informieren unsere Kunden über die Möglichkeit Reisen nach den Kriterien des Österreichischen Umweltzeichens zu buchen und motivieren dazu",
        sortierung: 2
      },
      {
        text: "Wir achten auf eine Begrenzung unseres Energieverbrauchs",
        sortierung: 3
      },
      {
        text: "Wir achten auf eine Begrenzung des Wasserverbrauchs",
        sortierung: 4
      },
      {
        text: "Wir achten auf eine Begrenzung der Abfallmenge und die korrekte Trennung der Abfälle",
        sortierung: 5
      },
      {
        text: "Wir bevorzugen Güter und Lebensmittel, die weniger umweltschädlich sind oder Produkte aus der Region oder mit Umweltzeichen",
        sortierung: 6
      },
      {
        text: "Unsere Mitarbeiter versuchen bei ihrem Arbeitsweg einen grünen Fußabdruck zu hinterlassen (öffentliche Verkehrsmittel, Fahrrad, zu Fuß)",
        sortierung: 7
      }
    ],
    schlusswort: `
      <p>Uns ist bewusst, dass die Umsetzung von Nachhaltigkeit ein Prozess ist und es schwer zu definieren ist, wie eine Reise zu 100 % als nachhaltig gestaltet werden kann. Deshalb ist es für uns wichtig, unser Handeln zu hinterfragen und nach neuen Wegen und Strategien zu suchen, um Verbesserungen zu erreichen.</p>
    `,
    zertifikat_bilder: [
      'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    info_link_text: "ALLGEMEINE INFORMATIONEN ZU KLIMASCHONENDEM REISEN >>",
    info_link_url: "https://www.umweltzeichen.at/de/tourismus"
  };

  useEffect(() => {
    const fetchUmweltbeitragData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('=== LOADING UMWELTBEITRAG DATA ===');
        
        const response = await umweltbeitragService.getUmweltbeitragData();
        console.log('=== UMWELTBEITRAG RESPONSE ===');
        console.log('Response:', response);
        
        if (response && response.data) {
          const data = response.data;
          const transformedData: UmweltbeitragData = {
            titel: data.titel || mockData.titel,
            untertitel: data.untertitel || mockData.untertitel,
            haupttext: data.haupttext || mockData.haupttext,
            massnahmen_titel: data.massnahmen_titel || mockData.massnahmen_titel,
            massnahmen: data.massnahmen?.sort((a: any, b: any) => a.sortierung - b.sortierung) || mockData.massnahmen,
            schlusswort: data.schlusswort || mockData.schlusswort,
            zertifikat_bilder: (() => {
              console.log('=== ZERTIFIKAT BILDER DEBUG ===');
              console.log('Raw zertifikat_bilder data:', data.zertifikat_bilder);
              
              if (!data.zertifikat_bilder) {
                console.log('No zertifikat_bilder data, using mock');
                return mockData.zertifikat_bilder;
              }
              
              let images = [];
              if (data.zertifikat_bilder.data && Array.isArray(data.zertifikat_bilder.data)) {
                images = data.zertifikat_bilder.data;
              } else if (Array.isArray(data.zertifikat_bilder)) {
                images = data.zertifikat_bilder;
              }
              
              console.log('Processed images array:', images);
              
              if (images.length === 0) {
                console.log('No images found, using mock');
                return mockData.zertifikat_bilder;
              }
              
              const processedUrls = images.map((img: any) => {
                const imgData = img.attributes || img;
                const url = imgData.url;
                console.log('Processing image URL:', url);
                
                if (!url) return '';
                
                const fullUrl = url.startsWith('http') 
                  ? url 
                  : `${import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337'}${url}`;
                
                console.log('Final image URL:', fullUrl);
                return fullUrl;
              }).filter((url: string) => url && url.length > 0);
              
              console.log('Final processed URLs:', processedUrls);
              
              return processedUrls.length > 0 ? processedUrls : mockData.zertifikat_bilder;
            })(),
            info_link_text: data.info_link_text || mockData.info_link_text,
            info_link_url: data.info_link_url || mockData.info_link_url,
          };
          
          setUmweltbeitragData(transformedData);
          setUsingMockData(false);
        } else {
          console.log('Umweltbeitrag data is null, using mock data');
          setUmweltbeitragData(mockData);
          setUsingMockData(true);
        }
      } catch (err) {
        console.error('Error fetching umweltbeitrag data:', err);
        setError(err instanceof Error ? err.message : 'Fehler beim Laden der Umweltbeitrag-Daten');
        setUmweltbeitragData(mockData);
        setUsingMockData(true);
      } finally {
        setLoading(false);
      }
    };

    fetchUmweltbeitragData();
  }, []);

  return { umweltbeitragData, loading, error, usingMockData };
};
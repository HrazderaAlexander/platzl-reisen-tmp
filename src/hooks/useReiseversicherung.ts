import { useState, useEffect } from 'react';
import { strapiApi } from '../lib/api/strapiClient';
import { dataTransformers } from '../lib/api/dataTransformers';

// --- Interfaces (unverändert) ---
interface Versicherungsart {
  name: string;
  beschreibung: string;
  leistungen: string;
  preis_info: string;
  icon: string;
  farbe: string;
  empfohlen: boolean;
  sortierung: number;
}

interface ReiseversicherungSettings {
  titel: string;
  untertitel: string;
  hauptbild: string;
  intro_text: string;
  versicherungsarten_titel: string;
  versicherungsarten: Versicherungsart[];
  partner_titel: string;
  partner_name: string;
  partner_beschreibung: string;
  partner_logo: string;
  partner_website: string;
  beratung_titel: string;
  beratung_text: string;
  kontakt_titel: string;
  kontakt_text: string;
  telefon: string;
  email: string;
  empfehlung_text: string;
  wichtige_hinweise: string;
}

export const useReiseversicherung = () => {
  const [reiseversicherungSettings, setReiseversicherungSettings] = useState<ReiseversicherungSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usingMockData, setUsingMockData] = useState(false);

  // Mock-Daten mit Markdown
  const mockReiseversicherungSettings: any = {
    titel: 'REISEVERSICHERUNG (Mock-Daten)',
    untertitel: 'Informationen über das Angebot einer Reiseversicherung finden Sie hier:',
    hauptbild: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=1200',
    versicherungsarten: [
      {
        name: 'Reiserücktrittsversicherung (Mock)',
        leistungen: '**Leistungen:**\n- Test-Leistung 1\n- Test-Leistung 2',
      },
    ],
    kontakt_text: '**Telefonisch:** Rufen Sie uns an (Mock-Daten)',
  };

  // Helfer-Funktion für die Text-Umwandlung (unverändert)
  const transformDataToHtml = async (rawData: any): Promise<ReiseversicherungSettings> => {
    const transformedVersicherungsarten = await Promise.all(
      rawData.versicherungsarten?.map(async (item: any) => ({
        ...item,
        leistungen: await dataTransformers.markdownToHtml(item.leistungen),
      })) || []
    );
    const [
      intro_text, partner_beschreibung, beratung_text, kontakt_text, empfehlung_text, wichtige_hinweise
    ] = await Promise.all([
      dataTransformers.markdownToHtml(rawData.intro_text),
      dataTransformers.markdownToHtml(rawData.partner_beschreibung),
      dataTransformers.markdownToHtml(rawData.beratung_text),
      dataTransformers.markdownToHtml(rawData.kontakt_text),
      dataTransformers.markdownToHtml(rawData.empfehlung_text),
      dataTransformers.markdownToHtml(rawData.wichtige_hinweise),
    ]);
    return {
      ...rawData,
      hauptbild: dataTransformers.getMediaUrl(rawData.hauptbild),
      partner_logo: dataTransformers.getMediaUrl(rawData.partner_logo),
      intro_text, partner_beschreibung, beratung_text, kontakt_text, empfehlung_text, wichtige_hinweise,
      versicherungsarten: transformedVersicherungsarten,
    };
  };

  useEffect(() => {
    const fetchReiseversicherungData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await strapiApi.get('/reiseversicherung-settings', {
          params: {
            populate: {
              hauptbild: true,
              partner_logo: true,
              versicherungsarten: {
                sort: 'empfohlen:desc,sortierung:asc'
              }
            }
          }
        });
        
        // Zur Sicherheit: Gibt die Antwort in der Konsole aus, um die Struktur zu sehen
        console.log('Antwort von Strapi API:', response.data);

        // ## KORREKTUR: Wir greifen auf die Daten so zu, wie es in Ihrer Version funktioniert hat ##
        const rawData = response.data?.data;
        
        if (rawData) {
          const transformedSettings = await transformDataToHtml(rawData);
          setReiseversicherungSettings(transformedSettings);
          setUsingMockData(false);
        } else {
          setError('Keine Daten von der API erhalten.');
          const transformedMock = await transformDataToHtml(mockReiseversicherungSettings);
          setReiseversicherungSettings(transformedMock);
          setUsingMockData(true);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Fehler beim Laden der Daten.');
        const transformedMock = await transformDataToHtml(mockReiseversicherungSettings);
        setReiseversicherungSettings(transformedMock);
        setUsingMockData(true);
      } finally {
        setLoading(false);
      }
    };

    fetchReiseversicherungData();
  }, []);

  return { 
    reiseversicherungSettings, 
    loading, 
    error, 
    usingMockData
  };
};
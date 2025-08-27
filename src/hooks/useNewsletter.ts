import { useState, useEffect } from 'react';
import { strapiApi } from '../lib/api/strapiClient';
import { dataTransformers } from '../lib/api/dataTransformers';

interface NewsletterSettings {
  titel: string;
  untertitel: string;
  hauptbild: string;
  intro_text: string;
  vorteile_titel: string;
  vorteile_text: string;
  datenschutz_titel: string;
  datenschutz_text: string;
  abmeldeformular_link_text: string;
  abmeldeformular_link_url: string;
  erfolg_titel: string;
  erfolg_text: string;
}

export const useNewsletter = () => {
  const [newsletterSettings, setNewsletterSettings] = useState<NewsletterSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usingMockData, setUsingMockData] = useState(false);

  // Mock data basierend auf den Bildern
  const mockNewsletterSettings: NewsletterSettings = {
    titel: 'NEWSLETTER',
    untertitel: 'Bleiben Sie über aktuelle Angebote und Reisen informiert',
    hauptbild: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=1200',
    intro_text: '<p>Verpassen Sie keine Angebote und erhalten Sie exklusive Reise-Tipps direkt in Ihr E-Mail-Postfach.</p>',
    vorteile_titel: 'Newsletter-Vorteile',
    vorteile_text: `
      <ul>
        <li>Frühbucher-Rabatte und Sonderangebote</li>
        <li>Neue Reiseziele und Programme</li>
        <li>Saisonale Highlights und Empfehlungen</li>
        <li>Nur 1-2 E-Mails pro Monat - kein Spam</li>
      </ul>
    `,
    datenschutz_titel: 'WICHTIGER HINWEIS ZUM DATENSCHUTZ',
    datenschutz_text: `
      <p>Ich bin damit einverstanden, dass mich die Firma Platzl Reisen GmbH über ausgewählte Themen informieren darf. Meine Daten werden ausschließlich zu diesem Zweck genutzt. Insbesondere erfolgt keine Weitergabe an unberechtigte Dritte. Mir ist bekannt, dass ich meine Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen kann. Dies kann ich über folgende Kanäle tun: online über das Abmeldeformular, elektronisch über einen Abmeldelink im jeweiligen Newsletter, per E-Mail an: info@platzl-reisen.at oder postalisch an: Platzl Reisen GmbH, Böhmerwaldstrasse 18, A-4020 Linz. Es gilt die Datenschutzerklärung von Platzl Reisen GmbH, die auch weitere Informationen über Möglichkeiten zur Berichtigung, Löschung und Sperrung meiner Daten beinhaltet.</p>
    `,
    abmeldeformular_link_text: 'Zum Abmeldeformular',
    abmeldeformular_link_url: '#',
    erfolg_titel: 'Vielen Dank!',
    erfolg_text: 'Ihre Newsletter-Anmeldung war erfolgreich. Sie erhalten in Kürze eine Bestätigungs-E-Mail.'
  };

  useEffect(() => {
    const fetchNewsletterData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('=== LOADING NEWSLETTER DATA ===');
        
        // Newsletter Settings laden
        const settingsResponse = await strapiApi.get('/newsletter-settings', {
          params: {
            populate: {
              hauptbild: true
            }
          }
        });
        
        console.log('=== NEWSLETTER API RESPONSE ===');
        console.log('Settings Response:', settingsResponse.data);
        
        if (settingsResponse.data?.data) {
          // Transform settings
          const settingsData = settingsResponse.data.data;
          const transformedSettings: NewsletterSettings = {
            titel: settingsData.titel || mockNewsletterSettings.titel,
            untertitel: settingsData.untertitel || mockNewsletterSettings.untertitel,
            hauptbild: dataTransformers.getMediaUrl(settingsData.hauptbild) || mockNewsletterSettings.hauptbild,
            intro_text: dataTransformers.richTextToHtml(settingsData.intro_text) || mockNewsletterSettings.intro_text,
            vorteile_titel: settingsData.vorteile_titel || mockNewsletterSettings.vorteile_titel,
            vorteile_text: dataTransformers.richTextToHtml(settingsData.vorteile_text) || mockNewsletterSettings.vorteile_text,
            datenschutz_titel: settingsData.datenschutz_titel || mockNewsletterSettings.datenschutz_titel,
            datenschutz_text: dataTransformers.richTextToHtml(settingsData.datenschutz_text) || mockNewsletterSettings.datenschutz_text,
            abmeldeformular_link_text: settingsData.abmeldeformular_link_text || mockNewsletterSettings.abmeldeformular_link_text,
            abmeldeformular_link_url: settingsData.abmeldeformular_link_url || mockNewsletterSettings.abmeldeformular_link_url,
            erfolg_titel: settingsData.erfolg_titel || mockNewsletterSettings.erfolg_titel,
            erfolg_text: settingsData.erfolg_text || mockNewsletterSettings.erfolg_text,
          };
          
          setNewsletterSettings(transformedSettings);
          setUsingMockData(false);
        } else {
          console.log('No newsletter data, using mock data');
          setNewsletterSettings(mockNewsletterSettings);
          setUsingMockData(true);
        }
      } catch (err) {
        console.error('Error fetching newsletter data:', err);
        setError(err instanceof Error ? err.message : 'Fehler beim Laden der Newsletter-Daten');
        setNewsletterSettings(mockNewsletterSettings);
        setUsingMockData(true);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsletterData();
  }, []);

  return { 
    newsletterSettings, 
    loading, 
    error, 
    usingMockData
  };
};
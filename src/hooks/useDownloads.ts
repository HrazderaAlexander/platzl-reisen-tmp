import { useState, useEffect } from 'react';
import { strapiApi } from '../lib/api/strapiClient';
import { dataTransformers } from '../lib/api/dataTransformers';

interface Download {
  id: string;
  titel: string;
  beschreibung: string;
  kategorie: 'katalog' | 'formular' | 'agb' | 'info' | 'sonstiges';
  jahr: string;
  datei_url: string;
  datei_name: string;
  vorschaubild: string;
  dateityp: 'pdf' | 'doc' | 'docx' | 'xls' | 'xlsx' | 'zip' | 'jpg' | 'png';
  dateigroesse: string;
  seitenzahl: number;
  sortierung: number;
  aktiv: boolean;
  featured: boolean;
  download_zaehler: number;
}

interface DownloadSettings {
  titel: string;
  untertitel: string;
  hauptbild: string;
  info_text: string;
  kontakt_titel: string;
  kontakt_text: string;
}

export const useDownloads = () => {
  const [downloads, setDownloads] = useState<Download[]>([]);
  const [downloadSettings, setDownloadSettings] = useState<DownloadSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usingMockData, setUsingMockData] = useState(false);

  // Mock data basierend auf dem Bild
  const mockDownloads: Download[] = [
    {
      id: '1',
      titel: 'Platzl Katalog 2024 2025.pdf',
      beschreibung: 'Unser aktueller Hauptkatalog mit allen Thermenreisen und Besichtigungsreisen',
      kategorie: 'katalog',
      jahr: '2024/25',
      datei_url: '#',
      datei_name: 'Platzl_Katalog_2024_2025.pdf',
      vorschaubild: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=400',
      dateityp: 'pdf',
      dateigroesse: '4.2 MB',
      seitenzahl: 64,
      sortierung: 0,
      aktiv: true,
      featured: true,
      download_zaehler: 0
    },
    {
      id: '2',
      titel: '2025 Platzl Katalog Web.pdf',
      beschreibung: 'Web-optimierte Version unseres Katalogs 2025',
      kategorie: 'katalog',
      jahr: '2025',
      datei_url: '#',
      datei_name: '2025_Platzl_Katalog_Web.pdf',
      vorschaubild: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=400',
      dateityp: 'pdf',
      dateigroesse: '3.1 MB',
      seitenzahl: 48,
      sortierung: 1,
      aktiv: true,
      featured: false,
      download_zaehler: 0
    }
  ];

  const mockDownloadSettings: DownloadSettings = {
    titel: 'DOWNLOADS',
    untertitel: 'Unsere aktuellen Reisekataloge und Dokumente zum Download',
    hauptbild: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=1200',
    info_text: '<p>Alle unsere Kataloge stehen Ihnen kostenlos als PDF zum Download zur Verfügung. Sie können sie auch als gedruckte Version in unserem Büro abholen oder sich zusenden lassen.</p>',
    kontakt_titel: 'Gedruckte Kataloge gewünscht?',
    kontakt_text: 'Gerne senden wir Ihnen unsere Kataloge auch in gedruckter Form zu oder Sie können sie in unserem Büro abholen.'
  };

  useEffect(() => {
    const fetchDownloadData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('=== LOADING DOWNLOAD DATA ===');
        
        // Downloads laden
        const downloadsResponse = await strapiApi.get('/downloads', {
          params: {
            populate: {
              datei: true,
              vorschaubild: true
            },
            filters: {
              aktiv: true
            },
            sort: ['kategorie:asc', 'featured:desc', 'sortierung:asc', 'jahr:desc']
          }
        });
        
        // Download Settings laden
        const settingsResponse = await strapiApi.get('/download-settings', {
          params: {
            populate: {
              hauptbild: true
            }
          }
        });
        
        console.log('=== DOWNLOAD API RESPONSES ===');
        console.log('Downloads Response:', downloadsResponse.data);
        console.log('Settings Response:', settingsResponse.data);
        
        if (downloadsResponse.data?.data && settingsResponse.data?.data) {
          // Transform downloads
          const transformedDownloads: Download[] = downloadsResponse.data.data.map((download: any) => {
            const downloadData = download.attributes || download;
            return {
              id: download.id.toString(),
              titel: downloadData.titel || '',
              beschreibung: downloadData.beschreibung || '',
              kategorie: downloadData.kategorie || 'katalog',
              jahr: downloadData.jahr || '',
              datei_url: dataTransformers.getMediaUrl(downloadData.datei),
              datei_name: downloadData.datei?.data?.attributes?.name || downloadData.datei?.name || downloadData.titel,
              vorschaubild: dataTransformers.getMediaUrl(downloadData.vorschaubild),
              dateityp: downloadData.dateityp || 'pdf',
              dateigroesse: downloadData.dateigroesse || '',
              seitenzahl: downloadData.seitenzahl || 0,
              sortierung: downloadData.sortierung || 0,
              aktiv: downloadData.aktiv !== false,
              featured: downloadData.featured || false,
              download_zaehler: downloadData.download_zaehler || 0,
            };
          });
          
          // Transform settings
          const settingsData = settingsResponse.data.data;
          const transformedSettings: DownloadSettings = {
            titel: settingsData.titel || mockDownloadSettings.titel,
            untertitel: settingsData.untertitel || mockDownloadSettings.untertitel,
            hauptbild: dataTransformers.getMediaUrl(settingsData.hauptbild) || mockDownloadSettings.hauptbild,
            info_text: dataTransformers.richTextToHtml(settingsData.info_text) || mockDownloadSettings.info_text,
            kontakt_titel: settingsData.kontakt_titel || mockDownloadSettings.kontakt_titel,
            kontakt_text: settingsData.kontakt_text || mockDownloadSettings.kontakt_text,
          };
          
          setDownloads(transformedDownloads);
          setDownloadSettings(transformedSettings);
          setUsingMockData(false);
        } else {
          console.log('No download data, using mock data');
          setDownloads(mockDownloads);
          setDownloadSettings(mockDownloadSettings);
          setUsingMockData(true);
        }
      } catch (err) {
        console.error('Error fetching download data:', err);
        setError(err instanceof Error ? err.message : 'Fehler beim Laden der Download-Daten');
        setDownloads(mockDownloads);
        setDownloadSettings(mockDownloadSettings);
        setUsingMockData(true);
      } finally {
        setLoading(false);
      }
    };

    fetchDownloadData();
  }, []);

  // Helper functions
  const getDownloadsByCategory = (category: Download['kategorie']) => {
    return downloads.filter(download => download.kategorie === category);
  };

  const getCategoryTitle = (category: Download['kategorie']) => {
    const titles = {
      katalog: 'Kataloge',
      formular: 'Formulare',
      agb: 'AGB & Rechtliches',
      info: 'Informationen',
      sonstiges: 'Sonstiges'
    };
    return titles[category];
  };

  const getFeaturedDownloads = () => {
    return downloads.filter(download => download.featured);
  };

  const handleDownload = async (download: Download) => {
    try {
      // Increment download counter
      await strapiApi.post(`/downloads/${download.id}/increment`);
      
      // Trigger download
      if (download.datei_url && download.datei_url !== '#') {
        window.open(download.datei_url, '_blank');
      } else {
        console.log(`Downloading ${download.titel}...`);
        // In real implementation, this would trigger actual file download
      }
    } catch (error) {
      console.error('Download error:', error);
    }
  };

  return { 
    downloads, 
    downloadSettings, 
    loading, 
    error, 
    usingMockData,
    getDownloadsByCategory,
    getCategoryTitle,
    getFeaturedDownloads,
    handleDownload
  };
};
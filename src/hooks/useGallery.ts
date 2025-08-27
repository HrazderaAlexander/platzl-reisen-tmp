import { useState, useEffect } from 'react';
import { strapiApi } from '../lib/api/strapiClient';
import { dataTransformers } from '../lib/api/dataTransformers';
import { GalleryImage, GallerySettings, GalleryFilter } from '../types/gallery';

export const useGallery = (filters?: GalleryFilter) => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [gallerySettings, setGallerySettings] = useState<GallerySettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usingMockData, setUsingMockData] = useState(false);

  // Mock data basierend auf dem Bild
  const mockImages: GalleryImage[] = [
    // November 2021 - Venedig
    {
      id: '1',
      titel: 'Venedig Kanal',
      beschreibung: 'Malerische Kanäle von Venedig',
      bild_url: 'https://images.pexels.com/photos/208701/pexels-photo-208701.jpeg?auto=compress&cs=tinysrgb&w=800',
      ort: 'Venedig',
      reise_datum: 'November 2021',
      favorit: true,
      sortierung: 0,
      aktiv: true,
      created_at: '2021-11-15T10:00:00Z',
      updated_at: '2021-11-15T10:00:00Z'
    },
    {
      id: '2',
      titel: 'Venedig Gondeln',
      beschreibung: 'Traditionelle Gondeln in Venedig',
      bild_url: 'https://images.pexels.com/photos/161901/paris-sunset-france-monument-161901.jpeg?auto=compress&cs=tinysrgb&w=800',
      ort: 'Venedig',
      reise_datum: 'November 2021',
      favorit: false,
      sortierung: 1,
      aktiv: true,
      created_at: '2021-11-15T11:00:00Z',
      updated_at: '2021-11-15T11:00:00Z'
    },
    {
      id: '3',
      titel: 'Burano Häuser',
      beschreibung: 'Bunte Häuser auf der Insel Burano',
      bild_url: 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=800',
      ort: 'Venedig',
      monat: 'November',
      jahr: 2021,
      reise_datum: 'November 2021',
      favorit: true,
      tags: ['burano', 'häuser', 'farben'],
      sortierung: 2,
      aktiv: true,
      created_at: '2021-11-15T12:00:00Z',
      updated_at: '2021-11-15T12:00:00Z'
    },
    // Oktober 2021 - Côte d'Azur
    {
      id: '4',
      titel: 'Côte d\'Azur Küste',
      beschreibung: 'Traumhafte Küste der Côte d\'Azur',
      bild_url: 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=800',
      ort: 'Côte d\'Azur',
      monat: 'Oktober',
      jahr: 2021,
      reise_datum: 'Oktober 2021',
      favorit: false,
      tags: ['frankreich', 'küste', 'meer'],
      sortierung: 0,
      aktiv: true,
      created_at: '2021-10-20T10:00:00Z',
      updated_at: '2021-10-20T10:00:00Z'
    },
    // September 2021 - Korsika & Sardinien
    {
      id: '5',
      titel: 'Korsika Landschaft',
      beschreibung: 'Berglandschaft auf Korsika',
      bild_url: 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=800',
      ort: 'Korsika & Sardinien',
      monat: 'September',
      jahr: 2021,
      reise_datum: 'September 2021',
      favorit: true,
      tags: ['korsika', 'berge', 'natur'],
      sortierung: 0,
      aktiv: true,
      created_at: '2021-09-15T10:00:00Z',
      updated_at: '2021-09-15T10:00:00Z'
    },
    {
      id: '6',
      titel: 'Gardasee Panorama',
      beschreibung: 'Wunderschöner Blick auf den Gardasee',
      bild_url: 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=800',
      ort: 'Gardasee',
      monat: 'September',
      jahr: 2021,
      reise_datum: 'September 2021',
      favorit: false,
      tags: ['gardasee', 'italien', 'see'],
      sortierung: 1,
      aktiv: true,
      created_at: '2021-09-16T10:00:00Z',
      updated_at: '2021-09-16T10:00:00Z'
    },
    // Juli 2021 - Mecklenburg-Vorpommern & Ostsee
    {
      id: '7',
      titel: 'Ostsee Strand',
      beschreibung: 'Traumhafter Ostseestrand',
      bild_url: 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=800',
      ort: 'Mecklenburg-Vorpommern & Ostsee',
      monat: 'Juli',
      jahr: 2021,
      reise_datum: 'Juli 2021',
      favorit: true,
      tags: ['ostsee', 'strand', 'deutschland'],
      sortierung: 0,
      aktiv: true,
      created_at: '2021-07-10T10:00:00Z',
      updated_at: '2021-07-10T10:00:00Z'
    },
    // Oktober 2020 - Portoroz und Piran
    {
      id: '8',
      titel: 'Portoroz Therme',
      beschreibung: 'Wellness in Portoroz',
      bild_url: 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=800',
      ort: 'Portoroz und Piran',
      monat: 'Oktober',
      jahr: 2020,
      reise_datum: 'Oktober 2020',
      favorit: false,
      tags: ['portoroz', 'therme', 'slowenien'],
      sortierung: 0,
      aktiv: true,
      created_at: '2020-10-15T10:00:00Z',
      updated_at: '2020-10-15T10:00:00Z'
    },
    // Juni 2020 - Moravske
    {
      id: '9',
      titel: 'Moravske Toplice',
      beschreibung: 'Thermalquellen in Moravske Toplice',
      bild_url: 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=800',
      ort: 'Moravske - Hotel Ajda',
      monat: 'Juni',
      jahr: 2020,
      reise_datum: 'Juni 2020',
      favorit: true,
      tags: ['moravske', 'therme', 'slowenien'],
      sortierung: 0,
      aktiv: true,
      created_at: '2020-06-20T10:00:00Z',
      updated_at: '2020-06-20T10:00:00Z'
    },
    // Juni 2019 - Andalusien & Spanien
    {
      id: '10',
      titel: 'Andalusien Landschaft',
      beschreibung: 'Malerische Landschaft in Andalusien',
      bild_url: 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=800',
      ort: 'Andalusien & Spanien',
      monat: 'Juni',
      jahr: 2019,
      reise_datum: 'Juni 2019',
      favorit: false,
      tags: ['andalusien', 'spanien', 'kultur'],
      sortierung: 0,
      aktiv: true,
      created_at: '2019-06-15T10:00:00Z',
      updated_at: '2019-06-15T10:00:00Z'
    },
    {
      id: '11',
      titel: 'Oberitalienische Seen',
      beschreibung: 'Wunderschöne Seen in Oberitalien',
      bild_url: 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=800',
      ort: 'Oberitalienische Seen',
      monat: 'Juni',
      jahr: 2019,
      reise_datum: 'Juni 2019',
      favorit: true,
      tags: ['italien', 'seen', 'natur'],
      sortierung: 1,
      aktiv: true,
      created_at: '2019-06-16T10:00:00Z',
      updated_at: '2019-06-16T10:00:00Z'
    },
    // Mai 2019 - Südengland
    {
      id: '12',
      titel: 'Südengland Küste',
      beschreibung: 'Dramatische Küste in Südengland',
      bild_url: 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=800',
      ort: 'Südengland',
      monat: 'Mai',
      jahr: 2019,
      reise_datum: 'Mai 2019',
      favorit: false,
      tags: ['england', 'küste', 'kultur'],
      sortierung: 0,
      aktiv: true,
      created_at: '2019-05-20T10:00:00Z',
      updated_at: '2019-05-20T10:00:00Z'
    },
    {
      id: '13',
      titel: 'London & Paris',
      beschreibung: 'Städtereise nach London und Paris',
      bild_url: 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=800',
      ort: 'London & Paris',
      monat: 'Mai',
      jahr: 2019,
      reise_datum: 'Mai 2019',
      favorit: true,
      tags: ['london', 'paris', 'städte'],
      sortierung: 1,
      aktiv: true,
      created_at: '2019-05-21T10:00:00Z',
      updated_at: '2019-05-21T10:00:00Z'
    }
  ];

  const mockGallerySettings: GallerySettings = {
    titel: 'UNSERE SCHÖNSTEN REISEFOTOS',
    untertitel: 'Lassen Sie sich von den Eindrücken unserer Busreisen zu den schönsten Plätzen in Europa und mit dem Kreuzfahrtschiff weltweit inspirieren!',
    intro_text: 'Sie wollen Ihre schönsten Reisemomente auch mit uns teilen? Wenn Sie Bilder Ihrer Platzl Reisen in dieser Galerie oder in einem unserer Reisekataloge finden möchten, schicken Sie Ihre Bilder bitte mit Angabe des Orts und Zeitraums Ihrer Reise an',
    email_kontakt: 'sigrid(at)platzl-reisen.at',
    hinweis_text: 'Bitte beachten Sie, dass alle erkennbaren Personen mit der Veröffentlichung der Fotos einverstanden sein müssen!',
    archiv_titel: 'Reisefotos Archiv'
  };

  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('=== LOADING GALLERY DATA ===');
        
        // Build filter params
        let filterParams: any = {
          aktiv: true
        };
        
        if (filters?.ort) {
          filterParams.ort = { $containsi: filters.ort };
        }
        if (filters?.searchTerm) {
          filterParams.$or = [
            { titel: { $containsi: filters.searchTerm } },
            { beschreibung: { $containsi: filters.searchTerm } },
            { ort: { $containsi: filters.searchTerm } }
          ];
        }
        
        // Gallery Images laden
        const imagesResponse = await strapiApi.get('/galerie-bilder', {
          params: {
            populate: {
              bild: true
            },
            filters: filterParams,
            sort: ['jahr:desc', 'datum:desc', 'sortierung:asc', 'createdAt:desc']
          }
        });
        
        // Gallery Settings laden
        const settingsResponse = await strapiApi.get('/galerie-konfiguration/get-or-create');
        
        console.log('=== GALLERY API RESPONSES ===');
        console.log('Images Response:', imagesResponse.data);
        console.log('Settings Response:', settingsResponse.data);
        
        if (imagesResponse.data?.data && settingsResponse.data?.data) {
          // Transform images
          const transformedImages: GalleryImage[] = imagesResponse.data.data.map((image: any) => {
            const imageData = image.attributes || image;
            
            // Extract date information from reise_datum for display
            let displayMonth = '';
            let displayYear = new Date().getFullYear();
            
            if (imageData.reise_datum) {
              const date = new Date(imageData.reise_datum);
              const monthNames = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 
                               'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
              displayMonth = monthNames[date.getMonth()];
              displayYear = date.getFullYear();
            }
            
            return {
              id: image.id.toString(),
              titel: imageData.titel || '',
              beschreibung: imageData.beschreibung || '',
              bild_url: dataTransformers.getMediaUrl(imageData.bild),
              ort: imageData.ort || '',
              reise_datum: imageData.reise_datum || '',
              favorit: imageData.favorit || false,
              sortierung: imageData.sortierung || 0,
              aktiv: imageData.aktiv !== false,
              created_at: imageData.createdAt || new Date().toISOString(),
              updated_at: imageData.updatedAt || new Date().toISOString(),
            };
          });
          
          // Transform settings
          const settingsData = settingsResponse.data.data || settingsResponse.data;
          const transformedSettings: GallerySettings = {
            titel: settingsData.titel || mockGallerySettings.titel,
            untertitel: settingsData.untertitel || mockGallerySettings.untertitel,
            intro_text: settingsData.intro_text || mockGallerySettings.intro_text,
            email_kontakt: settingsData.email_kontakt || mockGallerySettings.email_kontakt,
            hinweis_text: settingsData.hinweis_text || mockGallerySettings.hinweis_text,
            archiv_titel: settingsData.archiv_titel || mockGallerySettings.archiv_titel,
          };
          
          setImages(transformedImages);
          setGallerySettings(transformedSettings);
          setUsingMockData(false);
        } else {
          console.log('No gallery data, using mock data');
          setImages(applyFiltersToMockData(mockImages, filters));
          setGallerySettings(mockGallerySettings);
          setUsingMockData(true);
        }
      } catch (err) {
        console.error('Error fetching gallery data:', err);
        console.log('Galerie API nicht verfügbar, verwende Mock-Daten');
        setError('Galerie API nicht verfügbar - verwende Demo-Daten');
        setImages(applyFiltersToMockData(mockImages, filters));
        setGallerySettings(mockGallerySettings);
        setUsingMockData(true);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryData();
  }, [filters?.monat, filters?.jahr, filters?.ort, filters?.searchTerm]);

  // Apply filters to mock data
  const applyFiltersToMockData = (images: GalleryImage[], filters?: GalleryFilter) => {
    if (!filters) return images;
    
    return images.filter(image => {
      if (filters.ort && !image.ort.toLowerCase().includes(filters.ort.toLowerCase())) return false;
      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase();
        return (
          image.titel.toLowerCase().includes(searchLower) ||
          image.beschreibung?.toLowerCase().includes(searchLower) ||
          image.ort.toLowerCase().includes(searchLower)
        );
      }
      return true;
    });
  };

  // Helper functions
  const getFeaturedImages = () => {
    return images.filter(image => image.favorit);
  };

  const getUniqueMonths = () => {
    const months = [...new Set(images.map(img => {
      if (img.reise_datum) {
        const date = new Date(img.reise_datum);
        const monthNames = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 
                           'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
        return monthNames[date.getMonth()];
      }
      return '';
    }).filter(month => month))];
    return months.sort();
  };

  const getUniqueYears = () => {
    const years = [...new Set(images.map(img => {
      if (img.reise_datum) {
        return new Date(img.reise_datum).getFullYear();
      }
      return new Date().getFullYear();
    }))];
    return years.sort((a, b) => b - a); // Newest first
  };

  const getUniqueLocations = () => {
    const locations = [...new Set(images.map(img => img.ort))];
    return locations.sort();
  };

  const getImagesByReiseDatum = () => {
    const grouped = images.reduce((acc, image) => {
      // Create display key from reise_datum
      let key = image.reise_datum;
      if (image.reise_datum) {
        const date = new Date(image.reise_datum);
        const monthNames = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 
                           'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
        const month = monthNames[date.getMonth()];
        const year = date.getFullYear();
        key = `${month} ${year}`;
      }
      
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(image);
      return acc;
    }, {} as Record<string, GalleryImage[]>);
    
    // Sort by date
    const sortedKeys = Object.keys(grouped).sort((a, b) => {
      // Find the first image in each group to get the actual date for sorting
      const imageA = grouped[a][0];
      const imageB = grouped[b][0];
      
      if (imageA.reise_datum && imageB.reise_datum) {
        return new Date(imageB.reise_datum).getTime() - new Date(imageA.reise_datum).getTime();
      }
      
      return b.localeCompare(a);
    });
    
    return sortedKeys.map(key => ({
      reise_datum: key,
      images: grouped[key].sort((a, b) => a.sortierung - b.sortierung)
    }));
  };

  return { 
    images, 
    gallerySettings, 
    loading, 
    error, 
    usingMockData,
    getFeaturedImages,
    getUniqueMonths,
    getUniqueYears,
    getUniqueLocations,
    getImagesByReiseDatum
  };
};
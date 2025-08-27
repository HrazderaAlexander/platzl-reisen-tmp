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
      monat: 'November',
      jahr: 2021,
      reise_datum: 'November 2021',
      favorit: true,
      tags: ['venedig', 'kanal', 'gondel'],
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
      monat: 'November',
      jahr: 2021,
      reise_datum: 'November 2021',
      favorit: false,
      tags: ['venedig', 'gondel', 'transport'],
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
        
        if (filters?.monat) {
          // Filter by month extracted from reise_datum
          const monthNumber = getMonthNumber(filters.monat);
          filterParams.reise_datum = {
            $contains: `-${monthNumber}-`
          };
        }
        
        if (filters?.jahr) {
          // Combine with existing filters using $and
          if (filterParams.reise_datum) {
            filterParams.$and = [
              { reise_datum: filterParams.reise_datum },
              { reise_datum: { $contains: filters.jahr.toString() } }
            ];
            delete filterParams.reise_datum;
          } else {
            filterParams.reise_datum = {
              $contains: filters.jahr.toString()
            };
          }
        }
        
        if (filters?.ort) {
          filterParams.ort = { $containsi: filters.ort };
        }
        
        if (filters?.searchTerm) {
          const searchFilter = [
            { titel: { $containsi: filters.searchTerm } },
            { beschreibung: { $containsi: filters.searchTerm } },
            { ort: { $containsi: filters.searchTerm } },
            { tags: { $containsi: filters.searchTerm } }
          ];
          
          if (filterParams.$and) {
            filterParams.$and.push({ $or: searchFilter });
          } else {
            filterParams.$or = searchFilter;
          }
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
        
        // Gallery Settings laden (unchanged)
        const settingsResponse = await strapiApi.get('/galerie-konfiguration/get-or-create');
        
        console.log('=== GALLERY API RESPONSES ===');
        console.log('Images Response:', imagesResponse.data);
        console.log('Settings Response:', settingsResponse.data);
        
        if (imagesResponse.data?.data && settingsResponse.data?.data) {
          // Transform images
          const transformedImages: GalleryImage[] = imagesResponse.data.data.map((image: any) => {
            const imageData = image.attributes || image;
            
            // Extract date information from reise_datum
            let monat = '';
            let jahr = new Date().getFullYear();
            
            if (imageData.reise_datum) {
              const date = new Date(imageData.reise_datum);
              const monthNames = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 
                               'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
              monat = monthNames[date.getMonth()];
              jahr = date.getFullYear();
            }
            
            // Override with manual fields if provided
            if (imageData.monat) monat = imageData.monat;
            if (imageData.jahr) jahr = imageData.jahr;
            
            return {
              id: image.id.toString(),
              titel: imageData.titel || '',
              beschreibung: imageData.beschreibung || '',
              bild_url: dataTransformers.getMediaUrl(imageData.bild),
              ort: imageData.ort || '',
              monat: monat,
              jahr: jahr,
              reise_datum: imageData.reise_datum || '',
              favorit: imageData.favorit || false,
              tags: imageData.tags || [],
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

  // Helper function to convert German month names to numbers
  const getMonthNumber = (monthName: string): string => {
    const monthMap: { [key: string]: string } = {
      'Januar': '01',
      'Februar': '02',
      'März': '03',
      'April': '04',
      'Mai': '05',
      'Juni': '06',
      'Juli': '07',
      'August': '08',
      'September': '09',
      'Oktober': '10',
      'November': '11',
      'Dezember': '12'
    };
    return monthMap[monthName] || monthName;
  };

  // Apply filters to mock data
  const applyFiltersToMockData = (images: GalleryImage[], filters?: GalleryFilter) => {
    if (!filters) return images;
    
    return images.filter(image => {
      // Filter by month - only check extracted from reise_datum
      if (filters.monat) {
        const monthMatches = image.monat === filters.monat;
        if (!monthMatches) return false;
      }
      
      // Filter by year - only check extracted from reise_datum
      if (filters.jahr) {
        const yearMatches = image.jahr === filters.jahr;
        if (!yearMatches) return false;
      }
      
      if (filters.ort && !image.ort.toLowerCase().includes(filters.ort.toLowerCase())) return false;
      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase();
        return (
          image.titel.toLowerCase().includes(searchLower) ||
          image.beschreibung?.toLowerCase().includes(searchLower) ||
          image.ort.toLowerCase().includes(searchLower) ||
          image.tags.some(tag => tag.toLowerCase().includes(searchLower))
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
    const months = [...new Set(images.map(img => img.monat).filter(month => month && month !== 'Unbekannt'))];
    return months.sort();
  };

  const getUniqueYears = () => {
    const years = [...new Set(images.map(img => img.jahr).filter(year => year && year > 2000))];
    return years.sort((a, b) => b - a); // Newest first
  };

  const getUniqueLocations = () => {
    const locations = [...new Set(images.map(img => img.ort))];
    return locations.sort();
  };

  const getImagesByReiseDatum = () => {
    const grouped = images.reduce((acc, image) => {
      // Create display format: "Ort Monat Jahr"
      let displayFormat = '';
          // Extract date information from reise_datum only
          let monat = 'Unbekannt';
          let jahr = new Date().getFullYear();
        try {
          const date = new Date(image.reise_datum);
          if (!isNaN(date.getTime())) {
            const monthNames = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 
                             'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
            monat = monthNames[date.getMonth()];
            jahr = date.getFullYear();
            displayFormat = `${image.ort} ${monat} ${jahr}`;
          } else {
            displayFormat = image.reise_datum;
          }
        } catch (e) {
          displayFormat = image.reise_datum;
        }
      if (image.reise_datum && image.reise_datum.includes(' ')) {
        // Already formatted
        displayFormat = image.reise_datum;
      } else {
        // Fallback: construct from individual fields
        displayFormat = `${image.ort} ${image.monat} ${image.jahr}`;
      }
      
      const key = displayFormat;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(image);
      return acc;
    }, {} as Record<string, GalleryImage[]>);
    
    // Sort by year and month
    const sortedKeys = Object.keys(grouped).sort((a, b) => {
      // Extract year from "Ort Monat Jahr" format or date
      let yearA = 0, yearB = 0;
      
      // Try to extract year from end of string
      const yearMatchA = a.match(/(\d{4})$/);
      const yearMatchB = b.match(/(\d{4})$/);
      
      if (yearMatchA) yearA = parseInt(yearMatchA[1]);
      if (yearMatchB) yearB = parseInt(yearMatchB[1]);
      
      if (yearA !== yearB) {
        return yearB - yearA; // Newest year first
      }
      
      // Extract month from "Ort Monat Jahr" format
      const monthOrder = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 
                         'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
      
      let monthIndexA = -1, monthIndexB = -1;
      
      for (let i = 0; i < monthOrder.length; i++) {
        if (a.includes(monthOrder[i])) monthIndexA = i;
        if (b.includes(monthOrder[i])) monthIndexB = i;
      }
      
      return monthIndexB - monthIndexA; // Newest month first
    });
    
    return sortedKeys.map(key => ({
      reise_datum: key,
      images: grouped[key].sort((a, b) => a.sortierung - b.sortierung)
    }));
  };

  // Helper functions for date extraction
  const extractMonthFromDate = (dateString: string): string | null => {
    if (!dateString) return null;
    
    // If it's an ISO date (2025-08-10)
    if (dateString.match(/^\d{4}-\d{2}-\d{2}/)) {
      const date = new Date(dateString);
      if (!isNaN(date.getTime())) {
        const monthNames = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 
                           'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
        return monthNames[date.getMonth()];
      }
    }
    
    // If it's already formatted (e.g., "Venedig November 2021")
    const monthNames = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 
                       'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
    for (const month of monthNames) {
      if (dateString.includes(month)) {
        return month;
      }
    }
    
    return null;
  };

  const extractYearFromDate = (dateString: string): number | null => {
    if (!dateString) return null;
    
    // If it's an ISO date (2025-08-10)
    if (dateString.match(/^\d{4}-\d{2}-\d{2}/)) {
      const date = new Date(dateString);
      if (!isNaN(date.getTime())) {
        return date.getFullYear();
      }
    }
    
    // Extract 4-digit year from formatted string
    const yearMatch = dateString.match(/\b(\d{4})\b/);
    return yearMatch ? parseInt(yearMatch[1]) : null;
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
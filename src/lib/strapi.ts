import { tripService } from './api/tripService';
import { entityExtractors } from './api/entityExtractors';
import { dataTransformers } from './api/dataTransformers';
import { Trip, SightseeingTrip } from '../types';

export const strapiService = {
  // Main service methods
  async getTrips(category?: 'therme' | 'sightseeing') {
    if (category === 'sightseeing') {
      const response = await tripService.getSightseeingTrips();
      return response;
    } else {
      // Verwende Trip API nur für Thermenreisen
      const response = await tripService.getTrips('therme');
      return response;
    }
  },

  async getTrip(id: string, preferredCategory?: 'therme' | 'sightseeing') {
    console.log('=== STRAPI SERVICE: getTrip ===');
    console.log('Trip ID:', id);
    console.log('Preferred category:', preferredCategory);
    
    // Extract original ID from prefixed ID
    let originalId = id;
    let detectedCategory = preferredCategory;
    
    if (id.startsWith('therme_')) {
      originalId = id.replace('therme_', '');
      detectedCategory = 'therme';
      console.log('Detected therme trip, original ID:', originalId);
    } else if (id.startsWith('sightseeing_')) {
      originalId = id.replace('sightseeing_', '');
      detectedCategory = 'sightseeing';
      console.log('Detected sightseeing trip, original ID:', originalId);
    }
    
    // Einfache Logik: Kategorie bestimmt API
    if (detectedCategory === 'sightseeing') {
      console.log('=== LOADING SIGHTSEEING TRIP ===');
      try {
        const response = await tripService.getSightseeingTripById(originalId);
        console.log('Found sightseeing trip:', response.data?.attributes?.titel || response.data?.titel);
        return response;
      } catch (error) {
        console.error('Sightseeing trip not found:', error?.message);
        throw new Error(`Sightseeing trip with ID ${originalId} not found`);
      }
    } else {
      console.log('=== LOADING THERME TRIP ===');
      try {
        const response = await tripService.getTripById(originalId);
        console.log('Found therme trip:', response.data?.attributes?.titel || response.data?.titel);
        return response;
      } catch (error) {
        console.error('Therme trip not found:', error?.message);
        throw new Error(`Therme trip with ID ${originalId} not found`);
      }
    }
  },

  // Transform Strapi data to our format
  transformTrip(strapiTrip: any): Trip | null {
    if (!strapiTrip) return null;
    
    const data = strapiTrip.attributes || strapiTrip;
    
    // Check if this is a sightseeing trip (has specific sightseeing fields)
    if (data.lange_beschreibung && data.reiseleitung !== undefined) {
      const sightseeingTrip = this.transformSightseeingTrip(strapiTrip);
      if (sightseeingTrip) {
        // Add unique ID prefix for sightseeing trips
        sightseeingTrip.id = `sightseeing_${strapiTrip.id}`;
      }
      return sightseeingTrip;
    }
    
    // Transform therme trip
    const tripData = strapiTrip.attributes || strapiTrip;
    
    if (!tripData.titel) {
      return null;
    }
    
    console.log('=== TRANSFORMING THERME TRIP ===');
    console.log('Therme trip titel:', tripData.titel);
    console.log('Therme trip ID:', strapiTrip.id);
    
    // Extract entities with debug info
    const extractedHotels = entityExtractors.extractHotels(tripData.hotels);
    const extractedThermen = entityExtractors.extractThermen(tripData.thermen);
    
    const transformedTrip: Trip = {
      id: `therme_${strapiTrip.id}`, // Add unique prefix for therme trips
      title: tripData.titel,
      subtitle: tripData.untertitel || '',
      short_description: tripData.kurzbeschreibung || '',
      full_description: dataTransformers.richTextToHtml(tripData.vollstaendige_beschreibung) || '',
      price_included: dataTransformers.richTextToHtml(tripData.im_preis_enthalten) || '',
      additional_info: dataTransformers.richTextToHtml(tripData.zusaetzliche_infos) || '',
      category: tripData.kategorie || 'therme',
      featured_date: tripData.haupttermin || '',
      base_price: tripData.grundpreis || 0,
      hotels: extractedHotels,
      dates: entityExtractors.extractDates(tripData.termine),
      gallery_images: entityExtractors.extractGalleryImages(tripData.galerie_bilder),
      thermen: extractedThermen,
      price_entries: entityExtractors.extractPriceEntries(tripData.preiseintraege),
      created_at: tripData.createdAt || new Date().toISOString(),
      updated_at: tripData.updatedAt || new Date().toISOString(),
    };
    
    console.log('Transformed therme trip title:', transformedTrip.title);
    console.log('Transformed therme trip category:', transformedTrip.category);
    console.log('Transformed therme trip ID:', transformedTrip.id);
    
    return transformedTrip;
  },

  // Transform Sightseeing Trip to Trip format
  transformSightseeingTrip(strapiSightseeingTrip: any): Trip | null {
    if (!strapiSightseeingTrip) return null;
    
    const data = strapiSightseeingTrip.attributes || strapiSightseeingTrip;
    
    if (!data.titel) {
      return null;
    }
    
    console.log('=== TRANSFORMING SIGHTSEEING TRIP ===');
    console.log('Sightseeing trip titel:', data.titel);
    console.log('Sightseeing trip ID:', strapiSightseeingTrip.id);
    
    // Transform sightseeing dates to regular dates format
    const sightseeingDates = data.termine?.data || data.termine || [];
    console.log('Sightseeing dates found:', sightseeingDates.length);
    
    const transformedDates = sightseeingDates.map((date: any) => {
      const dateData = date.attributes || date;
      return {
        id: date.id?.toString() || '',
        trip_id: strapiSightseeingTrip.id.toString(),
        date: dateData.datum_text || '',
        price: dateData.preis || 0,
        available: dateData.verfuegbar !== false,
        sort_order: dateData.sortierung || 0,
        created_at: dateData.createdAt || new Date().toISOString(),
      };
    });
    
    // Transform reiseleiter
    let reiseleiter = null;
    if (data.reiseleitung?.data || data.reiseleitung) {
      const reiseleiterData = data.reiseleitung.data?.attributes || data.reiseleitung.attributes || data.reiseleitung;
      console.log('Reiseleiter found:', reiseleiterData.vorname, reiseleiterData.nachname);
      reiseleiter = {
        id: (data.reiseleitung.data?.id || data.reiseleitung.id || '').toString(),
        name: `${reiseleiterData.titel || ''} ${reiseleiterData.vorname || ''} ${reiseleiterData.nachname || ''}`.trim(),
        photo: dataTransformers.getMediaUrl(reiseleiterData.foto),
        description: reiseleiterData.beschreibung || '',
      };
    }
    
    const transformedTrip: Trip = {
      id: `sightseeing_${strapiSightseeingTrip.id}`, // Add unique prefix
      title: data.titel,
      subtitle: data.untertitel || '',
      short_description: data.kurzbeschreibung || '',
      full_description: dataTransformers.richTextToHtml(data.lange_beschreibung) || '',
      price_included: dataTransformers.richTextToHtml(data.im_preis_enthalten) || '',
      additional_info: dataTransformers.richTextToHtml(data.zusaetzliche_infos) || '',
      category: 'sightseeing' as const,
      featured_date: transformedDates[0]?.date || '',
      base_price: data.grundpreis || 0,
      hotels: [], // Besichtigungsreisen haben keine Hotels
      dates: transformedDates,
      gallery_images: entityExtractors.extractGalleryImages(data.galerie_bilder),
      thermen: [], // Besichtigungsreisen haben keine Thermen
      price_entries: [], // Besichtigungsreisen verwenden einfache Termine
      reiseleiter: reiseleiter, // Zusätzliches Feld für Besichtigungsreisen
      created_at: data.createdAt || new Date().toISOString(),
      updated_at: data.updatedAt || new Date().toISOString(),
    };
    
    console.log('Transformed sightseeing trip title:', transformedTrip.title);
    console.log('Transformed sightseeing trip category:', transformedTrip.category);
    console.log('Transformed sightseeing trip ID:', transformedTrip.id);
    
    return transformedTrip;
  },

  // Re-export utilities
  getMediaUrl: dataTransformers.getMediaUrl,
  richTextToHtml: dataTransformers.richTextToHtml,
  richTextToPlain: dataTransformers.richTextToPlain,
  markdownToHtml: dataTransformers.markdownToHtml,
};
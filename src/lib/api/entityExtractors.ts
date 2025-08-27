import { dataTransformers } from './dataTransformers';
import { Hotel, Therme, TripDate, PriceEntry, HotelPrice } from '../../types';

export const entityExtractors = {
  // Extract hotels
  extractHotels(hotelsData: any): Hotel[] {
    console.log('=== EXTRACT HOTELS DEBUG ===');
    console.log('Hotels data input:', hotelsData);
    
    if (!hotelsData) return [];
    
    const hotels = hotelsData.data || hotelsData;
    
    if (!Array.isArray(hotels)) return [];
    
    return hotels.map((hotel: any) => {
      const hotelData = hotel.attributes || hotel;
      
      console.log('Processing hotel:', hotelData.name);
      console.log('Hotel icons data:', hotelData.icons);
      
      // Extract hotel icons
      let facilityIcons: string[] = [];
      if (hotelData.icons) {
        const icons = hotelData.icons.data || hotelData.icons;
        console.log('Icons array:', icons);
        if (Array.isArray(icons)) {
          facilityIcons = icons.map((icon: any) => {
            const iconData = icon.attributes || icon;
            console.log('Icon data:', iconData);
            return iconData.icon_key || iconData.name || '';
          }).filter(key => key.length > 0);
        }
      }
      
      console.log('Final facility icons:', facilityIcons);
      
      return {
        id: hotel.id.toString(),
        trip_id: '',
        name: hotelData.name || '',
        stars: hotelData.sterne || 3,
        price: hotelData.preis || 0,
        image_url: dataTransformers.getMediaUrl(hotelData.bild),
        description: dataTransformers.richTextToPlain(hotelData.beschreibung) || '',
        facilities: dataTransformers.richTextToHtml(hotelData.ausstattung) || '',
        location: hotelData.lage || '',
        facility_icons: facilityIcons,
        sort_order: hotelData.sortierung || 0,
        created_at: hotelData.createdAt || new Date().toISOString(),
      };
    }).sort((a: any, b: any) => a.sort_order - b.sort_order);
  },

  // Extract thermen
  extractThermen(thermenData: any): Therme[] {
    console.log('=== EXTRACT THERMEN DEBUG ===');
    console.log('Thermen data input:', thermenData);
    console.log('Thermen data type:', typeof thermenData);
    
    if (!thermenData) return [];
    
    let thermen = null;
    
    if (Array.isArray(thermenData)) {
      thermen = thermenData;
    } else if (thermenData.data && Array.isArray(thermenData.data)) {
      thermen = thermenData.data;
    } else if (thermenData.data) {
      thermen = [thermenData.data];
    } else {
      thermen = thermenData;
    }
    
    console.log('Processed thermen array:', thermen);
    
    if (!Array.isArray(thermen)) return [];
    
    return thermen.map((therme: any) => {
      const thermeData = therme.attributes || therme;
      
      console.log('Processing therme:', thermeData.name || thermeData.titel);
      console.log('Therme data:', thermeData);
      
      return {
        id: therme.id,
        name: thermeData.name || '',
        titel: thermeData.titel || '',
        beschreibung: dataTransformers.markdownToHtml(thermeData.beschreibung || thermeData.description) || '',
        sort_order: thermeData.sortierung || thermeData.sort_order || 0,
        active: thermeData.aktiv !== false && thermeData.active !== false,
        created_at: therme.createdAt || therme.created_at || new Date().toISOString(),
      };
    }).sort((a: any, b: any) => (a.sort_order || 0) - (b.sort_order || 0));
  },

  // Extract gallery images
  extractGalleryImages(galleryData: any): string[] {
    if (!galleryData) return [];
    
    let images = [];
    
    if (galleryData.data && Array.isArray(galleryData.data)) {
      images = galleryData.data;
    } else if (Array.isArray(galleryData)) {
      images = galleryData;
    } else if (galleryData.data && !Array.isArray(galleryData.data)) {
      images = [galleryData.data];
    } else if (galleryData.attributes || galleryData.url) {
      images = [galleryData];
    }
    
    if (!Array.isArray(images) || images.length === 0) return [];
    
    return images.map((image: any) => {
      return dataTransformers.getMediaUrl(image);
    }).filter(url => url && url.length > 0);
  },

  // Extract dates
  extractDates(datesData: any): TripDate[] {
    if (!datesData) return [];
    
    let dates = null;
    
    if (datesData.data) {
      dates = datesData.data;
    } else if (Array.isArray(datesData)) {
      dates = datesData;
    } else if (datesData.attributes) {
      dates = datesData.attributes;
    } else {
      dates = datesData;
    }
    
    if (!Array.isArray(dates)) return [];
    
    return dates.map((date: any) => {
      const dateData = date.attributes || date;
      
      return {
        id: date.id,
        trip_id: '',
        date: dateData.datum || dateData.date || '',
        price: dateData.preis || dateData.price || 0,
        available: dateData.verfuegbar !== false && dateData.available !== false,
        sort_order: dateData.sortierung || dateData.sort_order || 0,
        created_at: dateData.createdAt || new Date().toISOString(),
      };
    }).sort((a: any, b: any) => (a.sort_order || 0) - (b.sort_order || 0));
  },

  // Extract price entries - THE MAIN PROBLEM
  extractPriceEntries(priceEntriesData: any): PriceEntry[] {
    if (!priceEntriesData) {
      return [];
    }
    
    let entries = null;
    
    if (Array.isArray(priceEntriesData)) {
      entries = priceEntriesData;
    }
    else if (priceEntriesData.data && Array.isArray(priceEntriesData.data)) {
      entries = priceEntriesData.data;
    }
    else if (priceEntriesData.data && !Array.isArray(priceEntriesData.data)) {
      entries = [priceEntriesData.data];
    }
    else if (priceEntriesData.id) {
      entries = [priceEntriesData];
    }
    
    if (!entries || !Array.isArray(entries) || entries.length === 0) {
      return [];
    }
    
    const processedEntries = entries.filter(entry => entry && entry.id).map((entry: any, index: number) => {
      const entryData = entry.attributes || entry;
      
      const hotelPrices = this.extractHotelPrices(entryData.hotel_preise || entry.hotel_preise);
      
      const processedEntry = {
        id: entry.id?.toString() || index.toString(),
        datum: entryData.datum || '',
        startdatum: entryData.startdatum || '',
        enddatum: entryData.enddatum || '',
        tage: entryData.tage || 0,
        verfuegbar: entryData.verfuegbar !== false,
        sort_order: entryData.sortierung || entryData.sort_order || 0,
        hotel_preise: hotelPrices,
        created_at: entry.createdAt || entryData.createdAt || new Date().toISOString(),
      };
      
      return processedEntry;
    }).sort((a: any, b: any) => a.sort_order - b.sort_order);
    
    return processedEntries;
  },

  // Extract hotel prices
  extractHotelPrices(hotelPricesData: any): HotelPrice[] {
    if (!hotelPricesData) return [];
    
    let prices = null;
    
    if (Array.isArray(hotelPricesData)) {
      prices = hotelPricesData;
    } else if (hotelPricesData.data && Array.isArray(hotelPricesData.data)) {
      prices = hotelPricesData.data;
    } else if (hotelPricesData.data) {
      prices = [hotelPricesData.data];
    } else {
      prices = [hotelPricesData];
    }
    
    if (!Array.isArray(prices)) return [];
    
    return prices.filter(price => price && price.id).map((price: any) => {
      const priceData = price.attributes || price;
      
      let hotelData = null;
      if (priceData.hotel?.attributes) {
        hotelData = priceData.hotel.attributes;
        hotelData.id = priceData.hotel.id;
      } else if (priceData.hotel?.id) {
        hotelData = priceData.hotel;
      } else if (price.hotel?.attributes) {
        hotelData = price.hotel.attributes;
        hotelData.id = price.hotel.id;
      } else if (price.hotel?.id) {
        hotelData = price.hotel;
      }
      
      // Extract hotel icons for price entries
      let facilityIcons: string[] = [];
      if (hotelData?.icons) {
        const icons = hotelData.icons.data || hotelData.icons;
        if (Array.isArray(icons)) {
          facilityIcons = icons.map((icon: any) => {
            const iconData = icon.attributes || icon;
            return iconData.icon_key || iconData.name || '';
          }).filter(key => key.length > 0);
        }
      }
      
      return {
        id: price.id.toString(),
        preis: parseFloat(priceData.preis) || 0,
        verfuegbar: priceData.verfuegbar !== false,
        hotel: hotelData ? {
          id: hotelData.id?.toString() || '',
          trip_id: '',
          name: hotelData.name || '',
          stars: hotelData.sterne || 3,
          price: hotelData.preis || 0,
          image_url: dataTransformers.getMediaUrl(hotelData.bild),
          description: dataTransformers.richTextToPlain(hotelData.beschreibung) || '',
          facilities: dataTransformers.richTextToHtml(hotelData.ausstattung) || '',
          location: hotelData.lage || '',
          facility_icons: facilityIcons,
          sort_order: hotelData.sortierung || 0,
          created_at: new Date().toISOString(),
        } : null,
        created_at: priceData.createdAt || new Date().toISOString(),
      };
    }).filter(price => price.hotel !== null) as HotelPrice[];
  }
};
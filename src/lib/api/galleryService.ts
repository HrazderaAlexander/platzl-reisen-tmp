import { strapiApi } from './strapiClient';
import { GalleryFilter } from '../../types/gallery.js';

export const galleryService = {
  async getGalleryImages(filters?: GalleryFilter) {
    console.log('=== GALLERY SERVICE: getGalleryImages ===');
    console.log('Filters:', filters);
    
    // Build filter params
    let filterParams: any = {
      aktiv: true
    };
    
    if (filters?.monat) {
      filterParams.monat = { $eq: filters.monat };
    }
    if (filters?.jahr) {
      filterParams.jahr = { $eq: filters.jahr };
    }
    if (filters?.ort) {
      filterParams.ort = { $containsi: filters.ort };
    }
    if (filters?.searchTerm) {
      filterParams.$or = [
        { titel: { $containsi: filters.searchTerm } },
        { beschreibung: { $containsi: filters.searchTerm } },
        { ort: { $containsi: filters.searchTerm } },
        { tags: { $containsi: filters.searchTerm } }
      ];
    }
    
    const params = {
      populate: {
        bild: true
      },
      filters: filterParams,
      sort: ['jahr:desc', 'monat:desc', 'sortierung:asc', 'created_at:desc']
    };
    
    console.log('Gallery Images API Params:', JSON.stringify(params, null, 2));
    
    try {
      const response = await strapiApi.get('/gallery-images', { params });
      console.log('Gallery Images API Response status:', response.status);
      console.log('Gallery Images API Response data:', response.data);
      
      return response.data;
    } catch (error) {
      console.error('Gallery Images API Error:', error);
      throw error;
    }
  },

  async getGallerySettings() {
    console.log('=== GALLERY SERVICE: getGallerySettings ===');
    console.log('Making request to /gallery-settings...');
    
    try {
      const response = await strapiApi.get('/gallery-settings');
      console.log('Gallery Settings API Response status:', response.status);
      console.log('Gallery Settings API Response data:', response.data);
      
      return response.data;
    } catch (error) {
      console.error('Gallery Settings API Error:', error);
      throw error;
    }
  }
};
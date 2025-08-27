import { strapiApi } from './strapiClient';

export const homepageService = {
  async getHomepageData() {
    console.log('=== HOMEPAGE SERVICE: getHomepageData ===');
    console.log('Making request to /homepage...');
    
    const params = {
      populate: {
        hero_bilder: true,
        features: true
      }
    };
    
    console.log('Homepage API Params:', JSON.stringify(params, null, 2));
    
    try {
      const response = await strapiApi.get('/homepage', { params });
      console.log('Homepage API Response status:', response.status);
      console.log('Homepage API Response data:', response.data);
      
      return response.data;
    } catch (error) {
      console.error('Homepage API Error:', error);
      throw error;
    }
  }
};
import { strapiApi } from './strapiClient';

export const umweltbeitragService = {
  async getUmweltbeitragData() {
    console.log('=== UMWELTBEITRAG SERVICE: getUmweltbeitragData ===');
    console.log('Making request to /umweltbeitrag...');
    
    const params = {
      populate: {
        massnahmen: true,
        zertifikat_bilder: {
          populate: '*'
        }
      }
    };
    
    console.log('Umweltbeitrag API Params:', JSON.stringify(params, null, 2));
    
    try {
      const response = await strapiApi.get('/umweltbeitrag', { params });
      console.log('Umweltbeitrag API Response status:', response.status);
      console.log('Umweltbeitrag API Response data:', response.data);
      
      return response.data;
    } catch (error) {
      console.error('Umweltbeitrag API Error:', error);
      throw error;
    }
  }
};
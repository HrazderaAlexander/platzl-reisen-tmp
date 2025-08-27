import { strapiApi } from './strapiClient';

export const reisebedingungenService = {
  async getReisebedingungenData() {
    console.log('=== REISEBEDINGUNGEN SERVICE: getReisebedingungenData ===');
    console.log('Making request to /reisebedingungen...');
    
    const params = {
      populate: {
        service_punkte: {
          sort: 'sortierung:asc'
        },
        ansprechpartner_foto: {
          populate: '*'
        }
      }
    };
    
    console.log('Reisebedingungen API Params:', JSON.stringify(params, null, 2));
    
    try {
      const response = await strapiApi.get('/reisebedingungen', { params });
      console.log('Reisebedingungen API Response status:', response.status);
      console.log('Reisebedingungen API Response data:', response.data);
      
      return response.data;
    } catch (error) {
      console.error('Reisebedingungen API Error:', error);
      throw error;
    }
  }
};
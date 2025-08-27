import { strapiApi } from './strapiClient';

export const tripService = {
  // Thermenreisen (bestehend)
  async getTrips(category?: 'therme' | 'sightseeing') {
    console.log('=== TRIP SERVICE: getTrips ===');
    console.log('Category filter:', category);
    
    let url = '/trips';
    let params: any = {
      populate: {
        hotels: {
          populate: ['bild', 'icons']
        },
        termine: true,
        galerie_bilder: true,
        thermen: true,
        preiseintraege: {
          populate: {
            hotel_preise: {
              populate: {
                hotel: {
                  populate: ['bild', 'icons']
                }
              }
            }
          }
        }
      },
      sort: ['createdAt:desc']
    };
    
    if (category) {
      params.filters = {
        kategorie: {
          $eq: category
        }
      };
    }
    
    console.log('API URL:', url);
    console.log('API Params:', JSON.stringify(params, null, 2));
    
    const response = await strapiApi.get(url, { params });
    console.log('API Response:', response.data);
    
    return response.data;
  },

  async getTripById(id: string) {
    console.log('=== TRIP SERVICE: getTripById ===');
    console.log('Trip ID:', id);
    
    const params = {
      populate: {
        hotels: {
          populate: ['bild', 'icons']
        },
        termine: true,
        galerie_bilder: true,
        thermen: true,
        preiseintraege: {
          populate: {
            hotel_preise: {
              populate: {
                hotel: {
                  populate: ['bild', 'icons']
                }
              }
            }
          }
        }
      }
    };
    
    const response = await strapiApi.get(`/trips/${id}`, { params });
    console.log('Single trip response:', response.data);
    
    return response.data;
  },

  // Besichtigungsreisen (neu)
  async getSightseeingTrips() {
    console.log('=== TRIP SERVICE: getSightseeingTrips ===');
    
    const params = {
      populate: {
        hauptbild: true,
        galerie_bilder: true,
        reiseleitung: {
          populate: {
            foto: true
          }
        },
        termine: true
      },
      sort: ['featured:desc', 'sortierung:asc', 'createdAt:desc']
    };
    
    console.log('Sightseeing API Params:', JSON.stringify(params, null, 2));
    
    const response = await strapiApi.get('/sightseeing-trips', { params });
    console.log('Sightseeing API Response:', response.data);
    
    return response.data;
  },

  async getSightseeingTripById(id: string) {
    console.log('=== TRIP SERVICE: getSightseeingTripById ===');
    console.log('Sightseeing Trip ID:', id);
    
    const params = {
      populate: {
        hauptbild: true,
        galerie_bilder: true,
        reiseleitung: {
          populate: {
            foto: true
          }
        },
        termine: true
      }
    };
    
    const response = await strapiApi.get(`/sightseeing-trips/${id}`, { params });
    console.log('Single sightseeing trip response:', response.data);
    
    return response.data;
  }
};
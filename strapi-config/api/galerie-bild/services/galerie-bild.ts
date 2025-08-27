import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::galerie-bild.galerie-bild', ({ strapi }) => ({
  async findActive(params: any = {}) {
    return await strapi.entityService.findMany('api::galerie-bild.galerie-bild', {
      ...params,
      filters: {
        aktiv: true,
        ...params.filters
      },
      populate: {
        bild: true
      },
      sort: ['reise_datum:desc', 'sortierung:asc', 'createdAt:desc']
    });
  },

  async findFeatured(params: any = {}) {
    return await strapi.entityService.findMany('api::galerie-bild.galerie-bild', {
      ...params,
      filters: {
        favorit: true,
        aktiv: true,
        ...params.filters
      },
      populate: {
        bild: true
      },
      sort: ['reise_datum:desc', 'sortierung:asc']
    });
  },

  async findByReiseDatum(reiseDatum: string, params: any = {}) {
    return await strapi.entityService.findMany('api::galerie-bild.galerie-bild', {
      ...params,
      filters: {
        reise_datum: reiseDatum,
        aktiv: true,
        ...params.filters
      },
      populate: {
        bild: true
      },
      sort: 'sortierung:asc'
    });
  },

  async findByYear(year: number, params: any = {}) {
    // Extract year from reise_datum field
    return await strapi.entityService.findMany('api::galerie-bild.galerie-bild', {
      ...params,
      filters: {
        reise_datum: {
          $contains: year.toString()
        },
        aktiv: true,
        ...params.filters
      },
      populate: {
        bild: true
      },
      sort: ['reise_datum:desc', 'sortierung:asc']
    });
  },

  async findByMonth(month: string, params: any = {}) {
    // Convert German month name to month number for filtering
    const monthMap: { [key: string]: string } = {
      'Januar': '01', 'Februar': '02', 'März': '03', 'April': '04',
      'Mai': '05', 'Juni': '06', 'Juli': '07', 'August': '08',
      'September': '09', 'Oktober': '10', 'November': '11', 'Dezember': '12'
    };
    
    const monthNumber = monthMap[month];
    if (!monthNumber) {
      return [];
    }

    return await strapi.entityService.findMany('api::galerie-bild.galerie-bild', {
      ...params,
      filters: {
        reise_datum: {
          $contains: `-${monthNumber}-`
        },
        aktiv: true,
        ...params.filters
      },
      populate: {
        bild: true
      },
      sort: ['reise_datum:desc', 'sortierung:asc']
    });
  },

  async findByLocation(location: string, params: any = {}) {
    return await strapi.entityService.findMany('api::galerie-bild.galerie-bild', {
      ...params,
      filters: {
        ort: {
          $containsi: location
        },
        aktiv: true,
        ...params.filters
      },
      populate: {
        bild: true
      },
      sort: ['reise_datum:desc', 'sortierung:asc']
    });
  },

  async searchImages(searchTerm: string, params: any = {}) {
    return await strapi.entityService.findMany('api::galerie-bild.galerie-bild', {
      ...params,
      filters: {
        $or: [
          { titel: { $containsi: searchTerm } },
          { beschreibung: { $containsi: searchTerm } },
          { ort: { $containsi: searchTerm } },
          { tags: { $containsi: searchTerm } }
        ],
        aktiv: true,
        ...params.filters
      },
      populate: {
        bild: true
      },
      sort: ['reise_datum:desc', 'sortierung:asc']
    });
  },

  async updateSortOrder(bildId: string, sortOrder: number) {
    return await strapi.entityService.update('api::galerie-bild.galerie-bild', bildId, {
      data: {
        sortierung: sortOrder
      }
    });
  },

  async toggleActive(bildId: string, active: boolean) {
    return await strapi.entityService.update('api::galerie-bild.galerie-bild', bildId, {
      data: {
        aktiv: active
      }
    });
  },

  async toggleFavorite(bildId: string, favorite: boolean) {
    return await strapi.entityService.update('api::galerie-bild.galerie-bild', bildId, {
      data: {
        favorit: favorite
      }
    });
  },

  async createWithImage(data: any, files: any) {
    const bild = await strapi.entityService.create('api::galerie-bild.galerie-bild', {
      data: data,
      files: files
    });

    return bild;
  },

  async getUniqueYears() {
    const bilder = await strapi.entityService.findMany('api::galerie-bild.galerie-bild', {
      filters: {
        aktiv: true
      },
      fields: ['reise_datum']
    });

    // Extract years from reise_datum field
    const years = [...new Set(bilder.map((bild: any) => {
      if (bild.reise_datum) {
        const date = new Date(bild.reise_datum);
        return !isNaN(date.getTime()) ? date.getFullYear() : null;
      }
      return null;
    }).filter(year => year !== null))];
    
    return years.sort((a: number, b: number) => b - a);
  },

  async getUniqueMonths() {
    const bilder = await strapi.entityService.findMany('api::galerie-bild.galerie-bild', {
      filters: {
        aktiv: true
      },
      fields: ['reise_datum']
    });

    // Extract months from reise_datum field
    const monthNames = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 
                       'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
    
    const months = [...new Set(bilder.map((bild: any) => {
      if (bild.reise_datum) {
        const date = new Date(bild.reise_datum);
        return !isNaN(date.getTime()) ? monthNames[date.getMonth()] : null;
      }
      return null;
    }).filter(month => month !== null))];
    
    return months.sort();
  },

  async getUniqueLocations() {
    const bilder = await strapi.entityService.findMany('api::galerie-bild.galerie-bild', {
      filters: {
        aktiv: true
      },
      fields: ['ort']
    });

    const locations = [...new Set(bilder.map((bild: any) => bild.ort))];
    return locations.sort();
  }
}));
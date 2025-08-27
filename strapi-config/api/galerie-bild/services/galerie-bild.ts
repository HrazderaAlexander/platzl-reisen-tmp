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
      sort: ['jahr:desc', 'datum:desc', 'sortierung:asc', 'createdAt:desc']
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
      sort: ['jahr:desc', 'monat:desc', 'sortierung:asc']
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
    return await strapi.entityService.findMany('api::galerie-bild.galerie-bild', {
      ...params,
      filters: {
        jahr: year,
        aktiv: true,
        ...params.filters
      },
      populate: {
        bild: true
      },
      sort: ['monat:desc', 'sortierung:asc']
    });
  },

  async findByMonth(month: string, params: any = {}) {
    return await strapi.entityService.findMany('api::galerie-bild.galerie-bild', {
      ...params,
      filters: {
        monat: month,
        aktiv: true,
        ...params.filters
      },
      populate: {
        bild: true
      },
      sort: ['jahr:desc', 'sortierung:asc']
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
      sort: ['jahr:desc', 'monat:desc', 'sortierung:asc']
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
      sort: ['jahr:desc', 'monat:desc', 'sortierung:asc']
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
      fields: ['jahr']
    });

    const years = [...new Set(bilder.map((bild: any) => bild.jahr))];
    return years.sort((a: number, b: number) => b - a);
  },

  async getUniqueMonths() {
    const bilder = await strapi.entityService.findMany('api::galerie-bild.galerie-bild', {
      filters: {
        aktiv: true
      },
      fields: ['monat']
    });

    const months = [...new Set(bilder.map((bild: any) => bild.monat))];
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
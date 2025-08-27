import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::gallery-image.gallery-image', ({ strapi }) => ({
  async find(params = {}) {
    // Add default sorting and filtering
    const defaultParams = {
      sort: ['jahr:desc', 'monat:desc', 'sortierung:asc', 'created_at:desc'],
      filters: {
        aktiv: true,
        ...params.filters,
      },
      populate: {
        bild: true,
        ...params.populate,
      },
      ...params,
    };

    return await strapi.entityService.findMany('api::gallery-image.gallery-image', defaultParams);
  },

  async findOne(entityId: number | string, params = {}) {
    const defaultParams = {
      populate: {
        bild: true,
        ...params.populate,
      },
      ...params,
    };

    return await strapi.entityService.findOne('api::gallery-image.gallery-image', entityId, defaultParams);
  },

  async create(params = {}) {
    const { data, ...otherParams } = params;

    // Set default values
    const entityData = {
      aktiv: true,
      favorit: false,
      sortierung: 0,
      ...data,
    };

    return await strapi.entityService.create('api::gallery-image.gallery-image', {
      data: entityData,
      populate: {
        bild: true,
      },
      ...otherParams,
    });
  },

  async update(entityId: number | string, params = {}) {
    const { data, ...otherParams } = params;

    return await strapi.entityService.update('api::gallery-image.gallery-image', entityId, {
      data,
      populate: {
        bild: true,
      },
      ...otherParams,
    });
  },

  async delete(entityId: number | string, params = {}) {
    return await strapi.entityService.delete('api::gallery-image.gallery-image', entityId, params);
  },

  // Custom methods
  async findByReiseDatum(reiseDatum: string, params = {}) {
    return await this.find({
      filters: {
        reise_datum: reiseDatum,
        ...params.filters,
      },
      ...params,
    });
  },

  async findByYear(year: number, params = {}) {
    return await this.find({
      filters: {
        jahr: year,
        ...params.filters,
      },
      ...params,
    });
  },

  async findByMonth(month: string, params = {}) {
    return await this.find({
      filters: {
        monat: month,
        ...params.filters,
      },
      ...params,
    });
  },

  async findByLocation(location: string, params = {}) {
    return await this.find({
      filters: {
        ort: {
          $containsi: location,
        },
        ...params.filters,
      },
      ...params,
    });
  },

  async findFeatured(params = {}) {
    return await this.find({
      filters: {
        favorit: true,
        ...params.filters,
      },
      ...params,
    });
  },

  async searchImages(searchTerm: string, params = {}) {
    return await this.find({
      filters: {
        $or: [
          { titel: { $containsi: searchTerm } },
          { beschreibung: { $containsi: searchTerm } },
          { ort: { $containsi: searchTerm } },
          { tags: { $containsi: searchTerm } },
        ],
        ...params.filters,
      },
      ...params,
    });
  },
}));
import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::gallery-settings.gallery-settings', ({ strapi }) => ({
  async find(ctx) {
    // Gallery settings is a single type, so we use findMany but expect only one result
    const { query } = await this.sanitizeQuery(ctx);

    const entity = await strapi.entityService.findMany('api::gallery-settings.gallery-settings', {
      ...query,
      populate: {
        team_foto: true,
        ...query.populate,
      },
    });

    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

    return this.transformResponse(sanitizedEntity);
  },

  async update(ctx) {
    const { data } = ctx.request.body;

    // For single types, we need to find the existing entity first
    const existingEntities = await strapi.entityService.findMany('api::gallery-settings.gallery-settings');
    
    let entity;
    if (existingEntities && existingEntities.length > 0) {
      // Update existing entity
      entity = await strapi.entityService.update('api::gallery-settings.gallery-settings', existingEntities[0].id, {
        data,
        populate: {
          team_foto: true,
        },
      });
    } else {
      // Create new entity if none exists
      entity = await strapi.entityService.create('api::gallery-settings.gallery-settings', {
        data,
        populate: {
          team_foto: true,
        },
      });
    }

    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

    return this.transformResponse(sanitizedEntity);
  },

  async create(ctx) {
    const { data } = ctx.request.body;

    const entity = await strapi.entityService.create('api::gallery-settings.gallery-settings', {
      data,
      populate: {
        team_foto: true,
      },
    });

    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

    return this.transformResponse(sanitizedEntity);
  },

  async delete(ctx) {
    const { id } = ctx.params;

    const entity = await strapi.entityService.delete('api::gallery-settings.gallery-settings', id);
    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

    return this.transformResponse(sanitizedEntity);
  },
}));
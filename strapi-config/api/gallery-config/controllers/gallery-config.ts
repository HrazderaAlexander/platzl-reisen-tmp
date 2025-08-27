import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::gallery-config.gallery-config', ({ strapi }) => ({
  async find(ctx) {
    // Gallery config is a single type, so we use findMany but expect only one result
    const { query } = await this.sanitizeQuery(ctx);

    const entity = await strapi.entityService.findMany('api::gallery-config.gallery-config', {
      ...query,
    });

    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

    return this.transformResponse(sanitizedEntity);
  },

  async update(ctx) {
    const { data } = ctx.request.body;

    // For single types, we need to find the existing entity first
    const existingEntities = await strapi.entityService.findMany('api::gallery-config.gallery-config');
    
    let entity;
    if (existingEntities && existingEntities.length > 0) {
      // Update existing entity
      entity = await strapi.entityService.update('api::gallery-config.gallery-config', existingEntities[0].id, {
        data,
      });
    } else {
      // Create new entity if none exists
      entity = await strapi.entityService.create('api::gallery-config.gallery-config', {
        data,
      });
    }

    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

    return this.transformResponse(sanitizedEntity);
  },

  async create(ctx) {
    const { data } = ctx.request.body;

    const entity = await strapi.entityService.create('api::gallery-config.gallery-config', {
      data,
    });

    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

    return this.transformResponse(sanitizedEntity);
  },

  async delete(ctx) {
    const { id } = ctx.params;

    const entity = await strapi.entityService.delete('api::gallery-config.gallery-config', id);
    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

    return this.transformResponse(sanitizedEntity);
  },
}));
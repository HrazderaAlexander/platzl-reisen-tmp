import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::gallery-setting.gallery-setting', ({ strapi }) => ({
  async find(ctx) {
    // Gallery setting is a single type, so we use findMany but expect only one result
    const { query } = await this.sanitizeQuery(ctx);

    const entity = await strapi.entityService.findMany('api::gallery-setting.gallery-setting', {
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
    const existingEntities = await strapi.entityService.findMany('api::gallery-setting.gallery-setting');
    
    let entity;
    if (existingEntities && existingEntities.length > 0) {
      // Update existing entity
      entity = await strapi.entityService.update('api::gallery-setting.gallery-setting', existingEntities[0].id, {
        data,
        populate: {
          team_foto: true,
        },
      });
    } else {
      // Create new entity if none exists
      entity = await strapi.entityService.create('api::gallery-setting.gallery-setting', {
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

    const entity = await strapi.entityService.create('api::gallery-setting.gallery-setting', {
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

    const entity = await strapi.entityService.delete('api::gallery-setting.gallery-setting', id);
    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

    return this.transformResponse(sanitizedEntity);
  },
}));
import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::gallery-image.gallery-image', ({ strapi }) => ({
  async find(ctx) {
    // Sanitize query
    const { query } = await this.sanitizeQuery(ctx);
    
    // Add default population
    const populatedQuery = {
      ...query,
      populate: {
        bild: true,
        ...query.populate,
      },
    };

    // Fetch entities
    const { data, meta } = await strapi.entityService.findMany('api::gallery-image.gallery-image', populatedQuery);

    // Sanitize output
    const sanitizedResults = await this.sanitizeOutput(data, ctx);

    return this.transformResponse(sanitizedResults, { meta });
  },

  async findOne(ctx) {
    const { id } = ctx.params;
    const { query } = await this.sanitizeQuery(ctx);

    // Add default population
    const populatedQuery = {
      ...query,
      populate: {
        bild: true,
        ...query.populate,
      },
    };

    const entity = await strapi.entityService.findOne('api::gallery-image.gallery-image', id, populatedQuery);

    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

    return this.transformResponse(sanitizedEntity);
  },

  async create(ctx) {
    const { data } = ctx.request.body;

    const entity = await strapi.entityService.create('api::gallery-image.gallery-image', {
      data,
      populate: {
        bild: true,
      },
    });

    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

    return this.transformResponse(sanitizedEntity);
  },

  async update(ctx) {
    const { id } = ctx.params;
    const { data } = ctx.request.body;

    const entity = await strapi.entityService.update('api::gallery-image.gallery-image', id, {
      data,
      populate: {
        bild: true,
      },
    });

    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

    return this.transformResponse(sanitizedEntity);
  },

  async delete(ctx) {
    const { id } = ctx.params;

    const entity = await strapi.entityService.delete('api::gallery-image.gallery-image', id);
    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

    return this.transformResponse(sanitizedEntity);
  },
}));
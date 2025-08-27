import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::galerie-bild.galerie-bild', ({ strapi }) => ({
  async find(ctx: any) {
    const { query } = ctx;
    
    const populateQuery = {
      ...query,
      populate: {
        bild: true
      },
      sort: ['reise_datum:desc', 'sortierung:asc', 'createdAt:desc']
    };
    
    const data = await strapi.entityService.findMany('api::galerie-bild.galerie-bild', populateQuery);
    
    return { data };
  },

  async findOne(ctx: any) {
    const { id } = ctx.params;
    const { query } = ctx;

    const populateQuery = {
      ...query,
      populate: {
        bild: true
      }
    };

    const entity = await strapi.entityService.findOne('api::galerie-bild.galerie-bild', id, populateQuery);
    
    return { data: entity };
  },

  async findActive(ctx: any) {
    const { query } = ctx;
    
    const activeBilder = await strapi.entityService.findMany('api::galerie-bild.galerie-bild', {
      ...query,
      filters: {
        aktiv: true
      },
      populate: {
        bild: true
      },
      sort: ['reise_datum:desc', 'sortierung:asc', 'createdAt:desc']
    });
    
    return { data: activeBilder };
  },

  async findFeatured(ctx: any) {
    const { query } = ctx;
    
    const featuredBilder = await strapi.entityService.findMany('api::galerie-bild.galerie-bild', {
      ...query,
      filters: {
        favorit: true,
        aktiv: true
      },
      populate: {
        bild: true
      },
      sort: ['reise_datum:desc', 'sortierung:asc']
    });
    
    return { data: featuredBilder };
  },

  async findByReiseDatum(ctx: any) {
    const { reiseDatum } = ctx.params;
    
    const bilder = await strapi.entityService.findMany('api::galerie-bild.galerie-bild', {
      filters: {
        reise_datum: reiseDatum,
        aktiv: true
      },
      populate: {
        bild: true
      },
      sort: 'sortierung:asc'
    });
    
    return { data: bilder };
  },

  async findByYear(ctx: any) {
    const { year } = ctx.params;
    
    const bilder = await strapi.entityService.findMany('api::galerie-bild.galerie-bild', {
      filters: {
        reise_datum: {
          $contains: year.toString()
        },
        aktiv: true
      },
      populate: {
        bild: true
      },
      sort: ['reise_datum:desc', 'sortierung:asc']
    });
    
    return { data: bilder };
  },

  async findByLocation(ctx: any) {
    const { location } = ctx.params;
    
    const bilder = await strapi.entityService.findMany('api::galerie-bild.galerie-bild', {
      filters: {
        ort: {
          $containsi: location
        },
        aktiv: true
      },
      populate: {
        bild: true
      },
      sort: ['reise_datum:desc', 'sortierung:asc']
    });
    
    return { data: bilder };
  },

  async search(ctx: any) {
    const { searchTerm } = ctx.params;
    
    const bilder = await strapi.entityService.findMany('api::galerie-bild.galerie-bild', {
      filters: {
        $or: [
          { titel: { $containsi: searchTerm } },
          { beschreibung: { $containsi: searchTerm } },
          { ort: { $containsi: searchTerm } },
          { tags: { $containsi: searchTerm } }
        ],
        aktiv: true
      },
      populate: {
        bild: true
      },
      sort: ['reise_datum:desc', 'sortierung:asc']
    });
    
    return { data: bilder };
  },

  async updateSortOrder(ctx: any) {
    const { id } = ctx.params;
    const { sortierung } = ctx.request.body;

    const updatedBild = await strapi.entityService.update('api::galerie-bild.galerie-bild', id, {
      data: {
        sortierung: sortierung
      }
    });

    return { data: updatedBild };
  },

  async toggleActive(ctx: any) {
    const { id } = ctx.params;
    const { aktiv } = ctx.request.body;

    const updatedBild = await strapi.entityService.update('api::galerie-bild.galerie-bild', id, {
      data: {
        aktiv: aktiv
      }
    });

    return { data: updatedBild };
  },

  async toggleFavorite(ctx: any) {
    const { id } = ctx.params;
    const { favorit } = ctx.request.body;

    const updatedBild = await strapi.entityService.update('api::galerie-bild.galerie-bild', id, {
      data: {
        favorit: favorit
      }
    });

    return { data: updatedBild };
  }
}));
import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::homepage.homepage', ({ strapi }) => ({
  async find(ctx: any) {
    const { query } = ctx;

    const populateQuery = {
      ...query,
      populate: {
        hero_bilder: true,
        features: true
      }
    };

    const entity = await strapi.entityService.findMany('api::homepage.homepage', populateQuery);

    return { data: entity };
  },

  async update(ctx: any) {
    const { data } = ctx.request.body;

    // For single types, we need to find the existing entity first
    const existingEntity = await strapi.entityService.findMany('api::homepage.homepage');
    
    let entity;
    if (existingEntity && existingEntity.id) {
      // Update existing entity
      entity = await strapi.entityService.update('api::homepage.homepage', existingEntity.id, {
        data,
        populate: {
          hero_bilder: true,
          features: true
        }
      });
    } else {
      // Create new entity if none exists
      entity = await strapi.entityService.create('api::homepage.homepage', {
        data,
        populate: {
          hero_bilder: true,
          features: true
        }
      });
    }

    return { data: entity };
  },

  async create(ctx: any) {
    const { data } = ctx.request.body;

    const entity = await strapi.entityService.create('api::homepage.homepage', {
      data,
      populate: {
        hero_bilder: true,
        features: true
      }
    });

    return { data: entity };
  },

  async delete(ctx: any) {
    const { id } = ctx.params;

    const entity = await strapi.entityService.delete('api::homepage.homepage', id);
    
    return { data: entity };
  },

  async getOrCreate(ctx: any) {
    const existing = await strapi.entityService.findMany('api::homepage.homepage', {
      populate: {
        hero_bilder: true,
        features: true
      }
    });
    
    if (existing) {
      // If existing is an array, return the first element; otherwise, return the object itself
      if (Array.isArray(existing) && existing.length > 0) {
        return { data: existing[0] };
      } else if (!Array.isArray(existing)) {
        return { data: existing };
      }
    }
    
    // Create default configuration
    const defaultConfig = {
      hero_titel: 'Platzl Reisen',
      hero_untertitel: 'Platz(l) nehmen und wohlfühlen',
      diashow_geschwindigkeit: 5000,
      features_titel: 'Warum Platzl Reisen wählen?',
      features_untertitel: 'Entdecken Sie, warum Tausende von Kunden uns vertrauen',
      features: [
        {
          titel: 'Erfahrene Reiseleitung',
          beschreibung: 'Unsere erfahrenen Reiseleiter sorgen für unvergessliche Erlebnisse und stehen Ihnen während der gesamten Reise zur Verfügung.',
          icon: 'users',
          sortierung: 0
        },
        {
          titel: 'Premium Komfort',
          beschreibung: 'Moderne 4* Reisebusse mit höchstem Komfort, klimatisiert und mit bequemen Sitzen für entspannte Fahrten.',
          icon: 'star',
          sortierung: 1
        },
        {
          titel: 'Flexible Termine',
          beschreibung: 'Vielfältige Reisetermine das ganze Jahr über, passend zu Ihren Urlaubsplänen und Bedürfnissen.',
          icon: 'calendar',
          sortierung: 2
        }
      ],
      cta_therme_text: 'Jetzt buchen',
      cta_sightseeing_text: 'Mehr erfahren',
      telefon: '0732 27 27 17',
      email: 'linz@platzl-reisen.at'
    };
    
    const entity = await strapi.entityService.create('api::homepage.homepage', {
      data: defaultConfig,
      populate: {
        hero_bilder: true,
        features: true
      }
    });
    
    return { data: entity };
  }
}));
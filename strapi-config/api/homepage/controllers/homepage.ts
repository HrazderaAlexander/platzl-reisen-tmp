import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::homepage.homepage', ({ strapi }) => ({
  async findOne(ctx: any) {
    console.log('=== HOMEPAGE CONTROLLER ===');
    console.log('Finding homepage data...');
    
    const { query } = ctx;

    const populateQuery = {
      ...query,
      populate: {
        hero_bilder: true,
        features: true
      }
    };

    // For single types, we need to find the first (and only) entry
    try {
      const entities = await strapi.entityService.findMany('api::homepage.homepage', populateQuery);
      const entitiesCount = Array.isArray(entities) ? entities.length : entities ? 1 : 0;
      console.log('Found entities:', entitiesCount);

      const entity = Array.isArray(entities)
        ? (entities.length > 0 ? entities[0] : null)
        : entities || null;
      console.log('Returning entity:', !!entity);

      return { data: entity };
    } catch (error) {
      console.error('Homepage controller error:', error);
      return { data: null };
    }
  },

  async update(ctx: any) {
    const { data } = ctx.request.body;
    
    try {
      // For single types, we need to find existing entry first
      const existing = await strapi.entityService.findMany('api::homepage.homepage', {});
      
      let entity;
      if (Array.isArray(existing) && existing.length > 0) {
        // Update existing
        entity = await strapi.entityService.update('api::homepage.homepage', existing[0].id, {
          data: data,
          populate: {
            hero_bilder: true,
            features: true
          }
        });
      } else if (existing && existing.id) {
        // Update if single object returned
        entity = await strapi.entityService.update('api::homepage.homepage', existing.id, {
          data: data,
          populate: {
            hero_bilder: true,
            features: true
          }
        });
      } else {
        // Create new with default values
        const defaultData = {
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
          email: 'linz@platzl-reisen.at',
          ...data
        };
        
        entity = await strapi.entityService.create('api::homepage.homepage', {
          data: defaultData,
          populate: {
            hero_bilder: true,
            features: true
          }
        });
      }
      
      return { data: entity };
    } catch (error) {
      console.error('Homepage update error:', error);
      ctx.throw(500, 'Failed to update homepage');
    }
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
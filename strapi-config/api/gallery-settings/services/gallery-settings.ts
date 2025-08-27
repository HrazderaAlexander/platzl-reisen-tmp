import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::gallery-settings.gallery-settings', ({ strapi }) => ({
  async find(params = {}) {
    const defaultParams = {
      populate: {
        team_foto: true,
        ...params.populate,
      },
      ...params,
    };

    return await strapi.entityService.findMany('api::gallery-settings.gallery-settings', defaultParams);
  },

  async findOne(entityId: number | string, params = {}) {
    const defaultParams = {
      populate: {
        team_foto: true,
        ...params.populate,
      },
      ...params,
    };

    return await strapi.entityService.findOne('api::gallery-settings.gallery-settings', entityId, defaultParams);
  },

  async create(params = {}) {
    const { data, ...otherParams } = params;

    // Set default values for gallery settings
    const entityData = {
      titel: 'UNSERE SCHÖNSTEN REISEFOTOS',
      untertitel: 'Lassen Sie sich von den Eindrücken unserer Busreisen inspirieren!',
      intro_text: 'Sie wollen Ihre schönsten Reisemomente auch mit uns teilen? Schicken Sie Ihre Bilder bitte mit Angabe des Orts und Zeitraums Ihrer Reise an',
      email_kontakt: 'info@platzl-reisen.at',
      hinweis_text: 'Bitte beachten Sie, dass alle erkennbaren Personen mit der Veröffentlichung der Fotos einverstanden sein müssen!',
      archiv_titel: 'Reisefotos Archiv',
      ...data,
    };

    return await strapi.entityService.create('api::gallery-settings.gallery-settings', {
      data: entityData,
      populate: {
        team_foto: true,
      },
      ...otherParams,
    });
  },

  async update(entityId: number | string, params = {}) {
    const { data, ...otherParams } = params;

    return await strapi.entityService.update('api::gallery-settings.gallery-settings', entityId, {
      data,
      populate: {
        team_foto: true,
      },
      ...otherParams,
    });
  },

  async delete(entityId: number | string, params = {}) {
    return await strapi.entityService.delete('api::gallery-settings.gallery-settings', entityId, params);
  },

  // Custom method to get or create settings (since it's a single type)
  async getSettings(params = {}) {
    const settings = await this.find(params);
    
    if (settings && settings.length > 0) {
      return settings[0];
    }
    
    // Create default settings if none exist
    return await this.create({
      data: {
        titel: 'UNSERE SCHÖNSTEN REISEFOTOS',
        untertitel: 'Lassen Sie sich von den Eindrücken unserer Busreisen inspirieren!',
        intro_text: 'Sie wollen Ihre schönsten Reisemomente auch mit uns teilen? Schicken Sie Ihre Bilder bitte mit Angabe des Orts und Zeitraums Ihrer Reise an',
        email_kontakt: 'info@platzl-reisen.at',
        hinweis_text: 'Bitte beachten Sie, dass alle erkennbaren Personen mit der Veröffentlichung der Fotos einverstanden sein müssen!',
        archiv_titel: 'Reisefotos Archiv',
      },
      ...params,
    });
  },
}));
import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::galerie-konfiguration.galerie-konfiguration', ({ strapi }) => ({
  async find(params: any = {}) {
    const defaultParams = {
      ...params,
    };

    return await strapi.entityService.findMany('api::galerie-konfiguration.galerie-konfiguration', defaultParams);
  },

  async findOne(entityId: number | string, params: any = {}) {
    const defaultParams = {
      ...params,
    };

    return await strapi.entityService.findOne('api::galerie-konfiguration.galerie-konfiguration', entityId, defaultParams);
  },

  async create(params: any = {}) {
    const { data, ...otherParams } = params;

    // Set default values for gallery config
    const entityData = {
      titel: 'UNSERE SCHÖNSTEN REISEFOTOS',
      untertitel: 'Lassen Sie sich von den Eindrücken unserer Busreisen inspirieren!',
      intro_text: 'Sie wollen Ihre schönsten Reisemomente auch mit uns teilen? Schicken Sie Ihre Bilder bitte mit Angabe des Orts und Zeitraums Ihrer Reise an',
      email_kontakt: 'info@platzl-reisen.at',
      hinweis_text: 'Bitte beachten Sie, dass alle erkennbaren Personen mit der Veröffentlichung der Fotos einverstanden sein müssen!',
      archiv_titel: 'Reisefotos Archiv',
      ...data,
    };

    return await strapi.entityService.create('api::galerie-konfiguration.galerie-konfiguration', {
      data: entityData,
      ...otherParams,
    });
  },

  async update(entityId: number | string, params: any = {}) {
    const { data, ...otherParams } = params;

    return await strapi.entityService.update('api::galerie-konfiguration.galerie-konfiguration', entityId, {
      data,
      ...otherParams,
    });
  },

  async delete(entityId: number | string, params: any = {}) {
    return await strapi.entityService.delete('api::galerie-konfiguration.galerie-konfiguration', entityId, params);
  },

  // Custom method to get or create config (since it's a single type)
  async getSettings(params: any = {}) {
    const config = await this.find(params);
    
    if (config && config.length > 0) {
      return config[0];
    }
    
    // Create default config if none exist
    return await this.create(params);
  },

  async updateSettings(data: any) {
    const existing = await this.find();
    
    if (existing && existing.length > 0) {
      return await this.update(existing[0].id, { data });
    }
    
    return await this.create({ data });
  }
}));
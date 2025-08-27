import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::galerie-konfiguration.galerie-konfiguration', ({ strapi }) => ({
  async find(ctx: any) {
    const { query } = ctx;

    const entity = await strapi.entityService.findMany('api::galerie-konfiguration.galerie-konfiguration', {
      ...query,
    });

    return { data: entity };
  },

  async update(ctx: any) {
    const { data } = ctx.request.body;

    // For single types, we need to find the existing entity first
    const existingEntities = await strapi.entityService.findMany('api::galerie-konfiguration.galerie-konfiguration');
    
    let entity;
    if (existingEntities && existingEntities.length > 0) {
      // Update existing entity
      entity = await strapi.entityService.update('api::galerie-konfiguration.galerie-konfiguration', existingEntities[0].id, {
        data,
      });
    } else {
      // Create new entity if none exists
      entity = await strapi.entityService.create('api::galerie-konfiguration.galerie-konfiguration', {
        data,
      });
    }

    return { data: entity };
  },

  async create(ctx: any) {
    const { data } = ctx.request.body;

    const entity = await strapi.entityService.create('api::galerie-konfiguration.galerie-konfiguration', {
      data,
    });

    return { data: entity };
  },

  async delete(ctx: any) {
    const { id } = ctx.params;

    const entity = await strapi.entityService.delete('api::galerie-konfiguration.galerie-konfiguration', id);
    
    return { data: entity };
  },

  async getOrCreate(ctx: any) {
    const existing = await strapi.entityService.findMany('api::galerie-konfiguration.galerie-konfiguration');
    
    if (existing && existing.length > 0) {
      return { data: existing[0] };
    }
    
    // Create default configuration
    const defaultConfig = {
      titel: 'UNSERE SCHÖNSTEN REISEFOTOS',
      untertitel: 'Lassen Sie sich von den Eindrücken unserer Busreisen inspirieren!',
      intro_text: 'Sie wollen Ihre schönsten Reisemomente auch mit uns teilen? Schicken Sie Ihre Bilder bitte mit Angabe des Orts und Zeitraums Ihrer Reise an',
      email_kontakt: 'info@platzl-reisen.at',
      hinweis_text: 'Bitte beachten Sie, dass alle erkennbaren Personen mit der Veröffentlichung der Fotos einverstanden sein müssen!',
      archiv_titel: 'Reisefotos Archiv'
    };
    
    const entity = await strapi.entityService.create('api::galerie-konfiguration.galerie-konfiguration', {
      data: defaultConfig
    });
    
    return { data: entity };
  }
}));
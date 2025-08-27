export default {
  routes: [
    {
      method: 'GET',
      path: '/galerie-konfiguration',
      handler: 'galerie-konfiguration.find',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/galerie-konfiguration/get-or-create',
      handler: 'galerie-konfiguration.getOrCreate',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/galerie-konfiguration',
      handler: 'galerie-konfiguration.create',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'PUT',
      path: '/galerie-konfiguration/:id',
      handler: 'galerie-konfiguration.update',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'PUT',
      path: '/galerie-konfiguration',
      handler: 'galerie-konfiguration.update',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'DELETE',
      path: '/galerie-konfiguration/:id',
      handler: 'galerie-konfiguration.delete',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
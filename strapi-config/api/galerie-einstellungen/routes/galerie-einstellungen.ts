export default {
  routes: [
    {
      method: 'GET',
      path: '/galerie-einstellungen',
      handler: 'galerie-einstellungen.find',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/galerie-einstellungen',
      handler: 'galerie-einstellungen.create',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'PUT',
      path: '/galerie-einstellungen/:id',
      handler: 'galerie-einstellungen.update',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'PUT',
      path: '/galerie-einstellungen',
      handler: 'galerie-einstellungen.update',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'DELETE',
      path: '/galerie-einstellungen/:id',
      handler: 'galerie-einstellungen.delete',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
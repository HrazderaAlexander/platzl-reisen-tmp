export default {
  routes: [
    {
      method: 'GET',
      path: '/gallery-settings',
      handler: 'gallery-settings.find',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/gallery-settings',
      handler: 'gallery-settings.create',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'PUT',
      path: '/gallery-settings/:id',
      handler: 'gallery-settings.update',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'PUT',
      path: '/gallery-settings',
      handler: 'gallery-settings.update',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'DELETE',
      path: '/gallery-settings/:id',
      handler: 'gallery-settings.delete',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
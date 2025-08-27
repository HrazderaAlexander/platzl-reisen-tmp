export default {
  routes: [
    {
      method: 'GET',
      path: '/gallery-config',
      handler: 'gallery-config.find',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/gallery-config',
      handler: 'gallery-config.create',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'PUT',
      path: '/gallery-config/:id',
      handler: 'gallery-config.update',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'PUT',
      path: '/gallery-config',
      handler: 'gallery-config.update',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'DELETE',
      path: '/gallery-config/:id',
      handler: 'gallery-config.delete',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
export default {
  routes: [
    {
      method: 'GET',
      path: '/gallery-setting',
      handler: 'gallery-setting.find',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/gallery-setting',
      handler: 'gallery-setting.create',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'PUT',
      path: '/gallery-setting/:id',
      handler: 'gallery-setting.update',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'PUT',
      path: '/gallery-setting',
      handler: 'gallery-setting.update',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'DELETE',
      path: '/gallery-setting/:id',
      handler: 'gallery-setting.delete',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
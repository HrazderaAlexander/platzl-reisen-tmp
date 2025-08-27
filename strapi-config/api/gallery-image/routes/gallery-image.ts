export default {
  routes: [
    {
      method: 'GET',
      path: '/gallery-images',
      handler: 'gallery-image.find',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/gallery-images/:id',
      handler: 'gallery-image.findOne',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/gallery-images',
      handler: 'gallery-image.create',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'PUT',
      path: '/gallery-images/:id',
      handler: 'gallery-image.update',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'DELETE',
      path: '/gallery-images/:id',
      handler: 'gallery-image.delete',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
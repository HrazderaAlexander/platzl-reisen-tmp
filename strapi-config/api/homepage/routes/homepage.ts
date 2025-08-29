export default {
  routes: [
    {
      method: 'GET',
      path: '/homepage',
      handler: 'homepage.find',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/homepage/get-or-create',
      handler: 'homepage.getOrCreate',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/homepage',
      handler: 'homepage.create',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'PUT',
      path: '/homepage/:id',
      handler: 'homepage.update',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'PUT',
      path: '/homepage',
      handler: 'homepage.update',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'DELETE',
      path: '/homepage/:id',
      handler: 'homepage.delete',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
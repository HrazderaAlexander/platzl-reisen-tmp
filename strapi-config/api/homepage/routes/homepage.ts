export default {
  routes: [
    {
      method: 'GET',
      path: '/homepage',
      handler: 'homepage.findOne',
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
      method: 'PUT',
      path: '/homepage',
      handler: 'homepage.update',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
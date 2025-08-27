export default {
  routes: [
    {
      method: 'GET',
      path: '/reise-galeries',
      handler: 'reise-galerie.find',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/reise-galeries/:id',
      handler: 'reise-galerie.findOne',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/reise-galeries',
      handler: 'reise-galerie.create',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'PUT',
      path: '/reise-galeries/:id',
      handler: 'reise-galerie.update',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'DELETE',
      path: '/reise-galeries/:id',
      handler: 'reise-galerie.delete',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
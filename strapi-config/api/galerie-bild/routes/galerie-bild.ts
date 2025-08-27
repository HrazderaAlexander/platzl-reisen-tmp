export default {
  routes: [
    {
      method: 'GET',
      path: '/galerie-bilder',
      handler: 'galerie-bild.find',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/galerie-bilder/:id',
      handler: 'galerie-bild.findOne',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/galerie-bilder/active',
      handler: 'galerie-bild.findActive',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/galerie-bilder/featured',
      handler: 'galerie-bild.findFeatured',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/galerie-bilder/reise-datum/:reiseDatum',
      handler: 'galerie-bild.findByReiseDatum',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/galerie-bilder/year/:year',
      handler: 'galerie-bild.findByYear',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/galerie-bilder/location/:location',
      handler: 'galerie-bild.findByLocation',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/galerie-bilder/search/:searchTerm',
      handler: 'galerie-bild.search',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/galerie-bilder',
      handler: 'galerie-bild.create',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'PUT',
      path: '/galerie-bilder/:id',
      handler: 'galerie-bild.update',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'PUT',
      path: '/galerie-bilder/:id/sort-order',
      handler: 'galerie-bild.updateSortOrder',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'PUT',
      path: '/galerie-bilder/:id/toggle-active',
      handler: 'galerie-bild.toggleActive',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'PUT',
      path: '/galerie-bilder/:id/toggle-favorite',
      handler: 'galerie-bild.toggleFavorite',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'DELETE',
      path: '/galerie-bilder/:id',
      handler: 'galerie-bild.delete',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
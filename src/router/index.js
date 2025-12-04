import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/features/hundred-people/HundredPeople.vue')
    },
    {
      path: '/cartogram',
      name: 'cartogram',
      component: () => import('@/features/countries-cartogram/CountriesCartogram.vue')
    },
    {
      path: '/languages',
      name: 'languages',
      component: () => import('@/features/language-space/LanguageSpace.vue')
    },
    {
      path: '/compare',
      name: 'compare',
      component: () => import('@/features/compare/Compare.vue')
    }
  ]
})

export default router

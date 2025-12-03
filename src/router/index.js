import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/features/hundred-people/HundredPeople.vue')
    },
    {
      path: '/countries',
      name: 'countries',
      component: () => import('@/features/country-detail/CountryList.vue')
    },
    {
      path: '/countries/:code',
      name: 'country-detail',
      component: () => import('@/features/country-detail/CountryDetail.vue')
    },
    {
      path: '/compare',
      name: 'compare',
      component: () => import('@/features/compare/Compare.vue')
    }
  ]
})

export default router

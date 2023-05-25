import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../components/ProductPage.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../components/AdminPage.vue')
    },
  ]
})

export default router

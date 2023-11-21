import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/pages/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeView
    },
    {
      path: '/auth/register',
      name: 'register',
      component: () => import('@/pages/auth/Register.vue')
    },
    {
      path: '/auth/signin',
      name: 'signin',
      component: () => import('@/pages/auth/Signin.vue')
    }
  ]
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Main	Page',
      children: [
        {
          path: '/login',
          name: 'LoginView',
          component: () => import('../views/LoginView.vue')
        },
        {
          path: '/schedule',
          name: 'MenuPage',
          component: () => import('../views/MenuPage.vue'),
          redirect: () => {
            return {
              name: 'ScheduleRegister'
            }
          },
          children: [
            {
              path: 'register',
              name: 'ScheduleRegister',
              component: () => import('../views/ScheduleRegister.vue')
            },
            {
              path: 'view',
              name: 'ScheduleView',
              component: () => import('../views/ScheduleView.vue')
            }, 
            {
              path: '/teachers',
              name: 'TeacherManagement',
              component: () => import('../components/TeacherManagement.vue')
            }
          ]
        },
        {
          path: '*',
          name: 'NotFound',
          component: () => import('../views/NotFoundView.vue')
        }
      ]
    }
  ]
})

router.beforeEach((to) => {
  if (!localStorage.getItem('token') && to.name != 'LoginView') {
    return {
      name: 'LoginView'
    }
  }
})
export default router

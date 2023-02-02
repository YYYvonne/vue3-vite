import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/DataManagement'
    },
    {
      path: '/DataManagement',
      name: 'DataManagement',
      component: () => import('@/views/dataManagement/DataManagement.vue'),
    },
    {
      path: '/PanelControl',
      name: 'PanelControl',
      component: () => import('@/views/panelControl/PanelControl.vue'),
    }
  ]
})

export default router
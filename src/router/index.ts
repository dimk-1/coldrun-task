import { createRouter, createWebHistory } from 'vue-router';
import { routes } from '@/router/routes';

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
  }
});

export default router;

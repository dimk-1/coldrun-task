import type { RouteRecordRaw } from 'vue-router';
import { ErrorRouteName } from '../route-name/error';

export const errorRotes: RouteRecordRaw[] = [
  {
    path: '/:pathMatch(.*)*',
    name: ErrorRouteName.errorNotFound,
    component: () => import('@/views/error/NotFound.vue')
  }
];

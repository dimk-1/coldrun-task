import type { RouteRecordRaw } from 'vue-router';
import { AppRouteName } from '../route-name/app';

export const appRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: AppRouteName.TRUCK_LIST,
    component: () => import('@/views/TruckListView.vue')
  }
];

import { useRoute, useRouter } from 'vue-router';
import { AppRouteName } from '@/router/route-name/app';

export const useNavigation = () => {
  const route = useRoute();
  const router = useRouter();

  const goHome = async () => {
    await router.push({
      name: AppRouteName.TRUCK_LIST,
      params: {},
      query: {}
    });
  };

  return { route, router, goHome };
};

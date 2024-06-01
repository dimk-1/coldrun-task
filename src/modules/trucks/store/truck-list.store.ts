import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { useToast } from '@/composables/use-toast';

import type { ListOrder } from '@/common/constants/app';
import type { TruckSortBy } from '@/common/constants/truck';
import type { Truck } from '@/common/types/truck';

import { initialListState } from '../constants';
import { truckListService } from '../service';

export const useTruckListStore = defineStore('truck-list-store', () => {
  const truckList = ref([...initialListState.list]);
  const listQuery = ref({ ...initialListState.query });

  const previousCount = ref(0);

  const isError = ref(initialListState.isError);
  const isLoading = ref(initialListState.isLoading);
  const isInfiniteLoading = ref(initialListState.isInfiniteLoading);

  const showLoadMoreButton = computed(() => {
    return (
      isInfiniteLoading.value ||
      truckList.value.length >= listQuery.value.limit * listQuery.value.page
    );
  });

  const getTruckList = async (infiniteLoad = false) => {
    isLoading.value = !infiniteLoad;
    isInfiniteLoading.value = infiniteLoad;

    listQuery.value.page = infiniteLoad ? listQuery.value.page : initialListState.query.page;

    try {
      const { data } = await truckListService.getTruckList(listQuery.value);

      if (!infiniteLoad) {
        truckList.value = [...data];
      } else {
        truckList.value = [...truckList.value, ...data];
      }

      previousCount.value = data.length;
    } catch (error) {
      isError.value = true;

      const { errorToast, getError } = useToast();

      errorToast(getError(error));
    } finally {
      isLoading.value = false;
      isInfiniteLoading.value = false;
    }
  };

  const deleteTruck = async (truckId: Truck['id']) => {
    if (!truckId) {
      return;
    }

    try {
      await truckListService.deleteTruck(truckId);

      truckList.value = truckList.value.filter((truck) => truck.id !== truckId);
    } catch (error) {
      isError.value = true;

      const { errorToast, getError } = useToast();

      errorToast(getError(error));
    }
  };

  const sortTruckList = ({ sortBy, sortOrder }: { sortBy: TruckSortBy; sortOrder: ListOrder }) => {
    listQuery.value.sort = sortBy;
    listQuery.value.order = sortOrder;

    getTruckList();
  };

  const loadMore = () => {
    listQuery.value.page += 1;
    getTruckList(true);
  };

  const resetState = () => {
    isError.value = initialListState.isError;
    isLoading.value = initialListState.isLoading;
    isInfiniteLoading.value = initialListState.isInfiniteLoading;

    listQuery.value = { ...initialListState.query };
    truckList.value = [...initialListState.list];

    previousCount.value = 0;
  };

  return {
    isError,
    isLoading,
    isInfiniteLoading,
    listQuery,
    showLoadMoreButton,
    truckList,
    getTruckList,
    sortTruckList,
    loadMore,
    deleteTruck,
    resetState
  };
});

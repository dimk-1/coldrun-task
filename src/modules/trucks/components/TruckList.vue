<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { onBeforeMount } from 'vue';
import { Severity, Size } from '@/common/constants/components';
import { useLocale } from '@/composables/use-locale';
import { useToast } from '@/composables/use-toast';

import { useTruckListStore } from '../store/truck-list.store';
import { useTruckFormStore } from '../store/truck-form.store';

import AppButton from '@/components/AppButton.vue';
import AppLoader from '@/components/AppLoader.vue';
import AppNoData from '@/components/AppNoData.vue';
import AppReloadBlock from '@/components/AppReloadBlock.vue';
import AppTitle from '@/components/AppTitle.vue';

import TruckListFilter from './TruckListFilter.vue';
import TruckListTable from './TruckListTable.vue';

const { t } = useLocale();
const truckListStore = useTruckListStore();
const truckFormStore = useTruckFormStore();

const { truckList, showLoadMoreButton, isLoading, isInfiniteLoading, isError } =
  storeToRefs(truckListStore);

const deleteTruck = async (truckId: number) => {
  await truckListStore.deleteTruck(truckId);

  if (!isError.value) {
    const { successToast } = useToast();

    successToast(t('toast.deleteSuccess'));
  }
};

const updateTruck = (truckId: number) => {
  truckFormStore.setSelectedTruckId(truckId);
  truckFormStore.toggleForm();
};

onBeforeMount(() => {
  truckListStore.getTruckList();
});
</script>

<i18n src="../locale/truck.locale.yaml" lang="yaml" />

<template>
  <div class="flex gap-4 justify-between items-center mb-4">
    <AppTitle>
      {{ t('list.title') }}
    </AppTitle>

    <div>
      <AppButton
        :is-disabled="isLoading || isInfiniteLoading"
        is-outlined
        :size="Size.xs"
        @click="truckFormStore.toggleForm()"
      >
        {{ t('list.addNewTruck') }}
      </AppButton>
    </div>
  </div>

  <TruckListFilter />

  <div v-if="isLoading" class="w-full flex justify-center">
    <AppLoader />
  </div>

  <AppReloadBlock v-else-if="isError" @reload="truckListStore.getTruckList()" />

  <div v-else>
    <template v-if="truckList.length">
      <TruckListTable
        :truck-list="truckList"
        :is-infinite-loading="isInfiniteLoading"
        @remove-truck="deleteTruck"
        @edit-truck="updateTruck"
      />

      <div class="mt-4" v-if="showLoadMoreButton">
        <AppButton
          is-outlined
          :is-loading="isInfiniteLoading"
          :severity="Severity.secondary"
          :size="Size.xs"
          @click="truckListStore.loadMore()"
        >
          {{ t('list.loadMore') }}
        </AppButton>
      </div>
    </template>

    <AppNoData v-else />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { applicationDefaults } from '@/common/constants/app';
import { useLocale } from '@/composables/use-locale';

import { useTruckStatus } from '../composables/use-truck-status';
import { useTruckListStore } from '../store/truck-list.store';

import AppInputText from '@/components/AppInputText.vue';
import AppSelect from '@/components/AppSelect.vue';

const truckListStore = useTruckListStore();

const { t } = useLocale();
const { statusOptions } = useTruckStatus();
const { isLoading, isInfiniteLoading, isError, listQuery } = storeToRefs(truckListStore);

const filterChanged = () => {
  truckListStore.getTruckList();
};
</script>

<i18n src="../locale/truck.locale.yaml" lang="yaml" />

<template>
  <div class="truck-list-filter">
    <AppInputText
      :debounce="applicationDefaults.debounce"
      :label="t('id')"
      :is-disabled="isLoading || isInfiniteLoading || isError"
      v-model="listQuery.id"
      @input="filterChanged()"
    />

    <AppInputText
      :debounce="applicationDefaults.debounce"
      :label="t('name')"
      :is-disabled="isLoading || isInfiniteLoading || isError"
      v-model="listQuery.name"
      @input="filterChanged()"
    />

    <AppInputText
      :debounce="applicationDefaults.debounce"
      :label="t('code')"
      :is-disabled="isLoading || isInfiniteLoading || isError"
      v-model="listQuery.code"
      @input="filterChanged()"
    />

    <AppSelect
      :is-clearable="Boolean(listQuery.status)"
      :debounce="applicationDefaults.debounce"
      :label="t('status')"
      :is-disabled="isLoading || isInfiniteLoading || isError"
      :options="statusOptions"
      v-model="listQuery.status"
      @change="filterChanged()"
    />

    <AppInputText
      :debounce="applicationDefaults.debounce"
      :label="t('description')"
      :is-disabled="isLoading || isInfiniteLoading || isError"
      v-model="listQuery.description"
      @input="filterChanged()"
    />
  </div>
</template>

<style scoped lang="scss">
.truck-list-filter {
  @apply grid gap-4;
  @apply grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5;
  @apply p-4 mb-4;
  @apply bg-white rounded-md border border-slate-200;
}
</style>

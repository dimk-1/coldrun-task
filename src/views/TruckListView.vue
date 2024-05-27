<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { onBeforeUnmount } from 'vue';

import { useTruckListStore } from '@/modules/trucks/store/truck-list.store';
import { useTruckFormStore } from '@/modules/trucks/store/truck-form.store';

import TruckList from '@/modules/trucks/components/TruckList.vue';
import TruckForm from '@/modules/trucks/components/TruckForm.vue';

const truckListStore = useTruckListStore();
const truckFormStore = useTruckFormStore();

const { isShown } = storeToRefs(truckFormStore);

onBeforeUnmount(() => {
  truckListStore.resetState();
});
</script>

<template>
  <TruckList />

  <TruckForm v-if="isShown" @submit="truckListStore.getTruckList()" />
</template>

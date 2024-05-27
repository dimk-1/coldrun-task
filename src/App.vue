<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { useApplicationStore } from '@/store/modules/application';

import AppHeader from '@/components/AppHeader.vue';
import ContentLayout from '@/layouts/ContentLayout.vue';

const applicationStore = useApplicationStore();

onBeforeMount(() => {
  applicationStore.updateI18n();
});
</script>

<template>
  <AppHeader />
  <ContentLayout>
    <RouterView />
  </ContentLayout>
</template>

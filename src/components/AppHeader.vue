<script setup lang="ts">
import { useNavigation } from '@/composables/use-navigation';

import ContentLayout from '@/layouts/ContentLayout.vue';
import AppLanguageSwitcher from '@/components/AppLanguageSwitcher.vue';
import IconLogo from '@/components/icons/IconLogo.vue';

const { goHome } = useNavigation();
</script>

<template>
  <header class="bg-coldrun border-b border-slate-200">
    <ContentLayout class="flex justify-between items-center">
      <IconLogo class="h-6 w-auto hover:cursor-pointer" @click="goHome()" />
      <AppLanguageSwitcher />
    </ContentLayout>
  </header>
</template>

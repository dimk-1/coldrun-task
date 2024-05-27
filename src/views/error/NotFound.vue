<script setup lang="ts">
import { Severity, Size } from '@/common/constants/components';
import { useLocale } from '@/composables/use-locale';
import { useNavigation } from '@/composables/use-navigation';

import AppButton from '@/components/AppButton.vue';

const { t } = useLocale();
const { goHome } = useNavigation();
</script>

<template>
  <div class="not-found">
    <div>
      <h1>
        {{ t('common.pageNotFound') }}
      </h1>
      <h3>
        {{ t('common.pageNotFoundMessage') }}
      </h3>
      <AppButton class="mt-4" :size="Size.xs" :severity="Severity.secondary" @click="goHome()">
        {{ t('common.goHome') }}
      </AppButton>
    </div>
  </div>
</template>

<style scoped lang="scss">
.not-found {
  @apply flex items-center justify-center;
  @apply text-coldrun;
  height: calc(100vh - 2rem - 57px);

  h1 {
    @apply text-4xl font-bold;
  }

  h3 {
    @apply text-xl;
  }
}
</style>

<script setup lang="ts">
import { useSlots } from 'vue';
import { useLocale } from '@/composables/use-locale';

const slots = useSlots();
const { t } = useLocale();
</script>

<i18n src="@/locale/components/app-no-data.yaml" lang="yaml" />

<template>
  <div class="app-no-data">
    <div v-if="slots['icon']" class="app-no-data__icon" unit-test="icon">
      <slot name="icon" />
    </div>
    <div class="app-no-data__message" unit-test="message">
      <slot>
        {{ t('message') }}
      </slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.app-no-data {
  @apply py-8 bg-slate-100 rounded-lg border border-slate-200;

  &__image {
    @apply text-slate-400;
    @apply mb-6 flex items-center justify-center;
  }

  &__message {
    @apply text-center text-slate-500 text-sm leading-none;
  }
}
</style>

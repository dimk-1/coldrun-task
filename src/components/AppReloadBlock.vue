<script setup lang="ts">
import { Severity, Size } from '@/common/constants/components';
import { useLocale } from '@/composables/use-locale';

import AppButton from '@/components/AppButton.vue';

const emit = defineEmits(['reload']);

const { t } = useLocale();
</script>

<i18n src="@/locale/components/app-reload-block.yaml" lang="yaml" />

<template>
  <div class="flex flex-col gap-4 items-center border border-slate-300 rounded-md bg-white p-4">
    <div>
      <div class="text-center text-lg font-semibold text-warning-600 mb-2">
        {{ t('errorTitle') }}
      </div>
      <div class="text-center text-sm text-secondary-500">
        <p>{{ t('contentError_1') }}</p>
        <p>{{ t('contentError_2') }}</p>
      </div>
    </div>
    <div>
      <AppButton is-outlined :severity="Severity.primary" :size="Size.xs" @click="emit('reload')">
        {{ t('reload') }}
      </AppButton>
    </div>
  </div>
</template>

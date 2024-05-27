<script setup lang="ts">
import { LanguageCode } from '@/common/constants/locale';
import { useApplicationStore } from '@/store/modules/application';

import IconPoland from '@/components/icons/countries/IconPoland.vue';
import IconUnitedStates from '@/components/icons/countries/IconUnitedStates.vue';

const applicationStore = useApplicationStore();
</script>

<template>
  <div class="flex gap-2">
    <IconPoland
      class="language-icon"
      :class="{ 'opacity-40': applicationStore.languageCode !== LanguageCode.pl }"
      @click="applicationStore.setLanguage(LanguageCode.pl)"
    />
    <IconUnitedStates
      class="language-icon"
      :class="{ 'opacity-40': applicationStore.languageCode !== LanguageCode.en }"
      @click="applicationStore.setLanguage(LanguageCode.en)"
    />
  </div>
</template>

<style scoped lang="scss">
.language-icon {
  @apply h-3 hover:cursor-pointer;
}
</style>

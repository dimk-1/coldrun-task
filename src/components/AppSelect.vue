<script setup lang="ts">
import { v4 as uuid } from 'uuid';
import { computed, defineAsyncComponent, ref, useSlots } from 'vue';
import type { PropType } from 'vue';

import type { Nullable } from '@/common/types/app';

import PVDropdown, { type DropdownPassThroughOptions } from 'primevue/dropdown';

const AppFormLabel = defineAsyncComponent(() => import('@/components/app-form/AppFormLabel.vue'));
const AppFormError = defineAsyncComponent(() => import('@/components/app-form/AppFormError.vue'));

const emit = defineEmits(['update:modelValue', 'change']);

const props = defineProps({
  idPrefix: {
    type: String,
    description: 'A unique identifier used to generate IDs in HTML',
    default: () => uuid()
  },
  isClearable: {
    type: Boolean,
    default: false,
    description: 'Whether the select has a clear button'
  },
  isDisabled: {
    type: Boolean,
    default: false,
    description: 'Whether component is disabled'
  },
  isError: {
    type: Boolean,
    default: false,
    description: 'Whether component is in error state'
  },
  label: {
    type: String,
    description: "Component's label",
    default: ''
  },
  modelValue: {
    type: String as PropType<Nullable<string>>,
    description: 'Input value',
    default: ''
  },
  options: {
    type: Array as PropType<Array<{ label: string; value: string; image?: string }>>,
    default: () => []
  },
  placeholder: {
    type: String,
    description: "Component's placeholder",
    default: ''
  },
  pt: {
    type: Object as PropType<DropdownPassThroughOptions>
  }
});

const slots = useSlots();

const isOpen = ref(false);

const model = computed({
  get: () => props.modelValue,
  set: (val: Nullable<string>) => {
    emit('update:modelValue', val);
    emit('change', val);
  }
});

const additionalAttributes = computed(() => {
  const attrs: Record<string, string> = {};

  return Object.keys(attrs).length ? attrs : null;
});

const passThroughOptions = computed<DropdownPassThroughOptions>(() => {
  const options: DropdownPassThroughOptions = {
    ...(props.pt ?? {})
  };

  const input = `py-2 text-xs ${model.value ? '' : 'text-slate-400'} ${props.pt?.input ?? ''}`;
  const rootError = props.isError ? 'border-danger-600 text-danger-600' : '';

  options.root = `${rootError} ${props.pt?.root ?? ''}`;
  options.input = `${input} ${props.pt?.input ?? ''}`;
  options.item = `py-2 text-sm ${props.pt?.item ?? ''}`;
  options.trigger = `transition-all ${isOpen.value ? 'rotate-180' : ''}`;

  return options;
});
</script>

<template>
  <div class="flex flex-col gap-px w-full">
    <AppFormLabel v-if="props.label" :for="props.idPrefix">
      <slot name="label">
        {{ props.label }}
      </slot>
    </AppFormLabel>
    <PVDropdown
      :bind="additionalAttributes"
      :id="props.idPrefix"
      :show-clear="$props.isClearable"
      :disabled="props.isDisabled"
      :aria-describedby="props.label"
      :placeholder="props.placeholder"
      :options="props.options"
      :pt="passThroughOptions"
      optionLabel="label"
      optionValue="value"
      v-model="model"
      @before-show="isOpen = true"
      @before-hide="isOpen = false"
    >
      <template v-if="slots.value" #value="{ value }">
        <slot name="value" :value="value" />
      </template>
      <template v-if="slots.option" #option="{ option }">
        <slot name="option" :option="option" />
      </template>
    </PVDropdown>
    <AppFormError v-if="slots.error">
      <slot name="error" />
    </AppFormError>
  </div>
</template>

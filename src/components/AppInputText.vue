<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core';
import { v4 as uuid } from 'uuid';
import { computed, defineAsyncComponent, useSlots } from 'vue';
import type { PropType } from 'vue';

import type { Nullable } from '@/common/types/app';

import AppForm from '@/components/app-form/AppForm.vue';
import PVInputText, { type InputTextPassThroughOptions } from 'primevue/inputtext';

const AppFormLabel = defineAsyncComponent(() => import('@/components/app-form/AppFormLabel.vue'));
const AppFormError = defineAsyncComponent(() => import('@/components/app-form/AppFormError.vue'));

const slots = useSlots();
const emit = defineEmits(['update:modelValue', 'input']);

const props = defineProps({
  debounce: {
    type: Number,
    default: 0,
    description: 'Whether component debounces input changes'
  },
  idPrefix: {
    type: String,
    description: 'A unique identifier used to generate IDs in HTML',
    default: () => uuid()
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
  isReadonly: {
    type: Boolean,
    default: false,
    description: 'Whether component is readonly'
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
  placeholder: {
    type: String,
    description: "Component's placeholder",
    default: ''
  },
  pt: {
    type: Object as PropType<InputTextPassThroughOptions>
  }
});

const model = computed({
  get: () => props.modelValue,
  set: useDebounceFn((val) => {
    if (!props.isReadonly) {
      emit('update:modelValue', val);
      emit('input');
    }
  }, props.debounce)
});

const passThroughOptions = computed<InputTextPassThroughOptions>(() => {
  const options: InputTextPassThroughOptions = {
    ...(props.pt ?? {})
  };

  let root = 'py-2 text-xs w-full placeholder:text-slate-400';
  const rootError = props.isError ? 'border-danger-600 text-danger-600' : '';

  options.root = `${root} ${rootError} ${props.pt?.root ?? ''}`;

  return options;
});
</script>

<template>
  <AppForm>
    <AppFormLabel v-if="props.label || slots.label" :for="props.idPrefix">
      <slot name="label">
        {{ props.label }}
      </slot>
    </AppFormLabel>
    <PVInputText
      type="text"
      :disabled="props.isDisabled"
      :id="props.idPrefix"
      :aria-describedby="props.label"
      :placeholder="props.placeholder"
      :pt="passThroughOptions"
      v-model="model"
    />
    <AppFormError v-if="slots.error">
      <slot name="error" />
    </AppFormError>
  </AppForm>
</template>

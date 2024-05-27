<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed, onBeforeMount, onBeforeUnmount, onMounted, ref } from 'vue';
import { FormMode } from '@/common/constants/app';
import { Breakpoint, Position, Severity } from '@/common/constants/components';
import { generateUniqueCode } from '@/common/utils/numeric-operations';
import { useLocale } from '@/composables/use-locale';
import { useMediaQuery } from '@/composables/use-media-query';
import { useToast } from '@/composables/use-toast';
import { useValidation } from '@/composables/use-validation';

import { useTruckStatus } from '../composables/use-truck-status';
import { useTruckFormStore } from '../store/truck-form.store';

import AppButton from '@/components/AppButton.vue';
import AppLoader from '@/components/AppLoader.vue';
import AppInputText from '@/components/AppInputText.vue';
import AppSelect from '@/components/AppSelect.vue';
import AppSlideOver from '@/components/app-slide-over/AppSlideOver.vue';
import AppSlideOverActions from '@/components/app-slide-over/AppSlideOverActions.vue';
import AppSlideOverTitle from '@/components/app-slide-over/AppSlideOverTitle.vue';

const emit = defineEmits<{
  (event: 'submit'): void;
}>();

const showSlideOver = ref(false);
const formMode = ref(FormMode.Create);
const truckFormStore = useTruckFormStore();

const { t } = useLocale();
const { screenMD } = useMediaQuery();
const { getAvailableStatusOptions } = useTruckStatus();
const { helpers, required, minLength, validateFn } = useValidation();
const { initialStatus, truckForm, selectedTruckId, isLoading, isSaving, isError } =
  storeToRefs(truckFormStore);
const { createNewTruck, getTruckDetail, updateTruck, toggleForm, resetStore } = truckFormStore;

const rules = computed(() => ({
  code: {
    required: helpers.withMessage(t('validation.required'), required),
    minLength: helpers.withMessage(t('validation.minLength', { value: 1 }), minLength(1))
  },
  name: {
    required: helpers.withMessage(t('validation.required'), required),
    minLength: helpers.withMessage(t('validation.minLength', { value: 1 }), minLength(1))
  },
  status: {
    required: helpers.withMessage(t('validation.required'), required)
  }
}));

const availableStatusOptions = computed(() => getAvailableStatusOptions(initialStatus.value));

const generateCode = () => {
  truckForm.value.code = generateUniqueCode();
};

const close = () => {
  showSlideOver.value = false;
};

const validate = validateFn(rules, truckForm);

const submitForm = async () => {
  const isValid = await validate.value.$validate();

  if (!isValid) return;

  formMode.value === FormMode.Create ? await createNewTruck() : await updateTruck();

  if (!isError.value) {
    const { successToast } = useToast();

    successToast(
      formMode.value === FormMode.Create ? t('toast.createSuccess') : t('toast.updateSuccess')
    );
    emit('submit');
    close();
  }
};

onMounted(() => {
  showSlideOver.value = true;
});

onBeforeMount(() => {
  if (selectedTruckId.value) {
    formMode.value = FormMode.Update;
    getTruckDetail();
  }
});

onBeforeUnmount(() => {
  resetStore();
});
</script>

<i18n src="../locale/truck.locale.yaml" lang="yaml" />

<template>
  <AppSlideOver
    :close-on-background="false"
    :position="screenMD ? Position.Right : Position.Bottom"
    :size="Breakpoint.md"
    v-model="showSlideOver"
    @closed="toggleForm()"
  >
    <AppSlideOverTitle>
      <template v-if="formMode === FormMode.Create">
        {{ t('form.addTitle') }}
      </template>
      <template v-else-if="formMode === FormMode.Update">
        {{ t('form.updateTitle') }}
      </template>
    </AppSlideOverTitle>

    <AppLoader v-if="isLoading" />

    <form v-else @submit.prevent="submitForm" class="flex flex-col gap-2">
      <AppInputText
        v-model="truckForm.code"
        :rules="rules.code"
        :is-error="validate.code.$error"
        :is-disabled="isSaving"
      >
        <template #label>
          <div class="flex justify-between">
            <div>{{ t('code') }}</div>
            <div
              class="hover:cursor-pointer hover:text-primary-500 transition-colors duration-200"
              @click.prevent="generateCode()"
            >
              {{ t('form.generateCode') }}
            </div>
          </div>
        </template>
        <template #error v-if="validate.code.$error">
          {{ validate.code.$errors[0]?.$message }}
        </template>
      </AppInputText>

      <AppInputText
        v-model="truckForm.name"
        :label="t('name')"
        :rules="rules.name"
        :is-error="validate.name.$error"
        :is-disabled="isSaving"
        :is-required="true"
      >
        <template #error v-if="validate.name.$error">
          {{ validate.name.$errors[0]?.$message }}
        </template>
      </AppInputText>

      <AppSelect
        v-model="truckForm.status"
        :label="t('status')"
        :rules="rules.status"
        :is-error="validate.status.$error"
        :is-disabled="isSaving"
        :is-required="true"
        :options="availableStatusOptions"
      >
        <template #error v-if="validate.status.$error">
          {{ validate.status.$errors[0]?.$message }}
        </template>
      </AppSelect>

      <AppInputText
        v-model="truckForm.description"
        :label="`${t('description')} (${t('common.optional')})`"
        :is-disabled="isSaving"
      />

      <AppSlideOverActions>
        <template #cancel>
          <AppButton is-outlined :severity="Severity.secondary" @click="close" type="button">
            {{ t('common.cancel') }}
          </AppButton>
        </template>
        <template #submit>
          <AppButton v-if="formMode === FormMode.Create" :is-loading="isSaving" type="submit">
            {{ t('form.actionAdd') }}
          </AppButton>
          <AppButton v-else-if="formMode === FormMode.Update" :is-loading="isSaving" type="submit">
            {{ t('form.actionUpdate') }}
          </AppButton>
        </template>
      </AppSlideOverActions>
    </form>
  </AppSlideOver>
</template>

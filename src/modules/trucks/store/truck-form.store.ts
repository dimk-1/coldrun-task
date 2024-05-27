import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useToast } from '@/composables/use-toast';

import { initialFormState } from '../constants';
import { truckListService } from '../service';

export const useTruckFormStore = defineStore('truck-form-store', () => {
  const truckForm = ref({ ...initialFormState.form });
  const initialStatus = ref(initialFormState.initialStatus);

  const isError = ref(initialFormState.isError);
  const isLoading = ref(initialFormState.isLoading);
  const isSaving = ref(initialFormState.isSaving);
  const isShown = ref(initialFormState.isShown);

  const selectedTruckId = ref(initialFormState.selectedTruckId);

  const toggleForm = () => {
    isShown.value = !isShown.value;
  };

  const setSelectedTruckId = (id: number) => {
    selectedTruckId.value = id;
  };

  const getTruckDetail = async () => {
    if (!selectedTruckId.value) {
      return;
    }

    isLoading.value = true;

    try {
      const { data } = await truckListService.getTruckDetail(selectedTruckId.value);

      truckForm.value = { ...data };
      initialStatus.value = data.status;
    } catch (error) {
      isError.value = true;

      const { errorToast, getError } = useToast();

      errorToast(getError(error));
    } finally {
      isLoading.value = false;
    }
  };

  const createNewTruck = async () => {
    isSaving.value = true;

    try {
      const { data } = await truckListService.createTruck(truckForm.value);

      truckForm.value = { ...data };
    } catch (error) {
      isError.value = true;

      const { errorToast, getError } = useToast();

      errorToast(getError(error));
    } finally {
      isSaving.value = false;
    }
  };

  const updateTruck = async () => {
    if (!selectedTruckId.value) {
      return;
    }

    isSaving.value = true;

    try {
      const { data } = await truckListService.updateTruck(selectedTruckId.value, truckForm.value);

      truckForm.value = { ...data };
    } catch (error) {
      isError.value = true;

      const { errorToast, getError } = useToast();

      errorToast(getError(error));
    } finally {
      isSaving.value = false;
    }
  };

  const resetStore = () => {
    isError.value = initialFormState.isError;
    isLoading.value = initialFormState.isLoading;
    isSaving.value = initialFormState.isSaving;
    isShown.value = initialFormState.isShown;
    selectedTruckId.value = initialFormState.selectedTruckId;

    truckForm.value = { ...initialFormState.form };
    initialStatus.value = initialFormState.initialStatus;
  };

  return {
    isError,
    isLoading,
    isSaving,
    isShown,
    selectedTruckId,
    initialStatus,
    truckForm,
    toggleForm,
    setSelectedTruckId,
    getTruckDetail,
    createNewTruck,
    updateTruck,
    resetStore
  };
});

<script setup lang="ts">
import { Severity, Size } from '@/common/constants/components';
import { TruckStatus } from '@/common/constants/truck';
import { useLocale } from '@/composables/use-locale';

import type { Truck } from '@/common/types/truck';

import AppButton from '@/components/AppButton.vue';

import ConfirmDialog from 'primevue/confirmdialog';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag';

import { useConfirm } from 'primevue/useconfirm';

const emit = defineEmits<{
  (event: 'remove-truck', truckId: number): void;
  (event: 'edit-truck', truckId: number): void;
}>();

const props = defineProps<{
  truckList: Truck[];
  isInfiniteLoading: boolean;
}>();

const confirm = useConfirm();

const { t } = useLocale();

const passThrough = {
  table: {
    thead: ['text-sm'],
    tbody: ['text-xs']
  },
  column: {
    sortIcon: ['size-3']
  },
  actions: {
    headerContent: ['justify-end']
  }
};

const getTagColor = (status: TruckStatus) => {
  switch (status) {
    case TruckStatus.outOfService:
      return 'danger';
    case TruckStatus.loading:
      return 'warning';
    case TruckStatus.toJob:
      return 'primary';
    case TruckStatus.atJob:
      return 'info';
    case TruckStatus.returning:
      return 'success';
    default:
      return 'secondary';
  }
};

const editTruck = (truckId: number) => {
  emit('edit-truck', truckId);
};

const deleteTruck = (truckId: number) => {
  confirm.require({
    accept: () => {
      emit('remove-truck', truckId);
    }
  });
};
</script>

<i18n src="../locale/truck.locale.yaml" lang="yaml" />

<template>
  <ConfirmDialog
    :pt="{
      acceptButton: {
        root: [
          'bg-danger-600 text-white rounded-[8px] border-none',
          'hover:bg-danger-700',
          'focus:outline-none focus:ring-[3px] focus:ring-danger-200 focus:bg-danger-700',
          'active:ring-[3px] active:ring-danger-200 active:bg-danger-700'
        ]
      },
      rejectButton: {
        root: [
          'bg-white text-secondary-800 rounded-[8px] border-[1px] border-secondary-200',
          'hover:bg-secondary-300 hover:text-secondary-800',
          'focus:bg-secondary-300 focus:text-secondary-800',
          'active:bg-secondary-300 active:text-secondary-800'
        ]
      }
    }"
  >
    <template #message>
      {{ t('list.confirmDelete') }}
    </template>
  </ConfirmDialog>

  <DataTable stripedRows size="small" :value="props.truckList" :pt="passThrough.table">
    <Column field="id" sortable :header="t('id')" class="w-16" :pt="passThrough.column" />

    <Column field="name" sortable :header="t('name')" :pt="passThrough.column" />

    <Column field="code" sortable :header="t('code')" :pt="passThrough.column">
      <template #body="slotProps">
        <span class="font-medium">
          {{ slotProps.data.code }}
        </span>
      </template>
    </Column>

    <Column field="status" sortable :header="t('status')" :pt="passThrough.column">
      <template #body="slotProps">
        <Tag
          :value="t(`enum.truckStatus.${slotProps.data.status}`)"
          :severity="getTagColor(slotProps.data.status)"
          :pt="{ root: ['text-[10px] px-2 font-medium tracking-wide'] }"
        />
      </template>
    </Column>

    <Column :header="t('list.actions')" :pt="passThrough.actions">
      <template #body="slotProps">
        <div class="flex gap-2 justify-end">
          <AppButton
            is-outlined
            :is-disabled="props.isInfiniteLoading"
            :size="Size.xs"
            @click="editTruck(slotProps.data.id)"
          >
            {{ t('list.edit') }}
          </AppButton>
          <AppButton
            is-outlined
            :is-disabled="props.isInfiniteLoading"
            :size="Size.xs"
            :severity="Severity.danger"
            @click="deleteTruck(slotProps.data.id)"
          >
            {{ t('list.delete') }}
          </AppButton>
        </div>
      </template>
    </Column>
  </DataTable>
</template>

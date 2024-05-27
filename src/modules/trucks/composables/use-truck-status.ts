import { computed } from 'vue';
import { TruckStatus } from '@/common/constants/truck';
import { useLocale } from '@/composables/use-locale';

export const useTruckStatus = () => {
  const { t } = useLocale();

  const allowedTransitions: { [key in TruckStatus]: TruckStatus[] } = {
    [TruckStatus.outOfService]: [
      TruckStatus.outOfService,
      TruckStatus.loading,
      TruckStatus.toJob,
      TruckStatus.atJob,
      TruckStatus.returning
    ],
    [TruckStatus.loading]: [TruckStatus.loading, TruckStatus.toJob, TruckStatus.outOfService],
    [TruckStatus.toJob]: [TruckStatus.toJob, TruckStatus.atJob, TruckStatus.outOfService],
    [TruckStatus.atJob]: [TruckStatus.atJob, TruckStatus.returning, TruckStatus.outOfService],
    [TruckStatus.returning]: [TruckStatus.returning, TruckStatus.loading, TruckStatus.outOfService]
  };

  const getAvailableStatusOptions = (
    currentStatus: TruckStatus
  ): { label: string; value: TruckStatus }[] => {
    return allowedTransitions[currentStatus].map((type) => ({
      label: t(`enum.truckStatus.${type}`),
      value: type
    }));
  };

  const statusOptions = computed(() =>
    Object.values(TruckStatus).map((type) => ({
      label: t(`enum.truckStatus.${type}`),
      value: type
    }))
  );

  return { getAvailableStatusOptions, statusOptions };
};

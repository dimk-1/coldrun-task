import { TruckStatus } from '@/common/constants/truck';
import type { Translations } from '@/common/types/locale';

export const enumLocale: Translations = {
  en: {
    enum: {
      truckStatus: {
        [TruckStatus.outOfService]: 'Out of service',
        [TruckStatus.loading]: 'Loading',
        [TruckStatus.toJob]: 'To job',
        [TruckStatus.atJob]: 'At job',
        [TruckStatus.returning]: 'Returning'
      }
    }
  },
  pl: {
    enum: {
      truckStatus: {
        [TruckStatus.outOfService]: 'Poza serwisem',
        [TruckStatus.loading]: 'Ładowanie',
        [TruckStatus.toJob]: 'Do pracy',
        [TruckStatus.atJob]: 'W pracy',
        [TruckStatus.returning]: 'Powrót'
      }
    }
  }
};

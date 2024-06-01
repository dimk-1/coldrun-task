import type { TruckStatus } from '@/common/constants/truck';

export interface Truck {
  id: string;
  code: string;
  name: string;
  status: TruckStatus;
  description?: string;
}

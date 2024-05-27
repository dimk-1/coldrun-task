import type { TruckStatus } from '@/common/constants/truck';

export interface Truck {
  id: number;
  code: string;
  name: string;
  status: TruckStatus;
  description?: string;
}

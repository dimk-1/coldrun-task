import type { TruckSortBy, TruckStatus } from '@/common/constants/truck';
import type { Nullable, WithEmptyString } from '@/common/types/app';

import type { QueryList } from '@/common/types/app';
import type { Truck } from '@/common/types/truck';

export interface TruckListQuery extends QueryList<WithEmptyString<TruckSortBy>> {
  id: string;
  code: string;
  name: string;
  status: WithEmptyString<TruckStatus>;
  description: string;
}

export interface TruckListState {
  isLoading: boolean;
  isInfiniteLoading: boolean;
  isError: boolean;
  list: Truck[];
  query: TruckListQuery;
}

export interface TruckForm extends Omit<Truck, 'id' | 'status'> {
  id: Nullable<number>;
  status: WithEmptyString<TruckStatus>;
}

export interface TruckFormState {
  form: TruckForm;
  initialStatus: TruckStatus;
  selectedTruckId: Nullable<number>;
  isLoading: boolean;
  isError: boolean;
  isSaving: boolean;
  isShown: boolean;
}

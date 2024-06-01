import type { TruckSortBy, TruckStatus } from '@/common/constants/truck';
import type { Nullable, WithEmptyString } from '@/common/types/app';

import type { QueryList } from '@/common/types/app';
import type { Truck } from '@/common/types/truck';

export interface TruckListQuery extends QueryList<TruckSortBy> {
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

export interface TruckForm extends Omit<Truck, 'id'> {
  id: Nullable<Truck['id']>;
}

export interface TruckFormState {
  form: TruckForm;
  initialStatus: TruckStatus;
  selectedTruckId: Nullable<Truck['id']>;
  isLoading: boolean;
  isError: boolean;
  isSaving: boolean;
  isShown: boolean;
}

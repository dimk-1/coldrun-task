import { applicationDefaults } from '@/common/constants/app';
import { TruckStatus } from '@/common/constants/truck';

import type { TruckListState, TruckFormState } from './types';

export const initialListState: TruckListState = {
  isLoading: false,
  isInfiniteLoading: false,
  isError: false,
  list: [],
  query: {
    limit: applicationDefaults.limit,
    page: applicationDefaults.page,
    order: applicationDefaults.order,
    sort: '',
    id: '',
    code: '',
    name: '',
    status: '',
    description: ''
  }
};

export const initialFormState: TruckFormState = {
  form: {
    id: null,
    code: '',
    name: '',
    status: TruckStatus.outOfService,
    description: ''
  },
  initialStatus: TruckStatus.outOfService,
  selectedTruckId: null,
  isLoading: false,
  isError: false,
  isSaving: false,
  isShown: false
};

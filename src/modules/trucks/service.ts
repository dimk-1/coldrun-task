import { api } from '@/common/utils/api-utils';
import { apiClient } from '@/service/api-client';

import type { Truck } from '@/common/types/truck';
import type { TruckListQuery, TruckForm } from './types';

class TruckListService {
  getTruckList = async (query: TruckListQuery) => {
    const { data } = await apiClient.get<Truck[]>(api.getUrl(`trucks`), {
      params: api.removeEmptyParams(query)
    });

    return { data };
  };

  getTruckDetail = async (id: number) => {
    const { data } = await apiClient.get<Truck>(api.getUrl(`trucks/${id}`));

    if (!data) {
      throw new Error('Truck not found');
    }

    return { data };
  };

  createTruck = async (truck: TruckForm) => {
    const { data } = await apiClient.post<Truck>(api.getUrl(`trucks`), truck);

    return { data };
  };

  updateTruck = async (id: number, truck: TruckForm) => {
    const { data } = await apiClient.put<Truck>(api.getUrl(`trucks/${id}`), truck);

    return { data };
  };

  deleteTruck = async (id: number) => {
    await apiClient.delete(api.getUrl(`trucks/${id}`));
  };
}

export const truckListService = new TruckListService();

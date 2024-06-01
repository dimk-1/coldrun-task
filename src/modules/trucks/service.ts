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

  getTruckDetail = async (truckId: Truck['id']) => {
    const { data } = await apiClient.get<Truck>(api.getUrl(`trucks/${truckId}`));

    if (!data) {
      throw new Error('Truck not found');
    }

    return { data };
  };

  createTruck = async (truck: TruckForm) => {
    const { data } = await apiClient.post<Truck>(api.getUrl(`trucks`), truck);

    return { data };
  };

  updateTruck = async (truckId: Truck['id'], truck: TruckForm) => {
    const { data } = await apiClient.put<Truck>(api.getUrl(`trucks/${truckId}`), truck);

    return { data };
  };

  deleteTruck = async (truckId: Truck['id']) => {
    await apiClient.delete(api.getUrl(`trucks/${truckId}`));
  };
}

export const truckListService = new TruckListService();

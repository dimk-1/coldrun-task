export enum ListOrder {
  asc = 'asc',
  desc = 'desc'
}

export enum FormMode {
  Create = 'CREATE',
  Update = 'UPDATE'
}

export const applicationDefaults = {
  debounce: 300,
  limit: 10,
  page: 1,
  order: ListOrder.asc
};

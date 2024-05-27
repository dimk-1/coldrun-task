class API {
  url: string;

  constructor() {
    this.url = import.meta.env.MODE === 'development' ? '/api' : `${location.origin}`;
  }

  getUrl(path?: string): string {
    return path ? `${this.url}/${path}` : this.url;
  }

  removeEmptyParams(query: any) {
    const localQuery = { ...query };

    for (const key of Object.keys(localQuery)) {
      if (localQuery[key] === '') {
        delete localQuery[key];
      }
    }

    return localQuery;
  }
}

export const api = new API();

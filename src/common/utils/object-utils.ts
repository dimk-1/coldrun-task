export const deepMerge = (target: { [key: string]: any }, ...sources: { [key: string]: any }[]) => {
  sources.forEach((source) => {
    for (const [key, value] of Object.entries(source)) {
      if (
        typeof value === 'object' &&
        value !== null &&
        !Array.isArray(value) &&
        value.constructor === Object
      ) {
        if (!target[key]) target[key] = {};
        deepMerge(target[key], value);
      } else {
        target[key] = value;
      }
    }
  });
  return target;
};

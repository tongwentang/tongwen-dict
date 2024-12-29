import type { JsonString } from '../model/model.js';

export const jsonStringify = (obj: {}, isFormat: boolean): JsonString => {
  return JSON.stringify(obj, null, isFormat ? 2 : 0);
};

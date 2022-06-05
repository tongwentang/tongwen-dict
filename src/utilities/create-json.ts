import { Dict, JsonString } from '../model/model.js';

export const createJson = (dicts: Dict[], isFormat: boolean): JsonString => {
  return JSON.stringify(Object.assign({}, ...dicts), null, isFormat ? 2 : 0);
};

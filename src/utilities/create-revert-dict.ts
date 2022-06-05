import { Dict } from '../model/model.js';

export const createRevertDict = (dict: Dict): Dict => {
  return Object.fromEntries(Object.entries(dict).map(([key, value]) => [value, key]));
};

import { Dict, DictMeta } from '../model/model.js';
import { jsonStringify } from './json-stringify.js';

export const createDict = <T extends Dict>(dict: T): T => dict;

export const createRevertDict = (dict: Dict): Dict => {
  return Object.fromEntries(Object.entries(dict).map(([key, value]) => [value, key]));
};

export const joinDicts = (dict: Dict[]): Dict => Object.assign({}, ...dict);

export const createDictMetas = (dist: URL, dict: Dict, c: Pick<DictMeta, 'direction' | 'type'>): DictMeta[] => [
  { ...c, dict: jsonStringify(dict, true), min: false, path: new URL(`./${c.direction}-${c.type}.json`, dist) },
  { ...c, dict: jsonStringify(dict, false), min: true, path: new URL(`./${c.direction}-${c.type}.min.json`, dist) },
];

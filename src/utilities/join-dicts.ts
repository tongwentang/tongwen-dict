import { Dict } from '../model/model.js';

export const joinDicts = (dict: Dict[]): Dict => Object.assign({}, ...dict);

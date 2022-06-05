import { Dict } from '../model/model.js';

export const createDict = <T extends Dict>(dict: T): T => dict;

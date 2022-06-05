import { PathLike } from 'fs';

export type JsonString = string;

export interface Dict extends Readonly<Record<string, string>> {}

export interface DictMeta {
  path: PathLike;
  dict: JsonString;
}

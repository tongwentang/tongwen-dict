type Direction = 's2t' | 't2s';
type DictType = 'char' | 'phrase';

export type JsonString = string;

export interface Dict extends Readonly<Record<string, string>> {}

export interface DictMeta {
  direction: Direction;
  type: DictType;
  min: boolean;
  path: URL;
  dict: JsonString;
}

export type ManifestItem = Pick<DictMeta, 'direction' | 'type' | 'min'> & { filename: string; md5: string };

export interface Manifest {
  name: string;
  version: string;
  dicts: ManifestItem[];
}

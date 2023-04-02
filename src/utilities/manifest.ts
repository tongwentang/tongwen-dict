import { createHash } from 'crypto';
import { writeFile } from 'fs/promises';
import { basename } from 'path';
import pkg from '../../package-lock.json';
import { DictMeta, Manifest, ManifestItem } from '../model/model.js';
import { pathDist } from '../path.js';
import { jsonStringify } from './json-stringify.js';

export const createManifestItem = ({ direction, type, min, path, dict }: DictMeta): ManifestItem => ({
  direction,
  type,
  min,
  filename: basename(path.toString()),
  md5: createHash('md5').update(Buffer.from(dict, 'utf-8')).digest('hex'),
});

export const createManifest = (metas: DictMeta[]): Manifest => ({
  name: pkg.name,
  version: pkg.version,
  dicts: metas.map(meta => createManifestItem(meta)),
});

export const writeManifest = (manifest: Manifest) => {
  writeFile(new URL('manifest.json', pathDist), jsonStringify(manifest, true));
};

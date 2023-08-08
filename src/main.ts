import { writeFile } from 'fs/promises';
import { getCharDicts } from './charater/index.js';
import { DictMeta } from './model/model.js';
import { pathDist } from './path.js';
import { createDictMetas } from './utilities/dict.js';
import { recreateDir } from './utilities/fs.js';
import { createManifest, writeManifest } from './utilities/manifest.js';
import { getWordDicts } from './word/index.js';

(async function main() {
  await recreateDir(pathDist);

  Promise.all([getCharDicts(), getWordDicts()])
    .then<DictMeta[]>(([char, phrase]) => [
      ...createDictMetas(pathDist, char.s2t, { direction: 's2t', type: 'char' }),
      ...createDictMetas(pathDist, char.t2s, { direction: 't2s', type: 'char' }),
      ...createDictMetas(pathDist, phrase.s2t, { direction: 's2t', type: 'phrase' }),
      ...createDictMetas(pathDist, phrase.t2s, { direction: 't2s', type: 'phrase' }),
    ])
    .then(metas => Promise.all([writeManifest(createManifest(metas)), ...metas.map(m => writeFile(m.path, m.dict))]))
    .then(() => console.log('write manifest and dicts done'));
})();

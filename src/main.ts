import { writeFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { getCharDicts } from './charater/index.js';
import { DictMeta } from './model/model.js';
import { pathDist } from './path.js';
import { createJson } from './utilities/create-json.js';
import { recreateDir } from './utilities/fs.js';
import { getWordDicts } from './word/index.js';

(async function main() {
  await recreateDir(pathDist);

  Promise.resolve(getCharDicts())
    .then<DictMeta[]>(({ s2t, t2s }) => [
      { dict: createJson([s2t], true), path: new URL('./s2t-char.json', pathDist) },
      { dict: createJson([t2s], true), path: new URL('./t2s-char.json', pathDist) },
      { dict: createJson([s2t], false), path: new URL('./s2t-char.min.json', pathDist) },
      { dict: createJson([t2s], false), path: new URL('./t2s-char.min.json', pathDist) },
    ])
    .then(metas => Promise.all(metas.map(m => writeFile(m.path, m.dict))))
    .then(() => console.log('write charater dicts done'));

  getWordDicts()
    .then<DictMeta[]>(({ s2t, t2s }) => [
      { dict: createJson([s2t], true), path: fileURLToPath(new URL(`./s2t-word.json`, pathDist)) },
      { dict: createJson([t2s], true), path: fileURLToPath(new URL(`./t2s-word.json`, pathDist)) },
      { dict: createJson([s2t], false), path: fileURLToPath(new URL(`./s2t-word.min.json`, pathDist)) },
      { dict: createJson([t2s], false), path: fileURLToPath(new URL(`./t2s-word.min.json`, pathDist)) },
    ])
    .then(metas => Promise.all(metas.map(m => writeFile(m.path, m.dict))))
    .then(() => console.log('write word dicts done'));
})();

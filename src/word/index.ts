import { readdir } from 'fs/promises';
import { Dict } from '../model/model.js';
import { joinDicts } from '../utilities/dict.js';

const getFns = () => {
  return readdir(new URL('.', import.meta.url)).then(fns =>
    fns.reduce<{ s2tFns: string[]; t2sFns: string[] }>(
      (col, fn) => {
        fn.includes('s2t.ts') ? col.s2tFns.push(fn) : col.t2sFns.push(fn);
        return col;
      },
      { s2tFns: [], t2sFns: [] },
    ),
  );
};

const importDicts = (fns: string[]) => {
  return Promise.resolve(fns.map(fn => new URL(`./${fn.replace('.ts', '.js')}`, import.meta.url).href))
    .then(paths => Promise.all(paths.map(path => import(path).then(m => m.default as Dict))))
    .then(joinDicts);
};

export const getWordDicts = () =>
  getFns()
    .then(({ s2tFns, t2sFns }) => Promise.all([importDicts(s2tFns), importDicts(t2sFns)]))
    .then(([s2t, t2s]) => ({ s2t, t2s }));

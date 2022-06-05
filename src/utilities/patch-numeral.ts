import { Dict } from '../model/model.js';

type Src = ReadonlyArray<string>;

const prefix = ([sr, tr]: [string, string], term: Partial<{ srcs: Src[]; maps: Dict[] }>): Dict =>
  Object.fromEntries([
    ...(term.srcs?.flatMap(src => src.map(s => [`${s}${sr}`, `${s}${tr}`])) ?? []),
    ...(term.maps?.flatMap(map => Object.entries(map).map(([key, value]) => [`${key}${sr}`, `${value}${tr}`])) ?? []),
  ]);

const dg: Src = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const zh: Src = ['〇', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
const zhNum: Dict = { 十: '十', 百: '百', 千: '千', 万: '萬', 亿: '億' };

const Numeral: Readonly<Record<string, Src | Dict>> = {
  dg,
  dgSp: dg.map(digit => `${digit} `),
  dgFull: ['０', '１', '２', '３', '４', '５', '６', '７', '８', '９'],
  zh,
  zhCap: ['零', '壹', '貳', '叁', '肆', '伍', '陸', '柒', '捌', '玖'],
  zhNum,
  adj: {
    半: '半',
    几: '幾',
    数: '數',
    多: '多',
    少: '少',
    多少: '多少',
    整: '整',
    ...prefix(['余', '餘'], { srcs: [zh], maps: [zhNum] }),
  },
};

const numerals = Object.values(Numeral).flat();
const omitKeys = new Set(['余']);

export const prefixNumeral = (dict: Dict): Dict => {
  return Object.fromEntries(
    Object.entries(dict).flatMap(([key, value]) =>
      omitKeys.has(key)
        ? []
        : numerals.flatMap(n =>
            typeof n === 'string'
              ? [[`${n}${key}`, `${n}${value}`]]
              : Object.entries(n).map(([sr, tr]) => [`${sr}${key}`, `${tr}${value}`]),
          ),
    ),
  );
};

import s2t from './s2t-char.json' with { type: 'json' };
import t2s from './t2s-char.json' with { type: 'json' };

export const getCharDicts = () => ({ s2t, t2s });

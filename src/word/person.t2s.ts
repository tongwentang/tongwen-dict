import { createRevertDict } from '../utilities/dict.js';
import { shareable } from './person.s2t.js';

export default {
  ...createRevertDict(shareable),
};

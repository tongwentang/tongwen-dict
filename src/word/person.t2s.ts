import { createRevertDict } from '../utilities/create-revert-dict.js';
import { shareable } from './person.s2t.js';

export default {
  ...createRevertDict(shareable),
};

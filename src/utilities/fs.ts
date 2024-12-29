import { constants, type PathLike } from 'fs';
import { access, mkdir, rm } from 'fs/promises';

export const recreateDir = (path: PathLike) => {
  return access(path, constants.O_DIRECTORY)
    .catch(() => true)
    .then(async isNoExist => !isNoExist && rm(path, { recursive: true }))
    .then(() => mkdir(path));
};

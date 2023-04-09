import { sep } from 'path';
import { isString } from './isType';

export function formatPath(p: string) {
  if (p && isString(p)) {
    if (sep === '/') {
      return p;
    } else {
      return p.replace(/\\/g, '/');
    }
  }
  return p;
}

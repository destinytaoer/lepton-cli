export function isObject(o: unknown): boolean {
  return Object.prototype.toString.call(o) === '[object Object]';
}

export function isString(o: unknown): boolean {
  return typeof o === 'string';
}

import { sep } from 'path';

function isObject(o) {
    return Object.prototype.toString.call(o) === '[object Object]';
}
function isString(o) {
    return typeof o === 'string';
}

function formatPath(p) {
    if (p && isString(p)) {
        if (sep === '/') {
            return p;
        }
        else {
            return p.replace(/\\/g, '/');
        }
    }
    return p;
}

export { isString as a, formatPath as f, isObject as i };

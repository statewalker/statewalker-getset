import toPath from "./toPath.js";

export default function set(obj = {}, path, value) {
  path = toPath(path);
  return doUpdate(obj, path, 0, value);
  function doUpdate(obj, path, pos, value) {
    if (pos >= path.length)
      return value;
    const name = path[pos];
    const oldValue = obj[name];
    const newValue = doUpdate(oldValue || {}, path, pos + 1, value);
    if (oldValue !== newValue) {
      if (value === undefined && pos === path.length - 1) {
        delete obj[name];
      } else {
        obj[name] = newValue;
      }
    }
    return obj;
  }
}
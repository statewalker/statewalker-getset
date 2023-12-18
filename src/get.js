import toPath from "./toPath.js";

export default function get(obj, path) {
  path = toPath(path);
  return doGet(obj, path, 0);
  function doGet(obj, path, pos) {
    if (obj == null || (
      typeof obj !== 'object' &&
      typeof obj !== 'string'
    )) return;
    if (pos === path.length) return obj;
    const name = path[pos];
    const value = name ? obj[name] : obj;
    if (pos < path.length - 1) {
      return doGet(value, path, pos + 1);
    } else {
      return value;
    }
  }
}
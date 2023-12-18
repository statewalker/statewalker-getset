import toPath from "./toPath.js";

export default function get(obj, path) {
  path = toPath(path);
  for (let i = 0; obj && i < path.length; i++) {
    obj = typeof obj === 'object' || typeof obj === 'string'
      ? obj[path[i]]
      : undefined;
  }
  return obj;
}
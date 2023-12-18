import toPath from "./toPath.js";

export default function set(obj = {}, path, value) {
  path = toPath(path);
  if (path.length === 0) return value;
  let result = copy(obj);
  for (let i = 0, o = result; i < path.length; i++) {
    const name = path[i];
    o = o[name] = i < path.length - 1 ? copy(o[name]) : value;
  }
  return result;
  
  function copy(obj){
    return typeof obj === "object" && obj !== null
      ? !Array.isArray(obj) 
        ? Object.assign({}, obj)
        : [...obj]
      : {}
  }
}
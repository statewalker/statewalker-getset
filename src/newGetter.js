import buildGetter from "./buildGetter.js";
import _compile from "./_compile.js";

export default function newGetter(path) {
  const code = buildGetter(path);
  return _compile(code);
}

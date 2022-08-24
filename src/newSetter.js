import buildSetter from "./buildSetter.js";
import _compile from "./_compile.js";

export default function newSetter(path) {
  const code = buildSetter(path);
  return _compile(code);
}

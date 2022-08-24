import buildCloneSetter from "./buildCloneSetter.js";
import _compile from "./_compile.js";

export default function newCloneSetter(path) {
  const code = buildCloneSetter(path);
  return _compile(code);
}

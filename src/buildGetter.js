import escape from "./escape.js";
import toPath from "./toPath.js";

export default function buildGetter(path) {
  path = toPath(path);
  let code = path.reduce((code, segment) => {
    segment = escape(segment);
    if (!segment)
      return code;
    return `${code}["${segment}"]`;
  }, '');
  code = `try{ return obj${code}; } catch (err) {}`;
  return `function (obj){ "use strict";\n${code}\n}`;
}

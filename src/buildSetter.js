import escape from "./escape.js";
import toPath from "./toPath.js";

export default function buildSetter(path) {
  path = toPath(path);
  let code = '';
  if (path.length) {
    code = 'obj = obj || {};\n';
    code += `var o = obj;\n`;
    for (let i = 0; i < path.length; i++) {
      const segment = escape(path[i]);
      if (!segment)
        continue;
      const next = `o["${segment}"]`;
      if (i < path.length - 1) {
        code += `o = ${next} = (typeof ${next} !== "object") ? {} : ${next}\n`;
      } else {
        code += `if (value === undefined) `;
        code += `{\n  delete ${next}; \n} else {\n  ${next} = value; \n}\n`;
      }
    }
    code += `return obj;`;
  } else {
    code = 'return value;';
  }
  return `function(obj, value){ "use strict"; \n${code}\n}`;
}

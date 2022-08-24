import escape from "./escape.js";
import toPath from "./toPath.js";

export default function buildCloneSetter(path) {
  path = toPath(path);
  let code = '';
  if (path.length) {
    code = `var newObj = Object.assign({}, obj || {});\n`;
    code += `var o = newObj;\n`;
    for (let i = 0; i < path.length; i++) {
      const segment = escape(path[i]);
      if (!segment)
        continue;
      const next = `o["${segment}"]`;
      if (i < path.length - 1) {
        code += `o = ${next} = (typeof ${next} === "object")\n`
          + `  ? Object.assign({}, ${next})\n`
          + `  : {};\n`;
      } else {
        code += `if (value === undefined) `;
        code += `{\n  delete ${next}; \n} else {\n  ${next} = value; \n}\n`;
      }
    }
    code += `return newObj;`;
  } else {
    code = `return value;\n`;
    // code = `typeof value === 'object' && !(!object) ? Object.assign({}, value) : value;\n`
  }
  return `function(obj, value){ "use strict";\n${code}\n}`;
}

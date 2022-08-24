import { buildSetter } from '../src/index.js';

const code = buildSetter('userInfo.firstName');
console.log(code);
// Result:
/* 
function(obj, value){ "use strict"; 
obj = obj || {};
var o = obj;
o = o["userInfo"] = (typeof o["userInfo"] !== "object") ? {} : o["userInfo"]
if (value === undefined) {
  delete o["firstName"]; 
} else {
  o["firstName"] = value; 
}
return obj;
}

*/
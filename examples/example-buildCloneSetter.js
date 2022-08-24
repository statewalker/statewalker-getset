import { buildCloneSetter } from '../src/index.js';

const code = buildCloneSetter('userInfo.firstName');
console.log(code);
// Result:
/* 
function(obj, value){ "use strict";
var newObj = Object.assign({}, obj || {});
var o = newObj;
o = o["userInfo"] = (typeof o["userInfo"] === "object")
  ? Object.assign({}, o["userInfo"])
  : {};
if (value === undefined) {
  delete o["firstName"]; 
} else {
  o["firstName"] = value; 
}
return newObj;
}
*/
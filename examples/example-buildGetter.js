import { buildGetter } from '../src/index.js';

const code = buildGetter('userInfo.firstName');
console.log(code);
// Result:
/* 
function (obj){ "use strict";
try{ return obj["userInfo"]["firstName"]; } catch (err) {}
}
*/
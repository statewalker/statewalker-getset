import { set } from '../src/index.js';

const obj = {
  userInfo : {
      firstName: 'John',
      lastName : 'Smith'
  }
}
const newObj = set(obj, 'userInfo.lastName', 'SMITH');
// The returned object is the same as the original "obj" instance:
console.log(newObj === obj);
// true

console.log(JSON.stringify(obj, null, 2));
/*
{
  "userInfo": {
    "firstName": "John",
    "lastName": "SMITH"
  }
}
*/

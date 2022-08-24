import { get } from '../src/index.js';

const obj = {
  userInfo : {
      firstName: 'John',
      lastName : 'Smith'
  }
}
const firstName = get(obj, 'userInfo.firstName');
console.log(firstName);
/*
"John"
*/
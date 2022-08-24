import { newSetter } from '../src/index.js';

// Generates a function updating user's last name without changing the hierarchy of objects:
const updateLastName = newSetter('userInfo.lastName');

const obj = {
    userInfo : {
        firstName: 'John',
        lastName : 'Smith'
    }
}
// Now we can use/reuse the generated method to update objects:
const sameObject = updateLastName(obj, "SMITH");

// The returned object is the same as the original "obj" instance:
console.log(sameObject === obj);
// true

console.log(JSON.stringify(obj, null, 2));
/*
{
  "userInfo" : {
    "firstName": "John",
    "lastName" : "SMITH"
  }
}
*/
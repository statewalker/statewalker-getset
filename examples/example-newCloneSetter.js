import { newCloneSetter } from '../src/index.js';

// Generate a function updating user's last name and returning a copy of the original object:
const updateLastName = newCloneSetter('userInfo.lastName');

const obj = {
    userInfo : {
        firstName: 'John',
        lastName : 'Smith'
    }
}
// Now we can use/reuse the generated method to update objects:
const newObj = updateLastName(obj, "SMITH");

// The returned object is a clone of the original "obj" instance.
console.log(newObj === obj);
// false

console.log(JSON.stringify(newObj, null, 2));
/*
{
  "userInfo" : {
    "firstName": "John",
    "lastName" : "SMITH"
  }
}
*/
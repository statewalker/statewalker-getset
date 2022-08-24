import { newGetter } from '../src/index.js';

// Generate a function providing direct access to the user's first name:
const getter = newGetter('userInfo.firstName');

const obj = {
    userInfo : {
        firstName: 'John',
        lastName : 'Smith'
    }
}
// Now we can use/reuse the generated method to retrieve nested object fields:
const firstName = getter(obj);
console.log(firstName);
/*
John
*/
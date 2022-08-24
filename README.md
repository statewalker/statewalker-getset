
# @statewalker/getset: tools to read/update JSON objects

This library contains methods to read/update/clone JSON objects.

For working examples see this Observable Notebook: https://observablehq.com/@kotelnikov/statewalker-getset.

- `buildCloneSetter(path)` 
- `buildGetter(path)`
- `buildSetter(path)`
- `_compile(code)`
- `escape(pathSegment)`
- `get(obj, path)`
- `newCloneSetter(path)`
- `newGetter(path)`
- `newSetter(path)`
- `set(obj, path, value)`
- `toPath(path)`


## `buildCloneSetter(path)`

Generates code for a JS method updating JSON objects with new field values.
This method used internally by the `newCloneSetter` method.

Example: 
```javascript
import { buildCloneSetter } from '@statewalker/getset';

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
```

## `buildGetter(path)`

Generates code for a JS method returning JSON objects fields corresponding to the specified path.
This method used internally by the `newGetter` method.

Example: 
```javascript
import { buildGetter } from '@statewalker/getset';

const code = buildGetter('userInfo.firstName');
console.log(code);
// Result:
/* 
function (obj){ "use strict";
try{ return obj["userInfo"]["firstName"]; } catch (err) {}
}
*/
```

## `buildSetter(path)`

Generates code for a JS method updating JSON objects field values.
This method used internally by the `newSetter` method.

Example: 
```javascript
import { buildSetter } from '@statewalker/getset';

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
```


## `_compile(code)`

An internal method transforming the given function code to a compiled run-time method.
Basically it performs the following operation:

```javascript
 const f = (new Function([], `return ${code}`))();
 ...
```

## `escape(pathSegment)`

Escapes individual path segment. The returned value can be used to generate JS code accessing object field
with the escaped name.

## `get(obj, path)`

Returns the object value corresponding to the specified path. This method splits and validates each time the path to the field value and iteratively walks over the tree to access to the field value.

See the `newGetter(path)` method for more efficient/fast access to object fields.

Example: 
```javascript
import { get } from '@statewalker/getset';

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
```

## `newCloneSetter(path)`

Creates and returns a method updating object hierarchies if the field value was changed.
Internally this method generates and compiles JS code updating objects fields and returning a copy of the original instance.

See the `newSetter` method to update an object without creation of clones.

Example: 
```javascript
import { newCloneSetter } from '@statewalker/getset';

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
```


## `newGetter(path)`

This method returns a new function providing field value of the given object.
Internally this method generates and compiles JS code providing direct access to nested object fields.

Example: 
```javascript
import { newGetter } from '@statewalker/getset';

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
```

## `newSetter(path)`

Creates and returns a method updating objects if the field value was changed.
Internally this method generates and compiles JS code updating objects fields *without changing the object hierarchy*.

See the `newCloneSetter` method to create object clones on updates.

Example: 
```javascript
import { newCloneSetter } from '@statewalker/getset';

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
```

## `set(obj, path, value)`

Sets a new field value for the given object. This method recursively updates the object by adding missing internal instances and sets the field value corresponding to the specified path.

This is not the most efficient method to update object fields. See the `newSetter` and `newCloneSetter` methods.

Example: 
```javascript
import { set } from '@statewalker/getset';

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
  "userInfo" : {
    "firstName": "John",
    "lastName" : "SMITH"
  }
}
*/
```


## `toPath(path)`

An internal utility method splitting/normalizing the given string path and transforming it to an array with individual path segments.


Example: 
```javascript
import { toPath } from '@statewalker/getset';

const pathSegments = toPath("userInfo.address.city")
console.log(pathSegments);
// ["userInfo", "address", "city"]
```

## License

[MIT](https://choosealicense.com/licenses/mit/)


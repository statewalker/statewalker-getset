import { toPath } from '../src/index.js';

const pathSegments = toPath("userInfo.address.city")
console.log(pathSegments);
// ["userInfo", "address", "city"]
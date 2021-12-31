// null, undefined
let nothing = null;
console.log(`nothing: ${nothing}, type: ${typeof nothing}`); // object

let x;
console.log(`x: ${x}, type: ${typeof x}`); // undefined

// null vs undefined
console.log('null vs undefined');
console.log('null === undefined: ', null === undefined); // false
console.log('null == undefined: ', null == undefined); // true

console.log(typeof 1); // number
console.log(typeof 'str'); // string
console.log(typeof true); // boolean
console.log(typeof undefined); // undefined
console.log(typeof Symbol()); // symbol
console.log(typeof null); // object

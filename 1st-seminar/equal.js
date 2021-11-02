const num = 2;
const str = '2';

// 동등 연산자 : 값만 비교
// == : equal, != : not equal
console.log(num == str); // true
console.log(num + str); // 22
console.log(typeof (num + str)); // string
console.log(Number(num) + Number(str)); // 22
console.log(typeof (Number(num) + Number(str))); // number

// 일치 연산자 : 값과 타입을 비교
// === : equal, !== : not equal
console.log(num === str); // false

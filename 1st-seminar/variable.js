// 재선언

// var : 가능
var variableVar = '123';
var variableVar = '321';

console.log('variableVar', variableVar);

// let : 불가
let variableLet = '123';
let variableLet = '321';

console.log('variableLet', variableLet);

// const : 불가
const variableConst = '123';
const variableConst = '321';

console.log('variableConst', variableConst)

// 재할당

// var : 가능
var variableVar = '123';
variableVar = '321';

console.log('variableVar', variableVar);

// let : 가능
let variableLet = '123';
variableLet = '321';

console.log('variableLet', variableLet);

// const : 불가능
const variableConst = '123';
variableConst = '321';

console.log('variableConst', variableConst);
const add = (a, b) => a + b;
const substract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

// 원래 객체는 키와 value가 있어야 함
// 자스의 장점! 키와 value가 이름이 같으면 하나만 쓰면 됨
module.exports = {
  add,
  substract,
  multiply,
  divide,
};

// 다른 방식
const calculator = {
  add: (a, b) => console.log(a + b),
  substract: (a, b) => console.log(a - b),
  multiply: (a, b) => console.log(a * b),
  divide: (a, b) => console.log(a / b),
};

module.exports = calculator;
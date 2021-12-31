// Function Scope
// var
if (true) {
  var x = 'var';
}
console.log(`var : ${x}`);

// Block Scope
// let or const
if (true) {
  let y = 'let';
  const z = 'const';
}
console.log(`let : ${y}`); // error
console.log(`const : ${z}`); // error

// Function Scope
// var는 함수 외부에서 접근할 수 없음
function colorFunction() {
  if (true) {
    var color = 'blue';
    console.log(color);
  }
  console.log(color);
}

colorFunction();
console.log(color); // error

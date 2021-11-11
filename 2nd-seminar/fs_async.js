const fs = require("fs");

const numArr = [1, 2, 3, 4, 5];
/*
  data는 생성할 file에 적을 데이터
  fs.writeFile (file, data, [options], callback) {}
  비동기 방식으로 파일 쓰기 - 순서 확인해보기
*/
numArr.forEach(num => {
  const title = 'async' + num;
  const data = `${title}.txt' 생성됨`;
  fs.writeFile(`${title}.txt`, data, (err, data) => {
    if (err) return console.log(err.message);
    console.log(`${title} 비동기 방식 순서 확인`);
  });
});

/*
  fs.readFile (file, data, [options], callback) {}
  비동기 방식으로 파일 불러오기 - 순서 확인해보기
*/
numArr.forEach(num => {
  const title = 'async' + num;
  fs.readFile(`${title}.txt`, (err, data) => {
    if (err) return console.log (err.message);
    console.log(`${title}.txt 파일의 데이터 출력 \n"${data}"\n`);
  });
});
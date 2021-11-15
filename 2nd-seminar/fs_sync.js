const fs = require('fs');

const numArr = [1, 2, 3, 4, 5];

/**
 * fs.writeFileSync (file, data, [option]) {}
 * 동기 방식으로 파일 쓰기 - 순서 확인해보기
 */
numArr.forEach(num => {
  const title = 'sync' + num;
  const data = `${title}.txt 생성`;
  fs.writeFileSync(`${title}.txt`, data);
  console.log(`${title} 동기 방식은 순서에 맞음`);
});

/**
 * fs.readFileSync (path, [options]) {}
 * 동기 방식으로 파일 불러오기 - 순서 확인해보기
 */
numArr.forEach(num => {
  const title = 'sync' + num;
  const data = fs.readFileSync(`${title}.txt`);
  console.log(`${title}.txt 파일의 데이터 출력 \n"${data}"\n`);
});
const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

// 확장자 .js 를 쓰지 않는 이유!
router.use('/api', require('./api')); // 폴더인 경우엔 그 폴더 안의 index.js 파일을 무조건 import 함

router.use('/blog', require('./blog')); // 파일 자체를 import 함

module.exports = router;

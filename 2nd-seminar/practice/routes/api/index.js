const express = require('express'); // express 모듈 불러오기

const router = express.Router(); // Router() 미들웨어 불러오기

router.get('/', (req, res) => {
  const result = {
    status: 200,
    message: 'api~!',
  };
  res.status(200).send(result);
});

module.exports = router;

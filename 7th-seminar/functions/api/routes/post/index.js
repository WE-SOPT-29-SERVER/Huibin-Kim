const express = require('express');
const { checkUser } = require('../../../middlewares/auth');
const router = express.Router();

router.get('/list', require('./postListGET'));
// 유저 인증이 필요한 요청 사이에 checkUser 미들웨어를 넣어준다
router.get('/:postId', checkUser, require('./postGET'));
router.put('/:postId', require('./postPUT'));
router.delete('/:postId', require('./postDELETE'));
router.post('/', require('./postPOST'));

module.exports = router;
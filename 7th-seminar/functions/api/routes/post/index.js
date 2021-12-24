const express = require('express');
const router = express.Router();
const { checkUser } = require('../../../middlewares/auth');
const { uploadImage } = require('../../../middlewares/uploadImage');

router.get('/list', require('./postListGET'));
// 유저 인증이 필요한 route 사이에 checkUser 미들웨어를 넣어준다
router.get('/:postId', checkUser, require('./postGET'));
router.put('/:postId', require('./postPUT'));
router.delete('/:postId', require('./postDELETE'));
// 파일 업로드가 필요한 route 사이에 uploadImage 미들웨어를 넣어준다
router.post('/', uploadImage, require('./postPOST'));

module.exports = router;
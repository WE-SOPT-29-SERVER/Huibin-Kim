const express = require('express');
const router = express.Router();
const users = require('../dbMockup/user');
const { success, fail } = require('../lib/util');
const rm = require('../constants/responseMessage');
const sc = require('../constants/statusCode');

/**
 * @SIGN_UP
 */
router.post('/signup', async (req, res) => {
  // 비구조화 할당 (Destructuring assignment)
  const { email, name, password } = req.body;

  // request body가 잘못됐을 때
  if (!email || !name || !password) {
    return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.NULL_VALUE));
  }

  // 해당 email을 가진 유저가 이미 있을 때
  const alreadyUser = users.filter(user => user.email === email).length > 0;
  if (alreadyUser) {
    return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.ALREADY_EMAIL));
  }

  const newUser = { email, name, password };

  users.push(newUser);

  res.status(sc.OK).send(success(sc.OK, rm.CREATED_USER, newUser));
});

/**
 * @LOGIN
 */
router.post('/login', async (req, res) => {
  // request body에서 데이터 가져오기
  const { email, password } = req.body;

  // request data 확인 - 없다면 Null Value 반환
  if (!email || !password) {
    return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.NULL_VALUE));
  }

  // 존재하는 유저인지 확인 - 없다면 No user 반환
  const user = users.filter(user => user.email === email)[0];
  if (!user) {
    return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.NO_USER));
  }

  // 비밀번호 확인 - 틀렸다면 Missmatch password 반환
  if (user.password !== password) {
    return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.MISS_MATCH_PW));
  }

  // 성공 - login success와 함께 비밀번호를 제외한 유저 정보 반환
  res.status(sc.OK).send(success(sc.OK, rm.LOGIN_SUCCESS, {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  }));
});

/**
 * @UPDATE_USER
 */
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { newName } = req.body;

  if (!id || !newName) {
    return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.NULL_VALUE));
  }

  const existingUser = users.filter(user => user.id === Number(id))[0];

  if (!existingUser) {
    return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.NO_USER));
  }

  const updatedUser = { ...existingUser, name: newName };

  res.status(sc.OK).send(success(sc.OK, rm.UPDATE_SUCCESS, updatedUser));
});

/**
 * @DELETE_USER
 */
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.NULL_VALUE));
  }

  const existingUser = users.filter(user => user.id === Number(id))[0];

  if (!existingUser) {
    return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.NO_USER));
  }

  const newUsers = users.filter(user => user.id !== Number(id));

  res.status(sc.OK).send(success(sc.OK, rm.DELETE_USER, newUsers));
});

module.exports = router;

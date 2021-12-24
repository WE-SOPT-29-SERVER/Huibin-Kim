const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { success, fail } = require('../../../lib/util');
const sc = require('../../../constants/statusCode');
const rm = require('../../../constants/responseMessage');
const db = require('../../../db/db');
const { userDB } = require('../../../db');
const jwtHandlers = require('../../../lib/jwtHandlers');

module.exports = async (req, res) => {
  const { email, name, phone, password } = req.body;
  
  if (!email || !name || !phone || !password) 
    return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.NULL_VALUE));
  
  let client;
  
  try {
    client = await db.connect(req);

    // Firebase Authentication을 통해 유저 생성
    const userFirebase = await admin
      .auth()
      .createUser({ email, password, name })
      .then((user) => user)
      .catch((e) => {
        console.log(e);
        return { err: true, error: e };
      });
     
    // 에러 검증
    if (userFirebase.err) {
      if (userFirebase.error.code === 'auth/email-already-exists') {
        return res.status(sc.NOT_FOUND).send(fail(sc.NOT_FOUND, rm.ALREADY_EMAIL_EXIST));
      } 
      if (userFirebase.error.code === 'auth/invalid-password') {
        return res.status(sc.NOT_FOUND).send(fail(sc.NOT_FOUND, rm.INVALID_PASSWORD));
      } 
      return res.status(sc.INTERNAL_SERVER_ERROR).send(fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
    }
    
    // RDS db에 유저 생성
    const idFirebase = userFirebase.uid;
    const user = await userDB.addUser(client, email, name, phone, idFirebase);
    const { accesstoken } = jwtHandlers.sign(user); // jwt 발급

    console.log(user);
    res.status(sc.OK).send(success(sc.OK, rm.CREATED_USER, { user, accesstoken })); // user와 jwt response
    
  } catch (error) {
    functions.logger.error(`[ERROR] [${req.method.toUpperCase()}] ${req.originalUrl}`, `[CONTENT] ${error}`);
    console.log(error);
    
    res.status(sc.INTERNAL_SERVER_ERROR).send(fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
    
  } finally {
    client.release();
  }
};
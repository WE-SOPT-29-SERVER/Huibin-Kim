const functions = require('firebase-functions');
const { success, fail } = require('../../../lib/util');
const sc = require('../../../constants/statusCode');
const rm = require('../../../constants/responseMessage');
const db = require('../../../db/db');
const { userDB } = require('../../../db');
const { deleteUser } = require('../../../db/user');

module.exports = async (req, res) => {
  const { userId } = req.params;
  
  if (!userId) return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.NULL_VALUE));
  
  let client;
  
  try {
    client = await db.connect(req);

    const deletedUser = await userDB.deleteUser(client, userId);
    if (!deletedUser) return res.status(sc.NOT_FOUND).send(fail(sc.NOT_FOUND, rm.NO_USER));
    
    res.status(sc.OK).send(success(sc.OK, rm.DELETE_ONE_USER_SUCCESS, deleteUser));
    
  } catch (error) {
    functions.logger.error(`[ERROR] [${req.method.toUpperCase()}] ${req.originalUrl}`, `[CONTENT] ${error}`);
    console.log(error);
    
    res.status(sc.INTERNAL_SERVER_ERROR).send(fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
    
  } finally {
    client.release();
  }
};
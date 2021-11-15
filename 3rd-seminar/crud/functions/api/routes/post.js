const express = require('express');
const router = express.Router();
const posts = require('../../dbMockup/post');
const { success, fail } = require('../../lib/util');
const rm = require('../../constants/responseMessage');
const sc = require('../../constants/statusCode');

/**
 * @GET_POST
 */
router.get('/', async(req, res) => {
  const isExistPost = posts.length > 0;

  if (!isExistPost) {
    return res.status(sc.NO_CONTENT).send(fail(sc.NO_CONTENT, rm.NO_POST));
  }

  res.status(sc.OK).send(success(sc.OK, rm.READ_POST_SUCCESS, posts));
});

/**
 * @GET_POST_BY_ID
 */
router.get('/:id', async(req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.NULL_VALUE));
  }

  const post = posts.filter(post => post.id === +id)[0];
  if (!post) {
    return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.NO_POST));
  }

  res.status(sc.OK).send(success(sc.OK, rm.READ_POST_SUCCESS, post));
});

/**
 * @CREATE_POST
 */
router.post('/', async(req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.NULL_VALUE));
  }

  const newPost = {id: posts.length + 1, title, content};
  posts.push(newPost);
  res.status(sc.OK).send(success(sc.OK, rm.CREATED_POST, newPost));
});

/**
 * @UPDATE_POST
 */
router.put('/:id', async(req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  if (!id || !title || !content) {
    return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.NULL_VALUE));
  }

  const post = posts.filter(post => post.id === +id)[0];
  if (!post) {
    return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.NO_POST));
  }

  const updatedPost = { ...post, title, content };
  res.status(sc.OK).send(success(sc.OK, rm.UPDATE_POST_SUCCESS, updatedPost));
});

/**
 * @DELETE_POST
 */
router.delete(':id', async(req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.NULL_VALUE));
  }

  const isExistPost = posts.filter(post => post.id === +id)[0];
  if (!isExistPost) {
    return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.NO_POST));
  }

  const newPost = posts.filter(post => post.id !== +id)[0];
  res.status(sc.OK).send(success(sc.OK, rm.DELETE_POST, newPost));
});

module.exports = router;

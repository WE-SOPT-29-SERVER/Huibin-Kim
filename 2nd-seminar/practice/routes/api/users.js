const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
  const result = {
    status: 200,
    message: 'api/users/login router',
  };
  res.status(200).send(result);
});

router.get('/signup', (req, res) => {
  const result = {
    status: 200,
    message: 'api/users/signup router',
  };
  res.status(200).send(result);
});

module.exports = router;
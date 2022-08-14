const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Login
router.post('/login', async (req, res) => {
  //checking if email already exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.send({ message: "Email doesn't exist" });
  //chekin password
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.send({ message: 'Invalid password' });

  //create and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header('accessToken', token).send({ user: user, accessToken: token });
});

// Forgot password
router.put('/forgot/password', (req, res) => {});

module.exports = router;

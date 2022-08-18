const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const authenticateToken = require('../utils/verifyToken');

// Registration: add new user
router.post('/signUp', async (req, res) => {
  console.log(req.body);
  //checking if user already exists
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send('Email already exists');
  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    username: req.body.username,
    email: req.body.email,
    role: req.body.role,
    password: hashedPassword,
  });
  try {
    const savedUser = await user.save();
    res.send({ user: user._id, message: 'Success regsitration !' });
  } catch (err) {
    res.status(400).send(err);
  }
});

// List all users
router.get('/list', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;

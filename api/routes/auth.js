const router = require("express").Router();
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { registerValidation, loginValidation } = require("../vaidation");

//registration
router.post("/register", async (req, res) => {
  //validate data before make a user
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //checking if user already exists
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exists");
  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    const savedUser = await user.save();
    res.send({ user: user._id, message: "Success regsitration !" });
  } catch (err) {
    res.status(400).send(err);
  }
});
//login
router.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  //checking if email already exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.send("Email doesn't exist");
  //chekin password
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.send("Invalid password");

  //create and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res
    .header("auth-token", token)
    .send({ message: "login successfully", token });
});
//forgot password
router.put("/forgotPassword", (req, res) => {});

//Afiiche  Frounisseur
router.get("/afficheFr", async (req, res) => {
  try {
    const fournisseur = await User.find({ role: "Fournisseur" });
    res.json(fournisseur);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;

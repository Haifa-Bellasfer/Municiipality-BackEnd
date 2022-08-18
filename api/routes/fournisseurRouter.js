const router = require('express').Router();
const Fournisseur = require('../model/Fournisseur');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');

// Add frournisseur
router.post('/add', async (req, res) => {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
      user: process.env.EMAIL, // generated ethereal user
      pass: process.env.PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object

  await transporter.sendMail(
    {
      from: process.env.EMAIL, // sender address
      to: req.body.email, // list of receivers
      subject: 'Athentification a Baladiti ✔', // Subject line
      html: `<p> Pour Authentifier a Baladiti </p> <br> <p> Login : ${req.body.email}</p><br> <p> Votre mot de passe : ${req.body.password} </p>`, // plain text body
    },
    function (err, info) {
      if (err) {
        console.log(err);
        return;
      }
      console.log(info);
    }
  );

  const fournisseur = new Fournisseur({
    slug: req.body.slug,
    email: req.body.email,
    password: req.body.password,
    addresse: req.body.addresse,
    phone: req.body.phone,
    categorie: req.body.categorie,
  });
  try {
    await fournisseur.save();
    res.send({
      fournisseur: fournisseur._id,
      message: 'Success regsitration !',
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

// List fournisseur
router.get('/list', async (req, res) => {
  try {
    const fournisseur = await Fournisseur.find();
    res.json(fournisseur);
  } catch (err) {
    res.json({ message: err });
  }
});

// Update Password
router.put('/update/password/:id/:pass', async (req, res) => {
  console.log(req.params.id);
  try {
    const id = req.params.id;
    const options = { new: true };
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.params.pass, salt);

    const fournisseur = await Fournisseur.findByIdAndUpdate(
      id,
      {
        $set: { password: hashedPassword },
      },
      options
    );

    res.json(fournisseur);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;

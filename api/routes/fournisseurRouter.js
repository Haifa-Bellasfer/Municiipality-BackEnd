const router = require('express').Router();
const Fournisseur = require('../model/Fournisseur');
const Reclamation = require('../model/Reclamation');
const Archieve = require('../model/Archieve');
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const sendMail = require('../utils/sendMail');

// Add frournisseur
router.post('/add', async (req, res) => {
  sendMail(
    req.body.email,
    `<p> Pour Authentifier a Baladiti </p> <br> <p> Login : ${req.body.email}</p><br> <p> Votre mot de passe : ${req.body.password} </p>`
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

// Update fournisseur Password
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

// Update reclamation done by fournisseur
router.put('/update/done/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const options = { new: true };

    const reclamation = await Reclamation.findByIdAndUpdate(
      id,
      {
        $set: { etat: 'Done' },
      },
      options
    );
    const archieve = new Archieve({
      description: 'Cette reclamation a été traité',
      reclamation: reclamation,
    });
    const user = await User.findOne(reclamation.citoyen);

    sendMail(
      user.email,

      `<p>  Cette reclamation a été traité: </p>`
    );
    try {
      const savedArchieve = await archieve.save();
      res.json(savedArchieve);
    } catch (err) {
      res.json({ message: err });
    }
    res.json(reclamation);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;

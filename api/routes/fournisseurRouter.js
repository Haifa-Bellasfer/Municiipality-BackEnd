const router = require('express').Router();
const Fournisseur = require('../model/Fournisseur');

// Add frournisseur
router.post('/add', async (req, res) => {
  const fournisseur = new Fournisseur({
    slug: req.body.slug,
    email: req.body.email,
    password: req.body.password,
    addresse: req.body.addresse,
    phone: req.body.phone,
    categorie: req.body.categorie,
  });
  try {
    const savedFrournisseur = await fournisseur.save();
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

module.exports = router;

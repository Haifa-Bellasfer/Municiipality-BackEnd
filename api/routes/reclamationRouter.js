const router = require('express').Router();
const Fournisseur = require('../model/Fournisseur');
const Reclamation = require('../model/Reclamation');
const User = require('../model/User');
const Municipality = require('../model/Municipality');

// Add Reclamation
router.post('/add', async (req, res) => {
  const fournisseur = await Fournisseur.findById(req.body.fournisseur);
  const citoyen = await User.findById(req.body.citoyen);
  const municipality = await Municipality.findById(req.body.municipality);

  const reclamation = new Reclamation({
    email: req.body.email,
    description: req.body.description,
    categorie: req.body.categorie,
    localisation: req.body.localisation,
    etat: req.body.etat,
    imageURL: req.body.imageURL,
    fournisseur: fournisseur,
    citoyen: citoyen,
    municipality: municipality,
  });
  try {
    const savedReclamation = await reclamation.save();
    res.json(savedReclamation);
  } catch (err) {
    res.json({ message: err });
  }
});

// Get reclamation by id
router.get('/getReclamationById/:id', async (req, res) => {
  try {
    const reclamation = await Reclamation.findById(req.params.id);
    res.json(reclamation);
  } catch (err) {
    res.json({ message: err });
  }
});

// List all reclamations
router.get('/list', async (req, res) => {
  try {
    const reclamations = await Reclamation.find();
    res.json(reclamations);
  } catch (err) {
    res.json({ message: err });
  }
});

// Get in progress reclamations
router.get('/list/inprogress', async (req, res) => {
  try {
    const reclamation = await Reclamation.find({ etat: 'Inprogress' });
    res.json(reclamation);
  } catch (err) {
    res.json({ message: err });
  }
});

// Get pennding reclamations
router.get('/list/pending', async (req, res) => {
  try {
    const reclamation = await Reclamation.find({ etat: 'Pending' });
    res.json(reclamation);
  } catch (err) {
    res.json({ message: err });
  }
});

// Get Done reclamation
router.get('/list/done', async (req, res) => {
  try {
    const reclamation = await Reclamation.find({ etat: 'Done' });
    res.json(reclamation);
  } catch (err) {
    res.json({ message: err });
  }
});

// Delete reclamation
router.delete('/delete:id', async (req, res) => {
  try {
    await Reclamation.remove({ _id: req.params.id });
    res.json({ message: 'successfully deleted' });
  } catch (err) {
    res.json({ message: err });
  }
});

// Update reclamation by status
router.put('/update/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const options = { new: true };
    const fournisseur = await Fournisseur.findById(req.body.id);

    const reclamation = await Reclamation.findByIdAndUpdate(
      id,
      {
        $set: { etat: 'Inprogress', fournisseur: fournisseur },
      },
      options
    );

    res.json(reclamation);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;

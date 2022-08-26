const router = require('express').Router();
const Fournisseur = require('../model/Fournisseur');
const Reclamation = require('../model/Reclamation');

// Add Reclamation
router.post('/add', async (req, res) => {
  const reclamation = new Reclamation({
    email: req.body.email,
    description: req.body.description,
    categorie: req.body.categorie,
    location: req.body.location,
    etat: req.body.etat,
    imageURL: req.body.imageURL,
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
router.get('/inProgress', async (req, res) => {
  try {
    const reclamation = await Reclamation.find({ etat: 'Inprogress' });
    res.json(reclamation);
  } catch (err) {
    res.json({ message: err });
  }
});

// Get pennding reclamations
router.get('/pennding', async (req, res) => {
  try {
    const reclamation = await Reclamation.find({ etat: 'Pending' });
    res.json(reclamation);
  } catch (err) {
    res.json({ message: err });
  }
});

// Delete reclamation by ID
router.delete('/delete:id', async (req, res) => {
  try {
    const reclamation = await Reclamation.remove({ _id: req.params.id });
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

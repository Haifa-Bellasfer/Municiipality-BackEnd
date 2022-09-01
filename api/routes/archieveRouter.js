const router = require('express').Router();
const Archieve = require('../model/Archieve');
const Reclamation = require('../model/Reclamation');

// Add Archieve
router.post('/add/:id', async (req, res) => {
  const options = { new: true };
  const reclamation = await Reclamation.findByIdAndUpdate(
    req.params.id,
    {
      $set: { etat: 'Done' },
    },
    options
  );

  const archieve = new Archieve({
    description: req.body.description,
    reclamation: reclamation,
  });
  try {
    const savedArchieve = await archieve.save();
    res.json(savedArchieve);
  } catch (err) {
    res.json({ message: err });
  }
});

// List archieve
router.get('/list', async (req, res) => {
  try {
    const archieve = await Archieve.find();
    res.json(archieve);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;

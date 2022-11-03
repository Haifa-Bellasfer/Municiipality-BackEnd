const router = require('express').Router();
const Archieve = require('../model/Archieve');
const Reclamation = require('../model/Reclamation');

// Add Archieve
router.post('/add', async (req, res) => {
  const options = { new: true };
  const id = req.body.id;

  try {
    const reclamation = await Reclamation.findByIdAndUpdate(
      id,
      {
        $set: { etat: 'Done' },
      },
      options
    );
    const archieve = new Archieve({
      description: req.body.description,
      reclamation: reclamation,
    });
    const savedArchieve = await archieve.save();
    res.json(savedArchieve);
  } catch (error) {
    console.log(error);
  }
});

// List archieve
router.get('/list', async (req, res) => {
  try {
    const archieve = await Archieve.find().populate('reclamation');
    res.json(archieve);
  } catch (err) {
    console.log(err);
    res.json({ message: err });
  }
});

module.exports = router;

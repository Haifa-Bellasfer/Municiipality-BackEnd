const router = require('express').Router();
const Municipality = require('../model/Municipality');
const User = require('../model/User');

//Add Municipality
router.post('/add', async (req, res) => {
  let municipality;
  try {
    const responsable = await User.findById(req.body.responsable);
    console.log(responsable);
    municipality = new Municipality({
      region: req.body.region,
      adresse: req.body.adresse,
      responsable: responsable,
    });
  } catch (error) {
    console.log(error);
  }

  try {
    const savedMunicpilaity = await municipality.save();
    res.json(savedMunicpilaity);
  } catch (err) {
    res.json({ message: err });
  }
});

// Get municipality by ID
router.get('/getById/:id', async (req, res) => {
  try {
    const municipality = await Municipality.findById(req.params.id);
    res.json(municipality);
  } catch (err) {
    res.json({ message: err });
  }
});

// List all municipalities
router.get('/list', async (req, res) => {
  try {
    const municiplaity = await Municipality.find();
    res.json(municiplaity);
  } catch (err) {
    res.json({ message: err });
  }
});

// Delete municipality
router.delete('/delete/:id', async (req, res) => {
  try {
    await municipality.remove({ _id: req.params.id });
    res.json({ message: 'successfully deleted' });
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;

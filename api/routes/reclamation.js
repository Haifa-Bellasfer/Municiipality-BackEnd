const router = require("express").Router();
const verify = require("./verifyToken");
const Reclam = require("../model/Reclamation");

router.get("/", verify, (req, res) => {
  res.send(req.user);
});

//Add Reclamation
router.post("/add", async (req, res) => {
  const reclam = new Reclam({
    email: req.body.email,
    description: req.body.description,
    categorie: req.body.categorie,
    location: req.body.location,
    etat: req.body.etat,
    imageURL: req.body.imageURL,
  });
  try {
    const savedReclam = await reclam.save();
    res.json(savedReclam);
  } catch (err) {
    res.json({ message: err });
  }
});

//Afiiche  all reclamation
router.get("/afficheAll", async (req, res) => {
  try {
    const reclam = await Reclam.find({});
    res.json(reclam);
  } catch (err) {
    res.json({ message: err });
  }
});
//Affiche reclamation by id
router.get("/afficheById/:reclamID", async (req, res) => {
  try {
    const reclam = await Reclam.findById(req.params.reclamID);
    res.json(reclam);
  } catch (err) {
    res.json({ message: err });
  }
});

//Delete reclamation
router.delete("/deleteReclam/:reclamID", async (req, res) => {
  try {
    const reclam = await Reclam.remove({ _id: req.params.reclamID });
    res.json({ message: "successfully deleted" });
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;

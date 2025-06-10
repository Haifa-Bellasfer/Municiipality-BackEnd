const router = require("express").Router();
const Municipality = require("../model/Municipality");
const Reclamation = require("../model/Reclamation");
const Fournisseur = require("../model/Fournisseur");
const Responsable = require("../model/Responsable");

//Add Municipality
router.post("/add", async (req, res) => {
  // let municipality;
  // try {
  //   const responsable = await User.findById(req.body.responsable);
  //   municipality = new Municipality({
  //     region: req.body.region,
  //     adresse: req.body.adresse,
  //     responsable: responsable,
  //   });
  // } catch (error) {
  //   console.log(error);
  // }
  // try {
  //   const savedMunicpilaity = await municipality.save();
  //   res.json(savedMunicpilaity);
  // } catch (err) {
  //   res.json({ message: err });
  // }
});

// Get municipality by ID
router.get("/getById/:id", async (req, res) => {
  try {
    const municipality = await Municipality.findById(req.params.id);
    res.json(municipality);
  } catch (err) {
    res.json({ message: err });
  }
});

// List all municipalities
router.get("/list", async (req, res) => {
  try {
    const municiplaity = await Municipality.find();
    res.json(municiplaity);
  } catch (err) {
    res.json({ message: err });
  }
});

// Delete municipality
router.delete("/delete/:id", async (req, res) => {
  try {
    await municipality.remove({ _id: req.params.id });
    res.json({ message: "successfully deleted" });
  } catch (err) {
    res.json({ message: err });
  }
});

// Get fournisseurs and reclamations by municipality ID
// Get all reclamations for a municipality, including fournisseur and responsable details
router.get("/details/:id", async (req, res) => {
  try {
    // Find all reclamations where municipality matches the given id
    const reclamations = await Reclamation.find({ municipality: req.params.id })
      .populate("fournisseur")
      .populate({
        path: "municipality",
        populate: { path: "responsable" },
      });

    // Get all responsables for this municipality
    const responsables = await Responsable.find({
      municipality: req.params.id,
    });

    // Get all fournisseurs for this municipality
    const fournisseurs = await Fournisseur.find({
      municipality: req.params.id,
    });

    res.json({
      reclamations,
      responsables,
      fournisseurs,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

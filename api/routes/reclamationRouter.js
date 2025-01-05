const router = require("express").Router();
const Fournisseur = require("../model/Fournisseur");
const Reclamation = require("../model/Reclamation");
const User = require("../model/User");
const Municipality = require("../model/Municipality");
const { ObjectId } = require("mongodb");

// Add Reclamation
router.post("/add", async (req, res) => {
  const fournisseur = await Fournisseur.findById(req.body.fournisseur);
  const citoyen = await User.findById(req.body.citoyen);
  const municipality = await Municipality.findById(req.body.municipality);

  const reclamation = new Reclamation({
    description: req.body.description,
    categorie: req.body.categorie,
    localisation: req.body.localisation,
    etat: "Pending",
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

// Get reclamation by id citoyen
router.get("/getReclamationByIdCitoyen/:id", async (req, res) => {
  try {
    const reclamations = await Reclamation.find({
      citoyen: req.params.id,
    }).populate("citoyen");

    res.json(reclamations);
  } catch (err) {
    res.json({ message: err });
  }
});
// Update reclamation Info
router.put("/updateReclamation/:id", async (req, res) => {
  try {
    const updateData = {};

    if (req.body.description) updateData.description = req.body.description;
    if (req.body.categorie) updateData.categorie = req.body.categorie;
    if (req.body.localisation) updateData.localisation = req.body.localisation;
    if (req.body.imageURL) updateData.imageURL = req.body.imageURL;

    const updatedReclamation = await Reclamation.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    res.json(updatedReclamation);
  } catch (err) {
    res.json({ message: err });
  }
});
// Get reclamation by id
router.get("/getReclamationById/:id", async (req, res) => {
  try {
    const reclamation = await Reclamation.findById(req.params.id).populate(
      "citoyen"
    );
    res.json(reclamation);
  } catch (err) {
    res.json({ message: err });
  }
});

// List all reclamations
router.get("/list", async (req, res) => {
  try {
    const reclamations = await Reclamation.find().populate("citoyen");
    res.json(reclamations);
  } catch (err) {
    res.json({ message: err });
  }
});

// Get in progress reclamations
router.get("/list/inprogress", async (req, res) => {
  try {
    const reclamation = await Reclamation.find({ etat: "Inprogress" }).populate(
      "citoyen"
    );
    res.json(reclamation);
  } catch (err) {
    res.json({ message: err });
  }
});

// Get pennding reclamations
router.get("/list/pending", async (req, res) => {
  try {
    const reclamation = await Reclamation.find({ etat: "Pending" }).populate(
      "citoyen"
    );
    res.json(reclamation);
  } catch (err) {
    res.json({ message: err });
  }
});

// Get Done reclamation
router.get("/list/done", async (req, res) => {
  try {
    const reclamation = await Reclamation.find({ etat: "Done" }).populate(
      "citoyen"
    );
    res.json(reclamation);
  } catch (err) {
    res.json({ message: err });
  }
});
// Get verified reclamation
router.get("/list/verified", async (req, res) => {
  try {
    const reclamation = await Reclamation.find({ etat: "Verified" }).populate(
      "citoyen"
    );
    res.json(reclamation);
  } catch (err) {
    res.json({ message: err });
  }
});
// Get discarded reclamation
router.get("/list/discarded", async (req, res) => {
  try {
    const reclamation = await Reclamation.find({ etat: "Discarded" }).populate(
      "citoyen"
    );
    res.json(reclamation);
  } catch (err) {
    res.json({ message: err });
  }
});

// Delete reclamation
router.delete("/delete:id", async (req, res) => {
  try {
    await Reclamation.remove({ _id: req.params.id });
    res.json({ message: "successfully deleted" });
  } catch (err) {
    res.json({ message: err });
  }
});

// Update reclamation by status
router.put("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { etat } = req.body;
    const { noteFournisseur } = req.body;
    const { noteResponsable } = req.body;

    const options = { new: true };
    const fournisseur = await Fournisseur.findById(req.body.fournisseur);

    const reclamation = await Reclamation.findByIdAndUpdate(
      id,
      {
        $set: {
          etat,
          fournisseur: fournisseur,
          noteFournisseur,
          noteResponsable,
        },
      },
      options
    );

    res.json(reclamation);
  } catch (err) {
    res.json({ message: err });
  }
});

// Get reclamation fournisseur
router.get("/listfournisseurReclamation/:id", async (req, res) => {
  try {
    const reclamations = await Reclamation.find({
      fournisseur: ObjectId(req.params.id),
    }).populate(["fournisseur", "citoyen"]);
    res.json(reclamations);
  } catch (err) {
    res.json({ message: err });
  }
});

// Route to count reclamations by category
router.post("/countByCategory", async (req, res) => {
  const { category } = req.body;

  try {
    const numberOfReclamations = await Reclamation.countDocuments({
      categorie: category,
    });
    res.json({ numberOfReclamations });
  } catch (error) {
    console.error("Error counting reclamations:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

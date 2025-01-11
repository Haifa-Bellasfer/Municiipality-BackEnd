const router = require("express").Router();
const Fournisseur = require("../model/Fournisseur");
const Reclamation = require("../model/Reclamation");
const User = require("../model/User");
const Municipality = require("../model/Municipality");
const { ObjectId } = require("mongodb");

router.post("/add", async (req, res) => {
  try {
    // Input validation
    if (
      !req.body.description ||
      !req.body.categorie ||
      !req.body.localisation
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Clean image data if needed (remove prefix if it exists)
    let imageData = req.body.imageURL;
    if (imageData && imageData.includes("base64,")) {
      imageData = imageData.split("base64,")[1];
    }

    // Fetch related entities
    const [fournisseur, citoyen, municipality] = await Promise.all([
      req.body.fournisseur ? Fournisseur.findById(req.body.fournisseur) : null,
      User.findById(req.body.citoyen),
      Municipality.findById(req.body.municipality),
    ]);

    const reclamation = new Reclamation({
      description: req.body.description,
      categorie: req.body.categorie,
      localisation: req.body.localisation,
      etat: "Pending",
      imageURL: imageData,
      fournisseur: fournisseur,
      citoyen: citoyen,
      municipality: municipality,
    });

    const savedReclamation = await reclamation.save();
    res.json(savedReclamation);
  } catch (err) {
    console.error("Error saving reclamation:", err);
    res.status(500).json({
      message: "Error saving reclamation",
      error: err.message,
    });
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

router.get("/getReclamationById/:id", async (req, res) => {
  try {
    const reclamation = await Reclamation.findById(req.params.id).populate(
      "citoyen"
    );

    // If the image is stored as Buffer in MongoDB
    if (reclamation.imageURL instanceof Buffer) {
      // Convert Buffer to base64
      reclamation.imageURL = reclamation.imageURL.toString("base64");
    }

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

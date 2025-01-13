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
router.get("/list/:etat", async (req, res) => {
  const etat = req.params.etat;
  if (!etat) throw new Error("etat is required");
  try {
    const reclamation = await Reclamation.find({ etat }).populate("citoyen");
    res.json(reclamation);
  } catch (err) {
    res.json({ message: err.message });
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
    if (!etat) {
      throw new Error("l'etat est obligatoire !");
    }

    const options = { new: true };
    const update = {};
    if (req.body.fournisseur) {
      const fournisseur = await Fournisseur.findById(req.body.fournisseur);
      console.log(fournisseur);
      update.fournisseur = fournisseur;
    }
    if (req.body.noteFournisseur) {
      const { noteFournisseur } = req.body;
      update.noteFournisseur = noteFournisseur;
    }
    if (req.body.noteResponsable) {
      const { noteResponsable } = req.body;

      update.noteResponsable = noteResponsable;
    }
    update.etat = req.body.etat;
    const reclamation = await Reclamation.findByIdAndUpdate(
      id,
      {
        $set: update,
      },
      options
    );

    res.json(reclamation);
  } catch (err) {
    res.json({ message: err.message });
  }
});

// Update reclamation to done
router.put("/updateDone/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const options = { new: true };
    const fournisseur = await Fournisseur.findById(req.body.fournisseur);

    const reclamation = await Reclamation.findByIdAndUpdate(
      id,
      {
        $set: {
          etat: "Done",
          fournisseur: fournisseur,
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
router.get("/getReclamationsByIdFournisseur/:id", async (req, res) => {
  try {
    const reclamations = await Reclamation.find({
      fournisseur: ObjectId(req.params.id),
    }).populate(["fournisseur", "citoyen"]);
    res.json(reclamations);
  } catch (err) {
    res.json({ message: err });
  }
});

// count reclamations by category
router.post("/countByCategory", async (req, res) => {
  const { category } = req.body;

  try {
    const numberOfReclamations = await Reclamation.countDocuments({
      categorie: category,
    });
    res.json({ numberOfReclamations });
  } catch (error) {
    console.error("Error counting reclamations:", error);
    res.json({ message: err.message });
  }
});

// Count reclamations by status
router.get("/countByStatus/:etat", async (req, res) => {
  const status = req.params.etat;
  console.log(status);
  try {
    if (!status) {
      throw new Error("l'etat invalide !");
    }
    const numberOfReclamations = await Reclamation.countDocuments({
      etat: status,
    });

    res.json({ numberOfReclamations });
  } catch (error) {
    res.json({ message: err.message });
  }
});

module.exports = router;

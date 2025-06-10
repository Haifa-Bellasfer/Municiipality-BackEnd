const router = require("express").Router();
const Fournisseur = require("../model/Fournisseur");
const Reclamation = require("../model/Reclamation");
const bcrypt = require("bcryptjs");
const Municipality = require("../model/Municipality");

const sendMail = require("../utils/sendMail");

// Add frournisseur
router.post("/add", async (req, res) => {
  try {
    // Validate input
    const {
      slug,
      email,
      password,
      addresse,
      phone,
      categorie,
      municipality,
      descritpion,
    } = req.body;
    if (!email || !password || !municipality) {
      return res.status(400).send({ message: "Invalid input data" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Validate municipality
    const municipalityDoc = await Municipality.findById(municipality);
    if (!municipalityDoc) {
      return res.status(400).send({ message: "Municipality not found" });
    }

    // Create fournisseur
    const fournisseur = new Fournisseur({
      slug,
      email,
      descritpion: descritpion,
      password: hashedPassword,
      addresse: addresse,
      telephone: phone,
      categorie,
      municipality: municipalityDoc,
      active: true,
    });

    // Save to DB
    await fournisseur.save();

    // Send email asynchronously
    sendMail(
      email,
      `<p>Pour Authentifier a Baladiti</p><br><p>Login: ${email}</p><br><p>Votre mot de passe: ${password}</p>`
    ).catch((emailErr) => console.error("Email sending failed:", emailErr));

    // Respond to client
    res.send({
      fournisseur,
      message: "Le fournisseur a été ajouté avec succès.",
    });
  } catch (err) {
    console.error("Error in /add:", err);
    res.status(500).send({ message: "Internal Server Error", error: err });
  }
});

// List fournisseur
router.get("/list", async (req, res) => {
  try {
    const filter = {};
    if (req.query.municipalityId) {
      filter.municipality = req.query.municipalityId;
    }
    const fournisseur = await Fournisseur.find(filter);
    res.json(fournisseur);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const users = await Fournisseur.findById(req.params.id);
    res.json(users);
  } catch (err) {
    res.json({ message: err });
  }
});

// Update fournisseur Password
router.put("/passwordUpdate/:id", async (req, res) => {
  const fournisseur = await Fournisseur.findById(req.params.id);
  if (!fournisseur) return res.send({ message: "fournisseur n'existe pas" });

  try {
    const id = req.params.id;
    const options = { new: true };
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.params.newPassword, salt);
    const fournisseur = await Fournisseur.findByIdAndUpdate(
      id,
      {
        $set: { password: hashedPassword },
      },
      options
    );
    res.json(fournisseur);
  } catch (err) {
    res.json({ message: err });
  }
});

// Delete fournisseur
router.delete("/delete/:id", async (req, res) => {
  try {
    await Reclamation.remove({ _id: req.params.id });
    res.json({ message: "successfully deleted" });
  } catch (err) {
    res.json({ message: err });
  }
});

//Update active fournisseur
router.put("/active/:id", async (req, res) => {
  const fournisseur = await Fournisseur.findById(req.params.id);
  if (!fournisseur) return res.send({ message: "fournisseur n'existe pas" });

  try {
    const id = req.params.id;
    const newState = req.body.state;
    const options = { new: true };
    const activeFrounisseur = await Fournisseur.findByIdAndUpdate(
      id,
      {
        $set: { active: newState },
      },
      options
    );
    res.json({ message: "fournisseur a ete modifier", activeFrounisseur });
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;

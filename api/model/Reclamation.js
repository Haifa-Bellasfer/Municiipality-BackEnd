const mongoose = require("mongoose");

const reclamationSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      min: 4,
      max: 200,
    },
    description: {
      type: String,
      required: true,
      min: 4,
      max: 200,
    },
    categorie: {
      type: String,
      enum: ["eclairage", "nettoyage", "batiment", "autre"],
      default: "nettoyage",
    },
    location: {
      type: String,
      required: true,
      default: "",
    },
    etat: {
      type: String,
      enum: ["Inprogress", "Pending", "Done"],
      default: "Inprogress",
    },
    imageURL: {
      type: String,
      required: true,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Reclamation", reclamationSchema);

const mongoose = require("mongoose");

const reclamationSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    categorie: {
      type: String,
      enum: ["Eclairage", "Nettoyage", "Batiment", "Autre"],
    },
    localisation: {
      type: String,
      required: true,
      default: "",
    },
    etat: {
      type: String,
      enum: ["Inprogress", "Pending", "Done", "Verified", "Discarded"],
    },
    imageURL: {
      type: String,
      default: "",
    },
    fournisseur: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Fournisseur",
    },
    municipality: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Municipality",
    },
    citoyen: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Citoyen",
    },
    noteFournisseur: {
      type: String,
      required: false,
    },
    noteResponsable: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Reclamation", reclamationSchema);

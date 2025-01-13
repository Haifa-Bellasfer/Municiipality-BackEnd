const mongoose = require("mongoose");

const fournisseurSchema = new mongoose.Schema(
  {
    organization: {
      type: String,
      required: true,
    },
    nom: {
      type: String,
      required: true,
    },
    prenom: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    adresse: {
      type: String,
      required: true,
    },
    telephone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    sexe: {
      type: String,
      enum: ["Homme", "Femme"],
    },
    categorie: {
      type: String,
      enum: ["Eclairage", "Nettoyage", "Batiment", "EnvEnvironnement", "Autre"],
      default: "Eclairage",
    },
    listeReclamation: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Reclamation",
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Fournisseur", fournisseurSchema);

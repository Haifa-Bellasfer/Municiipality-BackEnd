const mongoose = require("mongoose");
const Municipality = require("./Municipality");

const fournisseurSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    descritpion: {
      type: String,
      required: false,
    },
    addresse: {
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
    listeReclamation: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reclamation",
      },
    ],
    categorie: {
      type: String,
      enum: ["Eclairage", "Nettoyage", "Batiment", "EnvEnvironnement", "Autre"],
      default: "Eclairage",
    },
    municipality: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Municipality",
      required: true,
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

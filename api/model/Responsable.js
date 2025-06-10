const mongoose = require("mongoose");

const responsableSchema = new mongoose.Schema(
  {
    matricule: {
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
    sexe: {
      type: String,
      enum: ["Homme", "Femme"],
    },
    password: {
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
    municipality: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Municipality",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Responsable", responsableSchema);

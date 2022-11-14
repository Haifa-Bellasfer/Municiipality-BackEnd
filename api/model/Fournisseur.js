const mongoose = require('mongoose');

const fournisseurSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      min: 4,
      max: 200,
    },
    email: {
      type: String,
      required: true,
      min: 4,
      max: 200,
    },
    addresse: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      min: 4,
      max: 200,
    },
    categorie: {
      type: String,
      enum: ['Eclairage', 'Nettoyage', 'Batiment', 'Autre'],
      default: 'Eclairage',
    },
    listeReclamation: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Reclamation',
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

module.exports = mongoose.model('Fournisseur', fournisseurSchema);

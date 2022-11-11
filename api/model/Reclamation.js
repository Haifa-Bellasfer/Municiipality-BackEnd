const mongoose = require('mongoose');

const reclamationSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
      min: 4,
      max: 200,
    },
    categorie: {
      type: String,
      enum: ['Eclairage', 'Nettoyage', 'Batiment', 'Autre'],
    },
    localisation: {
      type: String,
      required: true,
      default: '',
    },
    etat: {
      type: String,
      enum: ['Inprogress', 'Pending', 'Done'],
    },
    imageURL: {
      type: String,
      required: true,
      default: '',
    },
    fournisseur: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Fournisseur',
    },
    municipality: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Municipality',
    },
    citoyen: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Reclamation', reclamationSchema);

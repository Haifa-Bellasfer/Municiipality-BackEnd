const mongoose = require('mongoose');

const municipalitySchema = new mongoose.Schema(
  {
    region: {
      type: String,
      required: true,
    },
    adresse: {
      type: String,
      required: true,
      min: 4,
      max: 200,
    },
    responsable: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    reclamations: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Reclamation',
    },
    fournisseurs: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Fournisseur',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Municipality', municipalitySchema);

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
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
    password: {
      type: String,
      required: true,
      min: 4,
      max: 200,
    },
    role: {
      type: String,
      enum: ['Citoyen', 'Fournisseur', 'Responsable'],
    },
    listeReclamation: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Reclamation',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);

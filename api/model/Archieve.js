const mongoose = require('mongoose');

const archieveSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    reclamations: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Reclamation',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Archieve', archieveSchema);

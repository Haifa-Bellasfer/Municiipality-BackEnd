const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  name: String,
  path: String,
  desc: String,
  img: {
    data: Buffer,
    contentType: String,
  },
});

module.exports = mongoose.model('Image', photoSchema);

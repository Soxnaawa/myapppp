const mongoose = require('mongoose');''

const DonneeMeteoSchema = new mongoose.Schema({
  region: { type: String, required: true },
  temperature: { type: Number, required: true },
  humidite: { type: Number, required: true },
  pression: { type: Number, required: true },
  description: { type: String, required: true },
  condition: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('DonneeMeteo', DonneeMeteoSchema);

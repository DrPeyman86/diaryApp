const mongoose = require('mongoose');

const eventsSchema = mongoose.Schema({
  type: { type: String, required: true },
  date: { type: Date, required: true },
  name: { type: String, required: true},
  comments: { type: String, required: true},
  imagePath: { type: String}
  //add creator
})

module.exports = mongoose.model('Events', eventsSchema);

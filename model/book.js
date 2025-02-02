const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  name: { type: String, required: true },
  mobilenumber: { type: Number, required: true },
  address: { type: String, required: true },
  date: {
    type: Date,
    required: true,
  },
  time: { type: String, required: true },
  createdDate: {
    type: Date, 
    default: Date.now,
  },
});

module.exports = mongoose.model("booking", bookSchema);

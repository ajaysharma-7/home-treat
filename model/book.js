const mongoose = require("mongoose");

// Helper function to format the date
function formatDate(inputDate) {
  const options = { year: "numeric", month: "short", day: "2-digit" };
  return new Date(inputDate).toLocaleDateString("en-US", options);
}

const bookSchema = mongoose.Schema({
  name: { type: String, required: true },
  mobilenumber: { type: Number, required: true },
  address: { type: String, required: true },
  date: {
    type: String,
    required: true,
    set: formatDate,
  },
  time: { type: String, required: true },
});

module.exports = mongoose.model("booking", bookSchema);

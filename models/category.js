const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String,required: true },
});

// Virtual for author's URL
categorySchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/category/${this._id}`;
});

// Export model
module.exports = mongoose.model("category", categorySchema);

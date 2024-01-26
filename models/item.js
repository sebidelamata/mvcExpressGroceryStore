const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const itemSchema = new Schema({
  received_date: { type: Date, required: true },
  expiration_date: { type: Date },
  item_discount: {
    isDiscounted: { type: Boolean, required: true},
    discountDecimalized : { type: Number, min: 0, max: 1 }
  },
  damaged: { type: Boolean, required: true },
  returned: { type: Boolean, required: true },
  weight_oz: { type: Number }
});

// Virtual for author's URL
itemSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/item/${this._id}`;
});

// Export model
module.exports = mongoose.model("Item", itemSchema);

const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const itemSchema = new Schema({
  received_date: { type: Date, required: true },
  expiration_date: { type: Date, required: false },
  item_discount: {
    isDiscounted: { type: Boolean, required: true},
    discountDecimalized : { 
      type: Number, 
      min: 0, 
      max: 1,
      validate: {
        validator: Number.isFinite,
        message: '{VALUE} is not a valid price number.',
      }, 
      required: false
    }
  },
  damaged: { type: Boolean, required: true },
  returned: { type: Boolean, required: true },
  weight_oz: { 
    type: Number,
    validate: {
      validator: Number.isFinite,
      message: '{VALUE} is not a valid price number.',
    }, 
    required: false
  },
  inventory_item_id: { type: Schema.Types.ObjectId, ref:'inventoryItem'},
  category_id: { type: Schema.Types.ObjectId, ref: 'category' }
});

// Virtual for if an item is expired
itemSchema.virtual("is_expired").get(function () {
  // We don't use an arrow function as we'll need the this object
  if(this.expiration_date <= new Date()){
    return true
  } else {
    return false
  }
});

itemSchema.virtual("received_date_formatted").get(function () {
  return DateTime.fromJSDate(this.received_date).toLocaleString(DateTime.DATE_MED);
});

itemSchema.virtual("expiration_date_formatted").get(function () {
  return DateTime.fromJSDate(this.expiration_date).toLocaleString(DateTime.DATE_MED);
});

// Virtual for author's URL
itemSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/item/${this._id}`;
});

// Export model
module.exports = mongoose.model("Item", itemSchema);

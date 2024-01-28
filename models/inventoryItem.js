const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const inventoryItemSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String,required: true },
  manufaturer: { type: String, required: true },
  inventory_item_discount: {
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
  price: {
    type: Number, 
    min: 0, 
    max:9999, 
    required: true,
    validate: {
      validator: Number.isFinite,
      message: '{VALUE} is not a valid price number.',
    },
  },
  storage: {
    type: String,
    enum: ['dry-shelving', 'dry-open', 'refridgeration', 'frozen'],
    default: 'dry-shelving',
    required: true
    },
  category_id: { type: Schema.Types.ObjectId, ref: 'category' }
});

// Virtual for author's URL
inventoryItemSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/inventory_item/${this._id}`;
});

// Export model
module.exports = mongoose.model("inventoryItem", inventoryItemSchema);

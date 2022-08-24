const mongoose = require("mongoose");

const marketplaceSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    categories: { type: String },
    price: { type: Number, required: true, min: 0 },
    location: { type: String, required: true },
    image: { type: String },
    description: { type: String },
    deliverable: { type: Boolean },
    postowner: { type: String },
  },
  { timestamps: true }
);

const Marketplace = mongoose.model("Marketplace", marketplaceSchema);

module.exports = Marketplace;

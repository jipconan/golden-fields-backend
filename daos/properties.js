const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const propertiesSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    propertyType: {
      type: String,
      enum: ['HDB', 'Hybrid', 'Private'],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      default: "", 
    },
    imageUrl: {
      type: [String],
      required: true, 
    },
    floorPlanUrl: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "", 
    },
    size: {
      type: Number,
      default: 0, 
    },
    bedrooms: {
      type: Number,
      default: 0, 
    },
    bathrooms: {
      type: Number,
      default: 0, 
    },
    agents: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Agents'
      }
    ]    
  },
  {
    timestamps: true,
    collection: 'properties'
  }
);

module.exports = mongoose.model("Properties", propertiesSchema);

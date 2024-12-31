const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const agentsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    experience: {
      type: Number,
      default: 0, 
    },
    languages: {
      type: [String],
      default: [], 
    },
    description: {
      type: String,
    },
    about: {
      type: String,
      default: "", 
    },
    imageUrl: {
      type: [String],
      required: true,
    },
    seniority: {
      type: String,
      enum: ['Junior', 'Mid', 'Senior'], 
    },
    specialties: {
      type: [String],
      default: [], 
    },
    email: {
      type: String,
      required: true,
      match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 
    },
    phone: {
      type: Number,
    },
    availability: {
      type: Boolean,
      default: true, 
    },
    properties: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Properties'
      }
    ],
    type: {
      type: String,
      default: 'agent'
    },
  },
  {
    timestamps: true,
    collection: 'agents'
  }
);

module.exports = mongoose.model("Agents", agentsSchema);

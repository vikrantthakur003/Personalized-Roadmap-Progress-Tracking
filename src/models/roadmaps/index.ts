import { model, Schema } from "mongoose";

const schema = new Schema({
  name: {
    type: String
  },
  description: {
    type: String,
    required: true
  }
}, { timestamps: true });

export const ROADMAP = model('roadmaps', schema);
import { model, Schema } from "mongoose";

const schema = new Schema({
  _roadmap: {
    type: Schema.Types.ObjectId,
    ref: 'roadmaps'
  },
  levelNumber: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
    required: true
  },
  levelName: {
    type: String,
    required: true
  },
  modules: [
    {
      moduleIndex: Number,
      title: String,
      description: String
    }
  ]
}, { timestamps: true });

schema.index({ _roadmap: 1 });

export const LEVEL = model('levels', schema);
import { model, Schema, Types } from 'mongoose';

const schema = new Schema({
  _user: {
    type: Types.ObjectId,
    ref: 'users'
  },
  roadmapId: {
    type: Types.ObjectId,
    ref: 'roadmaps'
  },
  levelId: {
    type: Types.ObjectId,
    ref: 'levels'
  },
  moduleIndex: {
    type: Number,
    required: true
  },
  completionStatus: {
    type: Boolean
  },
  timeSpent: {
    type: Number
  },
  userNotes: {
    type: String
  },
  unlockedAchievements: [String]
}, { timestamps: true });

schema.index({ __user: 1 });
schema.index({ roadmapId: 1, levelId: 1 });

export const USER_PROGRESS = model('user-progress', schema);
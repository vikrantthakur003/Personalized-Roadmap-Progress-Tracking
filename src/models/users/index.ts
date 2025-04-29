import { model, Schema } from 'mongoose';

const schema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['USER', 'ADMIN'],
    default: 'USER'
  },
  status: {
    type: String,
    enum: ['ACTIVE', 'INACTIVE', 'DELETED'],
    default: 'ACTIVE'
  }
}, { timestamps: true });

export const USER = model('users', schema);
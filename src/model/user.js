import mongoose from 'mongoose';

const { Schema } = mongoose;

export const User = new Schema({
  token: String,
  name: String,
  achievement: { type: Number, default: 0 },
  activityLog: { type: Array, default: [] },
});

export default mongoose.model('user', User);

import mongoose from 'mongoose';

const { Schema } = mongoose;

const User = new Schema({
  token: String,
  name: String,
  achievement: { type: Number, default: 0 },
  activityLog: { type: Array, default: [] },
});

module.exports = mongoose.model('user', User);

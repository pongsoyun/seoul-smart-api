import mongoose from 'mongoose';
import { User } from './user';
import { Place } from './place';

const { Schema } = mongoose;

const Day = new Schema({
  date: String,
  startTime: String,
  progressTime: String,
});

const Activity = new Schema({
  name: String,
  leader: User,
  participants: { type: [{ user: User, comment: String }], default: [] },
  total: Number,
  days: [{ day: Day, place: Place, room: String }],
  content: String,
  type: { type: String, enum: ['mentoring', 'study', 'conference', 'networking', 'lifestyle'] },
  status: { type: String, enum: ['recruit', 'deadline', 'progress', 'done'] },
});

export default mongoose.model('activity', Activity);

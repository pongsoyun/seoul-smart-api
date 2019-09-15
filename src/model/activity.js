import mongoose from 'mongoose';
import { User } from './user';
import { Place } from './place';

const { Schema } = mongoose;

const Activity = new Schema({
  name: String,
  leader: User,
  participants: { type: [{ user: User, comment: String }], default: [] },
  total: Number,
  days: [{ 
    date: String,
    startTime: String,
    endTime: String,
    place: Place,
    room: String,
  }],
  content: String,
  type: { type: String, enum: ['mentoring', 'study', 'conference', 'networking', 'lifestyle'] },
  status: { type: String, enum: ['recruit', 'pauserecruit', 'ongoing', 'done'], default: 'recruit' },
});

export default mongoose.model('activity', Activity);

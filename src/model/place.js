import mongoose from 'mongoose';

const { Schema } = mongoose;

const Room = new Schema({
  name: String,
  facility: String,
  visit: Number,
  equipments: [String],
  description: String,
  thumbnail: String,
});

const Location = new Schema({
  address: String,
  gu: String,
});

export const Place = new Schema({
  name: String,
  rooms: [Room],
  location: Location,
  businessHour: String,
  bookLink: String,
  thumbnail: String,
  contact: String,
});

export default mongoose.model('place', Place);

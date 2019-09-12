import mongoose from 'mongoose';

const { Schema } = mongoose;

export const Program = new Schema({
  title: String,
  poster: String,
  link: String,
});

export default mongoose.model('program', Program);

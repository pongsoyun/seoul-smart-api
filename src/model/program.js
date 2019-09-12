import mongoose from 'mongoose';

const { Schema } = mongoose;

export const Program = new Schema({
  title: String,
  image: String,
  link: String,
});

export default mongoose.model('program', Program);

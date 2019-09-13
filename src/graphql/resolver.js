import User from '../model/user';
import Place from '../model/place';
import Activity from '../model/activity';
import Program from '../model/program';
import { join } from 'path';

async function Users(){
  const users = await User.find();
  return users;
}

async function createUser({ name, token }) {
  const result = await User.create({ name, token });
  return result;
}

async function signIn({ token }) {
  const user = await User.findOne({ token });
  return user;
}

async function findUser({ _id }) {
  const user = await User.findOne({ _id });
  return user;
}

async function getPlaces() {
  const places = await Place.find();
  return places;
}

async function createActivity({
  name, userId, total, date, startTime, progressTime,
  placeId, room, content, type,
}) {
  const user = findUser(userId);
  const place = await Place.findOne({ _id: placeId });
  const day = {
    date,
    startTime,
    progressTime,
    place,
    room,
  };

  const activity = await Activity.create({
    name, leader: user, total, days: [day], content, type,
  });
  return activity;
}

async function modifyActivity({
  activityId, name, userId, total, date, startTime, progressTime,
  placeId, room, content, type,
}) {
  const user = findUser(userId);
  const place = await Place.findOne({ _id: placeId });
  const day = {
    date,
    startTime,
    progressTime,
    place,
    room,
  };

  const activity = await Activity.findOneAndUpdate({ _id: activityId }, {
    name, leader: user, total, days: [day], content, type,
  });
  return activity;
}

async function applyActivity({ activityId, userId, comment }) {
  const user = findUser(userId);
  const participant = {
    user,
    comment,
  }
  const activity = await Activity.findOneAndUpdate({ _id: activityId }, { $addToSet: { participants: participant }});
  return activity;
}

async function getPrograms() {
  const programs = await Program.find();
  return programs;
}

async function getProgram({ _id }) {
  const program = await Program.findOne({ _id });
  return program;
}

const rootValue = {
  Users,
  createUser,
  findUser,
  signIn,
  createActivity,
  modifyActivity,
  applyActivity,
  getPrograms,
  getProgram,
  getPlaces,
};

export default rootValue;

import User from '../model/user';
import Place from '../model/place';
import Activity from '../model/activity';
import Program from '../model/program';

async function Users(){
  const users = await User.find();
  return users;
}

async function createUser({ name, token }) {
  const result = await User.create({ name, token });
  return result;
}

async function modifyUser({ userId, name }) {
  const user = await User.findOneAndUpdate({ _id: userId }, { name });
  return user;
}

async function signIn({ token }) {
  const user = await User.findOne({ token });
  return user;
}

async function findUser({ _id }) {
  const user = await User.findOne({ _id });
  return user;
}

async function findPlace({ _id }) {
  const place = await Place.findOne({ _id });
  return place;
}

async function getPlaces({ page = 1, search, facility, gu }) {
  const limit = 5;
  const skip = (page-1)*limit;
  if(!!!search && !!!facility && !!!gu){
    return await Place.find().skip(skip).limit(limit);
  }
  const places = await Place.find({ $or: [{ name: { $regex: search }}, { 'location.gu': gu }, { rooms: { $elemMatch: { facility }}}]}).skip(skip).limit(limit);
  return places;
}

async function createActivity({
  name, userId, total, date, startTime, endTime,
  placeId, room, content, type,
}) {
  const user = findUser(userId);
  const place = findPlace(placeId);
  const day = {
    date,
    startTime,
    endTime,
    place,
    room,
  };

  const activity = await Activity.create({
    name, leader: user, total, days: [day], content, type,
  });
  return activity;
}

async function modifyActivity({
  activityId, name, userId, total, date, startTime, endTime,
  placeId, room, content, type,
}) {
  const user = findUser(userId);
  const place = findPlace(placeId);
  const day = {
    date,
    startTime,
    endTime,
    place,
    room,
  };

  const activity = await Activity.findOneAndUpdate({ _id: activityId }, {
    name, leader: user, total, days: [day], content, type,
  });
  return activity;
}

async function deleteActivity({ activityId }) {
  const activity = await Activity.findOneAndDelete({ _id: activityId });
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

async function cancelActivity({ activityId, userId }) {
  const user = findUser(userId);
  const activity = await Activity.findOneAndUpdate({ _id: activityId }, { $pull: { participants: { $elemMatch: { user }}}});
  return activity;
}

async function changeActivity({ activityId, status }) {
  const activity = await Activity.findOneAndUpdate({ _id: activityId }, { status });
  return activity;
}

async function extendActivity({ activityId, date, startTime, endTime, placeId, room }) {
  const place = findPlace(placeId);
  const day = {
    date,
    startTime,
    endTime,
    place,
    room,
  };
  const activity = await Activity.findOneAndUpdate({ _id: activityId }, { $addToSet: { days: day }});
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
  modifyUser,
  findUser,
  findPlace,
  signIn,
  createActivity,
  modifyActivity,
  deleteActivity,
  applyActivity,
  cancelActivity,
  changeActivity,
  extendActivity,
  getPrograms,
  getProgram,
  getPlaces,
};

export default rootValue;

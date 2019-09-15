import { Users, createUser, modifyUser, signIn, findUser } from './user';
import Place from '../../model/place';
import Activity from '../../model/activity';
import { getPrograms, getProgram } from './program';

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

async function getActivities({ page = 1}){
  const limit = 5;
  const skip = (page-1)*limit;
  const activities = await Activity.find().sort({ status : -1 }).skip(skip).limit(limit);
  return activities;
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


const rootValue = {
  Users,
  createUser,
  modifyUser,
  findUser,
  findPlace,
  signIn,
  createActivity,
  getActivities,
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

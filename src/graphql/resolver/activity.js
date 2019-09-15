import Activity from '../../model/activity';

export async function createActivity({
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
  
export async function getActivities({ page = 1}){
  const limit = 5;
  const skip = (page-1)*limit;
  const activities = await Activity.find().sort({ status : -1 }).skip(skip).limit(limit);
  return activities;
}
  
export async function modifyActivity({
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
  
export async function deleteActivity({ activityId }) {
  return await Activity.findOneAndDelete({ _id: activityId });
}
  
export async function applyActivity({ activityId, userId, comment }) {
  const user = findUser(userId);
  const participant = {
    user,
    comment,
  }
  return await Activity.findOneAndUpdate({ _id: activityId }, { $addToSet: { participants: participant }});
}
  
export async function cancelActivity({ activityId, userId }) {
  const user = findUser(userId);
  const activity = await Activity.findOneAndUpdate({ _id: activityId }, { $pull: { participants: { $elemMatch: { user }}}});
  return activity;
}
  
export async function changeActivity({ activityId, status }) {
  const activity = await Activity.findOneAndUpdate({ _id: activityId }, { status });
  return activity;
}
  
export async function extendActivity({ activityId, date, startTime, endTime, placeId, room }) {
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
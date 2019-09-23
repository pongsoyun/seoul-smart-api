import Activity from "../../model/activity";
import { findUser, addLog, deleteLog, achieve } from "./user";

export async function createActivity({
  name,
  userId,
  total,
  date,
  startTime,
  endTime,
  place,
  room,
  content,
  type
}) {
  const user = await findUser({ _id: userId });
  const leader = {
    userId: user._id,
    name: user.name
  };

  const day = {
    date,
    startTime,
    endTime,
    place,
    room
  };

  const activity = await Activity.create({
    name,
    leader,
    total,
    days: [day],
    content,
    type
  });
  await addLog({ _id: userId, activityId: activity._id });
  return activity;
}

export async function getActivities({ page = 1, type }) {
  const limit = 5;
  const skip = (page - 1) * limit;
  if (!!!type) {
    return await Activity.find()
      .sort({ status: -1 })
      .skip(skip)
      .limit(limit);
  }
  const activities = await Activity.find({ type })
    .sort({ status: -1 })
    .skip(skip)
    .limit(limit);
  return activities;
}

export async function findActivity({ _id }) {
  return await Activity.findOne({ _id });
}

export async function modifyActivity({
  activityId,
  name,
  userId,
  total,
  date,
  startTime,
  endTime,
  place,
  room,
  content,
  type
}) {
  const user = await findUser({ _id: userId });
  const leader = {
    userId: user._id,
    name: user.name
  };

  const day = {
    date,
    startTime,
    endTime,
    place,
    room
  };

  const activity = await Activity.findOneAndUpdate(
    { _id: activityId },
    {
      name,
      leader,
      total,
      days: [day],
      content,
      type
    }
  );
  return activity;
}

export async function deleteActivity({ activityId }) {
  const activity = await findActivity({ _id: activityId });
  activity.participants.forEach(({ _id }) => deleteLog({ _id, activityId }));
  return await Activity.findOneAndDelete({ _id: activityId });
}

export async function applyActivity({ activityId, userId, comment }) {
  const user = await addLog({ _id: userId, activityId });
  const participant = {
    userId: user._id,
    name: user.name,
    comment
  };
  return await Activity.findOneAndUpdate(
    { _id: activityId },
    { $addToSet: { participants: participant } }
  );
}

export async function cancelActivity({ activityId, userId }) {
  deleteLog({ _id: userId, activityId });
  return await Activity.findOneAndUpdate(
    { _id: activityId },
    { $pull: { participants: { userId } } }
  );
}

export async function changeActivity({ activityId, status }) {
  if (status === "done") {
    const activity = await findActivity({ _id: activityId });
    const achievement =
      (activity.participants.length + 20) * activity.days.length;
    activity.participants.forEach(({ userId }) =>
      achieve({ _id: userId, achievement })
    );
    achieve({ _id: activity.leader.userId, achievement: achievement + 30 });
  }
  return await Activity.findOneAndUpdate({ _id: activityId }, { status });
}

export async function extendActivity({
  activityId,
  date,
  startTime,
  endTime,
  place,
  room
}) {
  const day = {
    date,
    startTime,
    endTime,
    place,
    room
  };
  const activity = await Activity.findOneAndUpdate(
    { _id: activityId },
    { $addToSet: { days: day } }
  );
  return activity;
}

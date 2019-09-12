import User from '../model/user';
import Place from '../model/place';
import Activity from '../model/activity';

async function createUser({ name, token }) {
  const result = await User.create({ name, token });
  return result;
}

async function signIn({ token }) {
  const user = await User.findOne({ token });
  return user;
}

async function createActivity({
  name, userId, total, date, startTime, progressTime,
  placeId, room, content, type,
}) {
  const user = await User.findOne({ _id: userId });
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

async function test({ userId }) {
  const user = await User.findOne({ _id: userId });
  return user;
}

const rootValue = {
  createUser,
  signIn,
  createActivity,
  test,
};

export default rootValue;

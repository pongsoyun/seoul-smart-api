import User from '../../model/user';
import { findActivity } from './activity';

export async function Users() {
    return await User.find();
}
  
export async function createUser({ name, token }) {
  return await User.create({ name, token });
}
  
export async function modifyUser({ userId, name }) {
  return await User.findOneAndUpdate({ _id: userId }, { name });
}
  
export async function signIn({ token }) {
  return await User.findOne({ token });
}
  
export async function findUser({ _id }) {
  return await User.findOne({ _id });
}

export async function addLog({ _id, activityId }) {
  const { name, leader, participants, total, days, content, type, status } = await findActivity({ _id: activityId });
  const activity = {
    activityId,
    name,
    leader,
    participants,
    total,
    days,
    content,
    type, 
    status,
  }
  return await User.findOneAndUpdate({ _id }, { $addToSet: { activityLog: activity }});
}

export async function deleteLog({ _id, activityId }) {
  return await User.findOneAndUpdate({ _id }, { $pull: { activityLog: { $elemMatch: { activityId } } }});
}

export async function achieve({ _id, achievement }) {
  return await User.findOneAndUpdate({ _id }, { $inc : { achievement }});
}
import User from '../../model/user';

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

export async function addLog({ _id, activity }) {
  return await User.findOneAndUpdate({ _id }, { $addToSet: { activityLogs: activity }});
}
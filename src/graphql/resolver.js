import User from '../model/user';

async function createUser({ name, token }) {
  const result = await User.create({ name, token });
  return result;
}

async function signIn({ token }) {
  const user = await User.findOne({ token });
  return user;
}


const rootValue = {
  createUser,
  signIn,
};

export default rootValue;

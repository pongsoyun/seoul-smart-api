import User from '../model/user';

async function createUser({ name, token }) {
  const result = await User.create({ name, token });
  return result;
}

const rootValue = {
  createUser,
};

export default rootValue;

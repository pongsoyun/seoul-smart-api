import User from '../model/user';

async function createUser({name, token}) {
  return await User.create({name, token});
}

const rootValue = {
  createUser
}

export default rootValue;

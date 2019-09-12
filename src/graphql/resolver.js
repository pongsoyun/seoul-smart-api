import User from '../model/user';

async function createUser({ name, token }) {
  const result = await User.create({ name, token });
  return result;
}

async function signIn ({token}) {
  //console.log({token});
  const user = await User.findOne({token});
  //console.log(user);
  return user;
}


const rootValue = {
  createUser,
  signIn,
};

export default rootValue;

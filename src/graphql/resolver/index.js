import { Users, createUser, modifyUser, signIn, findUser } from './user';
import { findPlace, getPlaces } from './place';
import { createActivity, modifyActivity, changeActivity, deleteActivity, applyActivity, cancelActivity, extendActivity, getActivities } from './activity';
import { getPrograms, getProgram } from './program';

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

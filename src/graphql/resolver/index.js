import { Users, createUser, modifyUser, signIn, findUser, addLog, deleteLog, achieve } from './user';
import { findPlace, getPlaces } from './place';
import { createActivity, modifyActivity, changeActivity, deleteActivity, applyActivity, cancelActivity, extendActivity, getActivities, findActivity } from './activity';
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
  findActivity,
  getPrograms,
  getProgram,
  getPlaces,
  addLog,
  deleteLog,
  achieve,
};

export default rootValue;

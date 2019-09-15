import Program from '../../model/program';

export async function getPrograms() {
  return await Program.find();
}
  
export async function getProgram({ _id }) {
  return await Program.findOne({ _id });
}
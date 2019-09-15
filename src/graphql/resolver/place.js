import Place from '../../model/place';

export async function findPlace({ _id }) {
  return await Place.findOne({ _id });
}
  
export async function getPlaces({ page = 1, search, facility, gu }) {
  const limit = 5;
  const skip = (page-1)*limit;
  if(!!!search && !!!facility && !!!gu){
    return await Place.find().skip(skip).limit(limit);
  }
  const places = await Place.find({ $or: [{ name: { $regex: search }}, { 'location.gu': gu }, { rooms: { $elemMatch: { facility }}}]}).skip(skip).limit(limit);
  return places;
}
  
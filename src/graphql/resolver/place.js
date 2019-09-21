import Place from "../../model/place";

export async function findPlace({ _id }) {
  return await Place.findOne({ _id });
}

export async function getPlaces({
  page = 1,
  search = "undefined",
  facility,
  gu
}) {
  const limit = 5;
  const skip = (page - 1) * limit;
  const condition = [search === "undefined", !!!facility, !!!gu];
  if (condition.every(value => value)) {
    return await Place.find()
      .skip(skip)
      .limit(limit);
  }
  if (condition.filter(value => !value).length > 1) {
    const $and = [];
    condition.forEach((v, i) => {
      if (!v) {
        switch (i) {
          case 0:
            $and.push({ name: { $regex: search } });
            break;
          case 1:
            $and.push({ rooms: { $elemMatch: { facility } } });
            break;
          case 2:
            $and.push({ "location.gu": gu });
            break;
        }
      }
    });
    return await Place.find({
      $and
    })
      .skip(skip)
      .limit(limit);
  }
  const places = await Place.find({
    $or: [
      { name: { $regex: search } },
      { "location.gu": gu },
      { rooms: { $elemMatch: { facility } } }
    ]
  })
    .skip(skip)
    .limit(limit);
  return places;
}

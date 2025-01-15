import { PlaceModel } from './places.model';
import { Place } from './places.entity';
const getAllPlaces = async () => {
  return PlaceModel.find().populate('zone');
};

const getPlaceById = async (id: string) => {
  return PlaceModel.findById(id).populate('zone');
};

const createPlace = async (place: Place) => {
  return PlaceModel.create(place);
};

const updatePlace = async (id: string, updatedPlace: Partial<Place>) => {
  return PlaceModel.findByIdAndUpdate(id, updatedPlace, { new: true });
};

const deletePlace = async (id: string) => {
  return PlaceModel.findByIdAndDelete(id);
};

export default {
  getAllPlaces,
  getPlaceById,
  createPlace,
  updatePlace,
  deletePlace,
};

import { PlaceModel } from './places.model';
import { Place } from './places.entity';
import { get } from 'mongoose';
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

const getPlacesByZone = async (zoneId: string) => {
  return PlaceModel.find({ zone: zoneId }).populate('zone');
};

const deletePlacesByZone = async (zoneId: string) => {
  return PlaceModel.deleteMany({ zone: zoneId });
};

export default {
  getAllPlaces,
  getPlaceById,
  createPlace,
  updatePlace,
  deletePlace,
  getPlacesByZone,
  deletePlacesByZone,
};

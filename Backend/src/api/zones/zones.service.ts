import { get } from 'mongoose';
import { Zone } from './zones.entity';
import { ZoneModel } from './zones.model';
import { PlaceModel } from '../places/places.model';

const getAllZones = async () => {
  return ZoneModel.find().populate('Agent');
};

const getZoneById = async (id: string) => {
  return ZoneModel.findById(id).populate('Agent');
};

const createZone = async (zone: Zone) => {
  return ZoneModel.create(zone);
};

const updateZone = async (id: string, updatedZone: Partial<Zone>) => {
  return ZoneModel.findByIdAndUpdate(id, updatedZone, { new: true });
};

const deleteZone = async (id: string) => {
  const places = await PlaceModel.find({ zone: id });

  if (places.length > 0) {
    throw new Error(
      'Cannot delete zone. There are places associated with this zone.',
    );
  }
  return ZoneModel.findByIdAndDelete(id);
};

const zoneExists = async (userId: string, cap: string) => {
  return ZoneModel.findOne({ Agent: userId, Cap: cap });
};

const getCapsByUser = async (userId: string) => {
  const zones = await ZoneModel.find({ Agent: userId }, 'Cap');
  return zones.map((zone) => zone.Cap);
};

export default {
  getAllZones,
  getZoneById,
  createZone,
  updateZone,
  deleteZone,
  zoneExists,
  getCapsByUser,
};

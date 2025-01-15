import { Zone } from './zones.entity';
import { ZoneModel } from './zones.model';
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
  return ZoneModel.findByIdAndDelete(id);
};

const zoneExists = async (userId: string, cap: string) => {
  return ZoneModel.findOne({ Agent: userId, Cap: cap });
};

export default {
  getAllZones,
  getZoneById,
  createZone,
  updateZone,
  deleteZone,
  zoneExists,
};

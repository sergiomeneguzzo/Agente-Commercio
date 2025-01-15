import mongoose from 'mongoose';
import { User } from '../user/user.entity';
import { Zone } from './zones.entity';

const zoneSchema = new mongoose.Schema<Zone>({
  Agent: { type: String, ref: 'User', required: true },
  Cap: { type: String, required: true },
});

zoneSchema.set('toJSON', {
  virtuals: true,
  transform: (_, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export const ZoneModel = mongoose.model<Zone>('Zone', zoneSchema);

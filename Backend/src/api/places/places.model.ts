import mongoose from 'mongoose';
import { Place } from './places.entity';

const placeSchema = new mongoose.Schema<Place>({
  zone: { type: String, ref: 'Zone', required: true },
  placeName: { type: String, required: true },
  longitude: { type: String, required: true },
  latitude: { type: String, required: true },
});

placeSchema.set('toJSON', {
  virtuals: true,
  transform: (_, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export const PlaceModel = mongoose.model<Place>('Place', placeSchema);

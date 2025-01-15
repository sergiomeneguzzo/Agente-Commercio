import { Zone } from './zone';

export interface Place {
  id?: string;
  zone: string | Zone;
  placeName: string;
  longitude: string;
  latitude: string;
}

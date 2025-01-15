import { Zone } from '../zones/zones.entity';

export interface Place {
  id?: string;
  zone: string | Zone;
  placeName: string;
  longitude: string;
  latitude: string;
}

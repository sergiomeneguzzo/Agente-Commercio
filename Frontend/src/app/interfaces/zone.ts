import { User } from './user';

export interface Zone {
  id?: string;
  Agent: string | User;
  Cap: string;
}

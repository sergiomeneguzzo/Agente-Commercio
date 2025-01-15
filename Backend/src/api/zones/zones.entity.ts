import { User } from '../user/user.entity';

export interface Zone {
  id?: string;
  Agent: string | User;
  Cap: string;
}

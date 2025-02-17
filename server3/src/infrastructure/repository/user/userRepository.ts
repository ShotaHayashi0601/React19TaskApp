import { User } from '@prisma/client';
import { UserGateway } from './userGateway';

const userGateway = new UserGateway();
export class UserRepository {
  async register(user: User): Promise<User> {
    return await userGateway.register(user);
  }
}

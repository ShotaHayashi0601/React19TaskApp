import { User } from '@prisma/client';
import { db } from '../../../lib/db';

export class UserGateway {
  async register(user: User): Promise<User> {
    const createdUser = await db.user.create({
      data: user,
    });
    return Promise.resolve(createdUser);
  }
}

import { User } from '@prisma/client';
import { db } from '../../../lib/db';

export class UserGateway {
  async register(user: User): Promise<User> {
    const upsertedUser = await db.user.upsert({
      where: { id: user.id }, // idを基準に存在確認
      update: {
        email: user.email,
        name: user.name,
        updatedAt: new Date(), // 更新時刻を反映
      },
      create: {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    return Promise.resolve(upsertedUser);
  }
}

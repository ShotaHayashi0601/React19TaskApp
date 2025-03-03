import { db } from '../../../lib/db';

export class HealthGateway {
  healthCheck = async () => {
    const healthCheckId = 'health-check-record';
    await db.healthCheck.upsert({
      where: { id: healthCheckId },
      update: { status: 'OK', checkedAt: new Date() },
      create: { id: healthCheckId, status: 'OK' },
    });
  };
}

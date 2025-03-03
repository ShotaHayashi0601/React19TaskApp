import { Task } from '@prisma/client';
import { HealthRepository } from '../../../infrastructure/repository/health/healthRepository';

export class HealthCheckCase {
  constructor(private _healthRepository: HealthRepository) {}
  async healthCheck(): Promise<void> {
    return await this._healthRepository.healthCheck();
  }
}

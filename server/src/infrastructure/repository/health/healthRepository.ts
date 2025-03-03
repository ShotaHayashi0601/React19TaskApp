import { HealthGateway } from './healthGateway';

const healthGateway = new HealthGateway();
export class HealthRepository {
  async healthCheck(): Promise<void> {
    return await healthGateway.healthCheck();
  }
}

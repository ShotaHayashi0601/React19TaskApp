import { Hono } from 'hono';
import { HealthCheckCase } from '../../application/useCase/health/createTaskUseCase';
import { HealthRepository } from '../../infrastructure/repository/health/healthRepository';

const healthRouter = new Hono();
const healthCheckUseCase = new HealthCheckCase(new HealthRepository());

/**
 * ✅ ヘルスチェックの実行
 */
healthRouter.get('/', async (c) => {
  try {
    await healthCheckUseCase.healthCheck();
    return c.json({ success: true, message: 'Ok' }, 200);
  } catch (error) {
    return c.json({ success: false, message: error }, 400);
  }
});

export default healthRouter;

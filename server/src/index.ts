import { Hono } from 'hono';
import { cors } from 'hono/cors';
import webhookRouter from './presentation/webhook/webhookRouter';

const app = new Hono().basePath('/api');

app.use(
  '/*',
  cors({
    origin: ['*'],
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization'],
    exposeHeaders: ['Content-Length'],
    maxAge: 3600,
    credentials: true,
  })
);
app.route('/webhooks', webhookRouter);

// Cloudflare Workers 用のエクスポート
export default app;

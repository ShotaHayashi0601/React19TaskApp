import { Hono } from 'hono';
import { cors } from 'hono/cors';
import webhookRouter from './presentation/webhook/webhookRouter';
import taskRouter from './presentation/task/taskRouter';
const app = new Hono().basePath('/api');

// app.use(
//   '/*',
//   cors({
//     origin: (origin) => origin ?? 'http://localhost:5173', //
//     allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // OPTIONS を追加
//     allowHeaders: ['Content-Type', 'Authorization'],
//     exposeHeaders: ['Content-Length'],
//     maxAge: 3600,
//     credentials: true,
//   })
// );

app.use(
  '/*',
  cors({
    origin: '*', // すべてのオリジンを許可
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
    exposeHeaders: ['Content-Length'],
    maxAge: 3600,
  })
);

app.route('/webhooks', webhookRouter);
app.route('/tasks', taskRouter);

// Cloudflare Workers 用のエクスポート
export default app;

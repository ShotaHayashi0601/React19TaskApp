import { Hono } from 'hono';
import { cors } from 'hono/cors';
import webhookRouter from './presentation/webhook/webhookRouter';
import taskRouter from './presentation/task/taskRouter';
import { clerkMiddleware } from '@hono/clerk-auth';
import { serve } from '@hono/node-server';
const app = new Hono().basePath('/api');
import 'dotenv/config';
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
// app.use(
//   '*',
//   clerkMiddleware({
//     secretKey: process.env.CLERK_SECRET_KEY,
//     publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
//   })
// );
// app.use(
//   '/*',
//   cors({
//     origin: '*', // すべてのオリジンを許可
//     allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowHeaders: ['Content-Type', 'Authorization'],
//     exposeHeaders: ['Content-Length'],
//     maxAge: 3600,
//   })
// );

// app.route('/webhooks', webhookRouter);
// app.route('/tasks', taskRouter);
app.get('/', (c) => {
  return c.text('Hello Hono!');
});
// ✅ サーバー起動部分 (Renderに必要)
const port = process.env.PORT ? Number(process.env.PORT) : 3000;
console.log(`Server running at http://localhost:${port}`);
// Bun.serve({
//   port: port,
//   fetch: app.fetch,
// });
serve({
  fetch: app.fetch,
  port: port,
});
// export default app;

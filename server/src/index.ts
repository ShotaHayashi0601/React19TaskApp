import { Hono } from 'hono';
import { cors } from 'hono/cors';
import webhookRouter from './presentation/webhook/webhookRouter';
import taskRouter from './presentation/task/taskRouter';
import { clerkMiddleware } from '@hono/clerk-auth';
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
export default {
  port: 5501,
  fetch: app.fetch,
};

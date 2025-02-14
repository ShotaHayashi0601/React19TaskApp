import { Hono } from 'hono';
import { Webhook } from 'svix';
import { HTTPException } from 'hono/http-exception';

interface Env {
  SIGNING_SECRET: string;
}

const webhookRouter = new Hono<{ Bindings: Env }>();
webhookRouter.post('/', async (c) => {
  const SIGNING_SECRET = c.env.SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    console.error('シークレットが設定されていません');
    throw new HTTPException(500, {
      message: 'シークレットが設定されていません',
    });
  }

  const payload = await c.req.text();

  // Svixヘッダーの取得
  const svix_id = c.req.header('svix-id');
  const svix_timestamp = c.req.header('svix-timestamp');
  const svix_signature = c.req.header('svix-signature');

  // ヘッダーが存在しない場合はエラーを返す
  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error('Error: Svix ヘッダが存在しません');
    throw new HTTPException(400, { message: 'Svixヘッダが存在しません' });
  }

  const svix = new Webhook(SIGNING_SECRET);

  let evt: any;
  try {
    evt = svix.verify(payload, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    });
  } catch (err) {
    console.error('シグネチャの認証に失敗しました:', err);
    throw new HTTPException(400, { message: '不正なシグネチャです' });
  }

  const eventType = evt.type;
  const { id } = evt.data;

  console.log(`Received webhook with ID ${id} and event type of ${eventType}`);
  console.log('Webhook payload:', evt.data);
  if (eventType === 'user.created') {
    console.log('userId:', eventType.id);
  }

  return c.json({ success: true, message: 'Webhookを受信しました' });
});
export default webhookRouter;

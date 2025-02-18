import { z } from 'zod';

export const taskFormSchema = z.object({
  title: z
    .string({
      required_error: '必須です',
      invalid_type_error: '文字列を入力してください',
    })
    .min(2, { message: '2文字以上入力してください' })
    .max(100, { message: '20文字以内にしてください' }),
  description: z.string().max(1000, { message: '1000文字以内にしてください' }),
  dueDate: z.date().nullable(),
  expectedTime: z
    .number()
    .int()
    .min(0, { message: '0以上の数値を入力してください' }),
  actualTime: z
    .number()
    .int()
    .min(0, { message: '0以上の数値を入力してください' }),
});

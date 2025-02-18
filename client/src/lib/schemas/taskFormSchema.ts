import { z } from 'zod';

export const taskFormSchema = z.object({
  title: z
    .string({
      required_error: '必須です',
      invalid_type_error: '文字列を入力してください',
    })
    .min(2, { message: '2文字以上入力してください' })
    .max(100, { message: '20文字以内にしてください' }),
  description: z
    .string()
    .max(50, { message: '50文字以内にしてください' })
    .optional(),
  dueDate: z.date(),
  expectedTime: z
    .number({
      required_error: '必須です',
      invalid_type_error: '数値を入力してください',
    })
    .int()
    .min(0, { message: '0以上の数値を入力してください' }),
  actualTime: z
    .number({
      required_error: '必須です',
      invalid_type_error: '数値を入力してください',
    })
    .int()
    .min(0, { message: '0以上の数値を入力してください' }),
});

export type TaskForm = z.infer<typeof taskFormSchema>;

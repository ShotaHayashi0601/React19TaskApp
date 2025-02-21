import { taskStatus } from '@/types';
import { z } from 'zod';

export const taskFormSchema = z.object({
  id: z.string(),
  title: z
    .string({
      required_error: '必須です',
      invalid_type_error: '文字列を入力してください',
    })
    .min(2, { message: '2文字以上入力してください' })
    .max(20, { message: '20文字以内にしてください' }),
  description: z
    .string()
    .max(40, { message: '40文字以内にしてください' })
    .optional(),
  dueDate: z.date(),
  status: z.enum([
    taskStatus.PENDING,
    taskStatus.IN_PROGRESS,
    taskStatus.COMPLETED,
  ]),
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
  order: z.number().int().min(0, { message: '0以上の数値を入力してください' }),
});

export type TaskForm = z.infer<typeof taskFormSchema>;

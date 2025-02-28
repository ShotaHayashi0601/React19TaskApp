import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { TaskForm } from '@/lib/schemas/taskFormSchema';
import { cn } from '@/lib/utils';
import { FC } from 'react';
import { UseFormReturn } from 'react-hook-form';

export const TitleField: FC<{ form: UseFormReturn<TaskForm> }> = ({ form }) => (
  <FormField
    control={form.control}
    name="title"
    render={({ field }) => (
      <FormItem className="min-h-[110px]">
        <FormLabel className="text-xs">タイトル</FormLabel>
        <FormControl>
          <Input
            className={cn('border-blue-400 focus:outline-none')}
            placeholder="タスクのタイトルを入力"
            {...field}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

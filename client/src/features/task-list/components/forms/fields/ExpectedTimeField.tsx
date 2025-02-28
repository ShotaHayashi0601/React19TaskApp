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

export const ExpectedTimeField: FC<{ form: UseFormReturn<TaskForm> }> = ({
  form,
}) => (
  <FormField
    control={form.control}
    name="expectedTime"
    render={({ field }) => (
      <FormItem className="min-h-[100px]">
        <FormLabel className="text-xs">予定作業時間 (分)</FormLabel>
        <FormControl>
          <Input
            className={cn(
              'border-blue-400  outline-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-none',
              'text-gray-800'
            )}
            type="number"
            placeholder="予定時間を入力"
            {...field}
            onChange={(e) => field.onChange(e.target.valueAsNumber)}
            onFocus={(e) => field.onChange(e.target.valueAsNumber)}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

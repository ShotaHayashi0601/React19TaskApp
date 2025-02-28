import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { TaskForm } from '@/lib/schemas/taskFormSchema';
import { FC } from 'react';
import { UseFormReturn } from 'react-hook-form';

export const DescriptionField: FC<{ form: UseFormReturn<TaskForm> }> = ({
  form,
}) => (
  <FormField
    control={form.control}
    name="description"
    render={({ field }) => (
      <FormItem>
        <FormLabel className="text-xs">内容・説明など</FormLabel>
        <FormControl>
          <Textarea
            className="h-[100px] resize-none border-blue-400 focus:outline-none"
            {...field}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

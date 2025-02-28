import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { taskStatuses } from '@/constants/task-status';
import { TaskForm } from '@/lib/schemas/taskFormSchema';
import { FC } from 'react';
import { UseFormReturn } from 'react-hook-form';

export const StatusField: FC<{
  form: UseFormReturn<TaskForm>;
  isPending: boolean;
}> = ({ form, isPending }) => (
  <FormField
    disabled={isPending}
    control={form.control}
    name="status"
    render={({ field }) => (
      <FormItem className="min-h-[110px]">
        <FormLabel className="text-xs">ステータス</FormLabel>
        <Select
          disabled={isPending}
          onValueChange={field.onChange}
          value={field.value}
        >
          <FormControl>
            <SelectTrigger>
              <SelectValue
                defaultValue={field.value}
                placeholder="ステータスを選択"
              />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {taskStatuses.map((status) => (
              <SelectItem key={status.id} value={status.id}>
                {status.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    )}
  />
);

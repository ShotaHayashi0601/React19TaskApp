import { Calendar } from '@/components/ui/calendar';
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Icons } from '@/constants/icons';
import { TaskForm } from '@/lib/schemas/taskFormSchema';
import { format } from 'date-fns';
import { FC } from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';

export const DueDateField: FC<{ form: UseFormReturn<TaskForm> }> = ({
  form,
}) => (
  <Controller
    control={form.control}
    name="dueDate"
    render={({ field }) => (
      <FormItem className="flex flex-col min-h-[90px]">
        <FormLabel className="text-xs">期限</FormLabel>
        <Popover>
          <PopoverTrigger asChild>
            <FormControl>
              <button
                type="button"
                className="w-full px-3 py-2 border rounded-md bg-white text-left flex items-center"
              >
                {field.value
                  ? format(field.value, 'yyyy/MM/dd')
                  : '期限日を選択'}
                <Icons.calendar className="w-5 h-5 text-gray-500" />
              </button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent>
            <Calendar
              mode="single"
              selected={field.value}
              onSelect={(date) => field.onChange(date)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <FormMessage />
      </FormItem>
    )}
  />
);

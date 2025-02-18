import CustomModal from '@/components/atoms/CustomModal';
import { TaskForm, taskFormSchema } from '@/lib/schemas/taskFormSchema';
import React, { startTransition, useActionState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Icons } from '@/constants/icons';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import AddTaskButton from '../buttons/AddTaskButton';
const defaultValues: TaskForm = {
  title: '',
  description: '',
  dueDate: new Date(),
  expectedTime: 0,
  actualTime: 0,
};
const AddTaskForm = () => {
  const form = useForm<TaskForm>({
    resolver: zodResolver(taskFormSchema),
    mode: 'onChange',
    defaultValues: { ...defaultValues },
  });

  const [formState, formAction, isPending] = useActionState(
    async (prevState: TaskForm, formData: FormData) => {
      const data = Object.fromEntries(formData.entries());

      console.log('フォームデータ:', data);
      return {
        ...prevState,
        ...data,
      };
    },
    { ...defaultValues }
  );

  const onSubmit: SubmitHandler<TaskForm> = (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value.toString());
      }
    });
    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <CustomModal>
      <div className="bg-white p-4 overflow-hidden w-[360px] lg:max-h-[500px] 2xl:max-h-[800px] overflow-y-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="min-h-[110px]">
                  <FormLabel>タイトル</FormLabel>
                  <FormControl>
                    <Input
                      className={cn(
                        'border-blue-400  outline-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-none',
                        'text-gray-800'
                      )}
                      placeholder="タスクのタイトルを入力"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>内容・説明など</FormLabel>
                  <FormControl>
                    <Textarea
                      className={cn(
                        'h-[100px] resize-none',
                        'border-blue-400  outline-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-none',
                        'text-gray-800'
                      )}
                      placeholder="詳細を入力"
                      {...field}
                    />
                  </FormControl>
                  <div className="h-[30px] mb-[40px]">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <Controller
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem className="flex flex-col min-h-[90px]">
                  <FormLabel>期限</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <button
                          type="button"
                          className={cn(
                            'w-full px-3 py-2 border rounded-md bg-white text-left flex items-center justify-between',
                            'border-blue-400  outline-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-none'
                          )}
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
            <FormField
              control={form.control}
              name="expectedTime"
              render={({ field }) => (
                <FormItem className="min-h-[100px]">
                  <FormLabel>予定作業時間 (分)</FormLabel>
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
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="actualTime"
              render={({ field }) => (
                <FormItem className="min-h-[100px]">
                  <FormLabel>実績作業時間 (分)</FormLabel>
                  <FormControl>
                    <Input
                      className={cn(
                        'border-blue-400  outline-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-none',
                        'text-gray-800'
                      )}
                      type="number"
                      placeholder="実績時間を入力"
                      {...field}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mx-auto w-[100px]">
              <AddTaskButton text={'追加'} type="submit" disabled={isPending} />
            </div>
          </form>
        </Form>
      </div>
    </CustomModal>
  );
};

export default AddTaskForm;

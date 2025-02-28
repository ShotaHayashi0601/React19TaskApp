import CustomModal from '@/components/atoms/CustomModal';
import { TaskForm, taskFormSchema } from '@/lib/schemas/taskFormSchema';
import { FC, startTransition, useActionState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { Task, TaskStatus } from '@/types';
import { useUser } from '@clerk/clerk-react';
import { FormAction, formActions } from '@/types/form-action';
import { handleAdd, handleUpdate } from '../../services/taskAction';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  ActualTimeField,
  DescriptionField,
  DueDateField,
  ExpectedTimeField,
  StatusField,
  SubmitButtons,
  TitleField,
} from './fields';

interface InputTaskFormProps {
  status: TaskStatus;
  action: FormAction;
  setOpen: (value: boolean) => void;
  setOptimisticTasks: (tasks: Task[]) => void;
  task?: Task;
}

function getInitialValues(
  action: FormAction,
  status: TaskStatus,
  task?: Task
): TaskForm {
  if (action === formActions.UPDATE && task) {
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      dueDate: new Date(task.dueDate ?? ''),
      expectedTime: task.expectedTime,
      actualTime: task.actualTime ?? 0,
      status: task.status,
      order: task.order,
    };
  } else {
    return {
      id: '',
      title: '',
      description: '',
      dueDate: new Date(),
      expectedTime: 0,
      actualTime: 0,
      status,
      order: 0,
    };
  }
}

const InputTaskForm: FC<InputTaskFormProps> = ({
  status,
  action,
  setOpen,
  setOptimisticTasks,
  task,
}) => {
  const defaultValues = getInitialValues(action, status, task);
  const token = useAppSelector((state) => state.auth.token);

  const form = useForm<TaskForm>({
    resolver: zodResolver(taskFormSchema),
    mode: 'onChange',
    defaultValues,
  });
  const tasks = useAppSelector((state) => state.task.taskList);

  const dispatch = useAppDispatch();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [updatedState, formAction, isPending] = useActionState(
    async (prevState: TaskForm, formData: FormData) => {
      const data = Object.fromEntries(
        formData.entries()
      ) as unknown as TaskForm;
      const actionsHandlers: Record<FormAction, () => Promise<void>> = {
        add: () =>
          handleAdd(data, userId, tasks, dispatch, setOptimisticTasks, token),
        update: () =>
          handleUpdate(
            data,
            userId,
            tasks,
            dispatch,
            setOptimisticTasks,
            token
          ),
      };
      setOpen(false);
      await actionsHandlers[action]();
      return { ...prevState, ...data };
    },
    defaultValues
  );

  const { user } = useUser();
  if (!user?.id) return null;
  const userId = user.id;

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
    <CustomModal setOpen={action === formActions.ADD ? setOpen : undefined}>
      <div
        className={cn(
          'max-h-[90vh] overflow-y-auto p-4 rounded-lg shadow-lg',
          'bg-white p-4 overflow-hidden w-[330px] lg:max-h-[500px] 2xl:max-h-[800px] overflow-y-auto'
        )}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <TitleField form={form} />
            <DescriptionField form={form} />
            <StatusField form={form} isPending={isPending} />
            <DueDateField form={form} />
            <ExpectedTimeField form={form} />
            <ActualTimeField form={form} />
            <SubmitButtons
              isPending={isPending}
              setOpen={setOpen}
              action={action}
            />
          </form>
        </Form>
      </div>
    </CustomModal>
  );
};

export default InputTaskForm;

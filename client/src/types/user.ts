import { Task } from './task';

export type User = {
  id: string;
  name: string;
  email: string;
  tasks?: Task[];
  createdAt: Date;
  updatedAt: Date;
};

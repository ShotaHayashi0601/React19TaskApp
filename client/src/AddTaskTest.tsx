import { useState } from 'react';

import { useUser } from '@clerk/clerk-react';
import { Task, TaskStatus, taskStatus } from './types';
type CreateTaskInput = Omit<Task, 'id' | 'createdAt' | 'updatedAt'>;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export default function AddTask() {
  const { user } = useUser(); // Clerkで認証されたユーザーを取得
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [expectedTime, setExpectedTime] = useState(0);
  const [dueDate, setDueDate] = useState('');

  const handleAddTask = async () => {
    if (!user) {
      alert('ログインが必要です');
      return;
    }

    // dueDate は string のため Date 型に変換

    const newTask: CreateTaskInput = {
      title,
      description,
      expectedTime,
      actualTime: 0,
      userId: user.id,
      status: taskStatus.PENDING as TaskStatus,
      dueDate,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'タスク追加に失敗しました');
      }

      const data = await response.json();
      console.log('Task added successfully:', data);

      // フォームをリセット
      setTitle('');
      setDescription('');
      setExpectedTime(0);
      setDueDate('');
    } catch (error) {
      console.error('Error adding task:', error);
      alert(`エラー: ${(error as Error).message}`);
    }
  };

  return (
    <div>
      <h2>タスクを追加</h2>
      <input
        type="text"
        placeholder="タイトル"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="説明"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="number"
        placeholder="予定時間 (分)"
        value={expectedTime}
        onChange={(e) => setExpectedTime(Number(e.target.value))}
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <button onClick={handleAddTask}>タスク追加</button>
    </div>
  );
}

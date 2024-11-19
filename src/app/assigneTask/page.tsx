'use client'

import axios from 'axios';
import { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
}

interface Todo {
  userId: number;
  title: string;
  completed: boolean;
}

const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get<User[]>('https://jsonplaceholder.typicode.com/users');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};

const createTodo = async (todo: Todo) => {
  try {
    const response = await axios.post('https://jsonplaceholder.typicode.com/todos', todo);
    console.log('Todo created successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating todo:', error);
  }
};

const CreateTodoPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | undefined>(undefined);
  const [todoTitle, setTodoTitle] = useState<string>('');
  const [todoCompleted, setTodoCompleted] = useState<boolean>(false);

  useEffect(() => {
    const loadUsers = async () => {
      const fetchedUsers = await fetchUsers();
      setUsers(fetchedUsers);
    };

    loadUsers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedUserId || !todoTitle) {
      alert('Please select a user and enter a title for the todo.');
      return;
    }

    const newTodo: Todo = {
      userId: selectedUserId,
      title: todoTitle,
      completed: todoCompleted,
    };

    const createdTodo = await createTodo(newTodo);
    if (createdTodo) {
      alert('Todo created successfully!');

      setTodoTitle('');
      setTodoCompleted(false);
      setSelectedUserId(undefined);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-900">
        Create Todo
      </h1>

      <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 border rounded-lg shadow-lg bg-white">
        <div className="mb-4">
          <label htmlFor="user" className="block text-lg font-semibold text-blue-800">
            Select User:
          </label>
          <select
            id="user"
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(Number(e.target.value))}
            className="mt-2 p-2 border border-gray-300 rounded w-full"
            aria-label="Select user for the todo"
            required
          >
            <option value="">-- Select a user --</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="todoTitle" className="block text-lg font-semibold text-blue-800">
            Todo Title:
          </label>
          <input
            type="text"
            id="todoTitle"
            value={todoTitle}
            onChange={(e) => setTodoTitle(e.target.value)}
            className="mt-2 p-2 border border-gray-300 rounded w-full"
            aria-label="Enter todo title"
            required
          />
        </div>

        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="todoCompleted"
            checked={todoCompleted}
            onChange={(e) => setTodoCompleted(e.target.checked)}
            className="mr-2"
            aria-label="Mark todo as completed"
          />
          <label htmlFor="todoCompleted" className="text-lg font-semibold text-blue-800">
            Completed
          </label>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all duration-300"
            aria-label="Submit todo"
          >
            Create Todo
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTodoPage;

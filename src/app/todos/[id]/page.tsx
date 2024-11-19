import axios from 'axios';
import Link from 'next/link';

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
  };
}

const fetchTodo = async (id: string): Promise<Todo> => {
  try {
    const response = await axios.get<Todo>(`https://jsonplaceholder.typicode.com/todos/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching todo:', error);
    throw new Error('Todo not found');
  }
};

const fetchUser = async (userId: number): Promise<User> => {
  try {
    const response = await axios.get<User>(`https://jsonplaceholder.typicode.com/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw new Error('User not found');
  }
};

interface TodoPageProps {
  params: { id: string };
}

const TodoPage = async ({ params }: TodoPageProps) => {
  const todo = await fetchTodo(params.id);
  const user = await fetchUser(todo.userId);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 text-blue-800">{todo.title}</h1>
      <p className="text-gray-700 text-lg">
        Status:{" "}
        <span className={todo.completed ? "text-green-600" : "text-red-600"}>
          {todo.completed ? "Completed" : "Pending"}
        </span>
      </p>

      <div className="mt-6 p-4 border rounded shadow bg-gray-50">
        <h2 className="text-xl font-semibold mb-2 text-blue-600">Assigned User</h2>
        <p className="text-gray-700">
          <strong>Name:</strong> {user.name}
        </p>
        <p className="text-gray-700">
          <strong>Username:</strong> {user.username}
        </p>
        <p className="text-gray-700">
          <strong>Email:</strong>{" "}
          <a
            href={`mailto:${user.email}`}
            className="text-blue-500 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {user.email}
          </a>
        </p>
        <p className="text-gray-700">
          <strong>Phone:</strong> {user.phone}
        </p>
        <p className="text-gray-700">
          <strong>Website:</strong>{" "}
          <a
            href={`https://${user.website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {user.website}
          </a>
        </p>
        <p className="text-gray-700">
          <strong>Company:</strong> {user.company.name}
        </p>
      </div>

      <Link
        href="/"
        className="mt-6 inline-block text-blue-500 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Go back to Home
      </Link>
    </div>
  );
};

export default TodoPage;

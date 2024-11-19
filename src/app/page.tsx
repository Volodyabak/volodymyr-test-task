import axios from 'axios';
import Link from 'next/link';

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const fetchTodos = async (): Promise<Todo[]> => {
  try {
    const response = await axios.get<Todo[]>('https://jsonplaceholder.typicode.com/todos?_limit=15');
    return response.data;
  } catch (error) {
    console.error('Error fetching todos:', error);
    return [];
  }
};

const Home = async () => {
  const todos = await fetchTodos();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-900 transition-all duration-500 transform hover:text-blue-700">
        Todo List
      </h1>
      <ul
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        role="list"
        aria-label="Todo List"
      >
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`relative overflow-hidden rounded-lg border shadow-lg transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-2xl ${
              todo.completed
                ? 'bg-gradient-to-r from-green-100 to-green-200 hover:from-green-200 hover:to-green-300'
                : 'bg-gradient-to-r from-red-100 to-red-200 hover:from-red-200 hover:to-red-300'
            }`}
            role="listitem"
            aria-labelledby={`todo-title-${todo.id}`}
          >
            <Link
              href={`/todos/${todo.id}`}
              className="p-6 block cursor-pointer transition-all duration-300 ease-in-out hover:transform hover:scale-105"
            >
              <h2
                id={`todo-title-${todo.id}`}
                className="text-xl font-semibold text-blue-800 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              >
                {todo.title}
              </h2>
              <p className="mt-4 text-sm text-gray-700 transition-all duration-200">
                <strong>Status:</strong>{' '}
                <span
                  className={`font-medium ${
                    todo.completed ? 'text-green-700' : 'text-red-700'
                  }`}
                >
                  {todo.completed ? 'Completed' : 'Pending'}
                </span>
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;

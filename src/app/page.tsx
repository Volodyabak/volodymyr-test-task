import axios from 'axios';
import Link from 'next/link';

interface Item {
  id: number;
  name: string;
  description: string;
}

const fetchItems = async (): Promise<Item[]> => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
  const { data } = await axios.get<Item[]>(`${baseUrl}/data/items.json`);
  return data;
};

const Home = async () => {
  const items = await fetchItems();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Items List</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <li
            key={item.id}
            className="p-4 border rounded shadow hover:shadow-lg transition"
          >
            <Link href={`/items/${item.id}`}>
              <h2 className="text-xl font-semibold text-blue-600 hover:underline">
                {item.name}
              </h2>
              <p className="text-gray-600">{item.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;

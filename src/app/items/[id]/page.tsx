import axios from 'axios';
import Link from 'next/link';

interface Item {
  id: number;
  name: string;
  description: string;
}

const fetchItem = async (id: string): Promise<Item> => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
  const { data } = await axios.get<Item[]>(`${baseUrl}/data/items.json`);
  const item = data.find((item) => item.id === parseInt(id, 10));
  if (!item) throw new Error('Item not found');
  return item;
};

interface ItemPageProps {
  params: { id: string };
}

const ItemPage = async ({ params }: ItemPageProps) => {
  const item = await fetchItem(params.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{item.name}</h1>
      <p className="text-gray-700">{item.description}</p>
      <Link href="/" className="mt-6 inline-block text-blue-500 hover:underline">
        Go back to Home
      </Link>
    </div>
  );
};

export default ItemPage;

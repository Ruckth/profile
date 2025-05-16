import { getFruitsSlow } from '../lib/actions';
import Image from 'next/image';

export default async function FruitGrid() {
  const fruits = await getFruitsSlow();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {fruits.map((fruit) => (
        <div 
          key={fruit.id} 
          className="bg-pink-100 rounded-lg shadow-md p-4 flex flex-col items-center"
        >
          <Image
            src={fruit.imageUrl}
            alt={fruit.name}
            width={150}
            height={150}
            className="rounded-md object-cover mb-4"
          />
          <h3 className="text-lg font-semibold text-amber-900">{fruit.name}</h3>
          <p className="text-gray-600">${fruit.price.toFixed(2)}</p>
          <p className="text-sm text-gray-500">Stock: {fruit.stock}</p>
          <p className="text-xs text-gray-400">{fruit.category}</p>
        </div>
      ))}
    </div>
  );
}
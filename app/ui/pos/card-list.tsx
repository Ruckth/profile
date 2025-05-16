

import Card from './card';
import { fetchFilteredItems } from "../../lib/pos/data";

export default async function CardList({
    query,
    currentPage,
  }: {
    query: string;
    currentPage: number;
  }) {
    const  items  = await fetchFilteredItems(query, currentPage);
    
    return (
        <div className="flex flex-wrap gap-6">
          {items.map((item) => (
            <Card
              key={item.productId}
              id={item.productId}
              title={item.productName}
              description={item.productId}
              criteria={item.category}
              imageUrl={item.imageUrl}
              price={item.price}
            />
          ))}
        </div>
    );
  }
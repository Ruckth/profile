

import Card from './card';
import { fetchFilteredItems } from "../../lib/pos/data";
import { Item } from '../../lib/pos/data';

export default async function CardList({
    query,
    currentPage,
  }: {
    query: string;
    currentPage: number;
  }) {
    const items = await fetchFilteredItems(query, currentPage);
    
    return (
        <div className="flex flex-wrap gap-6">
          {items.map((item) => (
            <Card
              key={item.no}
              no={item.no}
              productId={item.productId}
              productName={item.productName}
              category={item.category}
              price={item.price}
              imageUrl={item.imageUrl}
              stock={item.stock}
            />
          ))}
        </div>
    );
  }
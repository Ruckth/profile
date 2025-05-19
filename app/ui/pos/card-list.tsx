

import Card from './card';
import { fetchFilteredItems, fetchPosPages } from "../../lib/pos/data";
import Search from "@/app/ui/pos/search";
import Pagination from "@/app/ui/pos/pagination";
import { fetchPosTotal } from '../../lib/pos/data';


function TotalItem({ totalItems }: { totalItems: number }) {
  return (
    <div className="flex justify-center">
      <p>Item: {totalItems}</p>
    </div>
  );
}

export default async function CardList({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const totalPages = await fetchPosPages(query);
    const totalItems = await fetchPosTotal(query);
    const items = await fetchFilteredItems(query, currentPage);
    
    return (
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 h-full hidden-lg:w-full lg:w-[66.666667%] overflow-hidden lg:sticky lg:top-0">
        <div className='lg:col-span-3 grid-cols-2 flex flex-col'>
          <Search placeholder={"..."} />
            
          <div className="col-span-5 flex justify-between">
            <TotalItem totalItems={totalItems} />
            <Pagination totalPages={totalPages} />
          </div>
        </div>
          
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
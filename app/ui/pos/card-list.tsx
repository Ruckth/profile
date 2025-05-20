

import Card from './card';
import { fetchFilteredItems, fetchPosPages } from "../../lib/pos/data";
import Search from "@/app/ui/pos/search";
import Pagination from "@/app/ui/pos/pagination";
import { fetchPosTotal } from '../../lib/pos/data';

function TotalItem({ totalItems }: { totalItems: number }) {
  return (
    <div className="flex items-center justify-center px-3 py-1.5 bg-gray-50 rounded-lg">
      <p className="text-sm font-medium text-black">Items: <span className="font-bold">{totalItems}</span></p>
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
    const params = await searchParams;
    const query = params?.query || '';
    const currentPage = Number(params?.page) || 1;
    const totalPages = await fetchPosPages(query);
    const totalItems = await fetchPosTotal(query);
    const items = await fetchFilteredItems(query, currentPage);
    
    return (
      <div className="w-full bg-white p-4 rounded-lg shadow-sm text-gray-500">
        {/* Header Section */}
        <div className="space-y-4 mb-6">
          {/* Search Bar */}
          <div className="w-full">
            <Search placeholder="Search products..." />
          </div>
          
          {/* Info Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <TotalItem totalItems={totalItems} />
            <Pagination totalPages={totalPages} />
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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
      </div>
    );
}
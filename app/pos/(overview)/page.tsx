
import CardList from "../../ui/pos/card-list";
import Search from "@/app/ui/pos/search";
import Pagination from "@/app/ui/pos/pagination";
import { fetchPosPages,fetchPosTotal } from "@/app/lib/pos/data";
import CurrentDate from "@/app/ui/current-date";
import CheckoutCard from "@/app/ui/pos/cart-card";
import { Suspense } from "react";

function TotalItem({ totalItems }: { totalItems: number }) {
  return (
    <div className="flex justify-center">
      <p>Item: {totalItems}</p>
    </div>
  );
}

export default async function PosPage(props: {
  searchParams?: Promise<{
      query?: string;
      page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchPosPages(query);
  const totalItems = await fetchPosTotal(query);

  return (
     <main className="grid grid-cols-5">
        <div className="col-span-5 flex gap-2 justify-center items-center">
          <Search placeholder={"..."} />
          <CurrentDate />
        </div>
        <div className="col-span-5 flex justify-between">
          <TotalItem totalItems={totalItems} />
          <Pagination totalPages={totalPages} />
        </div>
        <div className="col-span-3">
          <CardList query={query} currentPage={currentPage} />
        </div>
        <div className="col-span-2 flex flex-col">
          <Suspense fallback={<div>Loading</div>}>
            <CheckoutCard />
          </Suspense>

        </div>
       
      </main>
  );
}



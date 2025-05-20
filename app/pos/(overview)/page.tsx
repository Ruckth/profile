
import CardList from "../../ui/pos/card-list";
import CheckoutCard from "@/app/ui/pos/cart-card";
import { Suspense } from "react";

export default async function PosPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  return (
    <main className="flex flex-col gap-2 lg:flex-row justify-between">
      <Suspense fallback={<div>Loading products...</div>}>
        <CardList searchParams={searchParams} />
      </Suspense>
      
      <div className="col-span-2 flex flex-col lg:w-[70%]">
        <Suspense fallback={<div>Loading cart...</div>}>
          <CheckoutCard />
        </Suspense>
      </div>
    </main>
  );
}



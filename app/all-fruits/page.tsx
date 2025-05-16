
export function ItemCard() {
//  Simple card component
return (

 <div className="flex flex-col items-center justify-center gap-2">
  <div className="w-[100px] h-[100px] bg-gray-200 rounded-full"></div>
  <div className="text-sm font-bold text-gray-800">Item Name</div>
  <div className="text-xs text-gray-600">Item Description</div>
  <div className="text-xs text-gray-600">Item Price</div>
</div>
);
}

export function ItemCardList() {
  return (
    <div className="flex flex-col">
      {Array(10).fill(null).map((_, index) => (
        <ItemCard key={index} />
      ))}
      </div>
  );
}

export default function AllFruitsPage() {
  return (
  <div className="p-4 min-h-screen">
      <main className="grid grid-cols-5 grid-row-7 gap-1 border h-screen overflow-hidden">
        <div className="col-span-full bg-amber-400 min-h-[60px] w-full rounded-xl shadow-md flex items-center justify-center text-white font-bold">header nav</div>
        <div className="col-span-3 row-span-8 bg-blue-400 min-h-[60px] w-full rounded-xl shadow-md flex flex-col items-center text-white font-bold">
          <div>Search</div>
          <div> Pagination </div>
          <div className="mt-4 bg-blue-900 w-[calc(100%-1rem)] flex justify-center"> Items </div>
          
          </div>
        <div className="col-span-2 overflow-auto bg-green-400 w-full rounded-xl shadow-md flex flex-col items-center text-white font-bold">
          IN cart
          <ItemCardList />
        </div>
        <div className="col-span-2 row-span-2 bg-red-400 min-h-10 w-full rounded-xl shadow-md flex items-center justify-center text-white font-bold">Strawberry</div>
        {/* <div className="bg-yellow-400 min-h-[60px] w-full rounded-xl shadow-md flex items-center justify-center text-white font-bold">Banana</div> */}
      </main>
  </div>
  );
}

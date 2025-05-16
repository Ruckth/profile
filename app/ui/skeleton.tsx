export function FruitCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center animate-pulse">
      <div className="w-[150px] h-[150px] bg-gray-200 rounded-md mb-4" />
      <div className="w-24 h-4 bg-gray-200 rounded mb-2" />
      <div className="w-16 h-4 bg-gray-200 rounded mb-2" />
      <div className="w-20 h-3 bg-gray-200 rounded" />
    </div>
  );
}

export function FruitGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <FruitCardSkeleton key={i} />
      ))}
    </div>
  );
}
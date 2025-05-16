import { FruitGridSkeleton } from "../ui/skeleton";
import CompoundCalculator from '../ui/compound-calculator';


export default function Loading() {
  return (
    <div className="flex min-h-screen mt-20 justify-center">
      <main className="flex flex-col gap-[32px] row-start-2 items-center w-full max-w-7xl px-4">
        <FruitGridSkeleton />
      </main>
      <CompoundCalculator />
    </div>
  );
}
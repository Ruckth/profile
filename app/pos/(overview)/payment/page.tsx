
import TemporaryCheckout from "@/app/ui/pos/temp-chart"

export default function PaymentPage() {
  return (
    <div className="flex min-h-screen justify-center">
    <main className="flex flex-col gap-[32px]">
      <div className="flex justify-center">
        <h1 className="text-2xl font-bold ">Payment Page</h1>
      </div>
      <TemporaryCheckout/>
    </main>
  </div>
  )
}
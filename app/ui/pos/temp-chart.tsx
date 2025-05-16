'use client'

import { useRouter } from 'next/navigation'

export default function TemporaryCheckout() {
  const router = useRouter()

  const mockItems = [
    { id: 'item1', name: 'Item 1' },
    { id: 'item2', name: 'Item 2' },
    { id: 'item3', name: 'Item 3' },
  ]

  const handleCheckout = () => {
    const selectedIds = mockItems.map(item => item.id)
    const queryString = selectedIds.join(',')
    router.push(`/checkout?query=${queryString}`)
  }

  return (
    <div>
      <h1>Temporary Check-up Page</h1>
      <ul>
        {mockItems.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      <button onClick={handleCheckout}>Proceed to Checkout</button>
    </div>
  )
}

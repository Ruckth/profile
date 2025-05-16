'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Item } from '@/app/lib/pos/placeholder-data';
import { getItems } from '@/app/lib/pos/data';

type CheckoutItem = {
  item: Item;
  quantity: number;
  discount: number;
  finalPrice: number;
};

export default function CheckoutCard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [checkoutItems, setCheckoutItems] = useState<CheckoutItem[]>([]);
  const [total, setTotal] = useState(0);

  const updateQuantity = (itemId: string, newQuantity: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newQuantity <= 0) {
      params.delete(`item-${itemId}`);
      params.delete(`discount-${itemId}`);
    } else {
      params.set(`item-${itemId}`, newQuantity.toString());
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const updateDiscount = (itemId: string, discount: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (discount <= 0) {
      params.delete(`discount-${itemId}`);
    } else {
      params.set(`discount-${itemId}`, discount.toString());
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    const fetchItemsFromQuery = async () => {
      const itemIds: string[] = [];
      
      for (const [key, value] of searchParams.entries()) {
        if (key.startsWith('item-')) {
          const itemId = key.replace('item-', '');
          itemIds.push(itemId);
        }
      }

      const fetchedItems = await getItems(itemIds);
      const items: CheckoutItem[] = [];
      let totalPrice = 0;

      for (const item of fetchedItems) {
        const quantityParam = searchParams.get(`item-${item.productId}`);
        const discountParam = searchParams.get(`discount-${item.productId}`);
        
        if (quantityParam) {
          const quantity = parseInt(quantityParam, 10);
          const discount = discountParam ? parseInt(discountParam, 10) : 0;
          const priceAfterDiscount = item.price * (1 - (discount / 100));
          const finalPrice = priceAfterDiscount * quantity;

          items.push({
            item,
            quantity,
            discount,
            finalPrice
          });

          totalPrice += finalPrice;
        }
      }

      setCheckoutItems(items);
      setTotal(totalPrice);
    };

    fetchItemsFromQuery();
  }, [searchParams]);

  return (
    <div className="rounded-lg shadow-md p-4">
      <h2 className="text-xl font-bold mb-4">Checkout Summary</h2>
      
      {checkoutItems.length > 0 ? (
        checkoutItems.map((checkoutItem) => (
          <div key={checkoutItem.item.productId} className="border-b py-2">
            <div className="flex justify-between items-center mb-1">
              <span className="font-medium">{checkoutItem.item.productName}</span>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => updateQuantity(checkoutItem.item.productId, checkoutItem.quantity - 1)}
                  className="w-6 h-6 flex items-center justify-center rounded-full bg-red-600 text-white hover:bg-red-700"
                >
                  -
                </button>
                <span>{checkoutItem.quantity}</span>
                <button 
                  onClick={() => updateQuantity(checkoutItem.item.productId, checkoutItem.quantity + 1)}
                  className="w-6 h-6 flex items-center justify-center rounded-full bg-green-600 text-white hover:bg-green-700"
                >
                  +
                </button>
              </div>
            </div>
            
            <div className="text-sm">
              Original Price: ${checkoutItem.item.price.toFixed(2)}
            </div>
            
            <div className="flex items-center gap-2 my-2">
              <label className="text-sm">Discount (%):</label>
              <input
                type="number"
                min="0"
                max="100"
                value={checkoutItem.discount}
                onChange={(e) => updateDiscount(checkoutItem.item.productId, Number(e.target.value))}
                className="w-20 px-2 py-1 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            
            <div className="text-right font-medium">
              Subtotal: ${checkoutItem.finalPrice.toFixed(2)}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-4 text-gray-500">No items in cart</div>
      )}
      
      <div className="mt-4 pt-2 border-t">
        <div className="flex justify-between items-center text-lg font-bold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
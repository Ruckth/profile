'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Item } from '@/app/lib/pos/placeholder-data';
import { getItems } from '@/app/lib/pos/data';
import Image from 'next/image';
import { useDebounce } from 'use-debounce';

type CheckoutItem = {
  item: Item;
  quantity: number;
  discount: number;
  discountType: 'percentage' | 'amount';
  finalPrice: number;
};

export default function CheckoutCard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [checkoutItems, setCheckoutItems] = useState<CheckoutItem[]>([]);
  const [total, setTotal] = useState(0);
  const [discountValue, setDiscountValue] = useState<{ [key: string]: number }>({});
  const [debouncedDiscountValue] = useDebounce(discountValue, 300);
  const [quantityValue, setQuantityValue] = useState<{ [key: string]: number }>({});
  const [debouncedQuantityValue] = useDebounce(quantityValue, 300);


  const updateQuantity = (itemId: string, newQuantity: number, maxStock: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newQuantity <= 0) {
      params.delete(`item-${itemId}`);
      params.delete(`discount-${itemId}`);
    } else if (newQuantity <= maxStock) {
      params.set(`item-${itemId}`, newQuantity.toString());
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const updateDiscount = (itemId: string, discount: number, type: 'percentage' | 'amount') => {
    const params = new URLSearchParams(searchParams.toString());
    if (discount <= 0) {
      params.delete(`discount-${itemId}`);
      params.delete(`discount-type-${itemId}`);
    } else {
      params.set(`discount-${itemId}`, discount.toString());
      params.set(`discount-type-${itemId}`, type);
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    const fetchItemsFromQuery = async () => {
      const itemIds: string[] = [];

      for (const [key] of searchParams.entries()) {
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
        const discountTypeParam = searchParams.get(`discount-type-${item.productId}`);

        if (quantityParam) {
          const quantity = parseInt(quantityParam, 10);
          const discount = discountParam ? parseInt(discountParam, 10) : 0;
          const discountType = discountTypeParam === 'amount' ? 'amount' : 'percentage';
          let finalPrice = 0;

          if (discountType === 'percentage') {
            const priceAfterDiscount = item.price * (1 - (discount / 100));
            finalPrice = priceAfterDiscount * quantity;
          } else {
            const priceAfterDiscount = item.price - discount;
            finalPrice = Math.max(0, priceAfterDiscount) * quantity;
          }

          items.push({
            item,
            quantity,
            discount,
            discountType,
            finalPrice
          });

          totalPrice += finalPrice;
        }
      }

      setCheckoutItems(items);
      setTotal(totalPrice);
    };

    fetchItemsFromQuery();
  }, [searchParams.toString()]);

  useEffect(() => {
    // Update URL when debounced discount value changes
    Object.entries(debouncedDiscountValue).forEach(([itemId, value]) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value <= 0) {
        params.delete(`discount-${itemId}`);
        params.delete(`discount-type-${itemId}`);
      } else {
        const item = checkoutItems.find(item => item.item.productId === itemId);
        if (item) {
          params.set(`discount-${itemId}`, value.toString());
          params.set(`discount-type-${itemId}`, item.discountType);
        }
      }
      router.push(`?${params.toString()}`, { scroll: false });
    });
  }, [debouncedDiscountValue, searchParams, router, checkoutItems]);

  useEffect(() => {
    // Update URL when debounced quantity value changes
    Object.entries(debouncedQuantityValue).forEach(([itemId, value]) => {
      const params = new URLSearchParams(searchParams.toString());
      const item = checkoutItems.find(item => item.item.productId === itemId);
      if (item) {
        const newValue = Math.min(Math.max(1, value), item.item.stock);
        params.set(`item-${itemId}`, newValue.toString());
        router.push(`?${params.toString()}`, { scroll: false });
      }
    });
  }, [debouncedQuantityValue, searchParams, router, checkoutItems]);

  return (
    <div className="rounded-lg shadow-md p-4 bg-white text-gray-600">
      <h2 className="text-xl font-bold mb-4">Checkout Summary</h2>

      {checkoutItems.length > 0 ? (
        checkoutItems.map((checkoutItem) => (
          <div key={checkoutItem.item.productId} className="border-b py-2">
            <div className="flex gap-4 mb-3">
              {/* Product Image */}
              <div className="relative w-20 h-20 flex-shrink-0">
                <Image
                  src={checkoutItem.item.imageUrl || "/api/placeholder/400/320"}
                  alt={checkoutItem.item.productName}
                  fill
                  className="object-cover rounded-md"
                  sizes="80px"
                />
              </div>

              {/* Product Details */}
              <div className="flex-grow">
                <div className="flex justify-between items-start mb-1">
                  <span className="font-medium line-clamp-2">{checkoutItem.item.productName}</span>

                  <div className='flex flex-col gap-2 items-center'>
                    <div className="flex items-center gap-2 ml-2">
                      <button 
                        onClick={() => {
                          const newValue = Math.max(0, checkoutItem.quantity - 1);
                          if (newValue === 0) {
                            // Delete the item when quantity reaches 0
                            const params = new URLSearchParams(searchParams.toString());
                            params.delete(`item-${checkoutItem.item.productId}`);
                            params.delete(`discount-${checkoutItem.item.productId}`);
                            params.delete(`discount-type-${checkoutItem.item.productId}`);
                            router.push(`?${params.toString()}`, { scroll: false });
                          } else {
                            setQuantityValue(prev => ({
                              ...prev,
                              [checkoutItem.item.productId]: newValue
                            }));
                            updateQuantity(checkoutItem.item.productId, newValue, checkoutItem.item.stock);
                          }
                        }}
                        className="w-6 h-6 flex items-center justify-center rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="0"
                        max={checkoutItem.item.stock}
                        value={quantityValue[checkoutItem.item.productId] ?? checkoutItem.quantity}
                        onChange={(e) => {
                          const rawValue = Number(e.target.value);
                          if (rawValue === 0) {
                            // Delete the item when quantity is set to 0
                            const params = new URLSearchParams(searchParams.toString());
                            params.delete(`item-${checkoutItem.item.productId}`);
                            params.delete(`discount-${checkoutItem.item.productId}`);
                            params.delete(`discount-type-${checkoutItem.item.productId}`);
                            router.push(`?${params.toString()}`, { scroll: false });
                          } else {
                            const newValue = Math.min(rawValue || 1, checkoutItem.item.stock);
                            setQuantityValue(prev => ({
                              ...prev,
                              [checkoutItem.item.productId]: newValue
                            }));
                          }
                        }}
                        className="w-12 text-center px-1 py-0.5 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <button 
                        onClick={() => {
                          const newValue = Math.min(checkoutItem.quantity + 1, checkoutItem.item.stock);
                          setQuantityValue(prev => ({
                            ...prev,
                            [checkoutItem.item.productId]: newValue
                          }));
                          updateQuantity(checkoutItem.item.productId, newValue, checkoutItem.item.stock);
                        }}
                        className={`w-6 h-6 flex items-center justify-center rounded-full ${
                          checkoutItem.quantity >= checkoutItem.item.stock
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-green-600 hover:bg-green-700'
                        } text-white transition-colors`}
                        disabled={checkoutItem.quantity >= checkoutItem.item.stock}
                      >
                        +
                      </button>
                    </div>
                    {checkoutItem.quantity === checkoutItem.item.stock && (
                      <span className="ml-2 text-orange-500 text-sm">(Max Stock)</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 my-2">
                  <label className="text-sm">ส่วนลดต่อชิ้น:</label>
                  <div className="flex items-center gap-2">
                  <input
                      type="number"
                      min="0"
                      max={checkoutItem.discountType === 'percentage' ? 100 : undefined}
                      value={discountValue[checkoutItem.item.productId] ?? checkoutItem.discount}
                      onChange={(e) => {
                        const newValue = Number(e.target.value) || 0;
                        setDiscountValue(prev => ({
                          ...prev,
                          [checkoutItem.item.productId]: newValue
                        }));
                      }}
                      placeholder={checkoutItem.discountType === 'percentage' ? 'Enter %' : 'Enter ฿'}
                      className="w-24 px-2 py-1 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />

                    <select
                      value={checkoutItem.discountType}
                      onChange={(e) => {
                        const newType = e.target.value as 'percentage' | 'amount';
                        const currentValue = discountValue[checkoutItem.item.productId] ?? checkoutItem.discount;
                        
                        updateDiscount(
                          checkoutItem.item.productId,
                          currentValue,
                          newType
                        );
                      }}
                      

                      className="px-2 py-1 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="percentage">Percentage (%)</option>
                      <option value="amount">Amount (฿)</option>
                    </select>

                  
                  </div>
                </div>

                <div className="text-sm text-gray-600">
                  Unit Price: ฿{checkoutItem.item.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  {checkoutItem.discount > 0 && (
                    <span className="ml-2 text-green-600">
                      → ฿{(checkoutItem.discountType === 'percentage'
                        ? checkoutItem.item.price * (1 - checkoutItem.discount / 100)
                        : Math.max(0, checkoutItem.item.price - checkoutItem.discount)
                      ).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      <span className="text-orange-500 ml-1">
                        ({checkoutItem.discountType === 'percentage' ? `-${checkoutItem.discount}%` : `-฿${checkoutItem.discount}`})
                      </span>
                    </span>
                  )}
                </div>

                <div className="text-right font-medium">
                  Subtotal: ฿{checkoutItem.finalPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-8 text-gray-500">
          <p className="text-lg">Your cart is empty</p>
          <p className="text-sm mt-1">Add some items to get started</p>
        </div>
      )}

      <div className="mt-4 pt-2 border-t">
        <div className="flex justify-between items-center text-lg font-bold">
          <span>Total</span>
          <span>฿{total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </div>
      </div>
    </div>
  );
}
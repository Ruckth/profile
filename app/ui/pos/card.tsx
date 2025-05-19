'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { Item } from '@/app/lib/pos/placeholder-data'

export default function Card({ 
  productId,
  productName,
  category,
  price,
  imageUrl,
  stock,
}: Item) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [quantity, setQuantity] = useState<number>(0)
  
  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    const itemParam = params.get(`item-${productId}`)
    if (itemParam) {
      setQuantity(parseInt(itemParam, 10))
    } else {
      setQuantity(0)
    }
  }, [searchParams, productId])
  
  const updateQuantity = (newQuantity: number) => {
    const params = new URLSearchParams(searchParams.toString())
    if (newQuantity <= 0) {
      params.delete(`item-${productId}`)
      setQuantity(0)
    } else {
      params.set(`item-${productId}`, newQuantity.toString())
      setQuantity(newQuantity)
    }
    router.push(`?${params.toString()}`, { scroll: false })
  }

  const addToCart = () => updateQuantity(quantity + 1)
  const decrementQuantity = () => updateQuantity(quantity - 1)

  return (
    <div className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-white flex flex-col w-full sm:w-52 md:w-58 lg:w-64 h-full sm:h-64 md:h-76 lg:h-76">
      {/* Image Container */}
      <div className="relative h-24 sm:h-28 md:h-36 lg:h-40 w-full">
        <Image 
          src={imageUrl || "/api/placeholder/400/320"} 
          alt={productName}
          fill
          sizes="min-w-full min-h-full"
          className="object-cover"
          priority
        />
      </div>
      
      {/* Content Container */}
      <div className="p-2 sm:p-3 md:p-4 lg:p-5 flex-grow flex flex-col">
        <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold mb-1 text-gray-900">
          {productName}
        </h3>
        
        {/* Category tag */}
        <div className="mb-2">
          <span className="text-xs sm:text-xs md:text-xs bg-gray-100 text-gray-700 px-1 sm:px-1.5 py-0.5 rounded-full">
            {category}
          </span>
        </div>
        
        {/* Price, Stock and Add to Cart Section */}
        <div className="flex items-center justify-between mt-auto pt-2">
          <div className="flex flex-col">
            <span className="font-bold text-gray-900">
              ฿{typeof price === 'number' ? price.toLocaleString() : price}
            </span>
            {stock !== undefined && (
              <span className="text-xs text-gray-500">
                Stock: {stock}
              </span>
            )}
          </div>
          
          {stock && stock > 0 ? (
            quantity === 0 ? (
              <button 
                onClick={addToCart}
                className="px-3 py-1 rounded-full bg-blue-600 text-white hover:bg-blue-700 focus:outline-none transition-colors"
              >
                Add to Cart
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button 
                  onClick={decrementQuantity}
                  className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 flex items-center justify-center rounded-full bg-pink-700 hover:bg-pink-300 focus:outline-none transition-colors text-xs sm:text-xs md:text-sm text-white"
                >
                  -
                </button>
                <span className="text-xs sm:text-xs md:text-sm font-medium text-gray-500">
                  {quantity}
                </span>
                <button 
                  onClick={addToCart}
                  className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 flex items-center justify-center rounded-full bg-green-600 text-white hover:bg-green-700 focus:outline-none transition-colors text-xs sm:text-xs md:text-sm"
                >
                  +
                </button>
              </div>
            )
          ) : (
            <span className="text-xs text-red-500">Out of Stock</span>
          )}
        </div>
      </div>
    </div>
  );
}
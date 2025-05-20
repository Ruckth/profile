'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { Item } from '@/app/lib/pos/placeholder-data'
import { FaShoppingCart } from 'react-icons/fa'

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
    } else if (stock && newQuantity <= stock) {
      params.set(`item-${productId}`, newQuantity.toString())
      setQuantity(newQuantity)
    }
    router.push(`?${params.toString()}`, { scroll: false })
  }

  const addToCart = () => {
    if (stock && quantity < stock) {
      updateQuantity(quantity + 1)
    }
  }

  const decrementQuantity = () => updateQuantity(quantity - 1)

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
      {/* Image Container */}
      <div className="relative w-full aspect-square">
        <Image
          src={imageUrl || "/api/placeholder/400/320"}
          alt={productName}
          fill
          className="object-cover rounded-t-lg"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
        {/* Category tag */}
        <div className="absolute bottom-2 right-2">
          <span className="text-xs bg-white/80 backdrop-blur-sm text-gray-700 px-2 py-1 rounded-full shadow-sm">
            {category}
          </span>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {productName}
        </h3>

        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xl font-bold text-gray-900">
              ฿{typeof price === 'number' ? price.toLocaleString() : price}
            </span>
            {stock !== undefined && stock > 0 &&(
              <p className="text-sm text-gray-500">
                Stock: {stock} {quantity === stock && stock > 0 && (
                  <span className="text-orange-500">(Max)</span>
                )}
              </p>
            )}
          </div>

          {stock && stock > 0 ? (
            quantity === 0 ? (
              <button
                onClick={addToCart}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 focus:outline-none transition-colors"
              >
                <FaShoppingCart className="text-lg" />
                <span>Add</span>
              </button>
            ) : (
              <div className="flex items-center gap-2 bg-gray-100 rounded-full p-1">
                <button
                  onClick={decrementQuantity}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-orange-500 hover:bg-orange-700 text-white focus:outline-none transition-colors"
                >
                  -
                </button>
                <span className="w-8 text-center font-medium text-gray-600">
                  {quantity}
                </span>
                <button
                  onClick={addToCart}
                  className={`w-8 h-8 flex items-center justify-center rounded-full ${quantity >= stock
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-green-600 hover:bg-green-700'
                    } text-white focus:outline-none transition-colors`}
                  disabled={quantity >= stock}
                >
                  +
                </button>
              </div>
            )
          ) : (
            <span className="text-sm font-medium text-red-500">Out of Stock</span>
          )}
        </div>
      </div>
    </div>
  );
}
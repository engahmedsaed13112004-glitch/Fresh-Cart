'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FaStar, FaPlus, FaHeart } from 'react-icons/fa6';
import { FiEye, FiRepeat } from 'react-icons/fi';
import { useWishlist } from '../../../../context/WishlistContext';
import MyAddToCart from '../../myAddToCart/myAddToCart';

const FALLBACK_IMAGE_URL = 'https://placehold.co/400x400/e2e8f0/64748b?text=No+Image';

export default function SingleProduct({ product }: { product: any }) {
  const { wishlistIds, addToWishlist, removeFromWishlist } = useWishlist();
  const [isBtnLoading, setIsBtnLoading] = useState(false);

  if (!product) return null;

  const productId = product._id || product.id;
  const isInWishlist = wishlistIds.includes(productId);

  const getImageUrl = (url?: string): string => {
    if (!url) return FALLBACK_IMAGE_URL;
    if (url.startsWith('http://')) return url.replace('http://', 'https://');
    if (url.startsWith('https://')) return url;
    return `https://ecommerce.routemisr.com${url.startsWith('/') ? '' : '/'}${url}`;
  };

  const handleWishlistToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsBtnLoading(true);
    if (isInWishlist) {
      await removeFromWishlist(productId);
    } else {
      await addToWishlist(product);
    }
    setIsBtnLoading(false);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 relative group flex flex-col justify-between hover:shadow-md transition-shadow h-full">
      <div>
        <div className="relative w-full h-48 mb-3 flex justify-center items-center overflow-hidden">
          <Link href={`/products/${productId}`} className="w-full h-full flex justify-center items-center">
            <img
              src={getImageUrl(product?.imageCover || product?.image)}
              className="h-full w-full object-contain p-2 cursor-pointer"
              alt={product?.title || 'product'}
              referrerPolicy="no-referrer"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = FALLBACK_IMAGE_URL;
              }}
            />
          </Link>

          <div className="absolute top-1 right-1 flex flex-col gap-1.5 text-gray-500 z-10">
            <button
              type="button"
              disabled={isBtnLoading}
              onClick={handleWishlistToggle}
              aria-label="Toggle Wishlist"
              className={`w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center transition-colors shadow-sm cursor-pointer ${
                isInWishlist
                  ? 'bg-red-50 text-red-500 border-red-200'
                  : 'bg-white hover:bg-emerald-50 hover:text-emerald-600'
              }`}
            >
              <FaHeart className={`text-xs ${isInWishlist ? 'text-red-500 fill-current' : ''}`} />
            </button>
            <button
              type="button"
              onClick={(e) => e.stopPropagation()}
              className="w-7 h-7 bg-white rounded-full border border-gray-200 flex items-center justify-center hover:bg-emerald-50 hover:text-emerald-600 transition-colors shadow-sm cursor-pointer"
            >
              <FiRepeat className="text-xs" />
            </button>
            <Link
              href={`/products/${productId}`}
              onClick={(e) => e.stopPropagation()}
              className="w-7 h-7 bg-white rounded-full border border-gray-200 flex items-center justify-center hover:bg-emerald-50 hover:text-emerald-600 transition-colors shadow-sm cursor-pointer"
            >
              <FiEye className="text-xs" />
            </Link>
          </div>
        </div>

        <span className="text-xs text-gray-400 block mb-1 font-normal">
          {product?.category?.name || "Women's Fashion"}
        </span>

        <Link href={`/products/${productId}`}>
          <h3 className="text-sm font-semibold text-gray-800 line-clamp-1 mb-1 hover:text-emerald-600 transition-colors cursor-pointer">
            {product?.title}
          </h3>
        </Link>

        <div className="flex items-center gap-1 mb-3">
          <div className="flex text-yellow-400 text-xs">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar className="text-gray-300" />
          </div>
          <span className="text-xs text-gray-500 font-medium ml-1">
            {product?.ratingsAverage || 4}
          </span>
          <span className="text-xs text-gray-400">
            ({product?.ratingsQuantity || 43})
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between mt-auto pt-2">
        <div className="flex items-baseline gap-1.5">
          {product?.priceAfterDiscount ? (
            <>
              <span className="text-base font-bold text-gray-900">
                {product.priceAfterDiscount} EGP
              </span>
              <span className="text-xs line-through text-gray-400">
                {product?.price}
              </span>
            </>
          ) : (
            <span className="text-base font-bold text-gray-900">
              {product?.price} EGP
            </span>
          )}
        </div>

        <div onClick={(e) => e.stopPropagation()}>
          <MyAddToCart id={product?._id || product?.id} />
        </div>
      </div>
    </div>
  );
}
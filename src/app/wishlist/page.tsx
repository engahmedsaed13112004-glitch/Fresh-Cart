'use client';

import React from 'react';
import { useWishlist } from '../../context/WishlistContext';
import Link from 'next/link';
import { FaHeart, FaTrashCan, FaCartShopping, FaArrowLeft } from 'react-icons/fa6';

export default function WishlistPage() {
  const { wishlistItems, loading, removeFromWishlist } = useWishlist();

  const getImageUrl = (url?: string): string => {
    if (!url) return 'https://placehold.co/100x100/e2e8f0/64748b?text=No+Image';
    if (url.startsWith('http://')) return url.replace('http://', 'https://');
    if (url.startsWith('https://')) return url;
    return `https://ecommerce.routemisr.com${url.startsWith('/') ? '' : '/'}${url}`;
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-[75vh]">
      <nav className="text-sm text-gray-500 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-emerald-600 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-gray-800 font-medium">Wishlist</span>
      </nav>

      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-red-500">
          <FaHeart className="text-2xl" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Wishlist</h1>
          <p className="text-sm text-gray-500">{wishlistItems?.length || 0} item saved</p>
        </div>
      </div>

      {!wishlistItems || wishlistItems.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-100 shadow-sm max-w-lg mx-auto">
          <FaHeart className="text-5xl text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-700 mb-2">Your wishlist is empty</h2>
          <p className="text-gray-500 text-sm mb-6">Explore products and add your favorites here!</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-6 py-2.5 rounded-lg transition-colors text-sm shadow-sm"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden mb-6">
          <div className="hidden md:grid grid-cols-12 bg-gray-50/50 p-4 border-b border-gray-100 text-sm font-semibold text-gray-500">
            <div className="col-span-6">Product</div>
            <div className="col-span-2 text-center">Price</div>
            <div className="col-span-2 text-center">Status</div>
            <div className="col-span-2 text-end">Actions</div>
          </div>

          <div className="divide-y divide-gray-100">
            {wishlistItems.map((product, index) => {
              if (!product) return null;
              const productId = product._id || product.id;

              return (
                <div
                  key={productId || index}
                  className="grid grid-cols-1 md:grid-cols-12 items-center p-4 gap-4 hover:bg-gray-50/30 transition-colors"
                >

                  <div className="col-span-1 md:col-span-6 flex items-center gap-4">
                    <div className="w-20 h-20 bg-gray-50 border border-gray-100 rounded-xl p-2 flex items-center justify-center shrink-0">
                      <img
                        src={getImageUrl(product?.imageCover || product?.image)}
                        alt={product?.title || 'product'}
                        className="max-h-full max-w-full object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 text-base mb-1 line-clamp-1">
                        {product?.title}
                      </h3>
                      <span className="text-xs text-gray-400 block">
                        {product?.category?.name || "Women's Fashion"}
                      </span>
                    </div>
                  </div>

                  <div className="col-span-1 md:col-span-2 text-start md:text-center font-bold text-gray-900">
                    {product?.priceAfterDiscount ? (
                      <div className="flex flex-col md:items-center">
                        <span>{product.priceAfterDiscount} EGP</span>
                        <span className="text-xs line-through text-gray-400 font-normal">{product?.price} EGP</span>
                      </div>
                    ) : (
                      <span>{product?.price || 0} EGP</span>
                    )}
                  </div>


                  <div className="col-span-1 md:col-span-2 text-start md:text-center">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      In Stock
                    </span>
                  </div>

                  <div className="col-span-1 md:col-span-2 flex items-center justify-start md:justify-end gap-2">
                    <button
                      type="button"
                      className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors shadow-sm cursor-pointer"
                    >
                      <FaCartShopping className="text-xs" />
                      Add to Cart
                    </button>

                    <button
                      type="button"
                      onClick={() => removeFromWishlist(productId)}
                      title="Remove from wishlist"
                      className="p-2.5 border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                    >
                      <FaTrashCan className="text-sm" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-emerald-600 transition-colors mt-2"
      >
        <FaArrowLeft className="text-xs" />
        Continue Shopping
      </Link>
    </div>
  );
}
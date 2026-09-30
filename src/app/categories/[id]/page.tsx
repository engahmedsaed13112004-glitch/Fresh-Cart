"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Footer } from "../../_component/Footer/Footer";
import { ShoppingCart, Heart, ArrowLeft, SlidersHorizontal } from "lucide-react";
import { Toaster } from "../../../../@/components/ui/Toaster";

const mockProducts = [
  {
    id: "1",
    categoryId: "2",
    name: "Hoops 3.0 Low Classic Vintage Shoes",
    price: 1629,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&q=80",
    inStock: true,
  },
  {
    id: "2",
    categoryId: "2", 
    name: "Galaxy 6 Running Shoes",
    price: 1629,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=300&q=80",
    inStock: true,
  },
  {
    id: "3",
    categoryId: "10", 
    name: "Victus 15 Laptop Core i7 16GB RAM",
    price: 42960,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&q=80",
    inStock: true,
  },
  {
    id: "4",
    categoryId: "2", 
    name: "Duramo 10 Running Shoes",
    price: 1314,
    oldPrice: 1899,
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=300&q=80",
    inStock: true,
  },
];

const categoryNames: Record<string, string> = {
  "1": "Music",
  "2": "Men's Fashion",
  "3": "Women's Fashion",
  "4": "Supermarket",
  "5": "Baby & Toys",
  "6": "Home",
  "7": "Children's books",
  "8": "Beauty & Health",
  "9": "Mobiles",
  "10": "Electronics",
};

export default function CategoryProductsPage() {
  const params = useParams();
  const categoryId = params?.id as string;
  const categoryName = categoryNames[categoryId] || "Category Products";

 
  const products = mockProducts.filter((p) => p.categoryId === categoryId);

  const handleAddToCart = (productName: string) => {
    Toaster.add({
      title: `Added "${productName.slice(0, 20)}..." to cart`,
      type: "success",
    });
  };

  const handleAddToWishlist = (productName: string) => {
    Toaster.add({
      title: `Added "${productName.slice(0, 20)}..." to wishlist`,
      type: "info",
    });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col justify-between">
      <div>
        
        <div className="bg-[#10b981] text-white py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <nav className="text-xs text-emerald-100 mb-4 flex items-center gap-2">
              <Link href="/" className="hover:underline">Home</Link>
              <span>/</span>
              <Link href="/categories" className="hover:underline">Categories</Link>
              <span>/</span>
              <span className="text-white font-medium">{categoryName}</span>
            </nav>

            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">{categoryName}</h1>
                <p className="text-emerald-100 text-xs sm:text-sm mt-1">
                  Explore top items in {categoryName}
                </p>
              </div>
              <Link
                href="/categories"
                className="hidden sm:flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-xs px-4 py-2 rounded-xl backdrop-blur-md transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> All Categories
              </Link>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {products.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm max-w-md mx-auto my-8">
              <p className="text-gray-500 text-sm mb-4">No products found in this category yet.</p>
              <Link
                href="/categories"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium px-5 py-2.5 rounded-xl transition-colors"
              >
                Back to Categories
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-full aspect-square relative mb-3 bg-gray-50 rounded-xl overflow-hidden p-2">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                      <button
                        onClick={() => handleAddToWishlist(product.name)}
                        className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur-md rounded-full text-gray-400 hover:text-red-500 transition-colors shadow-sm"
                      >
                        <Heart className="w-4 h-4" />
                      </button>
                    </div>

                    <h3 className="font-medium text-gray-800 text-xs sm:text-sm line-clamp-2 mb-2">
                      {product.name}
                    </h3>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="font-bold text-gray-900 text-sm sm:text-base">
                        {product.price.toLocaleString()} EGP
                      </span>
                      {product.oldPrice && (
                        <span className="text-xs text-gray-400 line-through">
                          {product.oldPrice.toLocaleString()} EGP
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => handleAddToCart(product.name)}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" /> Add To Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
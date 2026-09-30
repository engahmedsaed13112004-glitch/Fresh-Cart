"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Footer } from "../_component/Footer/Footer";

const DEFAULT_CATEGORY_IMAGES: Record<string, string> = {
  "Men's Fashion": "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=400&q=80",
  "Women's Fashion": "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&q=80",
  "Electronics": "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&q=80",
  "Beauty & Health": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80",
  "Baby & Toys": "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&q=80",
  "Supermarket": "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&q=80",
  "Home": "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&q=80",
};

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1526178613552-2b45c6c302f0?w=400&q=80";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const formatImageUrl = (category: any): string => {
    const url = category?.image;
    if (!url) {
      return DEFAULT_CATEGORY_IMAGES[category?.name] || FALLBACK_IMAGE;
    }
    if (url.startsWith("http://")) return url.replace("http://", "https://");
    if (url.startsWith("https://")) return url;
    return `https://ecommerce.routemisr.com${url.startsWith("/") ? "" : "/"}${url}`;
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://ecommerce.routemisr.com/api/v1/categories");
        const data = await res.json();
        if (data.data) {
          setCategories(data.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col justify-between">
      <div>
        {/* هيدر الصفحة */}
        <div className="bg-gradient-to-r from-[#10b981] to-[#059669] text-white py-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <nav className="text-xs text-emerald-100 mb-4 flex items-center gap-2">
              <Link href="/" className="hover:underline">Home</Link>
              <span>/</span>
              <span className="text-white font-medium">Categories</span>
            </nav>

            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md hidden sm:block">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">All Categories</h1>
                <p className="text-emerald-100 text-xs sm:text-sm mt-1">
                  Browse products by category
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {loading ? (
            <div className="flex justify-center items-center py-16">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-emerald-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
              {categories.map((category) => (
                <Link
                  key={category._id}
                  href={`/categories/${category._id}`}
                  className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center justify-between group overflow-hidden"
                >
                  <div className="w-full h-44 bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center p-2 mb-3 relative">
                    <img
                      src={formatImageUrl(category)}
                      alt={category.name}
                      className="w-full h-full object-contain rounded-lg group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      crossOrigin="anonymous"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = DEFAULT_CATEGORY_IMAGES[category.name] || FALLBACK_IMAGE;
                      }}
                    />
                  </div>
                  <h3 className="text-sm font-semibold text-gray-800 text-center group-hover:text-emerald-600 transition-colors line-clamp-1">
                    {category.name}
                  </h3>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
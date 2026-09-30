"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Footer } from "../_component/Footer/Footer";
import { getMyToken } from "../../app/utilities/getMyToken";
import toast from "react-hot-toast";

interface Brand {
  _id: string;
  name: string;
  image: string;
}

export default function BrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    async function fetchToken() {
      try {
        const tokenData = await getMyToken();
        setUserData(tokenData);
      } catch (err) {
        console.error("Error fetching token:", err);
      }
    }

    async function fetchBrands() {
      try {
        setLoading(true);
        const res = await fetch("https://ecommerce.routemisr.com/api/v1/brands");
        const data = await res.json();
        
        if (data.data && Array.isArray(data.data)) {
          setBrands(data.data);
        } else {
          toast.error("Failed to load brands");
        }
      } catch (error) {
        console.error("Error fetching brands:", error);
        toast.error("Failed to connect to server");
      } finally {
        setLoading(false);
      }
    }

    fetchToken();
    fetchBrands();
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col justify-between">
      <div>
        {/* Header Section */}
        <div className="bg-gradient-to-r from-[#9333ea] to-[#8b5cf6] text-white py-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <nav className="text-xs text-purple-200 mb-4 flex items-center gap-2">
              <Link href="/" className="hover:underline">Home</Link>
              <span>/</span>
              <span className="text-white font-medium">Brands</span>
            </nav>

            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Top Brands</h1>
                <p className="text-purple-100 text-xs sm:text-sm mt-1">
                  Shop from your favorite brands
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {loading ? (
            <div className="flex justify-center items-center py-16">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-500"></div>
            </div>
          ) : brands.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
              {brands.map((brand) => (
                <Link
                  key={brand._id}
                  href={`/brands/${brand._id}`}
                  className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center h-32 group"
                >
                  <img
                    src={brand.image}
                    alt={brand.name}
                    className="max-h-16 max-w-full object-contain transition-all duration-300 group-hover:scale-105"
                  />
                  <span className="text-xs font-semibold text-gray-700 mt-2 text-center group-hover:text-purple-600 transition-colors">
                    {brand.name}
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-gray-500">
              <p className="text-lg font-medium">No brands found.</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
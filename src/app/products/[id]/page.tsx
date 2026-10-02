"use client";

import { useEffect, useState, use } from "react";
import Image from "next/image";
import { getProductDetails } from "../../../cartActions/products.action"; 
import { addToCart } from "../../../cartActions/addToCart.action"; // استيراد أكشن السلة
import { useCart } from "../../../context/CartContext"; 
import { toast } from "sonner";

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  imageCover: string;
  images: string[];
  ratingsAverage: number;
  category: { name: string };
}

export default function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {

  const { id } = use(params);
  
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [adding, setAdding] = useState<boolean>(false);
  
  const { refreshCartCount } = useCart();

  useEffect(() => {
    async function fetchDetails() {
      setLoading(true);
      const data = await getProductDetails(id);
      if (data) {
        setProduct(data);
        setSelectedImage(data.imageCover);
      }
      setLoading(false);
    }
    fetchDetails();
  }, [id]);

  const handleAddToCart = async () => {
    if (!product) return;
    setAdding(true);
    try {
      // إرسال المنتج للسلة مباشرة عبر الـ Action أو الـ API
      if (typeof addToCart === "function") {
        await addToCart(product._id || id);
      }
      
      toast.success("Product added to cart!");
      
      // تحديث العداد في الـ Navbar
      if (refreshCartCount) {
        await refreshCartCount();
      }
    } catch (error) {
      toast.error("Failed to add product to cart");
    } finally {
      setAdding(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-emerald-800 font-semibold animate-pulse">Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-red-600 font-semibold">Product not found!</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white p-6 rounded-2xl shadow-sm border">
        
        <div className="space-y-4">
          <div className="relative w-full h-96 rounded-xl overflow-hidden border">
            <Image
              src={selectedImage || product.imageCover}
              alt={product.title}
              fill
              className="object-contain"
              priority
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2">
            {product.images?.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(img)}
                className={`relative w-20 h-20 rounded-lg border-2 overflow-hidden flex-shrink-0 ${
                  selectedImage === img ? "border-emerald-600" : "border-gray-200"
                }`}
              >
                <Image src={img} alt="" fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <span className="text-sm font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
            {product.category?.name}
          </span>
          
          <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
          
          <p className="text-gray-600 leading-relaxed">{product.description}</p>
          
          <div className="flex items-center justify-between border-y py-4">
            <span className="text-2xl font-bold text-emerald-800">{product.price} EGP</span>
            <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-lg text-yellow-700 font-medium">
              ⭐ {product.ratingsAverage}
            </div>
          </div>

          <button
            disabled={adding}
            onClick={handleAddToCart}
            className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-medium py-3 rounded-xl transition-colors shadow-md disabled:opacity-50"
          >
            {adding ? "Adding..." : "Add To Cart"}
          </button>
        </div>

      </div>
    </div>
  );
}
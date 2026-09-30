"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getUserCart } from "../../cartActions/getUserCart.action";
import { RemoveCartItem } from "../../cartActions/RemoveCartItem.action";
import { updateCartCount } from "../../cartActions/updateCartCount.action";
import { clearCart } from "../../cartActions/clearCart.action";
import { useCart } from "../../context/CartContext";
import { toast } from "sonner";
import { FiTrash2, FiPlus, FiMinus, FiCreditCard } from "react-icons/fi";

export default function CartPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const { refreshCartCount } = useCart();

  async function getUserProducts() {
    try {
      setLoading(true);
      const res = await getUserCart();
      if (res?.status === "success") {
        setProducts(res.data.products);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      toast.error("An error occurred while fetching cart products");
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdateCount(productId: string, newCount: number) {
    if (newCount < 1) return;
    setUpdatingId(productId);

    try {
      const res = await updateCartCount(productId, newCount);
      if (res?.status === "success") {
        setProducts(res.data.products);
        toast.success("Quantity updated successfully");
        await refreshCartCount();
      } else {
        toast.error(res?.message || "Failed to update quantity");
      }
    } catch (error) {
      toast.error("An error occurred while updating");
    } finally {
      setUpdatingId(null);
    }
  }

  async function handleRemoveItem(productId: string) {
    setUpdatingId(productId);

    try {
      const res = await RemoveCartItem(productId);
      if (res?.status === "success") {
        setProducts(res.data.products);
        toast.success("Product removed from cart successfully");
        await refreshCartCount();
      } else {
        toast.error(res?.message || "Failed to remove product");
      }
    } catch (error) {
      toast.error("An error occurred while removing the product");
    } finally {
      setUpdatingId(null);
    }
  }

  async function handleClearCart() {
    setUpdatingId("clear-all");

    try {
      const res = await clearCart();
      if (res?.status === "success") {
        setProducts([]);
        toast.success("Cart cleared successfully");
        await refreshCartCount();
      } else {
        setProducts([]);
        toast.success("Cart cleared successfully");
        await refreshCartCount();
      }
    } catch (error) {
      setProducts([]);
      toast.success("Cart cleared successfully");
      await refreshCartCount();
    } finally {
      setUpdatingId(null);
    }
  }

  useEffect(() => {
    getUserProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="text-xl text-emerald-600 font-semibold animate-pulse">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <div className="flex flex-col items-start mb-6 gap-3">
        {products.length > 0 && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={updatingId === "clear-all"}
              onClick={handleClearCart}
              className="flex items-center gap-2 bg-green-800 hover:bg-red-700 disabled:bg-gray-400 text-white font-medium px-4 py-2 rounded-lg transition-colors shadow-sm"
            >
              <FiTrash2 className="text-base" />
              <span>{updatingId === "clear-all" ? "Clearing..." : "Clear Cart"}</span>
            </button>
            <Link
              href="/checkout"
              className="flex items-center gap-2 bg-green-800 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg transition-colors shadow-sm"
            >
              <FiCreditCard className="text-base" />
              <span>Checkout</span>
            </Link>
          </div>
        )}

        <h1 className="text-2xl font-bold text-gray-800 border-l-4 border-emerald-500 pl-3">
          Shopping Cart
        </h1>
      </div>

      {products.length > 0 ? (
        <div className="relative overflow-x-auto bg-white shadow-sm rounded-xl border border-gray-100">
          <table className="w-full text-sm text-left rtl:text-right text-gray-700">
            <thead className="text-xs uppercase bg-gray-50 border-b border-gray-100 text-gray-600">
              <tr>
                <th scope="col" className="px-6 py-4">Image</th>
                <th scope="col" className="px-6 py-4">Product</th>
                <th scope="col" className="px-6 py-4 text-center">Qty</th>
                <th scope="col" className="px-6 py-4">Price</th>
                <th scope="col" className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item: any) => {
                const pId = item.product?._id || item.product?.id;

                return (
                  <tr
                    key={item._id}
                    className="bg-white border-b border-gray-100 hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="p-4">
                      <img
                        src={item.product?.imageCover}
                        alt={item.product?.title}
                        className="w-16 md:w-20 h-16 md:h-20 object-contain rounded-lg border border-gray-100"
                      />
                    </td>

                    <td className="px-6 py-4 font-semibold text-gray-800">
                      <p className="line-clamp-1">{item.product?.title}</p>
                      <span className="text-xs text-gray-400 font-normal">
                        {item.product?.brand?.name}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          disabled={updatingId === pId || item.count <= 1}
                          onClick={() => handleUpdateCount(pId, item.count - 1)}
                          className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 disabled:opacity-30 transition-all text-gray-600"
                        >
                          <FiMinus className="text-xs" />
                        </button>

                        <span className="font-semibold text-gray-800 w-8 text-center">
                          {item.count}
                        </span>

                        <button
                          type="button"
                          disabled={updatingId === pId}
                          onClick={() => handleUpdateCount(pId, item.count + 1)}
                          className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 disabled:opacity-30 transition-all text-gray-600"
                        >
                          <FiPlus className="text-xs" />
                        </button>
                      </div>
                    </td>

                    <td className="px-6 py-4 font-bold text-emerald-600">
                      {item.price * item.count} EGP
                    </td>

                    <td className="px-6 py-4">
                      <button
                        type="button"
                        disabled={updatingId === pId}
                        onClick={() => handleRemoveItem(pId)}
                        className="flex items-center gap-1 font-medium text-red-500 hover:text-red-700 transition-colors disabled:opacity-50"
                      >
                        <FiTrash2 className="text-base" />
                        <span>Remove</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
          <p className="text-gray-500 font-medium">"Your cart is currently empty"</p>
        </div>
      )}
    </div>
  );
}
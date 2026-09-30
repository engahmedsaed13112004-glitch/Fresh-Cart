"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { getUserCart } from "../cartActions/getUserCart.action"; // 👈 تأكد من صحة المسار لديك

interface CartContextType {
  cartCount: number;
  cartId: string | null;
  setCartCount: React.Dispatch<React.SetStateAction<number>>;
  refreshCartCount: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartCount, setCartCount] = useState<number>(0);
  const [cartId, setCartId] = useState<string | null>(null);

  const refreshCartCount = async () => {
    try {
      const res = await getUserCart();

      // حفظ cartId من الاستجابة
      if (res?.cartId || res?.data?._id) {
        setCartId(res.cartId || res.data._id);
      } else {
        setCartId(null);
      }

      // 1. فحص إذا كان الـ API يرجع numOfCartItems مباشرة
      if (typeof res?.numOfCartItems === "number") {
        setCartCount(res.numOfCartItems);
        return;
      }

      // 2. فحص إذا كانت البيانات داخل res.data.products
      if (res?.data?.products && Array.isArray(res.data.products)) {
        const total = res.data.products.reduce((sum: number, item: any) => sum + (item.count || 1), 0);
        setCartCount(total);
        return;
      }

      // 3. حالة السلة الفارغة
      setCartCount(0);
    } catch (error) {
      console.error("Error fetching cart count:", error);
      setCartCount(0);
      setCartId(null);
    }
  };

  useEffect(() => {
    refreshCartCount();
  }, []);

  return (
    <CartContext.Provider value={{ cartCount, cartId, setCartCount, refreshCartCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
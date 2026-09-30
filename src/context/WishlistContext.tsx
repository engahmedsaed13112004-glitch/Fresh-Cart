'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';

interface WishlistContextType {
  wishlistIds: string[];
  wishlistItems: any[];
  count: number;
  loading: boolean;
  addToWishlist: (product: any) => Promise<void>;
  removeFromWishlist: (productId: string) => Promise<void>;
  getWishlist: () => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getWishlist = async () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('userToken') : null;

    if (!token) {
      const localData = typeof window !== 'undefined' ? localStorage.getItem('guest_wishlist') : null;
      if (localData) {
        try {
          const parsed = JSON.parse(localData);
          setWishlistItems(parsed || []);
          setWishlistIds((parsed || []).map((item: any) => item._id || item.id));
        } catch (e) {
          console.error('Error parsing guest wishlist:', e);
        }
      }
      return;
    }

    try {
      setLoading(true);
      const res = await fetch('https://ecommerce.routemisr.com/api/v1/wishlist', {
        method: 'GET',
        headers: { token },
      });
      const data = await res.json();

      if (data.status === 'success') {
        const items = data.data || [];
        setWishlistItems(items);
        setWishlistIds(items.map((item: any) => item._id || item.id));
      }
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToWishlist = async (product: any) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('userToken') : null;
    const productId = typeof product === 'string' ? product : (product?._id || product?.id);

    if (!productId) return;

    if (!token) {
      const productObj = typeof product === 'object' ? product : { _id: productId };
      const isAlreadyExist = wishlistIds.includes(productId);

      if (!isAlreadyExist) {
        const updatedItems = [...wishlistItems, productObj];
        const updatedIds = [...wishlistIds, productId];

        setWishlistItems(updatedItems);
        setWishlistIds(updatedIds);

        if (typeof window !== 'undefined') {
          localStorage.setItem('guest_wishlist', JSON.stringify(updatedItems));
        }
        toast.success('Added to wishlist successfully');
      }
      return;
    }

    try {
      setWishlistIds((prev) => [...prev, productId]);

      const res = await fetch('https://ecommerce.routemisr.com/api/v1/wishlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token,
        },
        body: JSON.stringify({ productId }),
      });
      const data = await res.json();

      if (data.status === 'success') {
        toast.success(data.message || 'Added to wishlist successfully');
        await getWishlist();
      } else {
        toast.error(data.message || 'Failed to add to wishlist');
        await getWishlist();
      }
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      toast.error('Server connection failed');
      await getWishlist();
    }
  };

  const removeFromWishlist = async (productId: string) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('userToken') : null;

    const filteredItems = wishlistItems.filter((item) => (item._id || item.id) !== productId);
    const filteredIds = wishlistIds.filter((id) => id !== productId);

    setWishlistItems(filteredItems);
    setWishlistIds(filteredIds);

    if (!token) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('guest_wishlist', JSON.stringify(filteredItems));
      }
      toast.success('Removed from wishlist successfully');
      return;
    }

    try {
      const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        method: 'DELETE',
        headers: { token },
      });
      const data = await res.json();

      if (data.status === 'success') {
        toast.success(data.message || 'Removed from wishlist successfully');
        await getWishlist();
      } else {
        toast.error(data.message || 'Failed to remove from wishlist');
        await getWishlist();
      }
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      toast.error('Server connection failed');
      await getWishlist();
    }
  };

  useEffect(() => {
    getWishlist();
  }, []);

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        wishlistItems,
        count: wishlistIds.length,
        loading,
        addToWishlist,
        removeFromWishlist,
        getWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
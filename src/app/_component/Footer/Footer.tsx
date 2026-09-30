"use client";

import Link from "next/link";
import { Truck, RotateCcw, ShieldCheck, Headset } from "lucide-react";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="w-full bg-white">
      <div className="border-t border-b border-gray-100 bg-gray-50/50 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-100/60 rounded-xl text-emerald-600">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 text-sm">Free Shipping</h4>
              <p className="text-xs text-gray-500">On orders over 500 EGP</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-100/60 rounded-xl text-emerald-600">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 text-sm">Easy Returns</h4>
              <p className="text-xs text-gray-500">14 days return policy</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-100/60 rounded-xl text-emerald-600">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 text-sm">Secure Payment</h4>
              <p className="text-xs text-gray-500">100% secure checkout</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-100/60 rounded-xl text-emerald-600">
              <Headset className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 text-sm">24/7 Support</h4>
              <p className="text-xs text-gray-500">Contact us anytime</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#0b1426] text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
         
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center gap-2 text-white font-bold text-xl">
              <span className="bg-emerald-500 p-1.5 rounded-lg text-white">🛒</span> FreshCart
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              FreshCart is your one-stop destination for quality products. From fashion to electronics, we bring you the best brands at competitive prices.
            </p>
            <div className="space-y-1 text-xs text-gray-400">
              <p>📞 +1 (800) 123-4567</p>
              <p>✉️ support@freshcart.com</p>
              <p>📍 123 Commerce Street, New York, NY 10001</p>
            </div>
            <div className="flex gap-3 pt-2">
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-emerald-500 transition-colors text-white"><FaFacebookF size={12} /></a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-emerald-500 transition-colors text-white"><FaTwitter size={12} /></a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-emerald-500 transition-colors text-white"><FaInstagram size={12} /></a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-emerald-500 transition-colors text-white"><FaYoutube size={12} /></a>
            </div>
          </div>

        
          <div>
            <h5 className="text-white font-semibold mb-4 text-sm">Shop</h5>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><Link href="/products" className="hover:text-white">All Products</Link></li>
              <li><Link href="/categories" className="hover:text-white">Categories</Link></li>
              <li><Link href="/brands" className="hover:text-white">Brands</Link></li>
              <li><Link href="/categories" className="hover:text-white">Electronics</Link></li>
              <li><Link href="/categories" className="hover:text-white">Men&apos;s Fashion</Link></li>
              <li><Link href="/categories" className="hover:text-white">Women&apos;s Fashion</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-semibold mb-4 text-sm">Account</h5>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><Link href="/profile" className="hover:text-white">My Account</Link></li>
              <li><Link href="/orders" className="hover:text-white">Order History</Link></li>
              <li><Link href="/wishlist" className="hover:text-white">Wishlist</Link></li>
              <li><Link href="/cart" className="hover:text-white">Shopping Cart</Link></li>
              <li><Link href="/login" className="hover:text-white">Sign In</Link></li>
              <li><Link href="/register" className="hover:text-white">Create Account</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-semibold mb-4 text-sm">Support</h5>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><Link href="#" className="hover:text-white">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-white">Help Center</Link></li>
              <li><Link href="#" className="hover:text-white">Shipping Info</Link></li>
              <li><Link href="#" className="hover:text-white">Returns & Refunds</Link></li>
              <li><Link href="#" className="hover:text-white">Track Order</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-semibold mb-4 text-sm">Legal</h5>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><Link href="#" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-white">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-white">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-4">
          <p>© 2026 FreshCart. All rights reserved.</p>
          <div className="flex gap-4">
            <span>Visa</span>
            <span>Mastercard</span>
            <span>PayPal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
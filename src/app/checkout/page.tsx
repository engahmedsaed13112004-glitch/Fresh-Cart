"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useCart } from "../../context/CartContext"; 
import { createCashOrder, createOnlineOrder } from "../../cartActions/checkout.action"; 

export default function CheckoutPage() {
  const router = useRouter();
  const { cartId, refreshCartCount } = useCart();
  const [details, setDetails] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [paymentType, setPaymentType] = useState<"cash" | "online">("cash");
  const [phoneError, setPhoneError] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateEgyptianPhone = (num: string) => {
    const regex = /^01[0125][0-9]{8}$/;
    return regex.test(num);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let valid = true;

    if (!validateEgyptianPhone(phone)) {
      setPhoneError(true);
      valid = false;
    } else {
      setPhoneError(false);
    }

    if (!city.trim()) {
      setCityError(true);
      valid = false;
    } else {
      setCityError(false);
    }

    if (!valid) return;

    if (!cartId) {
      toast.error("No cart found. Please add products first.");
      return;
    }

    setLoading(true);

    try {
      const shippingAddress = { details, phone, city };

      if (paymentType === "cash") {
        const res = await createCashOrder(cartId, shippingAddress);
        if (res?.status === "success") {
          toast.success("Order placed successfully!");
          await refreshCartCount();
          router.push("/allorders");
        } else {
          toast.error(res?.message || "An error occurred while placing the order");
        }
      } else {
        // تحديد رابط الموقع للتحويل عليه بعد انتهاء الدفع
        const domain = window.location.origin;
        const res = await createOnlineOrder(cartId, shippingAddress, domain);
        
        if (res?.status === "success" && res?.session?.url) {
          // التحويل المباشر لصفحة Stripe الخارجية الموجودة بالصورة
          window.location.href = res.session.url; 
        } else {
          toast.error(res?.message || "Failed to open the payment gateway");
        }
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-serif font-bold text-center text-emerald-800 mb-10">
          Pay Now !
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto">
          <div>
            <label className="block text-gray-800 font-medium mb-2">Details</label>
            <input
              type="text"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="w-full px-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-gray-700 shadow-sm"
              placeholder="Enter your address details"
            />
          </div>

          <div>
            <label className="block text-red-600 font-medium mb-2">Phone :</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                if (phoneError) setPhoneError(false);
              }}
              className={`w-full px-4 py-3 rounded-full border ${
                phoneError ? "border-red-400 bg-red-50/20" : "border-gray-200"
              } focus:outline-none text-gray-700 shadow-sm`}
            />
            {phoneError && (
              <p className="text-red-600 text-sm mt-1 font-serif">
                must be egyptian number
              </p>
            )}
          </div>

          <div>
            <label className="block text-red-600 font-medium mb-2">City</label>
            <input
              type="text"
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
                if (cityError) setCityError(false);
              }}
              className={`w-full px-4 py-3 rounded-full border ${
                cityError ? "border-red-400 bg-red-50/20" : "border-gray-200"
              } focus:outline-none text-gray-700 shadow-sm`}
            />
            {cityError && (
              <p className="text-red-600 text-sm mt-1 font-serif">
                this field is required
              </p>
            )}
          </div>

          <div className="pt-2">
            <label className="block text-gray-800 font-medium mb-2">Payment Method</label>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentType === "cash"}
                  onChange={() => setPaymentType("cash")}
                  className="accent-emerald-600"
                />
                <span className="text-gray-700 font-medium">Cash on Delivery</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentType === "online"}
                  onChange={() => setPaymentType("online")}
                  className="accent-emerald-600"
                />
                <span className="text-gray-700 font-medium">Online (Credit Card)</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-black hover:bg-gray-800 text-white font-medium px-8 py-2.5 rounded-lg transition-colors shadow-sm disabled:bg-gray-400"
            >
              {loading ? "Submitting..." : "submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
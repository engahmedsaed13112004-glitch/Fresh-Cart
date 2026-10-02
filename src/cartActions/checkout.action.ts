"use server";

import { cookies } from "next/headers";

interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
}

// 1. إنشاء طلب كاش
export async function createCashOrder(cartId: string, shippingAddress: ShippingAddress) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return { status: "fail", message: "Please log in first" };
    }

    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify({ shippingAddress }),
    });

    const data = await res.json();
    return data;
  } catch (error: any) {
    return { status: "fail", message: error.message || "An error occurred while processing the request" };
  }
}

// 2. إنشاء جلسة دفع أونلاين (Stripe Sandbox)
export async function createOnlineOrder(cartId: string, shippingAddress: ShippingAddress, domain: string) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return { status: "fail", message: "Please log in first" };
    }

    // يتم تمرير رابط الموقع للعودة إليه بعد نجاح الدفع
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${domain}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify({ shippingAddress }),
      }
    );

    const data = await res.json();
    return data;
  } catch (error: any) {
    return { status: "fail", message: error.message || "An error occurred while redirecting to payment gateway" };
  }
}
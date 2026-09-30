"use server";

import { cookies } from "next/headers";

export async function clearCart() {
  try {
    const cookieStore = await cookies(); 
    const token = cookieStore.get("token")?.value;
    const response = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
      method: "DELETE",
      headers: {
        token: token || "",
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Clear Cart Error:", error);
    return { status: "error", message: "An error occurred while clearing the cart"};
  }
}
"use server";

import { getMyToken } from "../app/utilities/getMyToken";

export async function getUserCart() {
  const token = await getMyToken();

  if (!token) {
    return { status: "fail", message: "You should be logged in first" };
  }

  try {
    const res = await fetch(`${process.env.APIV2}/cart`, {
      method: "GET",
      headers: {
       
        token: String(token),
        "Content-Type": "application/json",
      },
      
      cache: "no-store",
    });

    const payload = await res.json();
    return payload;
  } catch (error) {
    console.error("Error fetching user cart:", error);
    return { status: "fail", message: "Failed to fetch cart data" };
  }
}
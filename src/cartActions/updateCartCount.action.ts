"use server";

import { getMyToken } from "../app/utilities/getMyToken";
import { cookies } from "next/headers";

export async function updateCartCount(id: string, count: number) {
  try {
    const cookieStore = await cookies();
    const token = (await getMyToken()) || cookieStore.get("token")?.value;

    if (!token) {
      return { status: "fail", message: "Please log in first" };
    }

    const res = await fetch(`${process.env.APIV2}/cart/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: token as string, 
      },
      body: JSON.stringify({ count }),
    });

    const payload = await res.json();
    return payload;
  } catch (error: any) {
    console.error("Error updating product count:", error);
    return { status: "fail", message: error?.message || "Failed to update count" };
  }
}
"use server";

import { getMyToken } from "../app/utilities/getMyToken";
import { cookies } from "next/headers";

export async function RemoveCartItem(id: string) {
  try {
    const cookieStore = await cookies();
    const token = (await getMyToken()) || cookieStore.get("token")?.value;

    if (!token) {
      throw new Error("you should logged in first");
    }

    const res = await fetch(`${process.env.APIV2}/cart/${id}`, {
      method: "DELETE",
      headers: {
        token: token as string,
      },
    });

    const payload = await res.json();
    return payload;
  } catch (error: any) {
    console.error("Error deleting product:", error);
    return { status: "fail", message: error?.message || "Failed to delete" };
  }
}
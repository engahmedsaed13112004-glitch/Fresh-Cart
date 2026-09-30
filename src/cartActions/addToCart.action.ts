"use server";

import { getMyToken } from "../app/utilities/getMyToken";

export async function addToCart(id: string) {
  try {
    const token = await getMyToken();

    if (!token) {
      return {
        success: false,
        message: "You should be logged in first",
      };
    }

    const res = await fetch(`${process.env.APIV2}/cart`, {
      method: "POST",
      headers: {
        token: token as string,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: id,
      }),
    });

    const payload = await res.json();
    return payload;

  } catch (error) {
    console.error("Error adding to cart:", error);
    return {
      status: "error",
      message: "Something went wrong while adding to cart",
    };
  }
}
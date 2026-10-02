"use server";

export async function getProductDetails(id: string) {
  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`, {
      next: { revalidate: 60 } 
    });
    const data = await res.json();
    return data.data; 
  } catch (error) {
    console.error("Error fetching product details:", error);
    return null;
  }
}
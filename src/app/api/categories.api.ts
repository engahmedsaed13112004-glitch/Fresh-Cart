export async function getAllCategories() {
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/categories", {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  return res.json();
}
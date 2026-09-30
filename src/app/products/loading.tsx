import React from 'react'

export default function loading() {
  return <>
  
  <div className="sk-cube-grid">
  <div className="sk-cube sk-cube1"></div>
  <div className="sk-cube sk-cube2"></div>
  <div className="sk-cube sk-cube3"></div>
  <div className="sk-cube sk-cube4"></div>
  <div className="sk-cube sk-cube5"></div>
  <div className="sk-cube sk-cube6"></div>
  <div className="sk-cube sk-cube7"></div>
  <div className="sk-cube sk-cube8"></div>
  <div className="sk-cube sk-cube9"></div>
</div>


  
  
  </>
  
  
// }
// import { IProducts } from "../../interfaces/products";
// import { getAllProducts } from "../../api/products.api";
// import SingleProduct from "../_component/navbar/singleProduct/SingleProduct";

// export default async function Products() {
//   const data = await getAllProducts();

//   // التأكد من الوصول للمصفوفة سواء كانت داخل data.data أو data مباشرة
//   const productsList: IProducts[] = data?.data || data || [];

//   return (
//     <div className="container w-[80%] mx-auto py-6">
//       <div className="flex flex-wrap gap-y-4 -mx-2">
//         {productsList.map((product: IProducts) => (
//           // هنا نمرر كل منتج لمكون SingleProduct ليعالجه بالكامل
//           <SingleProduct key={product._id} product={product} />
//         ))}
//       </div>
//     </div>
//   );
}
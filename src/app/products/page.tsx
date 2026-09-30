import { IProducts } from "../../interfaces/products";
import { getAllProducts } from "../../api/products.api";
import SingleProduct from "../_component/navbar/singleProduct/SingleProduct";
import { Footer } from "../_component/Footer/Footer";
import { HiOutlineCube } from "react-icons/hi2";

export default async function Products() {
  const data = await getAllProducts();
  const productsList: IProducts[] = data?.data || data || [];

  return (
    <div className="bg-gray-50/50 min-h-screen flex flex-col justify-between">
      <div>
       
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white py-8 px-4 md:px-8">
          <div className="w-full mx-auto">
            <div className="text-xs text-emerald-100/80 mb-3 font-medium">
              Home <span className="mx-1">/</span> <span className="text-white">All Products</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <HiOutlineCube className="text-3xl text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">All Products</h1>
                <p className="text-emerald-100 text-sm mt-1 font-normal">
                  Explore our complete product collection
                </p>
              </div>
            </div>
          </div>
        </div>

       
        <div className="w-full px-2 sm:px-4 md:px-6 py-6">
          <p className="text-xs text-gray-500 mb-4 font-normal px-1">
            Showing {productsList.length} products
          </p>

         
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-3">
            {productsList.map((product: IProducts) => (
              <SingleProduct key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
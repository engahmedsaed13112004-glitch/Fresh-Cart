import { getAllProducts } from "../api/products.api";
import { getAllCategories } from "./api/categories.api"; 
import { IProducts } from "../interfaces/products";
import SingleProduct from "./_component/navbar/singleProduct/SingleProduct";
import { Footer } from "./_component/Footer/Footer";
import { 
  FiTruck, 
  FiShield, 
  FiRotateCcw, 
  FiHeadphones, 
  FiArrowRight, 
  FiChevronLeft, 
  FiChevronRight 
} from "react-icons/fi";

export default async function Home() {
  const [productsData, categoriesData] = await Promise.all([
    getAllProducts(),
    getAllCategories(),
  ]);

  const productsList: IProducts[] = productsData?.data || productsData || [];
  const categoriesList = categoriesData?.data || [];

  return (
    <div className="bg-gray-50/50 min-h-screen flex flex-col justify-between">
      <main className="space-y-10 pb-12">
        
        <section className="relative rounded-2xl mx-4 sm:mx-6 mt-4 overflow-hidden min-h-[350px] sm:min-h-[400px] flex items-center shadow-lg">
          <img 
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=1600&auto=format&fit=crop&q=80" 
            alt="Main Banner Background" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/90 via-emerald-900/70 to-transparent" />

          <div className="relative z-10 max-w-xl px-6 sm:px-12 text-white">
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-3 leading-tight">
              Fresh Products Delivered to your Door
            </h1>
            <p className="text-emerald-100 text-sm sm:text-base mb-6">
              Get 20% off your first order
            </p>
            <div className="flex gap-3">
              <button type="button" className="bg-emerald-500 text-white font-semibold px-6 py-2.5 rounded-lg text-sm hover:bg-emerald-600 transition-all shadow-md">
                Shop Now
              </button>
              <button type="button" className="border border-white/60 text-white font-medium px-6 py-2.5 rounded-lg text-sm hover:bg-white/10 transition-all backdrop-blur-sm">
                View Deals
              </button>
            </div>
          </div>

          <button type="button" aria-label="Previous slide" className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/30 hover:bg-white/50 rounded-full flex items-center justify-center backdrop-blur-md text-white transition-all">
            <FiChevronLeft className="text-2xl" />
          </button>
          <button type="button" aria-label="Next slide" className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/30 hover:bg-white/50 rounded-full flex items-center justify-center backdrop-blur-md text-white transition-all">
            <FiChevronRight className="text-2xl" />
          </button>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-xl shrink-0">
                <FiTruck />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-800">Free Shipping</h4>
                <p className="text-xs text-gray-500">On orders over 500 EGP</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center text-xl shrink-0">
                <FiShield />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-800">Secure Payment</h4>
                <p className="text-xs text-gray-500">100% secure transactions</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center text-xl shrink-0">
                <FiRotateCcw />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-800">Easy Returns</h4>
                <p className="text-xs text-gray-500">14-day return policy</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center text-xl shrink-0">
                <FiHeadphones />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-800">24/7 Support</h4>
                <p className="text-xs text-gray-500">Dedicated support team</p>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800 border-l-4 border-emerald-500 pl-3">
              Shop By Category
            </h2>
            <button type="button" className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
              View All Categories <FiArrowRight />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {categoriesList.slice(0, 6).map((cat: any) => (
              <div key={cat._id} className="bg-white border border-gray-100 rounded-xl p-4 text-center hover:shadow-md transition-all cursor-pointer group">
                <div className="w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden bg-gray-50 flex items-center justify-center border border-gray-100">
                  <img 
                    src={cat.image} 
                    alt={cat.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
                  />
                </div>
                <span className="text-xs font-semibold text-gray-700 group-hover:text-emerald-600 transition-colors line-clamp-1">
                  {cat.name}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-8 rounded-2xl relative overflow-hidden shadow-sm">
              <span className="bg-white/20 text-xs px-2.5 py-1 rounded-full font-medium inline-block mb-3">
                Deal of the Day
              </span>
              <h3 className="text-2xl font-bold mb-1">Fresh Organic Fruits</h3>
              <p className="text-emerald-100 text-xs mb-4">Get up to 40% off on selected organic fruits</p>
              <span className="text-xl font-extrabold block mb-4">40% OFF <span className="text-xs font-normal opacity-80">Use code: ORGANIC40</span></span>
              <button type="button" className="bg-white text-emerald-700 text-xs font-bold px-4 py-2 rounded-lg hover:bg-emerald-50 transition-all flex items-center gap-2">
                Shop Now <FiArrowRight />
              </button>
            </div>

            <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white p-8 rounded-2xl relative overflow-hidden shadow-sm">
              <span className="bg-white/20 text-xs px-2.5 py-1 rounded-full font-medium inline-block mb-3">
                New Arrivals
              </span>
              <h3 className="text-2xl font-bold mb-1">Exotic Vegetables</h3>
              <p className="text-amber-100 text-xs mb-4">Discover our latest collection of premium vegetables</p>
              <span className="text-xl font-extrabold block mb-4">25% OFF <span className="text-xs font-normal opacity-80">Use code: FRESH25</span></span>
              <button type="button" className="bg-white text-orange-600 text-xs font-bold px-4 py-2 rounded-lg hover:bg-orange-50 transition-all flex items-center gap-2">
                Explore Now <FiArrowRight />
              </button>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 border-l-4 border-emerald-500 pl-3">
              Featured Products
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            {productsList.map((product: IProducts) => (
              <SingleProduct product={product} key={product._id || (product as any).id} />
            ))}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
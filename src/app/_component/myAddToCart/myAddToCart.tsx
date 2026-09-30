"use client";

import { toast } from "sonner"; 
import { addToCart } from "../../../cartActions/addToCart.action";
import { FaCirclePlus } from "react-icons/fa6";

export default function MyAddToCart({ id }: { id: string }) {

  async function addItemToCart(productId: string) {
    try {
      const res = await addToCart(productId);

      
      if (res?.status === "success" || res?.status === "message" || res?.message) {
        toast.success(res?.message ||"add product to cart succsses", {
          duration: 2000,
        });
      } else {
        toast.error("you cant add product now to card", {
          duration: 2000,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while adding");
    }
  }

  return (
    <button 
      type="button" 
      onClick={() => addItemToCart(id)}
      aria-label="Add to cart"
    >
      <FaCirclePlus className="text-3xl text-green-900 cursor-pointer hover:text-green-700 transition-colors" />
    </button>
  );
}
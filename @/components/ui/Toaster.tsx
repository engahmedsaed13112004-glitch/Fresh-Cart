"use client";

import { Toaster as SonnerToaster, toast as sonnerToast } from "sonner";


export function Toaster() {
  return (
    <SonnerToaster
      position="top-right"
      richColors
      closeButton
      duration={3000}
    />
  );
}


Toaster.add = ({ title, type }: { title: string; type?: "success" | "error" | "info" | "warning" | string }) => {
  if (type === "success" || type === "sucsess") {
    sonnerToast.success(title);
  } else if (type === "error") {
    sonnerToast.error(title);
  } else if (type === "warning") {
    sonnerToast.warning(title);
  } else {
    sonnerToast(title);
  }
};
"use client";

import * as React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { FaHeart } from "react-icons/fa6";
import { useWishlist } from "../../../context/WishlistContext";
import { useCart } from "../../../context/CartContext";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../../../../@/components/ui/navigation-menu";

import { FaBars, FaRegHeart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { Button } from "../../../../@/components/ui/button";
import { signOut, useSession } from "next-auth/react";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description: "A modal dialog that interrupts the user with important content.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description: "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description: "Displays an indicator showing the completion progress of a task.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description: "A set of layered sections of content known as tab panels.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description: "A popup that displays information related to an element.",
  },
];

export function Navbar() {
  const { data: session, status } = useSession();

  const { count: wishlistCount } = useWishlist();
  const { cartCount } = useCart(); 

  function logout() {
    signOut({
      callbackUrl: "/login",
    });
  }

  return (
    <nav className="flex items-center justify-between p-2 shadow-sm bg-white px-6">
      <div className="hidden md:flex items-center gap-x-6">
        <div>
          <h1 className="text-green-500 flex items-center text-3xl gap-x-4">
            <FiShoppingCart /> Fresh Cart
          </h1>
        </div>

        <div className="links px-6 flex gap-5 text-lg">
          <Link href="/" className="hover:text-green-500 duration-200 transition-all font-medium">
            Home
          </Link>

          <Link href="/products" className="hover:text-green-500 duration-200 transition-all font-medium">
            Shops
          </Link>

          <Link href="/brands" className="hover:text-green-500 duration-200 transition-all font-medium">
            Brands
          </Link>

          <Link href="/categories" className="hover:text-green-500 duration-200 transition-all font-medium">
            Categories
          </Link>

          {session && (
            <>
              <Link
                href="/wishlist"
                className="hover:text-emerald-600 duration-200 transition-all font-medium cursor-pointer"
              >
                
              </Link>

              <Link
                href="/cart"
                className="hover:text-green-500 duration-200 transition-all font-medium cursor-pointer"
              >
                Cart
              </Link>
            </>
          )}
        </div>
      </div>

      <NavigationMenu>
        <NavigationMenuList className="flex items-center gap-4">
          <NavigationMenuItem className="md:hidden">
            <NavigationMenuTrigger>
              <FaBars />
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="w-72 p-2">
                <ListItem href="/" title="Home" />
                <ListItem href="/products" title="Shops" />
                <ListItem href="/brands" title="Brands" />
                <ListItem href="/categories" title="Categories" />

                {session && <ListItem href="/wishlist" title="Wishlist" />}
                {session && <ListItem href="/cart" title="Cart" />}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem className="hidden md:flex">
            <NavigationMenuTrigger>Components</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-2 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {components.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link href="/docs">Docs</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div className="flex items-center gap-x-4">
        <Link href="/wishlist" className="relative">
          <FaRegHeart className="hover:text-green-500 transition-all duration-300 text-2xl cursor-pointer" />
          {wishlistCount > 0 && (
            <span className="absolute -top-1 -right-2 bg-emerald-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {wishlistCount}
            </span>
          )}
        </Link>

        <Link href="/cart" className="relative">
          <FiShoppingCart className="hover:text-green-500 transition-all duration-300 text-2xl cursor-pointer" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-2 bg-emerald-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Link>

        {session ? (
          <>
            <Button
              onClick={logout}
              className="bg-green-900 hover:bg-green-800 text-white cursor-pointer"
            >
              Sign Out
            </Button>

            <p className="text-xl animate-pulse">{session?.user?.name}</p>
          </>
        ) : (
          <>
            <Button className="bg-green-700 hover:bg-green-400 text-white" asChild>
              <Link href="/register">Sign Up</Link>
            </Button>

            <Button className="bg-green-700 hover:bg-green-400 text-white" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
          </>
        )}
      </div>
    </nav>
  );
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className="flex flex-col gap-1 text-sm p-2 hover:bg-accent rounded-md transition-colors block select-none space-y-1 no-underline outline-none"
        >
          <div className="leading-none font-medium">{title}</div>
          {children && (
            <div className="line-clamp-2 text-muted-foreground">{children}</div>
          )}
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { ShoppingCartIcon, UserIcon } from "lucide-react";
import { Badge } from "../ui/badge";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Navbar() {
  const { cartData, loading } = useContext(CartContext);

  return (
    <nav className='py-3 text-2xl font-semibold bg-gray-50 shadow fixed w-full'>
      <div className='container mx-auto '>
        <div className='flex justify-between items-center '>
          <Link href={"/"}>ShopMart</Link>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href='/products'>Products</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href='/categories'>Categories</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href='/brands'>Brands</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <div className='flex'>
            <DropdownMenu>
              <DropdownMenuTrigger className='outline-0 cursor-pointer'>
                <UserIcon />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href={"/profile"}>
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                </Link>
                <Link href={"/login"}>
                  <DropdownMenuItem>Login</DropdownMenuItem>
                </Link>
                <Link href={"/register"}>
                  <DropdownMenuItem>Register</DropdownMenuItem>
                </Link>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className=' p-3 relative'>
              <Link href={"/cart"}>
                <ShoppingCartIcon />
              </Link>
              {!loading && (
                <Badge className='size-4 p-2 absolute top-0 end-0'>
                  <span>{cartData?.numOfCartItems}</span>
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

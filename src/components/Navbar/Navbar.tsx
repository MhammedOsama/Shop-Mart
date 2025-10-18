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
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { cartData, loading } = useContext(CartContext);

  const session = useSession();

  return (
    <nav className='py-3 text-2xl font-semibold bg-gray-50  fixed top-0 w-full  shadow-sm z-50 '>
      <div className='container mx-auto px-6'>
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
          <div className='flex items-center'>
            <DropdownMenu>
              {session.status == "authenticated" ? (
                <h2 className='text-sm me-2'>Hi {session.data.user.name}</h2>
              ) : (
                ""
              )}
              <DropdownMenuTrigger className='outline-0 cursor-pointer'>
                <UserIcon />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {session.status == "authenticated" ? (
                  <>
                    <Link href={"/profile"}>
                      <DropdownMenuItem className='cursor-pointer'>
                        Profile
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem
                      className='cursor-pointer'
                      onClick={() =>
                        signOut({
                          callbackUrl: "/",
                        })
                      }>
                      Logout
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <Link href={"/login"} className='cursor-pointer'>
                      <DropdownMenuItem className='cursor-pointer'>
                        Login
                      </DropdownMenuItem>
                    </Link>
                    <Link href={"/register"}>
                      <DropdownMenuItem className='cursor-pointer'>
                        Register
                      </DropdownMenuItem>
                    </Link>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            {session.status == "authenticated" ? (
              <>
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
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

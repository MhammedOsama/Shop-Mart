"use client";

import { CartContext } from "@/components/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import Loading from "../../loading";
import { formatPrice } from "../../../helpers/FormatPrice";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";
import { CartResponse } from "@/interfaces";
import toast from "react-hot-toast";
import Checkout from "@/components/Ckeckout/Checkout";

export default function Cart() {
  const { cartData, loading, setCartData, getCart } = useContext(CartContext);
  const [removedId, setRemovedId] = useState<string | null>(null);
  const [updateId, setUpdateId] = useState<string | null>(null);
  const [isClearing, setIsClearing] = useState<boolean>(false);
  const [didRefetch, setDidRefetch] = useState(false);

  async function handleRemoveCartItem(productId: string) {
    setRemovedId(productId);
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      {
        method: "DELETE",
        headers: {
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ODY1YmQ2NDA5YTQ0MzA0MTkxNzU5NiIsIm5hbWUiOiJBaG1lZCBBYmQgQWwtTXV0aSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzU3ODQ2MjM2LCJleHAiOjE3NjU2MjIyMzZ9.t6X0FsezrZH4litUJsMMo_ijw_CiLmYM9T7EkDf6_Eg",
        },
      }
    );
    const data: CartResponse = await response.json();
    if (data.status == "success") {
      setCartData(data);
      toast.success("Product Removes Successfully");
    }
    setRemovedId(null);
  }

  async function handleUpdateQuantityCount(productId: string, count: number) {
    setUpdateId(productId);
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      {
        method: "PUT",
        body: JSON.stringify({ count }),
        headers: {
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ODY1YmQ2NDA5YTQ0MzA0MTkxNzU5NiIsIm5hbWUiOiJBaG1lZCBBYmQgQWwtTXV0aSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzU3ODQ2MjM2LCJleHAiOjE3NjU2MjIyMzZ9.t6X0FsezrZH4litUJsMMo_ijw_CiLmYM9T7EkDf6_Eg",
          "Content-type": "application/json",
        },
      }
    );
    const data: CartResponse = await response.json();
    console.log(data);

    if (data.status == "success") {
      setCartData(data);
      toast.success("Product Updated Successfully");
    }
    setUpdateId(null);
  }

  async function handleClearCart() {
    setIsClearing(true);
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/cart`,
      {
        method: "DELETE",
        headers: {
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ODY1YmQ2NDA5YTQ0MzA0MTkxNzU5NiIsIm5hbWUiOiJBaG1lZCBBYmQgQWwtTXV0aSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzU3ODQ2MjM2LCJleHAiOjE3NjU2MjIyMzZ9.t6X0FsezrZH4litUJsMMo_ijw_CiLmYM9T7EkDf6_Eg",
        },
      }
    );
    const data: CartResponse = await response.json();
    if (data.message == "success") {
      setCartData(data);
    }
    setIsClearing(false);
  }

  useEffect(() => {
    if (
      !didRefetch &&
      typeof cartData?.data?.products?.[0]?.product === "string"
    ) {
      getCart();
      setDidRefetch(true);
    }
  }, [cartData, getCart, didRefetch]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <section className='bg-white py-8 antialiased dark:bg-gray-900 md:py-16'>
          <div className='mx-auto max-w-screen-xl px-4 2xl:px-0'>
            <h2 className='text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl'>
              Shopping Cart
            </h2>
            <div className='mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8'>
              <div className='mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl'>
                <div className='space-y-6'>
                  {cartData?.numOfCartItems ? (
                    cartData?.data.products.map((item) => (
                      <div
                        key={item._id}
                        className='rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6'>
                        <div className='space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0'>
                          <Link
                            href={`/products/${item.product.id}`}
                            className='shrink-0 md:order-1'>
                            <Image
                              width={300}
                              height={300}
                              className='h-20 w-20 dark:hidden'
                              src={item.product.imageCover}
                              alt={item.product.title}
                            />
                          </Link>
                          <label htmlFor='counter-input' className='sr-only'>
                            Choose quantity:
                          </label>
                          <div className='flex items-center justify-between md:order-3 md:justify-end'>
                            <div className='flex items-center'>
                              <button
                                type='button'
                                id='decrement-button'
                                onClick={() =>
                                  handleUpdateQuantityCount(
                                    item.product.id,
                                    item.count - 1
                                  )
                                }
                                disabled={item.count == 1}
                                data-input-counter-decrement='counter-input'
                                className='inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700'>
                                <svg
                                  className='h-2.5 w-2.5 text-gray-900 dark:text-white'
                                  aria-hidden='true'
                                  xmlns='http://www.w3.org/2000/svg'
                                  fill='none'
                                  viewBox='0 0 18 2'>
                                  <path
                                    stroke='currentColor'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M1 1h16'
                                  />
                                </svg>
                              </button>
                              {updateId == item.product.id ? (
                                <Loader2 className='animate-spin w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white' />
                              ) : (
                                <input
                                  type='text'
                                  id='counter-input'
                                  data-input-counter
                                  className='w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white'
                                  defaultValue={item.count}
                                  required
                                />
                              )}
                              <button
                                type='button'
                                id='increment-button'
                                onClick={() =>
                                  handleUpdateQuantityCount(
                                    item.product.id,
                                    item.count + 1
                                  )
                                }
                                data-input-counter-increment='counter-input'
                                className='inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700'>
                                <svg
                                  className='h-2.5 w-2.5 text-gray-900 dark:text-white'
                                  aria-hidden='true'
                                  xmlns='http://www.w3.org/2000/svg'
                                  fill='none'
                                  viewBox='0 0 18 18'>
                                  <path
                                    stroke='currentColor'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M9 1v16M1 9h16'
                                  />
                                </svg>
                              </button>
                            </div>
                            <div className='text-end md:order-4 md:w-32'>
                              <p className='text-base font-bold text-gray-900 dark:text-white'>
                                {formatPrice(item.price)}
                              </p>
                            </div>
                          </div>
                          <div className='w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md'>
                            <h3 className='font-semibold text-base md:text-lg line-clamp-2'>
                              {item.product.title}
                            </h3>
                            <p className='text-sm text-muted-foreground mt-1'>
                              {item.product.brand.name}
                              {item.product.category.name}
                            </p>
                            <div className='flex items-center gap-4'>
                              <button
                                type='button'
                                className='inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white'>
                                <svg
                                  className='me-1.5 h-5 w-5'
                                  aria-hidden='true'
                                  xmlns='http://www.w3.org/2000/svg'
                                  width={24}
                                  height={24}
                                  fill='none'
                                  viewBox='0 0 24 24'>
                                  <path
                                    stroke='currentColor'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z'
                                  />
                                </svg>
                                Add to Favorites
                              </button>
                              <button
                                onClick={() =>
                                  handleRemoveCartItem(item.product._id)
                                }
                                disabled={removedId == item.product.id}
                                type='button'
                                className=' cursor-pointer inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500'>
                                <svg
                                  className='me-1.5 h-5 w-5'
                                  aria-hidden='true'
                                  xmlns='http://www.w3.org/2000/svg'
                                  width={24}
                                  height={24}
                                  fill='none'
                                  viewBox='0 0 24 24'>
                                  <path
                                    stroke='currentColor'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M6 18 17.94 6M18 18 6.06 6'
                                  />
                                </svg>
                                {removedId == item.product.id && (
                                  <Loader2 className='animate-spin' />
                                )}
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <h1 className='min-h-[60vh] flex justify-center items-center flex-col font-bold'>
                      Your Cart Is Empty
                    </h1>
                  )}
                </div>
              </div>
              <div className='mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full'>
                <div className='space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6'>
                  <p className='text-xl font-semibold text-gray-900 dark:text-white'>
                    Order summary
                  </p>
                  <div className='space-y-4'>
                    <div className='space-y-2'>
                      <dl className='flex items-center justify-between gap-4'>
                        <dt className='text-base font-normal text-gray-500 dark:text-gray-400'>
                          Original price
                        </dt>
                        <dd className='text-base font-medium text-gray-900 dark:text-white'>
                          {formatPrice(cartData?.data?.totalCartPrice ?? 0)}
                        </dd>
                      </dl>
                      <dl className='flex items-center justify-between gap-4'>
                        <dt className='text-base font-normal text-gray-500 dark:text-gray-400'>
                          Fees
                        </dt>
                        <dd className='text-base font-medium text-green-600'>
                          Free
                        </dd>
                      </dl>
                    </div>
                    <dl className='flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700'>
                      <dt className='text-base font-bold text-gray-900 dark:text-white'>
                        Total
                      </dt>
                      <dd className='text-base font-bold text-gray-900 dark:text-white'>
                        {formatPrice(cartData?.data?.totalCartPrice ?? 0)}
                      </dd>
                    </dl>
                  </div>
                  <div className='flex justify-center'>
                    <Checkout cartId={cartData?.cartId ?? ""} />
                  </div>

                  <div className='flex items-center justify-center gap-2'>
                    <span className='text-sm font-normal text-gray-500 dark:text-gray-400'>
                      or
                    </span>
                    <Link
                      href={`/products`}
                      className='inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500'>
                      Continue Shopping
                      <svg
                        className='h-5 w-5'
                        aria-hidden='true'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'>
                        <path
                          stroke='currentColor'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M19 12H5m14 0-4 4m4-4-4-4'
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
                <Button
                  onClick={handleClearCart}
                  variant={"outline"}
                  className='text-destructive hover:text-destructive ms-auto flex cursor-pointer'>
                  {isClearing ? (
                    <Loader2 className='animate-spin' />
                  ) : (
                    <Trash2 />
                  )}
                  Clear Cart
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

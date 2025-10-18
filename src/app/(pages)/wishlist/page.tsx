"use client";

import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Heart } from "lucide-react";
import { useContext } from "react";
import { WishlistContext } from "@/components/context/WishlistContext";

export default function WishlistPage() {
  const { wishlistData } = useContext(WishlistContext);
  console.log(wishlistData);

  return (
    <main className='min-h-screen bg-gradient-to-b from-gray-50 to-white py-10 px-6'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10'>
          <h1 className='text-3xl font-bold text-gray-800 tracking-tight'>
            My Wishlist <span className='text-red-500'>❤️</span>
          </h1>
          <p className='text-gray-500 text-sm mt-2 sm:mt-0'>
            {wishlistData?.count} {wishlistData?.count === 1 ? "item" : "items"}{" "}
            saved
          </p>
        </div>

        {/* Wishlist Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8'>
          {wishlistData?.data.map((item) => (
            <Card
              key={item._id}
              className='overflow-hidden py-0 rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 bg-white group'>
              {/* Image Section */}
              <div className='relative aspect-square bg-gray-100 overflow-hidden'>
                <Image
                  src={item.imageCover}
                  alt={item.title}
                  fill
                  sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw'
                  className='object-contain group-hover:scale-110 transition-transform duration-700 ease-out'
                />

                {/* Heart Icon */}
                <button className='absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow hover:bg-red-100 transition-all'>
                  <Heart className='w-5 h-5 text-red-500 fill-red-500' />
                </button>

                {/* Add to Cart on Hover */}
                <div className='absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300'>
                  <Button
                    size='sm'
                    className='px-6 py-2 rounded-full font-medium shadow bg-black text-white hover:bg-neutral-800 cursor-pointer'>
                    Add to Cart
                  </Button>
                </div>
              </div>

              {/* Product Info */}
              <CardContent className='p-5 text-center space-y-3'>
                {/* Title */}
                <h3 className='text-lg font-semibold text-gray-900 line-clamp-1'>
                  {item.title}
                </h3>

                {/* Description */}
                <p className='text-sm text-gray-500 line-clamp-2'>
                  {item.description}
                </p>

                {/* Rating & Price */}
                <div className='flex items-center justify-center gap-3 pt-1'>
                  <div className='flex items-center gap-1'>
                    <Star className='w-4 h-4 text-yellow-400 fill-yellow-400' />
                    <span className='text-sm text-gray-600 font-medium'>
                      {item.ratingsAverage}
                    </span>
                  </div>
                  <span className='text-base font-bold text-gray-900'>
                    ${item.price}
                  </span>
                </div>
              </CardContent>

              {/* Brand Footer */}
              <CardFooter className='flex items-center justify-center gap-2 bg-gray-50 py-3 border-t rounded-b-3xl'>
                <Image
                  src={item.brand.image}
                  alt={item.brand.name}
                  width={22}
                  height={22}
                  className='object-contain'
                />
                <span className='text-sm font-medium text-gray-700'>
                  {item.brand.name}
                </span>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <section className='flex flex-col items-center justify-center min-h-[80vh] text-center px-4'>
      <h1 className='text-7xl font-extrabold tracking-tight mb-4'>
        Welcome to <span className='text-black'>ShopMart</span>
      </h1>

      <p className=' text-muted-foreground max-w-2xl mb-8'>
        Discover the latest technology, fashion, and lifestyle products. Quality
        guaranteed with fast shipping and excellent customer service.
      </p>

      <div className='flex gap-4'>
        <Link href={"/products"}>
          <Button className='bg-black text-white px-6 py-3 hover:bg-gray-900 transition cursor-pointer'>
            Shop Now
          </Button>
        </Link>
        <Link href={"/categories"}>
          <Button
            variant='outline'
            className='border border-black text-black px-6 py-3 hover:bg-black hover:text-white transition cursor-pointer'>
            Browse Categories
          </Button>
        </Link>
      </div>
    </section>
  );
}

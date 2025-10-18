import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Category } from "@/interfaces";

export default function GridItems({
  items,
  type,
}: {
  items: Category[];
  type: "categories" | "brands";
}) {
  return (
    <main className='min-h-screen bg-gray-50 p-6'>
      <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6'>
        <aside className='bg-white rounded-xl shadow p-4 md:col-span-1'>
          <h2 className='text-lg font-semibold mb-4'>Filters</h2>
          <ul className='space-y-2 text-gray-700'>
            {items.map((item) => (
              <li key={item._id}>{item.name}</li>
            ))}
          </ul>
        </aside>

        <section className='md:col-span-3'>
          <h1 className='text-2xl font-bold mb-6'>
            {type === "categories" ? "Categories" : "Brands"}
          </h1>
          <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6'>
            {items.map((item) => (
              <Card
                key={item._id}
                className='overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl cursor-pointer group'>
                <div className='relative aspect-square overflow-hidden bg-gray-50'>
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw'
                    className='object-contain p-6 group-hover:scale-105 transition-transform duration-300'
                  />
                </div>

                <CardContent className='p-4 text-center'>
                  <h3 className='text-lg font-semibold text-gray-800 group-hover:text-primary transition-colors'>
                    {item.name}
                  </h3>
                  <p className='text-sm text-gray-500 mt-1'>
                    Explore {item.name} products
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

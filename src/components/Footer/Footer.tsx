import React from "react";
import { Mail, MapPin, Phone } from "lucide-react"; // icons from lucide.dev

export default function Footer() {
  return (
    <footer className='bg-white border-t border-gray-200 px-8 py-12'>
      <div className='max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
        <div>
          <h2 className='text-xl font-bold mb-4 flex items-center gap-2'>
            <span className='bg-black text-white px-3 py-1 rounded'>T</span>
            ShopMart
          </h2>
          <p className='text-sm  mb-4 text-muted-foreground'>
            Your one-stop destination for the latest technology, fashion, and
            lifestyle products. Quality guaranteed with fast shipping and
            excellent customer service.
          </p>

          <ul className='space-y-2 text-sm text-muted-foreground '>
            <li className='flex items-center gap-2'>
              <MapPin size={16} />
              123 Shop Street, Octoper City, DC 12345
            </li>
            <li className='flex items-center gap-2'>
              <Phone size={16} /> (+20) 01093333333
            </li>
            <li className='flex items-center gap-2'>
              <Mail size={16} /> support@shopmart.com
            </li>
          </ul>
        </div>

        {/* --- Column 2: Shop --- */}
        <div>
          <h3 className='font-bold mb-3 '>SHOP</h3>
          <ul className='space-y-2 text-sm text-muted-foreground'>
            <li>Electronics</li>
            <li>Fashion</li>
            <li>Home & Garden</li>
            <li>Sports</li>
            <li>Deals</li>
          </ul>
        </div>

        {/* --- Column 3: Customer Service --- */}
        <div>
          <h3 className='font-bold mb-3 text-gray-900'>CUSTOMER SERVICE</h3>
          <ul className='space-y-2 text-sm text-muted-foreground'>
            <li>Contact Us</li>
            <li>Help Center</li>
            <li>Track Your Order</li>
            <li>Returns & Exchanges</li>
            <li>Size Guide</li>
          </ul>
        </div>

        {/* --- Column 4: About & Policies --- */}
        <div className='grid grid-cols-2 gap-6'>
          <div>
            <h3 className='font-bold mb-3 text-gray-900'>ABOUT</h3>
            <ul className='space-y-2 text-sm text-muted-foreground'>
              <li>About ShopMart</li>
              <li>Careers</li>
              <li>Press</li>
              <li>Investor Relations</li>
              <li>Sustainability</li>
            </ul>
          </div>
          <div>
            <h3 className='font-bold mb-3 text-gray-900'>POLICIES</h3>
            <ul className='space-y-2 text-sm text-muted-foreground'>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Cookie Policy</li>
              <li>Shipping Policy</li>
              <li>Refund Policy</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom note */}
      <div className='mt-8 border-t border-gray-200 pt-4 text-center text-sm text-gray-500'>
        © {new Date().getFullYear()} ShopMart. All rights reserved.
      </div>
    </footer>
  );
}

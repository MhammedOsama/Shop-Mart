import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useRef, useState } from "react";

export default function Checkout({ cartId }: { cartId: string }) {
  const detailsInput = useRef<HTMLInputElement | null>(null);
  const cityInput = useRef<HTMLInputElement | null>(null);
  const phoneInput = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);

  async function checkoutSession() {
    setLoading(true);
    const shippingCart = {
      details: detailsInput.current?.value,
      phone: detailsInput.current?.value,
      city: detailsInput.current?.value,
    };



    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
      {
        method: "POST",
        body: JSON.stringify({ shippingCart }),
        headers: {
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ODY1YmQ2NDA5YTQ0MzA0MTkxNzU5NiIsIm5hbWUiOiJBaG1lZCBBYmQgQWwtTXV0aSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzU4MTA2MzQwLCJleHAiOjE3NjU4ODIzNDB9.mbB1dge5t4IShu3tkAgRhX2Fxb42l7i4rzvso90v3r4",
          "Content-type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (data.status == "success") {
      location.href = data.session.url;
    }
    setLoading(false);
  }

  return (
    <>
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button className='w-full cursor-pointer'>
              {loading && <Loader2 className='animate-spin' />}
              Proceed to Checkout
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle>Add Your Address</DialogTitle>
            </DialogHeader>
            <div className='grid gap-4'>
              <div className='grid gap-3'>
                <Label htmlFor='details'>Details</Label>
                <Input ref={detailsInput} id='details' name='name' />
              </div>
              <div className='grid gap-3'>
                <Label htmlFor='city'>Name</Label>
                <Input ref={cityInput} id='city' name='name' />
              </div>
              <div className='grid gap-3'>
                <Label htmlFor='phone'>Phone</Label>
                <Input ref={phoneInput} id='phone' name='name' />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant='outline' className='cursor-pointer'>
                  Cancel
                </Button>
              </DialogClose>
              <Button className='cursor-pointer' type='submit'>
                Cash
              </Button>
              <Button
                onClick={checkoutSession}
                className='cursor-pointer bg-blue-600 text-white hover:bg-blue-700'
                type='submit'>
                {loading && <Loader2 className='animate-spin' />} Visa
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </>
  );
}

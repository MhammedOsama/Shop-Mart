import { LoaderCircleIcon } from "lucide-react";
import React from "react";

export default function Loading() {
  return (
    <div className='min-h-screen flex justify-center items-center'>
      <h1 className='flex justify-center items-center gap-2 text-xl font-semibold'>
        Loading
        <LoaderCircleIcon className='animate-spin w-10 h-10' />
      </h1>
    </div>
  );
}

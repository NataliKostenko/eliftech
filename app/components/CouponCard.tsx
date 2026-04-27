"use client";
import { useState } from "react";
import Image from "next/image";

export interface CouponCardProps {
  id: number;
  name: string;
  image: string;
  discount: number;
}

export default function CouponCard(props: CouponCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(props.name);

      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <div className="flex flex-col p-3 m-3 border-[#2F4454] rounded-xl size-60 bg-[#DA7B93]/20">
      <div className="relative w-full h-32">
        <Image
          src={props.image}
          alt={props.name}
          fill
          className="object-contain"
          unoptimized
          sizes="(max-width: 768px) 100vw, 250px"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-bold text-lg leading-tight">{props.name}</h3>
          <span className="text-[#376E6F] text-lg font-bold px-2 py-1 rounded">
            {props.discount}UAH
          </span>
        </div>
      </div>
      <button
        onClick={handleCopy}
        className={`p-2   mt-3  h-10   text-center text-[#2F4454] active:text-white   
        bg-[#DA7B93]/50  active:bg-[#2E151B]   border-solid   rounded-md   border-grey-100   ml-10" 
       w-full mt-3 py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
         copied
           ? "bg-[#2E151B] text-white"
           : "bg-[#DA7B93]/50 text-gray-700 hover:bg-[#DA7B93] hover:text-white"
       }`}
      >
        {copied ? "✓ Copied!" : "Copy"}
      </button>
    </div>
  );
}

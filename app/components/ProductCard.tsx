import AddToCartButton from "./AddToCartButton";
import Image from "next/image";

export interface ProductCardProps {
  id: number;
  name: string;
  image: string;
  price: number;
}

export default function ProductCard(props: ProductCardProps) {
  return (
    <div className="flex flex-col p-3 m-3 border rounded-md size-60">
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
      <p className="mt-2">{props.name}</p>
      <p className="text-gray-700 font-bold mt-1">{props.price} грн</p>
      <AddToCartButton
        name="add to Cart"
        product={{
          id: props.id,
          name: props.name,
          image: props.image,
          price: props.price,
        }}
      />
    </div>
  );
}

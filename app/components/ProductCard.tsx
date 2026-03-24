import AddToCartButton from "./AddToCartButton";
import Image from "next/image";

export interface ProductCardProps {
  id: number;
  name: string;
  image: string;
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
        />
      </div>
      <p className="mt-2">{props.name}</p>
      <AddToCartButton name={"add to Cart"} />
    </div>
  );
}

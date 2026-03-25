import Image from "next/image";
import QuantityCounter from "./QuantityCounter";
import { useCart } from "../context/CartContext";
import RemoveButton from "./RemoveButton";

export interface OrderCardProps {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

export default function OrderCard(props: OrderCardProps) {
  const { removeFromCart } = useCart();
  return (
    <div className="flex flex-row p-3 m-3 border rounded-md w-full relative">
      <RemoveButton
        onClick={() => removeFromCart(props.id)}
        className="absolute top-2 right-2"
      />
      <div className="relative w-3/5 h-32">
        <Image
          src={props.image}
          alt={props.name}
          fill
          className="object-contain"
        />
      </div>
      <div className="flex flex-col w-2/5 ">
        <p className="mt-2">{props.name}</p>
        <p className="mt-2"> price: {props.price} </p>
        <QuantityCounter
          id={props.id}
          quantity={props.quantity}
          onIncrease={props.onIncrease}
          onDecrease={props.onDecrease}
        />
      </div>
    </div>
  );
}

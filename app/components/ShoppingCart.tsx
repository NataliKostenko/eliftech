import ShoppingCartForm from "./ShoppingCartForm";
import ShoppingCartOrder from "./ShoppingCartOrder";
export default function ShoppingCart() {
  return (
    <>
      <div className="flex flex-row flex-2 w-full">
        <ShoppingCartForm />
        <ShoppingCartOrder />
      </div>
    </>
  );
}

import ProductCard, { ProductCardProps } from "./ProductCard";

interface ProductsCardsListProps {
  cards?: ProductCardProps[];
}

export default function ProductsCardsList(props: ProductsCardsListProps) {
  return (
    <div
      className="w-full md:w-3/4 flex flex-row flex-wrap border rounded-xl p-3 md:ml-5 h-screen
     overflow-y-auto bg-white"
    >
      {props.cards?.map((element) => (
        <ProductCard
          name={element.name}
          key={element.id}
          image={element.image}
          id={element.id}
          price={element.price}
        />
      )) || <p>Shop is not selected</p>}
    </div>
  );
}

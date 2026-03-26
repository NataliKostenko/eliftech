import ProductCard, { ProductCardProps } from "./ProductCard";

interface ProductsCardsListProps {
  cards?: ProductCardProps[];
}

export default function ProductsCardsList(props: ProductsCardsListProps) {
  return (
    <div
      className="w-3/4 flex flex-row flex-wrap border rounded-md p-3 ml-5 h-screen
     overflow-y-auto"
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

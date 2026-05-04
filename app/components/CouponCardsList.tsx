import CouponCard, { CouponCardProps } from "./CouponCard";
import CouponTerms from "../components/CouponTerms";

interface CouponCardsListProps {
  cards?: CouponCardProps[];
}

export default function CouponCardsList({ cards }: CouponCardsListProps) {
  return (
    <div
      className="
        w-full
        flex flex-row flex-wrap 
         md:justify-start         
        border rounded-xl p-3 md:ml-5 
        h-[calc(100vh-100px)]
        overflow-y-auto bg-white
      "
    >
      {cards && cards.length > 0 ? (
        cards.map((element) => (
          <div key={element.id}>
            <CouponCard
              name={element.name}
              image={element.image}
              id={element.id}
              discount={element.discount}
            />
          </div>
        ))
      ) : (
        <div className="w-full flex items-center justify-center text-gray-400 italic">
          No coupons available
        </div>
      )}
      <CouponTerms />
    </div>
  );
}

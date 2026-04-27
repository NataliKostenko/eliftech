export default function CouponTerms() {
  const terms = [
    "Coupons cannot be combined with other offers.",
    "The discount applies only to the cost of goods.",
    "Each coupon is valid for a limited time.",
    "Refunds are based on the actual price paid.",
  ];

  return (
    <div className="mt-10 p-6 rounded-xl ">
      <h2 className="text-lg font-bold text-gray-800 mb-4 uppercase tracking-wider">
        Terms & Conditions
      </h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {terms.map((term, index) => (
          <li
            key={index}
            className="flex items-start gap-2 text-sm text-gray-600"
          >
            <span className="text-[#376E6F] font-bold">•</span>
            {term}
          </li>
        ))}
      </ul>
    </div>
  );
}

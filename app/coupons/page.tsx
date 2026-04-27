"use client";
import CouponCardsList from "../components/CouponCardsList";
import { useState, useEffect } from "react";

export default function Coupons() {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    fetch("/api/coupons")
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) {
          setCoupons(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);
  if (loading)
    return <div className="p-10 text-center">Loading coupons...</div>;
  return <CouponCardsList cards={coupons} />;
}

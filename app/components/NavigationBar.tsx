import Link from "next/link";

export default function NavigationBar() {
  return (
    <nav className="m-5">
      <ul className="flex flex-row">
        <li className="mr-5 ">
          <Link
            href="/"
            className="text-white  hover:text-[#376E6F] hover:underline decoration-[#376E6F] active:text-[#376E6F] active:underline decoration-[#376E6F]"
          >
            Shops
          </Link>
        </li>
        <li className="text-white">|</li>
        <li className="ml-5 ">
          <Link
            href="/cart"
            className="text-white  hover:text-[#376E6F] hover:underline decoration-[#376E6F] active:text-[#376E6F] active:underline decoration-[#376E6F]"
          >
            Shopping cart
          </Link>
        </li>
      </ul>
    </nav>
  );
}

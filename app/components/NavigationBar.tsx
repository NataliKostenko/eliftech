import Link from "next/link";

export default function NavigationBar() {
  return (
    <nav className="m-5">
      <ul className="flex flex-row">
        <li className="mr-5 ">
          <Link
            href="/home"
            className="text-cyan-700  hover:underline decoration-cyan-500 active:underline decoration-cyan-700"
          >
            Shops
          </Link>
        </li>
        <p>|</p>
        <li className="ml-5 ">
          <Link
            href="/cart"
            className="text-cyan-700  hover:underline decoration-cyan-500 active:underline decoration-cyan-700"
          >
            Shopping cart
          </Link>
        </li>
      </ul>
    </nav>
  );
}

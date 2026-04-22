"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavigationBar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Shops", href: "/" },
    { name: "Shopping cart", href: "/cart" },
    { name: "History", href: "/history" },
    { name: "Coupons", href: "/coupons" },
  ];

  const linkStyles = (href: string) => `
    text-white transition-colors duration-200
    hover:text-[#376E6F] hover:underline decoration-[#376E6F]
    ${pathname === href ? "text-[#376E6F] underline font-semibold" : ""}
  `;

  return (
    <nav className="m-5 relative z-50">
      <div className="flex justify-between items-center md:hidden">
        <span className="text-white font-bold tracking-wider">BURGER SHOP</span>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white p-2 focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            )}
          </svg>
        </button>
      </div>

      <ul className="hidden md:flex flex-row items-center">
        {navLinks.map((link, index) => (
          <li key={link.href} className="flex items-center">
            <Link href={link.href} className={linkStyles(link.href)}>
              {link.name}
            </Link>
            {index < navLinks.length - 1 && (
              <span className="text-white mx-5">|</span>
            )}
          </li>
        ))}
      </ul>

      <div
        className={`
          absolute top-full left-0 w-full mt-2 bg-[#2F4454] border border-white/10 rounded-lg shadow-xl overflow-hidden transition-all duration-300 md:hidden
          ${isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0 pointer-events-none"}
        `}
      >
        <ul className="flex flex-col p-4 gap-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`block ${linkStyles(link.href)}`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

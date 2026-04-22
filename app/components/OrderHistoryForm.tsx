"use client";
import { useState } from "react";

interface Props {
  onSearch: (email: string, phone: string) => void;
  isLoading: boolean;
}

export default function OrderHistoryForm({ onSearch, isLoading }: Props) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && phone) {
      onSearch(email, phone);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full md:w-1/2 flex flex-row flex-wrap justify-center  
    border rounded-md p-3 bg-white"
    >
      <div className="flex flex-col gap-6 w-full max-w-sm">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-[#2F4454]"
          >
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:border-[#376E6F] outline-none"
            placeholder="example@mail.com"
          />
        </div>
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-[#2F4454]"
          >
            Phone
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:border-[#376E6F] outline-none"
            placeholder="+380..."
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 bg-[#376E6F] text-white rounded-md hover:bg-[#2F4454] transition-colors disabled:bg-gray-400"
        >
          {isLoading ? "Search..." : "Show history"}
        </button>
      </div>
    </form>
  );
}

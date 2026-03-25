"use client";

import { useState } from "react";

export default function ShoppingCartForm() {
  const [status, setStatus] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    const name = formData.get("name");
    const email = formData.get("email");

    if (!name || !email) {
      setStatus("Будь ласка, заповніть усі поля.");
      return;
    }

    setStatus("Відправка...");
    await new Promise((res) => setTimeout(res, 1000));

    console.log({ name, email });
    setStatus("Дякуємо! Вашу форму відправлено успішно.");
  }

  return (
    <div className="w-1/2 flex flex-row flex-wrap justify-center  border rounded-md p-3 ml-5">
      <form action={handleSubmit} className="flex flex-col gap-6 w-96 mt-5">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 dark:text-zinc-300"
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 text-gray-900 dark:text-white"
            placeholder="Name"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 dark:text-zinc-300"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 text-gray-900 dark:text-white"
            placeholder="example@mail.com"
          />
        </div>
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 dark:text-zinc-300"
          >
            Phone
          </label>
          <input
            type="phone"
            id="phone"
            name="phone"
            required
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 text-gray-900 dark:text-white"
            placeholder="+000000000000"
          />
        </div>
        <div>
          <label
            htmlFor="adress"
            className="block text-sm font-medium text-gray-700 dark:text-zinc-300"
          >
            Adress
          </label>
          <input
            type="adress"
            id="adress"
            name="adress"
            required
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 text-gray-900 dark:text-white"
          />
        </div>
      </form>
    </div>
  );
}

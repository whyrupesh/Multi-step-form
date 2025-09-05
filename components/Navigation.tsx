"use client"; // if you're in the app/ directory and want client-side interactivity

import Link from "next/link";

const Navigation = () => {
  return (
    <nav className="w-full bg-gray-800 shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo / Brand */}
        <h1 className="text-xl font-bold text-white">My Store</h1>

        {/* Navigation Links */}
        <div className="flex space-x-4">
          <Link
            href="/productList"
            className="px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
          >
            See All Products
          </Link>
          <Link
            href="/fillform"
            className="px-4 py-2 rounded-md bg-green-600 text-white font-medium hover:bg-green-700 transition"
          >
            Post Products
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

const PAGE_SIZE = 5;

async function fetchProducts({ pageParam = 0 }) {
  const res = await axios.get("/api/products");
  const all = res.data;
  return {
    items: all.slice(pageParam, pageParam + PAGE_SIZE),
    nextPage: pageParam + PAGE_SIZE < all.length ? pageParam + PAGE_SIZE : null,
  };
}

export default function ProductListPage() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0,
  });

  if (status === "pending") return <p className="text-center">Loading...</p>;
  if (status === "error") return <p className="text-center text-red-500">Error loading products</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Product List</h1>

      {data?.pages.map((page, i) => (
        <div key={i}>
          {page.items.map((p: any) => (
            <div
              key={p.id}
              className="border rounded-xl p-4 mb-4 shadow hover:shadow-md transition"
            >
              <h3 className="font-semibold text-lg">{p.name}</h3>
              <p className="text-white-600">💰 ₹{p.price} | Tax: {p.tax}%</p>
              {p.image && (
                <img
                  src={`data:image/*;base64,${p.image}`}
                  alt={p.name}
                  className="w-32 mt-3 rounded"
                />
              )}
            </div>
          ))}
        </div>
      ))}

      {hasNextPage && (
        <div className="flex justify-center">
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="mt-4 px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            {isFetchingNextPage ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
}

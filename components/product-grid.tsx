"use client"

import useSWR from "swr"
import type { Product } from "@/lib/types"
import { jsonFetcher } from "@/lib/fetcher"
import { ProductCard } from "./product-card"

export function ProductGrid() {
  // Fetch products from the Next.js API, which gets data from MongoDB
  const { data, error, isLoading } = useSWR<Product[]>(`/api/products`, (url: string) => jsonFetcher<Product[]>(url))

  if (isLoading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-sm text-slate-600">Loading products…</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-sm text-red-600">Failed to load products. Please try again later.</p>
      </div>
    )
  }

  if (!data || data.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-sm text-slate-600">No products available.</p>
      </div>
    )
  }

  return (
    <section id="collections" className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">Latest Collection</h2>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {data.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  )
}

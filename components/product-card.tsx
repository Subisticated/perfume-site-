"use client"

import Link from "next/link"
import type { Product } from "@/lib/types"

function truncate(text: string, max = 50) {
  if (!text) return ""
  return text.length > max ? text.slice(0, max - 1).trimEnd() + "…" : text
}

function formatPrice(value: number) {
  try {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value ?? 0)
  } catch {
    return `$${(value ?? 0).toFixed(2)}`
  }
}

export function ProductCard({ product }: { product: Product }) {
  const image = product?.images?.[0] || "/elegant-perfume-bottle.png"

  return (
    <Link
      href={`/product/${product.id}`}
      className="group block rounded-lg border bg-white p-3 shadow-sm transition hover:shadow-md"
    >
      <div className="overflow-hidden rounded-md">
        <img
          src={image || "/placeholder.svg"}
          alt={product.name ? `${product.name} product image` : "Product image"}
          className="h-48 w-full transform object-cover transition duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="mt-3 space-y-1">
        <h3 className="text-sm font-medium text-slate-900">{product.name}</h3>
        <p className="text-xs text-slate-600">{truncate(product.description, 50)}</p>
        <p className="pt-1 text-sm font-semibold text-slate-900">{formatPrice(product.price)}</p>
      </div>
    </Link>
  )
}

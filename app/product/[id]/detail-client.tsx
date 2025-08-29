"use client"

import type React from "react"

import useSWR, { mutate } from "swr"
import { useMemo, useState } from "react"
import { API_BASE, jsonFetcher } from "@/lib/fetcher"
import type { Product, Review } from "@/lib/types"

function formatPrice(value: number) {
  try {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value ?? 0)
  } catch {
    return `$${(value ?? 0).toFixed(2)}`
  }
}

export default function ProductDetailClient({ id }: { id: string }) {
  const productUrl = `/api/products/${id}`
  const reviewsUrl = `/api/reviews/${id}`

  const {
    data: product,
    error: productError,
    isLoading: loadingProduct,
  } = useSWR<Product>(productUrl, (url: string) => jsonFetcher<Product>(url))

  const {
    data: reviews,
    error: reviewsError,
    isLoading: loadingReviews,
  } = useSWR<Review[]>(reviewsUrl, (url: string) => jsonFetcher<Review[]>(url))

  const [form, setForm] = useState<Review>({ username: "", rating: 5, comment: "" })
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const shareUrl = useMemo(() => {
    const base = typeof window !== "undefined" ? window.location.href : `https://example.com/product/${id}`
    const text = product?.name ? `Check out ${product.name}` : "Check this out"
    const intent = new URL("https://twitter.com/intent/tweet")
    intent.searchParams.set("text", text)
    intent.searchParams.set("url", base)
    return intent.toString()
  }, [id, product?.name])

  async function submitReview(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setSubmitError(null)
    try {
      const res = await fetch(reviewsUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const t = await res.text().catch(() => "")
        throw new Error(`Failed to submit review: ${res.status} ${t}`)
      }
      setForm({ username: "", rating: 5, comment: "" })
      await mutate(reviewsUrl) // revalidate reviews
    } catch (err: any) {
      setSubmitError(err?.message ?? "Unknown error")
    } finally {
      setSubmitting(false)
    }
  }

  if (loadingProduct) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-sm text-slate-600">Loading product…</p>
      </div>
    )
  }
  if (productError || !product) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-sm text-red-600">Failed to load product.</p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Gallery */}
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            {(product.imageBase64?.length ? product.imageBase64 : ["/elegant-perfume-bottle.png", "/fragrance-detail.png"])
              .slice(0, 4)
              .map((src: string, i: number) => (
                <div key={i} className="overflow-hidden rounded-lg border">
                  <img
                    src={src || "/placeholder.svg"}
                    alt={product.name ? `${product.name} image ${i + 1}` : `Image ${i + 1}`}
                    className="h-52 w-full object-cover"
                  />
                </div>
              ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">{product.name}</h1>
          <p className="mt-2 text-sm text-slate-600">{product.description}</p>
          <p className="mt-4 text-xl font-semibold text-slate-900">{formatPrice(product.price)}</p>

          {product.sizes?.length ? (
            <div className="mt-4">
              <h3 className="text-sm font-medium text-slate-900">Available sizes</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <span
                    key={s}
                    className="inline-flex items-center rounded-md border bg-white px-2.5 py-1 text-xs text-slate-700"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ) : null}

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={shareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-md border bg-white px-4 py-2 text-sm font-medium text-slate-800 transition hover:bg-slate-50"
            >
              Share on Twitter
            </a>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <section className="mt-12">
        <h2 className="text-lg font-semibold text-slate-900">Reviews</h2>

        {loadingReviews ? (
          <p className="mt-3 text-sm text-slate-600">Loading reviews…</p>
        ) : reviewsError ? (
          <p className="mt-3 text-sm text-red-600">Failed to load reviews.</p>
        ) : (
          <ul className="mt-4 space-y-3">
            {(reviews ?? []).map((r, idx) => (
              <li key={r.id ?? idx} className="rounded-lg border bg-white p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-slate-900">{r.username}</p>
                  <p className="text-sm text-slate-700" aria-label={`Rating ${r.rating} out of 5`}>
                    {"★".repeat(Math.max(1, Math.min(5, r.rating)))}{" "}
                    <span className="text-slate-500">{"☆".repeat(5 - Math.max(1, Math.min(5, r.rating)))}</span>
                  </p>
                </div>
                <p className="mt-2 text-sm text-slate-700">{r.comment}</p>
              </li>
            ))}
            {(reviews ?? []).length === 0 && (
              <li className="rounded-lg border bg-white p-4 text-sm text-slate-600">No reviews yet.</li>
            )}
          </ul>
        )}

        {/* Review form */}
        <form onSubmit={submitReview} className="mt-8 space-y-4 rounded-lg border bg-white p-4">
          <h3 className="text-base font-semibold text-slate-900">Leave a review</h3>

          {submitError && <p className="text-sm text-red-600">{submitError}</p>}

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-slate-700">Username</label>
              <input
                required
                type="text"
                value={form.username}
                onChange={(e) => setForm((f) => ({ ...f, username: e.target.value }))}
                className="mt-1 w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-fuchsia-600"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700">Rating (1–5)</label>
              <select
                required
                value={form.rating}
                onChange={(e) => setForm((f) => ({ ...f, rating: Number(e.target.value) }))}
                className="mt-1 w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-fuchsia-600"
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700">Comment</label>
            <textarea
              required
              rows={4}
              value={form.comment}
              onChange={(e) => setForm((f) => ({ ...f, comment: e.target.value }))}
              className="mt-1 w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-fuchsia-600"
              placeholder="Share your thoughts about this fragrance…"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center rounded-md bg-fuchsia-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-fuchsia-700 disabled:opacity-60"
            >
              {submitting ? "Submitting…" : "Submit Review"}
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

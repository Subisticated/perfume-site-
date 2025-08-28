"use client"

import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom"
import { Navbar } from "@/components/navbar"
import { Banner } from "@/components/banner"
import { ProductGrid } from "@/components/product-grid"
import ProductDetailClient from "@/app/product/[id]/detail-client"

function HomePage() {
  return (
    <main>
      <Navbar />
      <Banner />
      <ProductGrid />
      <section id="offers" className="mx-auto max-w-6xl px-4 pb-16 pt-4">
        <div className="rounded-lg border bg-white p-6">
          <h3 className="text-base font-semibold text-slate-900">Seasonal Offers</h3>
          <p className="mt-1 text-sm text-slate-600">Explore limited-time discounts on select fragrances.</p>
        </div>
      </section>
    </main>
  )
}

function ProductPage() {
  const { id } = useParams<{ id: string }>()
  return (
    <main>
      <Navbar />
      {id ? <ProductDetailClient id={id} /> : null}
    </main>
  )
}

export default function SpaRouterPage() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

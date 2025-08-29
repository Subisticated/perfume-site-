import { Navbar } from "@/components/navbar"
import ProductDetailClient from "./detail-client"
import { notFound } from "next/navigation"

interface ProductPageProps {
  params: { id: string }
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = params
  if (!id) return notFound()
  return (
    <main>
      <Navbar />
      <ProductDetailClient id={id} />
    </main>
  )
}

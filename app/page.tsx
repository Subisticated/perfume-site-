import { Navbar } from "@/components/navbar";
import { Banner } from "@/components/banner";
import { ProductGrid } from "@/components/product-grid";

export default function Home() {
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
  );
}

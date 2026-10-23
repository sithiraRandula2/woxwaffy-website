import React from "react";
import { ProductCard } from "../components/ProductCard";
import { PRODUCTS, Product } from "../data/products";
export const ProductsPage: React.FC<{
  onSelectProduct: (p: Product) => void;
}> = ({ onSelectProduct }) => (
  <div>
    <section className="py-12 sm:py-16 lg:py-28">
      <div className="page-shell max-w-4xl text-center">
        <p className="eyebrow">The collection</p>
        <h1 className="display-title mt-5">
          Pick your
          <br />
          <em className="text-[#df3038] font-normal">happy place.</em>
        </h1>
        <p className="body-large mt-7 mx-auto max-w-2xl">
          A clean preview of the Woxwaffy range. Confirmed commercial and
          food-label information will replace every placeholder before launch.
        </p>
      </div>
    </section>
    <section className="pb-16 lg:pb-28">
      <div className="page-shell">
        {/* Product and commercial details shown here are preview content pending brand confirmation. */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onSelect={onSelectProduct}
              onInquire={onSelectProduct}
            />
          ))}
        </div>
      </div>
    </section>
  </div>
);

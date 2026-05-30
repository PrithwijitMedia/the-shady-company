import {
  getProducts
} from "@/lib/products";

import ProductCard
from "@/components/site/ProductCard";

export default async function ProductsPage() {

  const products =
    await getProducts();

  return (

    <main
      className="
      max-w-7xl
      mx-auto
      px-8
      py-32
      "
    >

      <h1
        className="
        text-6xl
        mb-16
        "
      >
        Products
      </h1>

      <div
        className="
        grid
        md:grid-cols-3
        gap-8
        "
      >

        {
          products.map(
            (product: any) => (

              <ProductCard
                key={product.id}
                product={product}
              />

            )
          )
        }

      </div>

    </main>

  );
}
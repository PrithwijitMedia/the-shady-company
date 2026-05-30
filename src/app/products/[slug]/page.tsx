import {
  collection,
  getDocs
} from "firebase/firestore";

import {
  notFound
} from "next/navigation";

import { db } from "@/lib/firebase";

import {
  driveToImageUrl
} from "@/lib/images";

import ProductCard
from "@/components/site/ProductCard";

export default async function ProductPage({
  params
}: {
  params: Promise<{
    slug: string;
  }>;
}) {

  const { slug } =
    await params;

  const snapshot =
    await getDocs(
      collection(
        db,
        "products"
      )
    );

  const products =
    snapshot.docs.map(
      doc => ({
        id: doc.id,
        ...doc.data()
      })
    );

  const product =
    products.find(
      (item: any) =>
        item.slug === slug
    );

  if (!product)
    notFound();

  const relatedProducts =
    products
      .filter(
        (item: any) =>
          item.slug !== product.slug &&
          item.collection === product.collection
      )
      .slice(0, 3);

  return (
    <main className="max-w-7xl mx-auto px-8 py-24">
      <div className="grid md:grid-cols-2 gap-16">

        <div>

          {(product.images || [])
            .filter(Boolean)
            .map(
              (
                image: string,
                index: number
              ) => (

                <img
                  key={index}
                  src={driveToImageUrl(image)}
                  alt={product.name}
                  className="rounded-2xl w-full mb-4"
                />

              )
            )}

        </div>

        <div>

          <h1 className="text-5xl mb-4">
            {product.name}
          </h1>

          {product.salePrice > 0 ? (

            <div className="flex gap-4 items-center mb-8">

              <span className="text-3xl">
                ₹{product.salePrice}
              </span>

              <span className="line-through text-neutral-500">
                ₹{product.price}
              </span>

            </div>

          ) : (

            <div className="text-3xl mb-8">
              ₹{product.price}
            </div>

          )}

          <p className="text-neutral-500 mb-8">
            {product.description}
          </p>

          {(product.specifications || []).length > 0 && (

            <>
              <h3 className="text-xl mb-4">
                Specifications
              </h3>

              <ul className="list-disc ml-6 mb-8">

                {product.specifications.map(
                  (
                    item: string,
                    index: number
                  ) => (
                    <li key={index}>
                      {item}
                    </li>
                  )
                )}

              </ul>

            </>

          )}

        </div>

      </div>

      {relatedProducts.length > 0 && (

        <section className="mt-24">

          <h2 className="text-3xl mb-8">
            Related Products
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {relatedProducts.map(
              (item: any) => (

                <ProductCard
                  key={item.id}
                  product={item}
                />

              )
            )}

          </div>

        </section>

      )}

    </main>
  );
}
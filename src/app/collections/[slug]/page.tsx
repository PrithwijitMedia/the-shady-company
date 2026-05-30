import {
  collection,
  getDocs
} from "firebase/firestore";

import {
  notFound
} from "next/navigation";

import { db } from "@/lib/firebase";

import ProductCard
from "@/components/site/ProductCard";

import {
  driveToImageUrl
} from "@/lib/images";

export default async function CollectionPage({
  params
}: {
  params: Promise<{
    slug: string;
  }>;
}) {

  const { slug } =
    await params;

  const collectionsSnapshot =
    await getDocs(
      collection(
        db,
        "collections"
      )
    );

  const collectionItem: any =
    collectionsSnapshot.docs
      .map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      .find(
        (item: any) =>
          item.slug === slug
      );

  if (!collectionItem)
    notFound();

  const productsSnapshot =
    await getDocs(
      collection(
        db,
        "products"
      )
    );

  const products =
    productsSnapshot.docs
      .map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      .filter(
        (product: any) =>
          product.collection === slug &&
          product.active !== false
      );

  return (

    <main
      className="
      max-w-7xl
      mx-auto
      px-8
      py-24
      "
    >

      {collectionItem.coverImage && (

        <img
          src={driveToImageUrl(
            collectionItem.coverImage
          )}
          alt={collectionItem.name}
          className="
          w-full
          h-[500px]
          object-cover
          rounded-2xl
          mb-12
          "
        />

      )}

      <h1
        className="
        text-5xl
        mb-4
        "
      >
        {collectionItem.name}
      </h1>

      <p
        className="
        text-xl
        text-neutral-500
        mb-16
        "
      >
        {collectionItem.description}
      </p>

      {products.length === 0 ? (

        <div
          className="
          border
          rounded-2xl
          p-8
          text-center
          "
        >

          No products available
          in this collection.

        </div>

      ) : (

        <div
          className="
          grid
          md:grid-cols-2
          lg:grid-cols-3
          gap-8
          "
        >

          {products.map(
            (product: any) => (

              <ProductCard
                key={product.id}
                product={product}
              />

            )
          )}

        </div>

      )}

    </main>

  );
}
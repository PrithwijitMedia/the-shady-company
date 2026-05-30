import {
  getCollections
}
from "@/lib/collections";

import CollectionCard
from "@/components/site/CollectionCard";

export default async function CollectionsPage() {

  const collections =
    await getCollections();

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
        Collections
      </h1>

      <div
        className="
        grid
        md:grid-cols-3
        gap-8
        "
      >

        {
          collections.map(
            (
              collection: any
            ) => (

              <CollectionCard
                key={collection.id}
                collection={
                  collection
                }
              />

            )
          )
        }

      </div>

    </main>

  );
}
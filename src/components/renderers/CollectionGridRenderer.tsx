import CollectionCard
from "@/components/site/CollectionCard";

import {
  getDocs,
  collection
} from "firebase/firestore";

import { db }
from "@/lib/firebase";

export default async function CollectionGridRenderer(
  {
    block
  }: any
) {

  const snapshot =
    await getDocs(
      collection(
        db,
        "collections"
      )
    );

  const collections =
    snapshot.docs.map(
      doc => ({
        id: doc.id,
        ...doc.data()
      })
    );

  return (

    <section
      className="
        py-24
      "
    >

      <div
        className="
          max-w-7xl
          mx-auto
          px-8
        "
      >

        <h2
          className="
            text-5xl
            mb-12
          "
        >
          {block.title}
        </h2>

        <div
          className="
            grid
            md:grid-cols-3
            gap-8
          "
        >

          {
            collections.map(
              (collection: any) => (

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

      </div>

    </section>

  );
}
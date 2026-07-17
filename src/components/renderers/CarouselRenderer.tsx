import CollectionCard from "@/components/site/CollectionCard";
import ProductCard from "@/components/site/ProductCard";
import ProjectCard from "@/components/site/ProjectCard";

import {
  collection,
  getDocs,
  query,
  where,
  limit
} from "firebase/firestore";

import { db } from "@/lib/firebase";

export default async function CarouselRenderer({
  block,
}: any) {

  let ref = collection(
    db,
    block.source || "projects"
  );

  let q: any;

  if (block.featuredOnly) {

    q = query(
      ref,
      where(
        "featured",
        "==",
        true
      ),
      limit(
        block.limit || 8
      )
    );

  } else {

    q = query(
      ref,
      limit(
        block.limit || 8
      )
    );

  }

  const snapshot =
    await getDocs(q);

  const items =
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
            mb-4
          "
        >
          {block.title}
        </h2>

        {

          block.subtitle && (

            <p
              className="
                mb-10
                text-neutral-500
              "
            >
              {block.subtitle}
            </p>

          )

        }

        <div
          className="
           relative
      min-h-screen
      flex
      items-end
      h-full
w-full
lg:object-[center_35%]
object-cover
object-center
md:object-center
inset-0
          
          "
        >

          {

            items.map(
              (item: any) => (

                <div
                  key={item.id}
                  className="
                    min-w-[340px]
                    snap-start
                    flex-shrink-0
                  "
                >

                  {

                    block.source ===
                    "projects" && (

                      <ProjectCard
                        project={item}
                      />

                    )

                  }

                  {

                    block.source ===
                    "collections" && (

                      <CollectionCard
                        collection={item}
                      />

                    )

                  }

                  {

                    block.source ===
                    "products" && (

                      <ProductCard
                        product={item}
                      />

                    )

                  }

                </div>

              )

            )

          }

        </div>

      </div>

    </section>

  );

}
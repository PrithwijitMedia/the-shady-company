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
import { getProjects } from "@/lib/projects";
import { getCollections } from "@/lib/collections";
import { getProducts } from "@/lib/products";

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

    /*const items =
        snapshot.docs.map(
            doc => ({
                id: doc.id,
                ...doc.data()
            })
        );
*/
const items =
    block.source === "projects"
        ? await getProjects()
        : block.source === "collections"
        ? await getCollections()
        : await getProducts();
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
                    flex
                    items-end
                    h-full
                    w-full
                    lg:object-[center_35%]
                    object-cover
                    object-center
                    md:object-center
                    inset-0
                    no-scrollbar
             flex
            gap-8
            overflow-x-auto
            snap-x
            snap-mandatory
            pb-4
                    "
                >

                    {

                        items.map(
                            (item: any) => (

                                <div
                                    key={item.id}
                                    className="
                    min-w-[340px]
                     max-w-fit
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
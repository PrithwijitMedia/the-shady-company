import Link from "next/link";
import { driveToImageUrl } from "@/lib/images";

export default function CollectionCard({
  collection
}: any) {

  return (

    <Link
      href={`/collections/${collection.slug}`}
    >

      <div
        className="
        group
        overflow-hidden
        rounded-2xl
        "
      >

        <img
          src={driveToImageUrl(
            collection.coverImage
          )}
          className="
          w-full
          h-[400px]
          object-cover
          transition
          duration-700
          group-hover:scale-105
          "
        />

        <div className="mt-4">

          <h3 className="text-2xl">
            {collection.name}
          </h3>

        </div>

      </div>

    </Link>

  );
}
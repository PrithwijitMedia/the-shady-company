import Link from "next/link";

import {
  driveToImageUrl
} from "@/lib/images";

export default function ProductCard({
  product
}: any) {

  return (

    <Link
      href={`/products/${product.slug}`}
    >

      <div
        className="
        group
        "
      >

        <img
          src={driveToImageUrl(
            product?.images[0]
          )}
          className="
          w-full
          h-[400px]
          object-cover
          rounded-2xl
          group-hover:scale-105
          transition
          duration-700
          "
        />

        <h3
          className="
          mt-4
          text-2xl
          "
        >
          {product?.name}
        </h3>

        <p
          className="
          text-neutral-400
          "
        >
          ₹{product?.price}
        </p>

      </div>

    </Link>

  );
}
import Link from "next/link";

import Reveal from "@/components/luxury/Reveal";
import LuxuryTitle from "@/components/luxury/LuxuryTitle";
import {
  driveToImageUrl
} from "@/lib/images";

interface Props {
  block: any;
}

export default function HeroRenderer({
  block
}: Props) {
  return (
    <section
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
      {block.image && (
        <>
          <div className="absolute inset-0">

            {/* Blurred background */}

            <img
              src={driveToImageUrl(
                block.image
              )}
              alt=""
              className="
              absolute
              inset-0
              w-full
              h-full
              object-cover
              blur-3xl
              scale-110
              opacity-40
              "
            />

            {/* Main image */}

            <img
              src={driveToImageUrl(
                block.image
              )}
              alt={block.title}
              className="
              absolute

              left-1/2
              top-1/2

              -translate-x-1/2
              -translate-y-1/2

              h-[80vh]
              md:h-[90vh]

              w-auto

              object-contain
              "
            />

          </div>

          <div
            className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black
            via-black/50
            to-black/20
            "
          />
        </>
      )}

      <div
        className="
        relative
        z-10
        w-full
        max-w-7xl
        mx-auto

        px-6
        sm:px-8
        md:px-12
        lg:px-20

        pb-20
        md:pb-28
        "
      >
        <Reveal>

          <LuxuryTitle>
            {block.title}
          </LuxuryTitle>

          <p
            className="
            mt-6
            max-w-2xl
            text-base
            md:text-xl
            text-neutral-200
            leading-relaxed
            "
          >
            {block.subtitle}
          </p>

          {block.ctaText && (
            <Link
              href={
                block.ctaLink || "/collections"
              }
              className="
              inline-flex
              mt-10

              px-8
              py-4

              rounded-full

              bg-white
              text-black

              text-sm
              md:text-base

              hover:scale-105

              transition-all
              duration-300
              "
            >
              {block.ctaText}
            </Link>
          )}

        </Reveal>
      </div>
    </section>
  );
}
import Link from "next/link";

import {
  driveToImageUrl
} from "@/lib/images";

export default function ProjectCard({
  project,
  featured = false
}: any) {

  return (

    <Link
      href={`/projects/${project.slug}`}
      className="block group"
    >

      <div>

        <div
          className="
          overflow-hidden
          rounded-[2rem]
          "
        >

          <img
            src={
              driveToImageUrl(
                project.coverImage
              )
            }
            alt={project.title}
            className={`
              w-full

              ${
                featured
                  ? "h-[70vh]"
                  : "h-[450px]"
              }

              object-cover

              transition-transform
              duration-700

              group-hover:scale-105
            `}
          />

        </div>

        <div
          className="
          mt-6
          "
        >

          <p
            className="
            text-neutral-500
            text-sm
            uppercase
            tracking-widest
            "
          >
            {project.location}
          </p>

          <h2
            className="
            mt-2

            text-3xl
            md:text-4xl

            font-light
            "
          >
            {project.title}
          </h2>

          <p
            className="
            mt-3
            text-neutral-400
            line-clamp-2
            "
          >
            {project.description}
          </p>

        </div>

      </div>

    </Link>

  );
}
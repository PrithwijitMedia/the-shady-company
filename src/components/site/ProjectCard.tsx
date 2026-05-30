import Link from "next/link";
import { driveToImageUrl } from "@/lib/images";

export default function ProjectCard({
  project
}: any) {

  return (

    <Link
      href={`/projects/${project.slug}`}
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
            project.coverImage
          )}
          className="
          w-full
          h-[500px]
          object-cover
          transition
          duration-700
          group-hover:scale-105
          "
        />

        <div className="mt-4">

          <h3 className="text-2xl">
            {project.title}
          </h3>

        </div>

      </div>

    </Link>

  );
}
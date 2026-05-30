import {
  collection,
  getDocs
} from "firebase/firestore";

import {
  notFound
} from "next/navigation";

import { db } from "@/lib/firebase";

import {
  driveToImageUrl
} from "@/lib/images";

export default async function ProjectPage({
  params
}: {
  params: Promise<{
    slug: string;
  }>;
}) {

  const { slug } =
    await params;

  const snapshot =
    await getDocs(
      collection(
        db,
        "projects"
      )
    );

  const project: any =
    snapshot.docs
      .map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      .find(
        (item: any) =>
          item.slug === slug
      );

  if (!project)
    notFound();

  return (

    <main>

      {/* Hero */}

      <section
        className="
        relative

        h-screen
        "
      >

        <img
          src={
            driveToImageUrl(
              project.coverImage
            )
          }
          alt={project.title}
          className="
          absolute
          inset-0

          w-full
          h-full

          object-cover
          "
        />

        <div
          className="
          absolute
          inset-0

          bg-black/50
          "
        />

        <div
          className="
          relative
          z-10

          max-w-7xl
          mx-auto

          h-full

          px-8

          flex
          items-end

          pb-20
          "
        >

          <div>

            <p
              className="
              uppercase
              tracking-widest
              text-neutral-300
              "
            >
              {project.location}
            </p>

            <h1
              className="
              text-6xl
              md:text-8xl

              font-light

              mt-4
              "
            >
              {project.title}
            </h1>

          </div>

        </div>

      </section>

      {/* Content */}

      <section
        className="
        max-w-5xl
        mx-auto

        px-8
        py-24
        "
      >

        <div
          className="
          text-xl
          leading-relaxed
          text-neutral-300
          "
        >
          {project.description}
        </div>

      </section>

      {/* Gallery */}

      <section
        className="
        max-w-7xl
        mx-auto

        px-8

        pb-24
        "
      >

        <div
          className="
          grid
          md:grid-cols-2

          gap-8
          "
        >

          {
            project.images?.map(
              (
                image: string,
                index: number
              ) => (

                <img
                  key={index}
                  src={
                    driveToImageUrl(
                      image
                    )
                  }
                  className="
                  w-full

                  rounded-3xl

                  object-cover
                  "
                />

              )
            )
          }

        </div>

      </section>

    </main>

  );
}
import {
  collection,
  getDocs
} from "firebase/firestore";

import { notFound } from "next/navigation";

import { db } from "@/lib/firebase";

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

    <main
      className="
      max-w-5xl
      mx-auto
      px-8
      py-24
      "
    >

      <h1
        className="
        text-5xl
        mb-4
        "
      >
        {project.title}
      </h1>

      <p
        className="
        text-neutral-500
        mb-12
        "
      >
        {project.location}
      </p>

      <div>
        {project.description}
      </div>

    </main>

  );
}
import Link from "next/link";

import {
  collection,
  getDocs
} from "firebase/firestore";

import { db } from "@/lib/firebase";

export default async function ProjectsPage() {

  const snapshot =
    await getDocs(
      collection(
        db,
        "projects"
      )
    );

  const projects =
    snapshot.docs.map(
      doc => ({
        id: doc.id,
        ...doc.data()
      })
    );

  return (

    <main
      className="
      max-w-7xl
      mx-auto
      px-8
      py-24
      "
    >

      <h1
        className="
        text-5xl
        mb-12
        "
      >
        Projects
      </h1>

      <div
        className="
        grid
        md:grid-cols-2
        lg:grid-cols-3
        gap-8
        "
      >

        {
          projects.map(
            (project: any) => (

              <Link
                key={project.id}
                href={`/projects/${project.slug}`}
              >

                <div
                  className="
                  border
                  rounded-xl
                  p-6
                  "
                >

                  <h2>
                    {project.title}
                  </h2>

                  <p>
                    {project.location}
                  </p>

                </div>

              </Link>

            )
          )
        }

      </div>

    </main>

  );
}
import ProjectCard
from "@/components/site/ProjectCard";

import {
  getDocs,
  collection
} from "firebase/firestore";

import { db }
from "@/lib/firebase";

export default async function ProjectGridRenderer(
  {
    block
  }: any
) {

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
            mb-12
          "
        >
          {block.title}
        </h2>

        <div
          className="
            grid
            md:grid-cols-2
            gap-8
          "
        >

          {
            projects.map(
              (project: any) => (

                <ProjectCard
                  key={project.id}
                  project={
                    project
                  }
                />

              )
            )
          }

        </div>

      </div>

    </section>

  );
}
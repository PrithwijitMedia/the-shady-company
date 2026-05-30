import {
  collection,
  getDocs
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import ProjectCard from "@/components/site/ProjectCard";
import LuxuryTitle from "@/components/luxury/LuxuryTitle";

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

const featured =
  projects.find(
    (project: any) =>
      project.featured === true
  );

const rest =
  featured
    ? projects.filter(
        (project: any) =>
          project.id !== featured.id
      )
    : projects;
    
  return (

    <main
      className="
      max-w-7xl
      mx-auto

      px-6
      md:px-10
      lg:px-16

      pt-40
      pb-24
      "
    >

      <LuxuryTitle>
        Projects
      </LuxuryTitle>

      {/* Featured */}

      {
        featured && (

          <div
            className="
            mt-20
            mb-28
            "
          >

            <ProjectCard
              project={featured}
              featured
            />

          </div>

        )
      }

      {/* Remaining */}

      <div
        className="
        grid

        md:grid-cols-2

        gap-16
        "
      >

        {
          rest.map(
            (project: any) => (

              <ProjectCard
                key={project.id}
                project={project}
              />

            )
          )
        }

      </div>

    </main>

  );
}
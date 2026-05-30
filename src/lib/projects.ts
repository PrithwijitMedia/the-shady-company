import {
  collection,
  getDocs
} from "firebase/firestore";

import { db } from "./firebase";

export async function getProjects() {

  const snapshot =
    await getDocs(
      collection(
        db,
        "projects"
      )
    );

  return snapshot.docs.map(
    doc => ({
      id: doc.id,
      ...doc.data()
    })
  );
}

export async function getProjectBySlug(
  slug: string
) {

  const projects =
    await getProjects();

  return projects.find(
    (project: any) =>
      project.slug === slug
  );
}
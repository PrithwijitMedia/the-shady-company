"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import ProtectedRoute from "@/components/ProtectedRoutes";

import {
  collection,
  getDocs
} from "firebase/firestore";

import { db } from "@/lib/firebase";

export default function ProjectsManager() {

  const [projects, setProjects] =
    useState<any[]>([]);

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {

    const snapshot =
      await getDocs(
        collection(
          db,
          "projects"
        )
      );

    setProjects(
      snapshot.docs.map(
        doc => ({
          id: doc.id,
          ...doc.data()
        })
      )
    );
  }

  return (

    <ProtectedRoute>

      <main className="p-8">

        <div className="flex justify-between items-center">

          <h1 className="text-3xl font-bold">
            Projects
          </h1>

          <Link
            href="/admin/projects/new"
            className="border px-4 py-2 rounded"
          >
            Add Project
          </Link>

        </div>

        <div className="mt-8 space-y-4">

          {
            projects.map(
              project => (

                <Link
                  key={project.id}
                  href={`/admin/projects/${project.id}`}
                >

                  <div className="border rounded-xl p-4">

                    <h2>{project.title}</h2>

                  </div>

                </Link>

              )
            )
          }

        </div>

      </main>

    </ProtectedRoute>

  );
}
"use client";

import {
  doc,
  getDoc,
  setDoc
} from "firebase/firestore";

import {
  useEffect,
  useState
} from "react";

import {
  useParams
} from "next/navigation";

import ProtectedRoute
from "@/components/ProtectedRoutes";

import {
  db
} from "@/lib/firebase";

export default function ProjectEditor() {

  const params =
    useParams();

  const id =
    params.id as string;

  const [project, setProject] =
    useState<any>(null);

  useEffect(() => {

    loadProject();

  }, []);

  async function loadProject() {

    if (id === "new") {

      setProject({

        title: "",

        slug: "",

        location: "",

        completedYear:
          new Date()
            .getFullYear(),

        featured: true,

        coverImage: "",

        description: "",

        images: []

      });

      return;
    }

    const snapshot =
      await getDoc(

        doc(
          db,
          "projects",
          id
        )

      );

    setProject({

      id,

      ...snapshot.data()

    });
  }

  async function save() {

    await setDoc(

      doc(
        db,
        "projects",

        id === "new"
          ? project.slug
          : id
      ),

      project

    );

    alert(
      "Project Saved"
    );
  }

  function updateImage(
    index: number,
    value: string
  ) {

    const next =
      [...project.images];

    next[index] =
      value;

    setProject({

      ...project,

      images:
        next

    });
  }

  function addImage() {

    setProject({

      ...project,

      images: [

        ...project.images,

        ""

      ]

    });
  }

  function removeImage(
    index: number
  ) {

    setProject({

      ...project,

      images:

        project.images.filter(
          (
            _: any,
            i: number
          ) => i !== index
        )

    });
  }

  if (!project)
    return null;

  return (

    <ProtectedRoute>

      <main
        className="
        max-w-5xl
        mx-auto
        p-8
        "
      >

        <h1
          className="
          text-3xl
          font-bold
          mb-8
          "
        >
          Project Editor
        </h1>

        <div
          className="
          space-y-4
          "
        >

          <input
            className="
            w-full
            border
            p-3
            "
            placeholder="Title"
            value={project.title}
            onChange={(e) =>
              setProject({

                ...project,

                title:
                  e.target.value

              })
            }
          />

          <input
            className="
            w-full
            border
            p-3
            "
            placeholder="Slug"
            value={project.slug}
            onChange={(e) =>
              setProject({

                ...project,

                slug:
                  e.target.value

              })
            }
          />

          <input
            className="
            w-full
            border
            p-3
            "
            placeholder="Location"
            value={
              project.location
            }
            onChange={(e) =>
              setProject({

                ...project,

                location:
                  e.target.value

              })
            }
          />

          <input
            type="number"
            className="
            w-full
            border
            p-3
            "
            placeholder="Completed Year"
            value={
              project.completedYear
            }
            onChange={(e) =>
              setProject({

                ...project,

                completedYear:
                  Number(
                    e.target.value
                  )

              })
            }
          />

          <input
            className="
            w-full
            border
            p-3
            "
            placeholder="Cover Image URL"
            value={
              project.coverImage
            }
            onChange={(e) =>
              setProject({

                ...project,

                coverImage:
                  e.target.value

              })
            }
          />

          <textarea
            rows={8}
            className="
            w-full
            border
            p-3
            "
            placeholder="Description"
            value={
              project.description
            }
            onChange={(e) =>
              setProject({

                ...project,

                description:
                  e.target.value

              })
            }
          />

          <div
            className="
            border
            rounded-xl
            p-4
            "
          >

            <div
              className="
              flex
              justify-between
              mb-4
              "
            >

              <h2>
                Gallery Images
              </h2>

              <button
                onClick={
                  addImage
                }
                className="
                border
                px-3
                py-1
                "
              >
                Add Image
              </button>

            </div>

            {
              project.images.map(
                (
                  image: string,
                  index: number
                ) => (

                  <div
                    key={index}
                    className="
                    flex
                    gap-2
                    mb-2
                    "
                  >

                    <input
                      className="
                      flex-1
                      border
                      p-2
                      "
                      value={
                        image
                      }
                      onChange={(e) =>
                        updateImage(
                          index,
                          e.target.value
                        )
                      }
                    />

                    <button
                      onClick={() =>
                        removeImage(
                          index
                        )
                      }
                    >
                      Delete
                    </button>

                  </div>

                )
              )
            }

          </div>

          <button
            onClick={save}
            className="
            border
            px-6
            py-3
            rounded
            "
          >
            Save Project
          </button>

        </div>

      </main>

    </ProtectedRoute>

  );
}
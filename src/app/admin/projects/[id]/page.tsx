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

import { db } from "@/lib/firebase";

import {
  driveToImageUrl
} from "@/lib/images";

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

        featured: false,

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

  function addImage() {

    setProject({

      ...project,

      images: [

        ...project.images,

        ""

      ]

    });

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

        space-y-8
        "
      >

        <div
          className="
          flex
          justify-between
          items-center
          "
        >

          <div>

            <h1
              className="
              text-4xl
              font-light
              "
            >
              Project Editor
            </h1>

            <p
              className="
              text-neutral-500
              mt-2
              "
            >
              Manage project details
            </p>

          </div>

          <button
            onClick={save}
            className="
            border

            px-6
            py-3

            rounded-full

            hover:bg-white
            hover:text-black

            transition-all
            "
          >
            Save Project
          </button>

        </div>

        {/* Basic Info */}

        <section
          className="
          border
          rounded-3xl
          p-6

          space-y-4
          "
        >

          <h2
            className="
            text-xl
            "
          >
            Basic Information
          </h2>

          <input
            className="
            w-full
            border
            p-3
            rounded-xl
            "
            placeholder="Title"
            value={project.title}
            onChange={(e) => {

              const title =
                e.target.value;

              setProject({

                ...project,

                title,

                slug:
                  project.slug ||
                  title
                    .toLowerCase()
                    .replaceAll(
                      " ",
                      "-"
                    )

              });

            }}
          />

          <input
            className="
            w-full
            border
            p-3
            rounded-xl
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
            rounded-xl
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
            rounded-xl
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

          <label
            className="
            flex
            items-center
            gap-3
            "
          >

            <input
              type="checkbox"
              checked={
                project.featured
              }
              onChange={(e) =>
                setProject({

                  ...project,

                  featured:
                    e.target.checked

                })
              }
            />

            Featured Project

          </label>

        </section>

        {/* Cover Image */}

        <section
          className="
          border
          rounded-3xl
          p-6

          space-y-4
          "
        >

          <h2
            className="
            text-xl
            "
          >
            Cover Image
          </h2>

          <input
            className="
            w-full
            border
            p-3
            rounded-xl
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

          {
            project.coverImage && (

              <img
                src={
                  driveToImageUrl(
                    project.coverImage
                  )
                }
                alt=""
                className="
                w-full
                h-[300px]

                object-cover

                rounded-2xl
                "
              />

            )
          }

        </section>

        {/* Description */}

        <section
          className="
          border
          rounded-3xl
          p-6
          "
        >

          <h2
            className="
            text-xl
            mb-4
            "
          >
            Description
          </h2>

          <textarea
            rows={10}
            className="
            w-full
            border
            p-3

            rounded-xl
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

        </section>

        {/* Gallery */}

        <section
          className="
          border
          rounded-3xl
          p-6
          "
        >

          <div
            className="
            flex
            justify-between
            items-center

            mb-6
            "
          >

            <h2
              className="
              text-xl
              "
            >
              Gallery Images
            </h2>

            <button
              onClick={
                addImage
              }
              className="
              border

              px-4
              py-2

              rounded-full
              "
            >
              Add Image
            </button>

          </div>

          <div
            className="
            space-y-4
            "
          >

            {
              project.images.map(
                (
                  image: string,
                  index: number
                ) => (

                  <div
                    key={index}
                    className="
                    border
                    rounded-2xl
                    p-4
                    "
                  >

                    <div
                      className="
                      flex
                      gap-2
                      "
                    >

                      <input
                        className="
                        flex-1
                        border
                        p-2
                        rounded-lg
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
                        className="
                        border
                        px-4
                        rounded-lg
                        "
                      >
                        Delete
                      </button>

                    </div>

                    {
                      image && (

                        <img
                          src={
                            driveToImageUrl(
                              image
                            )
                          }
                          alt=""
                          className="
                          mt-4

                          h-40
                          w-full

                          object-cover

                          rounded-xl
                          "
                        />

                      )
                    }

                  </div>

                )
              )
            }

          </div>

        </section>

      </main>

    </ProtectedRoute>

  );
}
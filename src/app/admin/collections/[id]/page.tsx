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

import ProtectedRoute from "@/components/ProtectedRoutes";

import { db } from "@/lib/firebase";

import {
  driveToImageUrl
} from "@/lib/images";

export default function CollectionEditor() {

  const params = useParams();

  const id =
    params.id as string;

  const [item, setItem] =
    useState<any>(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {

    if (id === "new") {

      setItem({

        name: "",
        slug: "",
        description: "",
        coverImage: "",

        featured: true,

        sortOrder: 1

      });

      return;
    }

    const snapshot =
      await getDoc(
        doc(
          db,
          "collections",
          id
        )
      );

    setItem({
      id,
      featured: true,
      sortOrder: 1,
      ...snapshot.data()
    });
  }

  async function save() {

    await setDoc(

      doc(
        db,
        "collections",
        id === "new"
          ? item.slug
          : id
      ),

      item

    );

    alert("Saved");
  }

  if (!item)
    return null;

  return (

    <ProtectedRoute>

      <main className="max-w-4xl mx-auto p-8">

        <h1 className="text-3xl font-bold mb-8">
          Collection Editor
        </h1>

        <div className="space-y-4">

          <input
            className="w-full border p-3"
            value={item.name}
            placeholder="Name"
            onChange={(e) =>
              setItem({
                ...item,
                name: e.target.value
              })
            }
          />

          <input
            className="w-full border p-3"
            value={item.slug}
            placeholder="Slug"
            onChange={(e) =>
              setItem({
                ...item,
                slug: e.target.value
              })
            }
          />

          <textarea
            rows={5}
            className="w-full border p-3"
            value={item.description}
            placeholder="Description"
            onChange={(e) =>
              setItem({
                ...item,
                description: e.target.value
              })
            }
          />

          <input
            className="w-full border p-3"
            value={item.coverImage}
            placeholder="Cover Image URL"
            onChange={(e) =>
              setItem({
                ...item,
                coverImage: e.target.value
              })
            }
          />

          {item.coverImage && (

            <img
              src={
                driveToImageUrl(
                  item.coverImage
                )
              }
              className="w-64 rounded-xl"
            />

          )}

          <label className="flex gap-3">

            <input
              type="checkbox"
              checked={item.featured}
              onChange={(e) =>
                setItem({
                  ...item,
                  featured:
                    e.target.checked
                })
              }
            />

            Featured Collection

          </label>

          <input
            type="number"
            className="w-full border p-3"
            value={item.sortOrder}
            placeholder="Sort Order"
            onChange={(e) =>
              setItem({
                ...item,
                sortOrder:
                  Number(
                    e.target.value
                  )
              })
            }
          />

          <button
            onClick={save}
            className="
            border
            px-6
            py-3
            rounded
            "
          >
            Save Collection
          </button>

        </div>

      </main>

    </ProtectedRoute>

  );
}
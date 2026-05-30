"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import ProtectedRoute from "@/components/ProtectedRoutes";

import {
  collection,
  getDocs
} from "firebase/firestore";

import { db } from "@/lib/firebase";

export default function CollectionsManager() {

  const [collections, setCollections] =
    useState<any[]>([]);

  useEffect(() => {
    loadCollections();
  }, []);

  async function loadCollections() {

    const snapshot =
      await getDocs(
        collection(
          db,
          "collections"
        )
      );

    setCollections(

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
            Collections
          </h1>

          <Link
            href="/admin/collections/new"
            className="border px-4 py-2 rounded"
          >
            Add Collection
          </Link>

        </div>

        <div className="mt-8 space-y-4">

          {
            collections.map(
              (item) => (

                <Link
                  key={item.id}
                  href={`/admin/collections/${item.id}`}
                >

                  <div className="border rounded-xl p-4">

                    <h2>{item.name}</h2>

                    <p>{item.slug}</p>

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
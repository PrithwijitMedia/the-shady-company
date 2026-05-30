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

import ProtectedRoute
from "@/components/ProtectedRoutes";

import {
  db
} from "@/lib/firebase";

export default function SettingsPage() {

  const [site, setSite] =
    useState<any>(null);

  useEffect(() => {

    async function load() {

      const snap =
        await getDoc(
          doc(
            db,
            "settings",
            "site"
          )
        );

      setSite(
        snap.data()
      );

    }

    load();

  }, []);

  async function save() {

    await setDoc(

      doc(
        db,
        "settings",
        "site"
      ),

      site,

      {
        merge: true
      }

    );

    alert("Saved");

  }

  if (!site)
    return null;

  return (

    <ProtectedRoute>

      <main className="max-w-4xl mx-auto p-8">

        <h1 className="text-3xl font-bold mb-8">
          Site Settings
        </h1>

        <div className="space-y-4">

          <input
            className="w-full border p-3"
            value={site.companyName || ""}
            placeholder="Company Name"
            onChange={(e) =>
              setSite({
                ...site,
                companyName:
                  e.target.value
              })
            }
          />

          <input
            className="w-full border p-3"
            value={site.tagline || ""}
            placeholder="Tagline"
            onChange={(e) =>
              setSite({
                ...site,
                tagline:
                  e.target.value
              })
            }
          />

          <input
            className="w-full border p-3"
            value={site.email || ""}
            placeholder="Email"
            onChange={(e) =>
              setSite({
                ...site,
                email:
                  e.target.value
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
            Save
          </button>

        </div>

      </main>

    </ProtectedRoute>

  );
}
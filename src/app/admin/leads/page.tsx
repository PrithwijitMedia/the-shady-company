"use client";

import Link from "next/link";

import {
  collection,
  doc,
  getDocs,
  updateDoc
} from "firebase/firestore";

import {
  useEffect,
  useState
} from "react";

import {
  db
} from "@/lib/firebase";

import ProtectedRoute
  from "@/components/ProtectedRoutes";

export default function LeadsPage() {

  const [leads, setLeads] =
    useState<any[]>([]);

  useEffect(() => {

    load();

  }, []);

  async function load() {

    const snapshot =
      await getDocs(
        collection(
          db,
          "leads"
        )
      );
    const data: any[] =
      snapshot.docs.map(
        doc => ({
          id: doc.id,
          ...doc.data()
        })
      );

    data.sort(
      (
        a,
        b
      ) => {

        const aTime =
          a.createdAt?.seconds ||
          0;

        const bTime =
          b.createdAt?.seconds ||
          0;

        return (
          bTime - aTime
        );

      }
    );

    setLeads(data);

  }

  async function updateStatus(
    leadId: string,
    status: string
  ) {

    await updateDoc(

      doc(
        db,
        "leads",
        leadId
      ),

      {
        status
      }
      

    );

    setLeads(

      leads.map(
        lead =>

          lead.id === leadId

            ? {
              ...lead,
              status
            }

            : lead
      )

    );

  }

  return (

    <ProtectedRoute>

      <main
        className="
        max-w-7xl
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
          Leads
        </h1>

        <div
          className="
          space-y-4
          "
        >

          {leads.map(
            lead => (

              <div
                key={lead.id}
                className="
                border
                rounded-xl
                p-6
                "
              >

                <div
                  className="
                  flex
                  justify-between
                  gap-8
                  "
                >

                  <div>

                    <h2
                      className="
                      text-xl
                      font-semibold
                      "
                    >
                      {lead.name}
                    </h2>

                    <p>
                      {lead.email}
                    </p>

                    <p>
                      {lead.phone}
                    </p>

                    <p className="mt-2">

                      Type:
                      {" "}

                      {
                        lead.type ||
                        "general"
                      }

                    </p>

                    {
                      lead.productSlug && (

                        <p>

                          Product:
                          {" "}

                          {
                            lead.productSlug
                          }

                        </p>

                      )
                    }

                    <div className="mt-4">

                      <Link
                        href={`/admin/leads/${lead.id}`}
                        className="
                        border
                        px-3
                        py-2
                        rounded
                        inline-block
                        "
                      >
                        Open
                      </Link>

                    </div>

                  </div>

                  <div>

                    <select
                      value={
                        lead.status ||
                        "new"
                      }
                      onChange={(
                        e
                      ) =>
                        updateStatus(
                          lead.id,
                          e.target.value
                        )
                      }
                      className="
                      border
                      p-2
                      "
                    >

                      <option value="new">
                        New
                      </option>

                      <option value="contacted">
                        Contacted
                      </option>

                      <option value="quoted">
                        Quoted
                      </option>

                      <option value="won">
                        Won
                      </option>

                      <option value="lost">
                        Lost
                      </option>

                    </select>

                  </div>

                </div>

                <div
                  className="
                  mt-4
                  "
                >
                  {lead.message}
                </div>

              </div>

            )
          )}

        </div>

      </main>

    </ProtectedRoute>

  );
}
"use client";

import {
  doc,
  getDoc,
  updateDoc,
  serverTimestamp
} from "firebase/firestore";

import {
  useEffect,
  useState
} from "react";

import {
  useParams
} from "next/navigation";

import {
  db
} from "@/lib/firebase";

import ProtectedRoute
from "@/components/ProtectedRoutes";

export default function LeadDetailPage() {

  const params =
    useParams();

  const id =
    params.id as string;

  const [lead, setLead] =
    useState<any>(null);

  const [saving, setSaving] =
    useState(false);

  useEffect(() => {

    load();

  }, []);

  async function load() {

    const snapshot =
      await getDoc(
        doc(
          db,
          "leads",
          id
        )
      );

    if (
      snapshot.exists()
    ) {

      setLead({

        id,

        ...snapshot.data()

      });

    }

  }

  async function save() {

    try {

      setSaving(true);

      await updateDoc(

        doc(
          db,
          "leads",
          id
        ),

        {

          status:
            lead.status,

          notes:
            lead.notes || "",

          quoteValue:
            Number(
              lead.quoteValue || 0
            ),

          assignedTo:
            lead.assignedTo || "",

          updatedAt:
            serverTimestamp()

        }

      );

      alert(
        "Lead Updated"
      );

    } finally {

      setSaving(false);

    }

  }

  if (!lead)
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
          Lead Details
        </h1>

        <div
          className="
          grid
          md:grid-cols-2
          gap-8
          "
        >

          <div
            className="
            space-y-4
            "
          >

            <div>

              <strong>
                Name
              </strong>

              <p>
                {lead.name}
              </p>

            </div>

            <div>

              <strong>
                Email
              </strong>

              <p>
                {lead.email}
              </p>

            </div>

            <div>

              <strong>
                Phone
              </strong>

              <p>
                {lead.phone}
              </p>

            </div>

            <div>

              <strong>
                Type
              </strong>

              <p>
                {
                  lead.type ||
                  "general"
                }
              </p>

            </div>

            {
              lead.productSlug && (

                <div>

                  <strong>
                    Product
                  </strong>

                  <p>
                    {
                      lead.productSlug
                    }
                  </p>

                </div>

              )
            }

            <div>

              <strong>
                Message
              </strong>

              <p
                className="
                whitespace-pre-wrap
                "
              >
                {
                  lead.message
                }
              </p>

            </div>

          </div>

          <div
            className="
            space-y-6
            "
          >

            <div>

              <label>

                Status

              </label>

              <select
                value={
                  lead.status ||
                  "new"
                }
                onChange={(e) =>
                  setLead({

                    ...lead,

                    status:
                      e.target.value

                  })
                }
                className="
                w-full
                border
                p-3
                mt-2
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

            <div>

              <label>

                Quote Value

              </label>

              <input
                type="number"
                value={
                  lead.quoteValue || 0
                }
                onChange={(e) =>
                  setLead({

                    ...lead,

                    quoteValue:
                      e.target.value

                  })
                }
                className="
                w-full
                border
                p-3
                mt-2
                "
              />

            </div>

            <div>

              <label>

                Assigned To

              </label>

              <input
                value={
                  lead.assignedTo || ""
                }
                onChange={(e) =>
                  setLead({

                    ...lead,

                    assignedTo:
                      e.target.value

                  })
                }
                className="
                w-full
                border
                p-3
                mt-2
                "
              />

            </div>

            <div>

              <label>

                Internal Notes

              </label>

              <textarea
                rows={8}
                value={
                  lead.notes || ""
                }
                onChange={(e) =>
                  setLead({

                    ...lead,

                    notes:
                      e.target.value

                  })
                }
                className="
                w-full
                border
                p-3
                mt-2
                "
              />

            </div>

            <button
              onClick={save}
              disabled={saving}
              className="
              border
              px-6
              py-3
              rounded
              "
            >

              {
                saving
                  ? "Saving..."
                  : "Save Lead"
              }

            </button>

          </div>

        </div>

      </main>

    </ProtectedRoute>

  );
}
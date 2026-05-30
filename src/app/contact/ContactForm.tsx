"use client";

import {
  addDoc,
  collection,
  serverTimestamp
} from "firebase/firestore";

import {
  useSearchParams
} from "next/navigation";

import {
  useState
} from "react";

import {
  db
} from "@/lib/firebase";

export default function ContactForm() {

  const searchParams =
    useSearchParams();

  const initialProduct =
    searchParams.get(
      "product"
    ) || "";

  const [form, setForm] =
    useState({

      name: "",

      email: "",

      phone: "",

      message: "",

      productSlug:
        initialProduct

    });

  const [sending, setSending] =
    useState(false);

  async function submit() {

    try {

      setSending(true);

      await addDoc(

        collection(
          db,
          "leads"
        ),

        {

          name:
            form.name,

          email:
            form.email,

          phone:
            form.phone,

          message:
            form.message,

          productSlug:
            form.productSlug,

          type:
            form.productSlug
              ? "product"
              : "general",

          status:
            "new",

          quoteValue:
            0,

          notes:
            "",

          assignedTo:
            "",

          createdAt:
            serverTimestamp(),

          updatedAt:
            serverTimestamp()

        }

      );

      alert(
        "Inquiry submitted successfully."
      );

      setForm({

        name: "",

        email: "",

        phone: "",

        message: "",

        productSlug:
          initialProduct

      });

    } catch (err) {

      console.error(err);

      alert(
        "Failed to submit inquiry."
      );

    } finally {

      setSending(false);

    }

  }

  return (

    <main
      className="
      max-w-4xl
      mx-auto
      px-8
      py-24
      "
    >

      <h1
        className="
        text-5xl
        mb-8
        "
      >
        Contact Us
      </h1>

      {
        form.productSlug && (

          <div
            className="
            border
            rounded-xl
            p-4
            mb-8
            "
          >

            Product Inquiry:

            <strong>
              {" "}
              {form.productSlug}
            </strong>

          </div>

        )
      }

      <div
        className="
        space-y-6
        "
      >

        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({

              ...form,

              name:
                e.target.value

            })
          }
          className="
          w-full
          border
          p-4
          "
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({

              ...form,

              email:
                e.target.value

            })
          }
          className="
          w-full
          border
          p-4
          "
        />

        <input
          type="text"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) =>
            setForm({

              ...form,

              phone:
                e.target.value

            })
          }
          className="
          w-full
          border
          p-4
          "
        />

        <textarea
          rows={6}
          placeholder="Message"
          value={form.message}
          onChange={(e) =>
            setForm({

              ...form,

              message:
                e.target.value

            })
          }
          className="
          w-full
          border
          p-4
          "
        />

        <button
          onClick={submit}
          disabled={sending}
          className="
          border
          px-8
          py-4
          rounded-xl
          "
        >

          {
            sending
              ? "Sending..."
              : "Send Inquiry"
          }

        </button>

      </div>

    </main>

  );

}
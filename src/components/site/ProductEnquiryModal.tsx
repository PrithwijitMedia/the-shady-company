"use client";

import {
    addDoc,
    collection,
    serverTimestamp
} from "firebase/firestore";

import {
    useState
} from "react";

import {
    db
} from "@/lib/firebase";

export default function ProductEnquiryModal({
    product
}: {
    product: any;
}) {

    const [open, setOpen] =
        useState(false);

    const [sending, setSending] =
        useState(false);

    const [form, setForm] =
        useState({


            name: "",

            email: "",

            phone: "",

            message: "",

            projectType:
                "Residential"

        });


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

                    projectType:
                        form.projectType,

                    productSlug:
                        product.slug,

                    productName:
                        product.name,

                    type:
                        "product",

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
                "Enquiry submitted successfully."
            );

            setOpen(false);

        } catch (err) {

            console.error(err);

            alert(
                "Failed to submit enquiry."
            );

        } finally {

            setSending(false);

        }


    }

    return (
        <>
            <button
                onClick={() =>
                    setOpen(true)
                }
                className="
mt-8

 
    px-8
    py-4

    rounded-full

    bg-white
    text-black

    hover:scale-105

    transition-all
    duration-300
    "
            >
                Enquire Now
            </button>

            {open && (

                <div
                    className="
      fixed
      inset-0

      z-[100]

      bg-black/70
      backdrop-blur-sm

      flex
      items-center
      justify-center

      p-4
      "
                >

                    <div
                        className="
        w-full
        max-w-xl

        bg-black

        border
        border-white/10

        rounded-3xl

        p-8
        "
                    >

                        <h2 className="text-3xl mb-2">
                            Enquire Now
                        </h2>

                        <p className="text-neutral-500 mb-6">
                            {product.name}
                        </p>

                        <div className="space-y-4">

                            <input
                                className="w-full border p-3 rounded-xl"
                                placeholder="Name"
                                value={form.name}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        name:
                                            e.target.value
                                    })
                                }
                            />

                            <input
                                className="w-full border p-3 rounded-xl"
                                placeholder="Email"
                                value={form.email}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        email:
                                            e.target.value
                                    })
                                }
                            />

                            <input
                                className="w-full border p-3 rounded-xl"
                                placeholder="Phone"
                                value={form.phone}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        phone:
                                            e.target.value
                                    })
                                }
                            />

                            <select
                                className="w-full border p-3 rounded-xl"
                                value={
                                    form.projectType
                                }
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        projectType:
                                            e.target.value
                                    })
                                }
                            >
                                <option>
                                    Residential
                                </option>
                                <option>
                                    Commercial
                                </option>
                                <option>
                                    Hospitality
                                </option>
                                <option>
                                    Architect
                                </option>
                                <option>
                                    Interior Designer
                                </option>
                            </select>

                            <textarea
                                rows={4}
                                className="w-full border p-3 rounded-xl"
                                placeholder="Message"
                                value={form.message}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        message:
                                            e.target.value
                                    })
                                }
                            />

                        </div>

                        <div className="flex gap-4 mt-6">

                            <button
                                onClick={submit}
                                disabled={sending}
                                className="
            px-6
            py-3

            rounded-full

            bg-white
            text-black
            "
                            >
                                Submit
                            </button>

                            <button
                                onClick={() =>
                                    setOpen(false)
                                }
                                className="
            px-6
            py-3

            border

            rounded-full
            "
                            >
                                Cancel
                            </button>

                        </div>

                    </div>

                </div>

            )}
        </>


    );
}

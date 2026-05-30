"use client";

import Link from "next/link";

import ProtectedRoute
from "@/components/ProtectedRoutes";

export default function AdminDashboard() {

  const cards = [

    {
      title: "Pages",
      description:
        "Homepage and CMS Pages",
      href: "/admin/pages"
    },

    {
      title: "Products",
      description:
        "Manage Product Catalogue",
      href: "/admin/products"
    },

    {
      title: "Collections",
      description:
        "Manage Collections",
      href: "/admin/collections"
    },

    {
      title: "Projects",
      description:
        "Manage Portfolio Projects",
      href: "/admin/projects"
    },

    {
      title: "Leads",
      description:
        "Customer Enquiries",
      href: "/admin/leads"
    },

    {
      title: "Settings",
      description:
        "Branding and Navigation",
      href: "/admin/settings"
    }

  ];

  return (

    <ProtectedRoute>

      <main className="max-w-7xl mx-auto p-8">

        <div className="mb-10">

          <h1 className="text-4xl font-bold">
            The Shady Company
          </h1>

          <p className="text-neutral-500">
            CMS Dashboard
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {cards.map(card => (

            <Link
              key={card.href}
              href={card.href}
            >

              <div className="border rounded-2xl p-6 hover:shadow-lg transition">

                <h2 className="text-xl font-semibold mb-2">
                  {card.title}
                </h2>

                <p className="text-neutral-500">
                  {card.description}
                </p>

              </div>

            </Link>

          ))}

        </div>

      </main>

    </ProtectedRoute>

  );
}
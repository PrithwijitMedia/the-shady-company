"use client";

import { useEffect, useState } from "react";

import ProtectedRoute
from "@/components/ProtectedRoutes";
import Link from "next/link";

import { getPages }
from "@/lib/pages";

export default function PagesManager() {

  const [pages, setPages] =
    useState<any[]>([]);

  useEffect(() => {

    getPages()
      .then(setPages);

  }, []);

  return (

    <ProtectedRoute>

      <main className="p-8">

        <h1 className="text-3xl font-bold">

          Pages

        </h1>

        <div className="mt-8 space-y-4">

          {pages.map(page => (

  <Link
    key={page.id}
    href={`/admin/pages/${page.id}`}
  >

    <div className="border rounded-xl p-4">

      <h2>{page.title}</h2>

      <p>{page.slug}</p>

    </div>

  </Link>

))}

        </div>

      </main>

    </ProtectedRoute>

  );
}
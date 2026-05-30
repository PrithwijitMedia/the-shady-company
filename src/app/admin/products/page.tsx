"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import ProtectedRoute from "@/components/ProtectedRoutes";

import {
  collection,
  getDocs
} from "firebase/firestore";

import { db }
from "@/lib/firebase";

export default function ProductsManager() {

  const [products, setProducts] =
    useState<any[]>([]);

  useEffect(() => {

    loadProducts();

  }, []);

  async function loadProducts() {

    const snapshot =
      await getDocs(
        collection(
          db,
          "products"
        )
      );

    setProducts(

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

        <div
          className="
          flex
          justify-between
          items-center
          "
        >

          <h1
            className="
            text-3xl
            font-bold
            "
          >
            Products
          </h1>

          <Link
            href="/admin/products/new"
            className="
            border
            px-4
            py-2
            rounded
            "
          >
            Add Product
          </Link>

        </div>

        <div
          className="
          mt-8
          space-y-4
          "
        >

          {
            products.map(
              product => (

                <Link
                  key={product.id}
                  href={
                    `/admin/products/${product.id}`
                  }
                >

                  <div
                    className="
                    border
                    rounded-xl
                    p-4
                    "
                  >

                    <h2>
                      {product.name}
                    </h2>

                    <p>
                      ₹{product.price}
                    </p>

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
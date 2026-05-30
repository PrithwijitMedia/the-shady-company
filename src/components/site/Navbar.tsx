"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
  getNavigationSettings,
  getSiteSettings
} from "@/lib/settings";

export default function Navbar() {

  const [mounted, setMounted] =
    useState(false);

  const [items, setItems] =
    useState<any[]>([]);

  const [site, setSite] =
    useState<any>(null);

  useEffect(() => {

    async function load() {

      try {

        const nav =
          await getNavigationSettings();

        const siteData =
          await getSiteSettings();

        setItems(
          nav?.items || []
        );

        setSite(
          siteData
        );

      } catch (err) {

        console.error(err);

      } finally {

        setMounted(true);

      }

    }

    load();

  }, []);

  if (!mounted) {
    return null;
  }

  return (

    <header
      className="
      fixed
      top-0
      left-0
      right-0
      z-50
      backdrop-blur-xl
      bg-black/30
      border-b
      border-white/10
      "
    >

      <div
        className="
        max-w-7xl
        mx-auto
        px-8
        h-20
        flex
        justify-between
        items-center
        "
      >

        <Link
          href="/"
          className="
          text-xl
          font-semibold
          "
        >
          {
            site?.companyName ||
            "The Shady Company"
          }
        </Link>

        <nav
          className="
          flex
          gap-8
          "
        >

          {
            items.map(
              (
                item: any,
                index: number
              ) => (

                <Link
                  key={index}
                  href={item.href}
                >
                  {item.label}
                </Link>

              )
            )
          }

        </nav>

      </div>

    </header>

  );
}
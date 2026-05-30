"use client";

import Link from "next/link";

import {
  useEffect,
  useState,
} from "react";

import {
  getNavigationSettings,
  getSiteSettings,
} from "@/lib/settings";

import FloatingLogo from "@/components/site/FloatingLogo";
import {
  driveToImageUrl
} from "@/lib/images";

export default function Navbar() {
  const [mounted, setMounted] =
    useState(false);

  const [menuOpen, setMenuOpen] =
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

        setSite(siteData);
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
    <>
      <header
        className="
        fixed
        top-0
        left-0
        right-0
        z-50
        "
      >
        <div
          className="
          max-w-7xl
          mx-auto
          px-4
          md:px-8
          pt-4
          "
        >
          <div
            className="
            h-16
            rounded-full
            border
            border-white/10
            bg-black/60
            backdrop-blur-xl
            px-6

            flex
            items-center
            justify-between
            relative

            h-16
            md:h-20

            rounded-full

            border
            border-white/10

            bg-black/50
            backdrop-blur-xl

            px-8
            md:px-10

            flex
            items-center
            "
          >
            {/* Logo */}

            <FloatingLogo logoUrl={site?.logoUrl}/>

            {/* Desktop Nav */}
            <div
            className=" ml-auto flex justify-end">
              <nav
                className="
              hidden
              md:flex
              items-center
              gap-8
              text-sm
              "
              >
                {items.map(
                  (
                    item,
                    index
                  ) => (
                    <Link
                      key={index}
                      href={
                        item.href
                      }
                      className="
                    text-neutral-300
                    hover:text-white
                    transition-colors
                    "
                    >
                      {item.label}
                    </Link>
                  )
                )}
              </nav>

              {/* Mobile Button */}

              <button
                onClick={() =>
                  setMenuOpen(
                    !menuOpen
                  )
                }
                className="
              md:hidden
              text-2xl
              "
              >
                {menuOpen
                  ? "✕"
                  : "☰"}
              </button>
            </div>


          </div>
        </div>
      </header>

      {/* Mobile Drawer */}

      <div
        className={`
        fixed
        inset-0
        z-40
        md:hidden

        transition-all
        duration-300

        ${menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
          }
        `}
      >
        <div
          onClick={() =>
            setMenuOpen(false)
          }
          className="
          absolute
          inset-0
          bg-black/70
          backdrop-blur-sm
          "
        />

        <div
          className={`
          absolute
          right-0
          top-0

          h-full
          w-[280px]

          bg-black
          border-l
          border-white/10

          p-8

          transition-transform
          duration-300

          ${menuOpen
              ? "translate-x-0"
              : "translate-x-full"
            }
          `}
        >
          <div
            className="
            mt-16
            flex
            flex-col
            gap-6
            "
          >
            {items.map(
              (
                item,
                index
              ) => (
                <Link
                  key={index}
                  href={
                    item.href
                  }
                  onClick={() =>
                    setMenuOpen(
                      false
                    )
                  }
                  className="
                  text-lg
                  text-neutral-300
                  hover:text-white
                  "
                >
                  {item.label}
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
}
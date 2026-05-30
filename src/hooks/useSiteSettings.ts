"use client";

import {
  useEffect,
  useState
} from "react";

import {
  getSiteSettings
} from "@/lib/settings";

export function useSiteSettings() {

  const [site, setSite] =
    useState<any>(null);

  useEffect(() => {

    async function load() {

      const data =
        await getSiteSettings();

      setSite(data);
    }

    load();

  }, []);

  return site;
}
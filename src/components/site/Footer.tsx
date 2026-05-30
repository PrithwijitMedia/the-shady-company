"use client";

import {
  useEffect,
  useState
} from "react";

import {
  getFooterSettings,
  getSiteSettings
} from "@/lib/settings";

export default function Footer() {

  const [mounted, setMounted] =
    useState(false);

  const [footer, setFooter] =
    useState<any>(null);

  const [site, setSite] =
    useState<any>(null);

  useEffect(() => {

    async function load() {

      const footerData =
        await getFooterSettings();

      const siteData =
        await getSiteSettings();

      setFooter(footerData);
      setSite(siteData);

      setMounted(true);
    }

    load();

  }, []);

  if (!mounted) {
    return null;
  }

  return (

    <footer className="border-t border-white/10 mt-32">

      <div className="max-w-7xl mx-auto px-8 py-16">

        <div className="flex flex-col md:flex-row justify-between gap-8">

          <div>

            <h3 className="text-2xl mb-3">
              {site?.companyName}
            </h3>

            <p className="text-neutral-400">
              {site?.tagline}
            </p>

          </div>

          <div className="flex gap-6">
{site.instagram && (
  <a href={site.instagram}>
    Instagram
  </a>
)}

{site.whatsapp && (
  <a href={site.whatsapp}>
    WhatsApp
  </a>
)}
            {/*footer?.links?.map(
              (
                link: any,
                index: number
              ) => (

                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                >
                  {link.label}
                </a>

              )
            )*/}

          </div>

        </div>

        <div className="mt-12 text-sm text-neutral-500">
          {footer?.copyright}
        </div>

      </div>

    </footer>

  );
}
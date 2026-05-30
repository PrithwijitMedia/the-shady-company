import {
  getPageById
} from "@/lib/pages";

import PageRenderer
from "@/components/renderers/PageRenderer";

export default async function AboutPage() {

  const page =
    await getPageById(
      "about"
    );

  if (!page) {

    return (

      <main className="max-w-6xl mx-auto px-8 py-24">

        <h1 className="text-5xl mb-4">
          About
        </h1>

        <p>
          About page not found.
        </p>

      </main>

    );

  }

  return (
    <PageRenderer page={page} />
  );
}
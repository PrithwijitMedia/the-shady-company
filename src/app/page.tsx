import { getPageById }
from "@/lib/pages";

import BlockRenderer
from "@/components/renderers/BlockRenderer";

export default async function HomePage() {

  const page: any =
    await getPageById("home");

  if (!page)
    return null;

  return (

    <main>

      {page.blocks?.map(
        (
          block: any,
          index: number
        ) => (

          <BlockRenderer
            key={index}
            block={block}
          />

        )
      )}

    </main>

  );
}
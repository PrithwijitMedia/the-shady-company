import HeroRenderer from "./HeroRenderer";
import TextRenderer from "./TextRenderer";
import GalleryRenderer from "./GalleryRenderer";
import SplitRenderer from "./SplitRenderer";
import QuoteRenderer from "./QuoteRenderer";
import CTARenderer from "./CTARenderer";
import CollectionGridRenderer from "./CollectionGridRenderer";
import ProjectGridRenderer from "./ProjectGridRenderer";

export default function PageRenderer({
  page
}: {
  page: any;
}) {

  if (!page?.blocks) {
    return null;
  }

  return (

    <main>

      {page.blocks.map(
        (
          block: any,
          index: number
        ) => {

          switch (
            block.type
          ) {

            case "hero":

              return (
                <HeroRenderer
                  key={block.id || index}
                  block={block}
                />
              );

            case "text":

              return (
                <TextRenderer
                  key={block.id || index}
                  block={block}
                />
              );

            case "gallery":

              return (
                <GalleryRenderer
                  key={block.id || index}
                  block={block}
                />
              );

            case "split":

              return (
                <SplitRenderer
                  key={block.id || index}
                  block={block}
                />
              );

            case "quote":

              return (
                <QuoteRenderer
                  key={block.id || index}
                  block={block}
                />
              );

            case "cta":

              return (
                <CTARenderer
                  key={block.id || index}
                  block={block}
                />
              );

            case "collectionGrid":

              return (
                <CollectionGridRenderer
                  key={block.id || index}
                  block={block}
                />
              );

            case "projectGrid":

              return (
                <ProjectGridRenderer
                  key={block.id || index}
                  block={block}
                />
              );

            default:

              console.warn(
                "Unknown block type:",
                block.type
              );

              return null;

          }

        }
      )}

    </main>

  );
}
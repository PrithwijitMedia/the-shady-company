import HeroRenderer from "./HeroRenderer";
import TextRenderer from "./TextRenderer";
import GalleryRenderer from "./GalleryRenderer";
import CTARenderer from "./CTARenderer";

import SplitRenderer from "./SplitRenderer";
import QuoteRenderer from "./QuoteRenderer";
import CollectionGridRenderer from "./CollectionGridRenderer";
import ProjectGridRenderer from "./ProjectGridRenderer";

export default function BlockRenderer({
  block
}: any) {

  switch (block.type) {

    case "hero":
      return <HeroRenderer block={block} />;

    case "text":
      return <TextRenderer block={block} />;

    case "gallery":
      return <GalleryRenderer block={block} />;

    case "cta":
      return <CTARenderer block={block} />;

    case "split":
      return <SplitRenderer block={block} />;

    case "quote":
      return <QuoteRenderer block={block} />;

    case "collectionGrid":
      return (
        <CollectionGridRenderer
          block={block}
        />
      );

    case "projectGrid":
      return (
        <ProjectGridRenderer
          block={block}
        />
      );

    default:
      return null;
  }
}
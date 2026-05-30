export interface HeroBlock {
  id: string;
  type: "hero";

  title: string;
  subtitle: string;

  backgroundImage?: string;
}

export interface TextBlock {
  id: string;
  type: "text";

  content: string;
}

export interface GalleryBlock {
  id: string;
  type: "gallery";

  title: string;

  images: {
    url: string;
    width: number;
    height: number;
  }[];
}

export interface CTABlock {
  id: string;
  type: "cta";

  title: string;

  buttonText: string;

  buttonLink: string;
}

export interface QuoteBlock {
  id: string;
  type: "quote";

  quote: string;

  author?: string;
}

export interface SplitBlock {
  id: string;
  type: "split";

  title: string;

  content: string;

  image: string;

  imageLeft: boolean;
}

export interface CollectionGridBlock {
  id: string;
  type: "collectionGrid";

  title: string;
}

export interface ProjectGridBlock {
  id: string;
  type: "projectGrid";

  title: string;
}

export type Block =
  | HeroBlock
  | TextBlock
  | GalleryBlock
  | CTABlock
  | QuoteBlock
  | SplitBlock
  | CollectionGridBlock
  | ProjectGridBlock;
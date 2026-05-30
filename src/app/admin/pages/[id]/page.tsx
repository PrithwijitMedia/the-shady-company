"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import {
    getPageById,
    updatePage
} from "@/lib/pages";

import HeroBlockEditor from "@/components/blocks/HeroBlockEditor";
import TextBlockEditor from "@/components/blocks/TextBlockEditor";
import GalleryBlockEditor from "@/components/blocks/GalleryBlockEditor";
import CTABlockEditor from "@/components/blocks/CTABlockEditor";
import SplitBlockEditor from "@/components/blocks/SplitBlockEditor";
import QuoteBlockEditor from "@/components/blocks/QuoteBlockEditor";
import CollectionGridBlockEditor from "@/components/blocks/CollectionGridBlockEditor";
import ProjectGridBlockEditor from "@/components/blocks/ProjectGridBlockEditor";

export default function PageEditor() {

    const params = useParams();

    const [page, setPage] = useState<any>(null);

    const [blocks, setBlocks] =
        useState<any[]>([]);
    const [
        showAddBlock,
        setShowAddBlock
    ] = useState(false);

    useEffect(() => {

        async function loadPage() {

            const data: any =
                await getPageById(
                    params.id as string
                );

            if (!data) return;

            setPage(data);

            setBlocks(
                data.blocks || []
            );
        }

        loadPage();

    }, [params.id]);

    function deleteBlock(
        index: number
    ) {

        setBlocks(
            blocks.filter(
                (_, i) => i !== index
            )
        );
    }

    function moveBlockUp(
        index: number
    ) {

        if (index === 0) return;

        const next = [...blocks];

        [
            next[index - 1],
            next[index]
        ] = [
                next[index],
                next[index - 1]
            ];

        setBlocks(next);
    }

    function moveBlockDown(
        index: number
    ) {

        if (
            index === blocks.length - 1
        ) return;

        const next = [...blocks];

        [
            next[index],
            next[index + 1]
        ] = [
                next[index + 1],
                next[index]
            ];

        setBlocks(next);
    }
    function addBlock(type: string) {

        if (type === "hero") {

            setBlocks([
                ...blocks,
                {
                    id: crypto.randomUUID(),
                    type: "hero",
                    title: "New Hero",
                    subtitle: ""
                }
            ]);

        }

        if (type === "text") {

            setBlocks([
                ...blocks,
                {
                    id: crypto.randomUUID(),
                    type: "text",
                    content: ""
                }
            ]);

        }

        if (type === "gallery") {

            setBlocks([
                ...blocks,
                {
                    id: crypto.randomUUID(),
                    type: "gallery",
                    title: "Gallery",
                    images: []
                }
            ]);

        }

        if (type === "cta") {

            setBlocks([
                ...blocks,
                {
                    id: crypto.randomUUID(),
                    type: "cta",
                    title: "Call To Action",
                    buttonText: "Contact Us",
                    buttonLink: "/contact"
                }
            ]);

        }
    }
    function addSplitBlock() {

  setBlocks([
    ...blocks,
    {
      id:
        crypto.randomUUID(),

      type:
        "split",

      title:
        "New Split Block",

      content:
        "",

      image:
        "",

      imageLeft:
        true
    }
  ]);

  setShowAddBlock(false);
}
function addQuoteBlock() {

  setBlocks([
    ...blocks,
    {
      id:
        crypto.randomUUID(),

      type:
        "quote",

      quote:
        "",

      author:
        ""
    }
  ]);

  setShowAddBlock(false);
}
function addProjectGridBlock() {

  setBlocks([
    ...blocks,
    {
      id:
        crypto.randomUUID(),

      type:
        "projectGrid",

      title:
        "Projects"
    }
  ]);

  setShowAddBlock(false);
}
function addCollectionGridBlock() {

  setBlocks([
    ...blocks,
    {
      id:
        crypto.randomUUID(),

      type:
        "collectionGrid",

      title:
        "Collections"
    }
  ]);

  setShowAddBlock(false);
}
    function addTextBlock() {

        setBlocks([
            ...blocks,
            {
                id: crypto.randomUUID(),
                type: "text",
                content: "New text block"
            }
        ]);

        setShowAddBlock(false);
    }
    function addHeroBlock() {

        setBlocks([
            ...blocks,
            {
                id: crypto.randomUUID(),
                type: "hero",
                title: "New Hero Title",
                subtitle: "New Hero Subtitle"
            }
        ]);

        setShowAddBlock(false);
    }
    async function savePage() {

        if (!page) return;

        await updatePage(
            page.id,
            {
                blocks
            }
        );

        alert("Page saved");
    }

    if (!page) {

        return (
            <div className="p-8">
                Loading...
            </div>
        );
    }

    return (

        <main className="p-8">

            <div className="flex justify-between items-center">

                <div>

                    <h1 className="text-3xl font-bold">
                        {page.title}
                    </h1>

                    <p className="text-gray-500">
                        {page.slug}
                    </p>

                </div>

                <button
                    onClick={savePage}
                    className="border px-4 py-2 rounded"
                >
                    Save
                </button>

            </div>

            <div className="mt-8">

                <h2 className="text-xl font-bold mb-4">
                    Blocks
                </h2>

                <div className="space-y-4">

                    {blocks.map(
                        (
                            block,
                            index
                        ) => {

                            if (
                                block.type === "hero"
                            ) {

                                return (

                                    <HeroBlockEditor
                                        key={index}
                                        block={block}
                                        onChange={(updated) => {

                                            const next =
                                                [...blocks];

                                            next[index] =
                                                updated;

                                            setBlocks(next);
                                        }}
                                        onDelete={() =>
                                            deleteBlock(index)
                                        }
                                        onMoveUp={() =>
                                            moveBlockUp(index)
                                        }
                                        onMoveDown={() =>
                                            moveBlockDown(index)
                                        }
                                    />

                                );
                            }
                            if (
                                block.type === "text"
                            ) {

                                return (

                                    <TextBlockEditor
                                        key={index}
                                        block={block}
                                        onChange={(updated) => {

                                            const next =
                                                [...blocks];

                                            next[index] =
                                                updated;

                                            setBlocks(next);
                                        }}
                                        onDelete={() =>
                                            deleteBlock(index)
                                        }
                                        onMoveUp={() =>
                                            moveBlockUp(index)
                                        }
                                        onMoveDown={() =>
                                            moveBlockDown(index)
                                        }
                                    />

                                );
                            }
                            if (
                                block.type === "gallery"
                            ) {

                                return (
                                    <GalleryBlockEditor
                                        key={index}
                                        block={block}
                                        onChange={(updated) => {

                                            const next =
                                                [...blocks];

                                            next[index] =
                                                updated;

                                            setBlocks(next);
                                        }}
                                        onDelete={() =>
                                            deleteBlock(index)
                                        }
                                        onMoveUp={() =>
                                            moveBlockUp(index)
                                        }
                                        onMoveDown={() =>
                                            moveBlockDown(index)
                                        }
                                    />
                                );
                            }
                            if (
                                block.type === "cta"
                            ) {

                                return (
                                    <CTABlockEditor
                                        key={index}
                                        block={block}
                                        onChange={(updated) => {

                                            const next =
                                                [...blocks];

                                            next[index] =
                                                updated;

                                            setBlocks(next);
                                        }}
                                        onDelete={() =>
                                            deleteBlock(index)
                                        }
                                        onMoveUp={() =>
                                            moveBlockUp(index)
                                        }
                                        onMoveDown={() =>
                                            moveBlockDown(index)
                                        }
                                    />
                                );
                            }
                            if (
  block.type === "split"
) {

  return (

    <SplitBlockEditor
      key={index}
      block={block}

      onChange={(updated) => {

        const next =
          [...blocks];

        next[index] =
          updated;

        setBlocks(next);
      }}

      onDelete={() =>
        deleteBlock(index)
      }

      onMoveUp={() =>
        moveBlockUp(index)
      }

      onMoveDown={() =>
        moveBlockDown(index)
      }
    />

  );
}
if (
  block.type === "quote"
) {

  return (

    <QuoteBlockEditor
      key={index}
      block={block}

      onChange={(updated) => {

        const next =
          [...blocks];

        next[index] =
          updated;

        setBlocks(next);
      }}

      onDelete={() =>
        deleteBlock(index)
      }

      onMoveUp={() =>
        moveBlockUp(index)
      }

      onMoveDown={() =>
        moveBlockDown(index)
      }
    />

  );
}
if (
  block.type === "collectionGrid"
) {

  return (

    <CollectionGridBlockEditor
      key={index}
      block={block}

      onDelete={() =>
        deleteBlock(index)
      }

      onMoveUp={() =>
        moveBlockUp(index)
      }

      onMoveDown={() =>
        moveBlockDown(index)
      }
    />

  );
}
if (
  block.type === "projectGrid"
) {

  return (

    <ProjectGridBlockEditor
      key={index}
      block={block}

      onDelete={() =>
        deleteBlock(index)
      }

      onMoveUp={() =>
        moveBlockUp(index)
      }

      onMoveDown={() =>
        moveBlockDown(index)
      }
    />

  );
}
                            return (

                                <div
                                    key={index}
                                    className="border rounded-xl p-4"
                                >

                                    Unknown block type:
                                    {" "}
                                    {block.type}

                                </div>

                            );
                        }
                    )}

                </div>

                <button
                    onClick={() =>
                        setShowAddBlock(true)
                    }
                    className="mt-6 border px-4 py-2 rounded"
                >
                    Add Block
                </button>
                {
                    showAddBlock && (

                        <div className="mt-6 border rounded-xl p-6">

                            <h3 className="text-xl font-bold mb-4">
                                Select Block Type
                            </h3>

                            <div className="flex flex-wrap gap-3">

                                <button
                                    className="border rounded px-4 py-2 bg-black text-white"
                                    onClick={() => addBlock("hero")}
                                >
                                    Hero
                                </button>

                                <button
                                    className="border rounded px-4 py-2 bg-black text-white"
                                    onClick={() => addBlock("text")}
                                >
                                    Text
                                </button>

                                <button
                                    className="border rounded px-4 py-2 bg-black text-white"
                                    onClick={() => addBlock("gallery")}
                                >
                                    Gallery
                                </button>

                                <button
                                    className="border rounded px-4 py-2 bg-black text-white"
                                    onClick={() => addBlock("cta")}
                                >
                                    CTA
                                </button>
<button
  onClick={addSplitBlock}
>
  Split
</button>

<button
  onClick={addQuoteBlock}
>
  Quote
</button>

<button
  onClick={addCollectionGridBlock}
>
  Collections
</button>

<button
  onClick={addProjectGridBlock}
>
  Projects
</button>
                            </div>

                        </div>

                    )
                }
            </div>

        </main>

    );
}
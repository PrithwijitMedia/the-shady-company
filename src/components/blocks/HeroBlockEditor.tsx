"use client";

interface Props {
  block: any;

  onChange: (
    updated: any
  ) => void;

  onDelete: () => void;

  onMoveUp: () => void;

  onMoveDown: () => void;
}

export default function HeroBlockEditor({
  block,
  onChange,
  onDelete,
  onMoveUp,
  onMoveDown
}: Props) {
  return (
    <div className="border rounded-xl p-4">

      <div className="flex gap-2 mb-4">

        <button
          onClick={onMoveUp}
          className="border px-3 py-1 rounded"
        >
          ↑
        </button>

        <button
          onClick={onMoveDown}
          className="border px-3 py-1 rounded"
        >
          ↓
        </button>

        <button
          onClick={onDelete}
          className="border px-3 py-1 rounded"
        >
          Delete
        </button>

      </div>

      <h3 className="font-bold mb-4">
        Hero Block
      </h3>

      <div className="space-y-4">

        <input
          className="w-full border p-2 rounded"
          value={block.title || ""}
          placeholder="Title"
          onChange={(e) =>
            onChange({
              ...block,
              title: e.target.value
            })
          }
        />

        <textarea
          className="w-full border p-2 rounded min-h-[120px]"
          value={block.subtitle || ""}
          placeholder="Subtitle"
          onChange={(e) =>
            onChange({
              ...block,
              subtitle: e.target.value
            })
          }
        />

        <input
          className="w-full border p-2 rounded"
          value={block.image || ""}
          placeholder="Hero Image URL"
          onChange={(e) =>
            onChange({
              ...block,
              image: e.target.value
            })
          }
        />

        <input
          className="w-full border p-2 rounded"
          value={block.ctaText || ""}
          placeholder="CTA Button Text"
          onChange={(e) =>
            onChange({
              ...block,
              ctaText: e.target.value
            })
          }
        />

        <input
          className="w-full border p-2 rounded"
          value={block.ctaLink || ""}
          placeholder="CTA Link"
          onChange={(e) =>
            onChange({
              ...block,
              ctaLink: e.target.value
            })
          }
        />

      </div>
    </div>
  );
}
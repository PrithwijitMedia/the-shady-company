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
          onChange={(e) =>
            onChange({
              ...block,
              title: e.target.value
            })
          }
          placeholder="Title"
        />

        <input
          className="w-full border p-2 rounded"
          value={block.subtitle || ""}
          onChange={(e) =>
            onChange({
              ...block,
              subtitle: e.target.value
            })
          }
          placeholder="Subtitle"
        />

      </div>

    </div>
  );
}
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

export default function TextBlockEditor({
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
        Text Block
      </h3>

      <textarea
        className="w-full border p-2 rounded"
        rows={5}
        value={block.content || ""}
        onChange={(e) =>
          onChange({
            ...block,
            content: e.target.value
          })
        }
      />

    </div>
  );
}
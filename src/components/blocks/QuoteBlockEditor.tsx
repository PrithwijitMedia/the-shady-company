"use client";

interface Props {
  block: any;
  onChange: (updated: any) => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}

export default function QuoteBlockEditor({
  block,
  onChange,
  onDelete,
  onMoveUp,
  onMoveDown
}: Props) {

  return (

    <div className="border rounded-xl p-4">

      <div className="flex gap-2 mb-4">

        <button onClick={onMoveUp}>
          ↑
        </button>

        <button onClick={onMoveDown}>
          ↓
        </button>

        <button onClick={onDelete}>
          Delete
        </button>

      </div>

      <h3 className="font-bold mb-4">
        Quote Block
      </h3>

      <textarea
        className="w-full border p-2 mb-4"
        rows={4}
        value={block.quote || ""}
        onChange={(e) =>
          onChange({
            ...block,
            quote: e.target.value
          })
        }
      />

      <input
        className="w-full border p-2"
        value={block.author || ""}
        placeholder="Author"
        onChange={(e) =>
          onChange({
            ...block,
            author: e.target.value
          })
        }
      />

    </div>

  );
}
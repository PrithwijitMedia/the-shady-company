"use client";

interface Props {
  block: any;
  onChange: (updated: any) => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}

export default function SplitBlockEditor({
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
        Split Block
      </h3>

      <input
        className="w-full border p-2 mb-4"
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
        className="w-full border p-2 mb-4"
        rows={5}
        value={block.content || ""}
        placeholder="Content"
        onChange={(e) =>
          onChange({
            ...block,
            content: e.target.value
          })
        }
      />

      <input
        className="w-full border p-2 mb-4"
        value={block.image || ""}
        placeholder="Drive URL"
        onChange={(e) =>
          onChange({
            ...block,
            image: e.target.value
          })
        }
      />

      <label className="flex gap-2">

        <input
          type="checkbox"
          checked={
            block.imageLeft
          }
          onChange={(e) =>
            onChange({
              ...block,
              imageLeft:
                e.target.checked
            })
          }
        />

        Image Left

      </label>

    </div>

  );
}
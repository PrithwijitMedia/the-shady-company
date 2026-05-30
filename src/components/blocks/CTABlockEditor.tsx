"use client";

interface Props {
  block: any;
  onChange: (updated: any) => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}

export default function CTABlockEditor({
  block,
  onChange,
  onDelete,
  onMoveUp,
  onMoveDown
}: Props) {

  return (

    <div className="border rounded-xl p-4">

      <div className="flex gap-2 mb-4">

        <button onClick={onMoveUp}>↑</button>

        <button onClick={onMoveDown}>↓</button>

        <button onClick={onDelete}>
          Delete
        </button>

      </div>

      <h3 className="font-bold">
        CTA Block
      </h3>

      <input
        className="w-full border p-2 mt-2"
        value={block.title || ""}
        placeholder="Title"
        onChange={(e) =>
          onChange({
            ...block,
            title: e.target.value
          })
        }
      />

      <input
        className="w-full border p-2 mt-2"
        value={block.buttonText || ""}
        placeholder="Button Text"
        onChange={(e) =>
          onChange({
            ...block,
            buttonText:
              e.target.value
          })
        }
      />

      <input
        className="w-full border p-2 mt-2"
        value={block.buttonLink || ""}
        placeholder="Button Link"
        onChange={(e) =>
          onChange({
            ...block,
            buttonLink:
              e.target.value
          })
        }
      />

    </div>
  );
}
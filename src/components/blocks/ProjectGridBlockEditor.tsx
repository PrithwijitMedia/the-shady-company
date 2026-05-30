"use client";

export default function ProjectGridBlockEditor({
  onDelete,
  onMoveUp,
  onMoveDown
}: any) {

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

      <h3 className="font-bold">
        Project Grid
      </h3>

      <p className="text-neutral-500 mt-2">
        Automatically loads featured projects.
      </p>

    </div>

  );
}
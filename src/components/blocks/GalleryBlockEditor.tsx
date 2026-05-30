"use client";

import { driveToImageUrl } from "@/lib/images";

interface Props {
  block: any;
  onChange: (updated: any) => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}

export default function GalleryBlockEditor({
  block,
  onChange,
  onDelete,
  onMoveUp,
  onMoveDown
}: Props) {

  function updateImage(
    index: number,
    field: string,
    value: any
  ) {

    const images = [...(block.images || [])];

    images[index] = {
      ...images[index],
      [field]: value
    };

    onChange({
      ...block,
      images
    });
  }

  function addImage() {

    onChange({
      ...block,
      images: [
        ...(block.images || []),
        {
          url: "",
          width: 400,
          height: 300
        }
      ]
    });
  }

  function removeImage(
    index: number
  ) {

    const images =
      block.images.filter(
        (_: any, i: number) =>
          i !== index
      );

    onChange({
      ...block,
      images
    });
  }

  return (

    <div className="border rounded-xl p-4">

      <div className="flex gap-2 mb-4">

        <button
          onClick={onMoveUp}
          className="border px-2 py-1"
        >
          ↑
        </button>

        <button
          onClick={onMoveDown}
          className="border px-2 py-1"
        >
          ↓
        </button>

        <button
          onClick={onDelete}
          className="border px-2 py-1"
        >
          Delete Block
        </button>

      </div>

      <h3 className="font-bold text-lg">
        Gallery Block
      </h3>

      <input
        className="w-full border p-2 mt-4"
        value={block.title || ""}
        placeholder="Gallery Title"
        onChange={(e) =>
          onChange({
            ...block,
            title: e.target.value
          })
        }
      />

      {(block.images || []).map(
        (
          image: any,
          index: number
        ) => (

          <div
            key={index}
            className="
              border
              rounded-xl
              p-4
              mt-4
            "
          >

            {image.url && (

              <img
                src={driveToImageUrl(
                  image.url
                )}
                alt=""
                style={{
                  width:
                    image.width ||
                    400,

                  height:
                    image.height ||
                    300,

                  objectFit:
                    "cover",

                  borderRadius:
                    "12px"
                }}
              />

            )}

            <input
              className="
                w-full
                border
                p-2
                mt-4
              "
              value={
                image.url || ""
              }
              placeholder="
                Google Drive Link
              "
              onChange={(e) =>
                updateImage(
                  index,
                  "url",
                  e.target.value
                )
              }
            />

            <div
              className="
                grid
                grid-cols-2
                gap-4
                mt-4
              "
            >

              <div>

                <label>
                  Width
                </label>

                <input
                  type="number"
                  className="
                    w-full
                    border
                    p-2
                  "
                  value={
                    image.width ||
                    400
                  }
                  onChange={(e) =>
                    updateImage(
                      index,
                      "width",
                      Number(
                        e.target.value
                      )
                    )
                  }
                />

              </div>

              <div>

                <label>
                  Height
                </label>

                <input
                  type="number"
                  className="
                    w-full
                    border
                    p-2
                  "
                  value={
                    image.height ||
                    300
                  }
                  onChange={(e) =>
                    updateImage(
                      index,
                      "height",
                      Number(
                        e.target.value
                      )
                    )
                  }
                />

              </div>

            </div>

            <button
              onClick={() =>
                removeImage(
                  index
                )
              }
              className="
                mt-4
                border
                px-3
                py-2
              "
            >
              Delete Image
            </button>

          </div>

        )
      )}

      <button
        onClick={addImage}
        className="
          mt-4
          border
          px-4
          py-2
        "
      >
        Add Image
      </button>

    </div>

  );
}
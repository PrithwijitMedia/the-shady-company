"use client";

import { useState, useEffect } from "react";

interface Props {
  block: any;
  onChange: (block: any) => void;
}

export default function CarouselBlockEditor({
  block,
  onChange,
}: Props) {
  const [data, setData] = useState({
    title: "",
    subtitle: "",
    source: "projects",
    featuredOnly: true,
    limit: 8,
    showTitle: true,
    showDescription: true,
    showButton: true,
    buttonText: "View",
    autoScroll: false,
    speed: 35,
  });

  useEffect(() => {
    setData({
      title: block.title || "",
      subtitle: block.subtitle || "",
      source: block.source || "projects",
      featuredOnly:
        block.featuredOnly ?? true,
      limit: block.limit || 8,
      showTitle:
        block.showTitle ?? true,
      showDescription:
        block.showDescription ?? true,
      showButton:
        block.showButton ?? true,
      buttonText:
        block.buttonText || "View",
      autoScroll:
        block.autoScroll ?? false,
      speed: block.speed || 35,
    });
  }, [block]);

  function update(
    key: string,
    value: any
  ) {
    const next = {
      ...data,
      [key]: value,
    };

    setData(next);

    onChange({
      ...block,
      ...next,
    });
  }

  return (
    <div className="space-y-6 rounded-xl border p-6">

      <div>
        <label className="block mb-2 font-medium">
          Section Title
        </label>

        <input
          className="w-full rounded border p-3"
          value={data.title}
          onChange={(e) =>
            update(
              "title",
              e.target.value
            )
          }
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">
          Subtitle
        </label>

        <textarea
          rows={3}
          className="w-full rounded border p-3"
          value={data.subtitle}
          onChange={(e) =>
            update(
              "subtitle",
              e.target.value
            )
          }
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">
          Source
        </label>

        <select
          className="w-full rounded border p-3"
          value={data.source}
          onChange={(e) =>
            update(
              "source",
              e.target.value
            )
          }
        >
          <option value="projects">
            Projects
          </option>

          <option value="collections">
            Collections
          </option>

          <option value="products">
            Products
          </option>
        </select>
      </div>

      <div>
        <label className="block mb-2 font-medium">
          Maximum Items
        </label>

        <input
          type="number"
          min={1}
          max={30}
          className="w-full rounded border p-3"
          value={data.limit}
          onChange={(e) =>
            update(
              "limit",
              Number(e.target.value)
            )
          }
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">

        <label className="flex items-center gap-3">

          <input
            type="checkbox"
            checked={data.featuredOnly}
            onChange={(e) =>
              update(
                "featuredOnly",
                e.target.checked
              )
            }
          />

          Featured Only

        </label>

        <label className="flex items-center gap-3">

          <input
            type="checkbox"
            checked={data.showTitle}
            onChange={(e) =>
              update(
                "showTitle",
                e.target.checked
              )
            }
          />

          Show Title

        </label>

        <label className="flex items-center gap-3">

          <input
            type="checkbox"
            checked={
              data.showDescription
            }
            onChange={(e) =>
              update(
                "showDescription",
                e.target.checked
              )
            }
          />

          Show Description

        </label>

        <label className="flex items-center gap-3">

          <input
            type="checkbox"
            checked={data.showButton}
            onChange={(e) =>
              update(
                "showButton",
                e.target.checked
              )
            }
          />

          Show Button

        </label>

      </div>

      <div>
        <label className="block mb-2 font-medium">
          Button Text
        </label>

        <input
          className="w-full rounded border p-3"
          value={data.buttonText}
          onChange={(e) =>
            update(
              "buttonText",
              e.target.value
            )
          }
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">

        <label className="flex items-center gap-3">

          <input
            type="checkbox"
            checked={data.autoScroll}
            onChange={(e) =>
              update(
                "autoScroll",
                e.target.checked
              )
            }
          />

          Auto Scroll

        </label>

        <div>

          <label className="block mb-2">
            Auto Scroll Speed
          </label>

          <input
            type="range"
            min={10}
            max={100}
            value={data.speed}
            onChange={(e) =>
              update(
                "speed",
                Number(e.target.value)
              )
            }
            className="w-full"
          />

        </div>

      </div>

      <div className="rounded-lg bg-neutral-50 p-5">

        <h4 className="mb-2 font-semibold">
          Preview
        </h4>

        <div className="text-sm text-neutral-500">
          Source:
          <strong> {data.source}</strong>

          <br />

          Items:
          <strong> {data.limit}</strong>

          <br />

          Featured Only:
          <strong>
            {" "}
            {data.featuredOnly
              ? "Yes"
              : "No"}
          </strong>
        </div>

      </div>

    </div>
  );
}
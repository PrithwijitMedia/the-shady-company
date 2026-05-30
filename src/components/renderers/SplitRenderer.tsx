import { driveToImageUrl } from "@/lib/images";

interface Props {
  block: any;
}

export default function SplitRenderer({
  block
}: Props) {

  const image = (

    <div>

      <img
        src={driveToImageUrl(
          block.image
        )}
        alt=""
        className="
          w-full
          rounded-2xl
          object-cover
        "
      />

    </div>

  );

  const text = (

    <div
      className="
        flex
        items-center
      "
    >

      <div>

        <h2
          className="
            text-5xl
            mb-6
          "
        >
          {block.title}
        </h2>

        <p
          className="
            text-lg
            leading-relaxed
            text-neutral-300
          "
        >
          {block.content}
        </p>

      </div>

    </div>

  );

  return (

    <section
      className="
        py-24
      "
    >

      <div
        className="
          max-w-7xl
          mx-auto
          px-8
          grid
          md:grid-cols-2
          gap-16
        "
      >

        {block.imageLeft
          ? <>
              {image}
              {text}
            </>
          : <>
              {text}
              {image}
            </>
        }

      </div>

    </section>

  );
}
import {
  driveToImageUrl
} from "@/lib/images";

interface Props {
  block: any;
}

export default function GalleryRenderer({
  block
}: Props) {

  return (

    <section className="py-20">

      <div className="
        max-w-7xl
        mx-auto
        px-6
      ">

        <h2 className="
          text-4xl
          font-bold
          mb-10
        ">
          {block.title}
        </h2>

        <div className="
          grid
          md:grid-cols-2
          gap-6
        ">

          {block.images?.map(
            (
              image: any,
              index: number
            ) => (

              <img
                key={index}
                src={driveToImageUrl(
                  image.url
                )}
                alt=""
                className="
                  w-full
                  rounded-xl
                  object-cover
                "
              />

            )
          )}

        </div>

      </div>

    </section>

  );
}
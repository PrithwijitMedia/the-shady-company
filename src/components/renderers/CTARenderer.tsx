import Link from "next/link";

interface Props {
  block: any;
}

export default function CTARenderer({
  block
}: Props) {

  return (

    <section className="
      py-24
      text-center
    ">

      <h2 className="
        text-4xl
        font-bold
        mb-8
      ">
        {block.title}
      </h2>

      <Link
        href={block.buttonLink}
        className="
          border
          px-8
          py-4
          rounded-full
          inline-block
        "
      >
        {block.buttonText}
      </Link>

    </section>

  );
}
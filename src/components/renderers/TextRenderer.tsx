interface Props {
  block: any;
}

export default function TextRenderer({
  block
}: Props) {

  return (

    <section className="
      max-w-4xl
      mx-auto
      px-6
      py-16
    ">

      <p className="
        text-lg
        leading-relaxed
        text-gray-300
      ">
        {block.content}
      </p>

    </section>

  );
}
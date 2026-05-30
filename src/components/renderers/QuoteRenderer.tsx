interface Props {
  block: any;
}

export default function QuoteRenderer({
  block
}: Props) {

  return (

    <section
      className="
        py-32
      "
    >

      <div
        className="
          max-w-5xl
          mx-auto
          px-8
          text-center
        "
      >

        <blockquote
          className="
            text-5xl
            leading-tight
            italic
          "
        >

          "{block.quote}"

        </blockquote>

        {
          block.author && (

            <p
              className="
                mt-8
                text-neutral-400
              "
            >
              {block.author}
            </p>

          )
        }

      </div>

    </section>

  );
}
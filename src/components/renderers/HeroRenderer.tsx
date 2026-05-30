interface Props {
  block: any;
}

export default function HeroRenderer({
  block
}: Props) {

  return (

    <section className="
      min-h-screen
      flex
      items-center
      justify-center
      text-center
      px-6
    ">

      <div>

        <h1 className="
          text-5xl
          md:text-7xl
          font-bold
          mb-6
        ">
          {block.title}
        </h1>

        <p className="
          text-xl
          text-gray-400
          max-w-2xl
          mx-auto
        ">
          {block.subtitle}
        </p>

      </div>

    </section>

  );
}
export default function LuxuryTitle({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <h2
      className="
      text-4xl
      sm:text-5xl
      md:text-6xl
      lg:text-7xl
      font-light
      tracking-[-0.04em]
      leading-[0.95]
      "
    >
      {children}
    </h2>
  );
}
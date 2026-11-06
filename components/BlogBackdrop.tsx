const LEAF = "M0 0C30-30 95-34 150 0C95 28 30 28 0 0Z";

const SPRIGS = [
  {
    viewBox: "0 0 290 250",
    className: "left-0 top-0 w-[40vw] md:w-[18rem]",
    leaves: [
      "translate(135 15) rotate(6) scale(1)",
      "translate(55 60) rotate(16) scale(.8)",
      "translate(0 130) rotate(-8) scale(.65)",
      "translate(0 235) rotate(-42) scale(.65)",
    ],
  },
  {
    viewBox: "0 0 250 185",
    className: "right-0 top-0 w-[36vw] md:w-[15.5rem]",
    leaves: [
      "translate(5 58) rotate(-20) scale(.95)",
      "translate(80 180) rotate(-52) scale(.95)",
      "translate(215 150) rotate(-74) scale(.7)",
    ],
  },
  {
    viewBox: "0 0 240 160",
    className: "bottom-0 right-0 hidden w-[15rem] md:block",
    leaves: [
      "translate(5 100) rotate(-6) scale(.95)",
      "translate(80 155) rotate(-22) scale(.85)",
      "translate(115 15) rotate(32) scale(.55)",
    ],
  },
  {
    viewBox: "0 0 220 150",
    className: "bottom-0 left-0 hidden w-[14rem] md:block",
    leaves: ["translate(20 145) rotate(-66) scale(.72)", "translate(70 130) rotate(-24) scale(.8)"],
  },
];

/** Plain vector shapes with no filters, so they stay cheap to paint while scrolling. */
export default function BlogBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      {SPRIGS.map(({ viewBox, className, leaves }) => (
        <svg key={viewBox} viewBox={viewBox} fill="#2a1d0e" className={`absolute ${className}`}>
          {leaves.map((transform) => (
            <path key={transform} d={LEAF} transform={transform} />
          ))}
        </svg>
      ))}
    </div>
  );
}

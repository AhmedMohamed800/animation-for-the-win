export default function BookMark({
  direction,
  color,
}: {
  color: string;
  direction: "left" | "right";
}) {
  return (
    <svg
      viewBox="0 0 62 44"
      className={`block w-full  ${direction === "left" ? "rotate-90 h-[50px] " : "rotate-90 rotate-y-180 h-[49.6px] "}`}
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.1449 -2.54901e-05L-521.145 -2.66006e-06C-531.065 -2.22644e-06 -540.343 4.90374 -545.932 13.0999L-558.55 31.6066C-563.837 39.3607 -572.615 44 -582 44L62 44C52.6151 44 43.8369 39.3607 38.5499 31.6066L25.9318 13.0999C20.3434 4.90373 11.0649 -2.59237e-05 1.1449 -2.54901e-05Z"
        fill={color}
      />
    </svg>
  );
}

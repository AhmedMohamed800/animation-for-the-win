import { Ref } from "react";

function BacketballSVG({
  width,
  height,
  classes,
  ref,
}: {
  width: number;
  height: number;
  classes: string;
  ref?: Ref<SVGSVGElement>;
}) {
  return (
    <svg
      version="1.0"
      id="Layer_1"
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      className={classes}
      viewBox="-6.4 -6.4 76.80 76.80"
      enableBackground="new 0 0 64 64"
      fill="#d3ccbd"
      stroke="#d3ccbd"
    >
      <g
        id="SVGRepo_bgCarrier"
        strokeWidth="0"
        transform="translate(5.120000000000001,5.120000000000001), scale(0.84)"
      >
        <rect
          x="-6.4"
          y="-6.4"
          width="76.80"
          height="76.80"
          rx="38.4"
          fill="#000000"
          strokeWidth="0"
        />
      </g>

      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="#CCCCCC"
        strokeWidth="0.384"
      />

      <g id="SVGRepo_iconCarrier">
        <g>
          <path
            fill="#d3ccbd"
            d="M20.161,2.273C16.233,3.835,12.553,6.2,9.375,9.378C9.19,9.562,9.018,9.755,8.838,9.942 c1.386,3.831,3.126,7.562,5.242,11.133C18.139,15.485,20.168,8.879,20.161,2.273z"
          />
          <path
            fill="#d3ccbd"
            d="M63.824,28.682c-9.751-1.521-20.067,1.469-27.58,8.981c-1.202,1.202-2.287,2.479-3.258,3.812 c7.363,5.18,15.545,8.678,24.021,10.495C62.398,45.233,64.671,36.827,63.824,28.682z"
          />
          <path
            fill="#d3ccbd"
            d="M27.05,63.616c9.75,1.519,20.067-1.471,27.58-8.983c0.308-0.308,0.602-0.624,0.894-0.94 c-8.344-1.927-16.387-5.451-23.659-10.562C27.924,49.32,26.316,56.563,27.05,63.616z"
          />
          <path
            fill="#d3ccbd"
            d="M12.771,22.754c-2.172-3.571-3.98-7.297-5.435-11.13c-4.895,5.909-7.34,13.163-7.332,20.416 c3.926-1.562,7.607-3.928,10.785-7.105C11.491,24.232,12.147,23.503,12.771,22.754z"
          />
          <path
            fill="#d3ccbd"
            d="M13.881,24.53c-0.535,0.62-1.09,1.231-1.678,1.819c-3.554,3.553-7.701,6.146-12.121,7.798 c0.497,7.462,3.59,14.782,9.293,20.485c0.027,0.028,0.057,0.054,0.085,0.082c2.091-7.833,5.595-15.364,10.528-22.188 C17.73,29.981,15.691,27.309,13.881,24.53z"
          />
          <path
            fill="#d3ccbd"
            d="M30.236,41.961c-2.588-1.935-5.074-4.067-7.427-6.42c-0.493-0.493-0.958-1.003-1.433-1.507 c-4.874,6.828-8.298,14.369-10.258,22.207c4.102,3.541,8.884,5.869,13.886,6.984C24.372,55.889,26.117,48.385,30.236,41.961z"
          />
          <path
            fill="#d3ccbd"
            d="M22.583,32.401c0.54,0.579,1.076,1.161,1.641,1.726c2.262,2.262,4.653,4.313,7.14,6.18 c1.033-1.42,2.187-2.778,3.467-4.058c7.829-7.829,18.525-11.037,28.708-9.635c-1.062-6.245-3.979-12.235-8.761-17.08 c-9.619,3.111-18.671,8.468-26.311,16.107C26.321,27.787,24.371,30.052,22.583,32.401z"
          />
          <path
            fill="#d3ccbd"
            d="M15.215,22.892c1.773,2.78,3.774,5.456,6.007,8.002c1.78-2.312,3.711-4.546,5.831-6.666 c7.594-7.595,16.541-13.007,26.063-16.257c-8.688-7.646-20.523-9.78-30.973-6.405C22.307,9.073,19.998,16.62,15.215,22.892z"
          />
        </g>
      </g>
    </svg>
  );
}

function BackNetSVG({
  width,
  height,
  classes,
}: {
  width: number;
  height: number;
  classes: string;
}) {
  return (
    <svg
      id="hoop-back"
      viewBox="0 0 160 60"
      width={width}
      height={height}
      className={classes}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="8"
        y="1"
        width="144"
        height="56"
        rx="2.5"
        stroke="#F0EBE1"
        strokeWidth="0.6"
        fill="none"
        opacity="0.15"
      ></rect>
      <rect
        x="12"
        y="4"
        width="136"
        height="50"
        rx="2"
        stroke="#F0EBE1"
        strokeWidth="1.5"
        fill="rgba(240,235,225,0.03)"
        opacity="0.35"
      ></rect>
      <rect
        x="52"
        y="18"
        width="56"
        height="28"
        rx="1"
        stroke="#F0EBE1"
        strokeWidth="1"
        fill="none"
        opacity="0.2"
      ></rect>
      <line
        x1="80"
        y1="54"
        x2="80"
        y2="62"
        stroke="#F0EBE1"
        strokeWidth="1.5"
        opacity="0.3"
      ></line>
    </svg>
  );
}

function NetSVG({
  width,
  height,
  classes,
}: {
  width: number;
  height: number;
  classes: string;
}) {
  return (
    <svg
      id="hoop-front"
      viewBox="0 0 160 120"
      width={width}
      height={height}
      className={classes}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="46"
        y1="62"
        x2="114"
        y2="62"
        stroke="#F0EBE1"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.9"
      ></line>
      <line
        x1="46"
        y1="62"
        x2="46"
        y2="67"
        stroke="#F0EBE1"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.65"
      ></line>
      <line
        x1="114"
        y1="62"
        x2="114"
        y2="67"
        stroke="#F0EBE1"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.65"
      ></line>
      <line
        x1="50"
        y1="67"
        x2="56"
        y2="118"
        stroke="#F0EBE1"
        strokeWidth="0.8"
        opacity="0.35"
      ></line>
      <line
        x1="57"
        y1="67"
        x2="61"
        y2="118"
        stroke="#F0EBE1"
        strokeWidth="0.8"
        opacity="0.35"
      ></line>
      <line
        x1="64"
        y1="67"
        x2="65"
        y2="118"
        stroke="#F0EBE1"
        strokeWidth="0.8"
        opacity="0.35"
      ></line>
      <line
        x1="71"
        y1="67"
        x2="70"
        y2="118"
        stroke="#F0EBE1"
        strokeWidth="0.8"
        opacity="0.35"
      ></line>
      <line
        x1="78"
        y1="67"
        x2="75"
        y2="118"
        stroke="#F0EBE1"
        strokeWidth="0.8"
        opacity="0.35"
      ></line>
      <line
        x1="85"
        y1="67"
        x2="80"
        y2="118"
        stroke="#F0EBE1"
        strokeWidth="0.8"
        opacity="0.35"
      ></line>
      <line
        x1="92"
        y1="67"
        x2="86"
        y2="118"
        stroke="#F0EBE1"
        strokeWidth="0.8"
        opacity="0.35"
      ></line>
      <line
        x1="99"
        y1="67"
        x2="92"
        y2="118"
        stroke="#F0EBE1"
        strokeWidth="0.8"
        opacity="0.35"
      ></line>
      <line
        x1="106"
        y1="67"
        x2="98"
        y2="118"
        stroke="#F0EBE1"
        strokeWidth="0.8"
        opacity="0.35"
      ></line>
      <line
        x1="110"
        y1="67"
        x2="103"
        y2="118"
        stroke="#F0EBE1"
        strokeWidth="0.8"
        opacity="0.35"
      ></line>
      <path
        d="M 50,67  Q 80,74  110,67"
        stroke="#F0EBE1"
        strokeWidth="0.8"
        fill="none"
        opacity="0.3"
      ></path>
      <path
        d="M 52,80  Q 80,86  108,80"
        stroke="#F0EBE1"
        strokeWidth="0.8"
        fill="none"
        opacity="0.28"
      ></path>
      <path
        d="M 54,92  Q 80,97  106,92"
        stroke="#F0EBE1"
        strokeWidth="0.7"
        fill="none"
        opacity="0.22"
      ></path>
      <path
        d="M 56,104 Q 80,108 104,104"
        stroke="#F0EBE1"
        strokeWidth="0.7"
        fill="none"
        opacity="0.16"
      ></path>
    </svg>
  );
}

export { BacketballSVG, BackNetSVG, NetSVG };

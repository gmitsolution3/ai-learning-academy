export function Level() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 12C7.5 12 5.5 10.5 5 8.5H3.5C2.5 8.5 1.5 7.5 1.5 6.5V5.5C1.5 4.5 2.5 3.5 3.5 3.5H5C5 1.5 7.5 0 10 0C12.5 0 15 1.5 15 3.5H16.5C17.5 3.5 18.5 4.5 18.5 5.5V6.5C18.5 7.5 17.5 8.5 16.5 8.5H15C14.5 10.5 12.5 12 10 12Z"
        fill="url(#trophyGradient)"
      />
      <path
        d="M10 12V16M6 18H14M7 14.5V16.5C7 17.5 7.5 18 8 18H12C12.5 18 13 17.5 13 16.5V14.5"
        stroke="url(#trophyGradient)"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="10" cy="6" r="2" fill="#61656C" fillOpacity="0.4" />
      <path
        d="M5 3.5C5 1.5 7.5 0 10 0C12.5 0 15 1.5 15 3.5"
        stroke="#61656C"
        strokeWidth="0.8"
        fill="none"
        opacity="0.5"
      />
      <defs>
        <linearGradient
          id="trophyGradient"
          x1="0"
          y1="0"
          x2="18"
          y2="19"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F0F0F1" />
          <stop offset="1" stopColor="#61656C" />
        </linearGradient>
      </defs>
    </svg>
  );
}

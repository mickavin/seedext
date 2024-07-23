import * as React from "react"

function SvgComponent(isDark: boolean) {
  return (
    <svg
      fill={isDark ? "#fff" : "#444"}
      height="24px"
      width="24px"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 297 297"
      xmlSpace="preserve"
    >
      <path d="M237.333 33h-50.14c-2.558-18.613-18.556-33-37.86-33s-35.303 14.387-37.86 33h-51.14C50.408 33 42 41.075 42 51v228c0 9.925 8.408 18 18.333 18h177c9.925 0 17.667-8.075 17.667-18V51c0-9.925-7.742-18-17.667-18zM93.052 48c3.432 18.033 19.084 31 38.092 31h36.379c19.008 0 34.66-12.967 38.092-31H223v216H75V48h18.052zm56.281-32c10.456 0 19.242 7.259 21.601 17h-43.201c2.358-9.741 11.144-17 21.6-17z" />
      <path d="M99 109H149V124H99z" />
      <path d="M200.689 105.076L189.645 94.924 175.427 110.39 169.237 105.347 159.763 116.976 176.907 130.944z" />
      <path d="M99 157H149V172H99z" />
      <path d="M200.689 153.076L189.645 142.924 175.427 158.39 169.237 153.347 159.763 164.976 176.907 178.944z" />
      <path d="M99 205H149V220H99z" />
      <path d="M200.689 201.076L189.645 190.924 175.427 206.39 169.237 201.347 159.763 212.976 176.907 226.944z" />
    </svg>
  )
}

export default SvgComponent

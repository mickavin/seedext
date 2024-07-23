import * as React from "react"

function SvgComponent(isDark: boolean) {
  return (
    <svg
      fill={isDark ? "#fff" : "#444"}
      height="24px"
      width="24px"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M9 4h13v1H9V4zm0 17h13v-1H9v1zm0-8h13v-1H9v1zm-5.44 9.17L7 18.74 6.26 18l-2.71 2.7-1.12-1-.74.74 1.86 1.73zm0-16L7 2.74 6.26 2 3.55 4.7l-1.12-1-.74.74 1.86 1.73zm0 8L7 10.74 6.26 10l-2.71 2.7-1.12-1-.74.74 1.86 1.73z" />
    </svg>
  )
}

export default SvgComponent

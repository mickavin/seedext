import * as React from "react"

function SvgComponent({isDark} : {isDark: boolean}) {
  return (
    <svg
        fill={isDark ? "#fff" : "#444"}
      width="20px"
      height="20px"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10 4a2 2 0 11-2-2 2 2 0 012 2zm-2 6a2 2 0 102 2 2 2 0 00-2-2zm0 8a2 2 0 102 2 2 2 0 00-2-2zm8-12a2 2 0 10-2-2 2 2 0 002 2zm0 8a2 2 0 10-2-2 2 2 0 002 2zm0 8a2 2 0 10-2-2 2 2 0 002 2z" />
    </svg>
  )
}

export default SvgComponent

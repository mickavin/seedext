import * as React from "react"

function SvgComponent({isDark}: {isDark: boolean}) {
  return (
    <svg
      fill={isDark ? "#fff" : "#444"} 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 32 32" 
      width="25px"
      height="25px"
      >
      <path
      fill={isDark ? "#fff" : "#444"} 
      d="M25.39 6.61a8 8 0 00-11.66 11l-1.65 1.64-.66-.67L3.94 26l2 2 7.48-7.48-.67-.66 1.64-1.65a8 8 0 0011-11.66zM6 26.65L5.35 26l6.07-6 .62.62zm18.7-9.42a7 7 0 110-9.91 7 7 0 01-.02 9.91z"
      />
      <path 
      fill={isDark ? "#fff" : "#444"} 
      d="M15.49 8a6 6 0 000 8.47l.71-.71a5 5 0 010-7z" />
    </svg>
  )
}

export default SvgComponent

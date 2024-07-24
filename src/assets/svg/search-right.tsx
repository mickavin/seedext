import * as React from "react"

function SvgComponent({isDark}: {isDark: boolean}) {
  return (
      <svg
      fill={isDark ? "#fff" : "#444"}
      width="12px"
      height="12px"
      viewBox="0 -0.5 21 21"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M128.94 132.929l1.485 1.414-5.94 5.657-1.485-1.414 5.94-5.657zm7.71-.929c-2.895 0-5.25-2.243-5.25-5s2.355-5 5.25-5 5.25 2.243 5.25 5-2.355 5-5.25 5zm0-12c-4.06 0-7.35 3.134-7.35 7s3.29 7 7.35 7 7.35-3.134 7.35-7-3.29-7-7.35-7z"
        transform="translate(-179 -280) translate(56 160)"
        fill="#000"
        stroke="none"
        strokeWidth={1}
        fillRule="evenodd"
      />
    </svg>
  )
}

export default SvgComponent

import React from "react"

type GroveLogoProps = {
  icon?: boolean
}

function GroveLogo({ icon }: GroveLogoProps) {
  return icon ? (
    <svg
      fill="none"
      height="28"
      viewBox="0 0 22 28"
      width="22"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11 8.833V6.285a.934.934 0 00-.465-.81L7.08 3.474a1.403 1.403 0 00-2.107 1.214v2.56c0 .335.178.644.469.81l3.454 1.99a1.404 1.404 0 002.105-1.216L11 8.833zM11.001 13.29v-2.554c0-.333.176-.64.463-.808l5.21-3.048a1.403 1.403 0 012.112 1.212V10.7c0 .335-.18.645-.47.812l-5.211 2.996a1.403 1.403 0 01-2.103-1.218H11zM11.001 4.437V1.886c0-.331.174-.637.459-.805l1.487-.883a1.403 1.403 0 012.12 1.208V3.98a.936.936 0 01-.468.81l-1.492.863A1.403 1.403 0 0111 4.437zM10.98 17.695V15.15a.935.935 0 00-.462-.807L2.714 9.779a1.404 1.404 0 00-2.112 1.212v2.591c0 .334.178.643.467.81l7.805 4.518a1.403 1.403 0 002.107-1.215zM11.001 22.106v-2.544c0-.332.176-.64.463-.807l7.813-4.568a1.404 1.404 0 012.112 1.207l.01 2.58a.937.937 0 01-.467.813l-7.823 4.535A1.404 1.404 0 0111 22.107zM9.803 22.711l.748.455c.28.17.45.473.45.8v2.628a1.404 1.404 0 01-2.11 1.213l-.756-.44a.935.935 0 01-.464-.809V23.91a1.404 1.404 0 012.132-1.199z"
        fill="#389F58"
      ></path>
    </svg>
  ) : (
    <svg
      fill="none"
      height="28"
      viewBox="0 0 95 28"
      width="95"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.4 8.833V6.285a.934.934 0 00-.467-.81L6.48 3.474a1.403 1.403 0 00-2.108 1.214v2.56c0 .335.178.644.469.81l3.454 1.99A1.404 1.404 0 0010.4 8.833v.001zM10.4 13.29v-2.554c0-.333.176-.64.463-.808l5.209-3.048a1.403 1.403 0 012.112 1.212V10.7c0 .335-.179.645-.469.812l-5.212 2.996A1.403 1.403 0 0110.4 13.29zM10.4 4.437V1.886c0-.331.174-.637.458-.805l1.488-.883a1.403 1.403 0 012.119 1.208V3.98a.935.935 0 01-.467.81l-1.493.863a1.403 1.403 0 01-2.106-1.216zM10.38 17.695V15.15a.935.935 0 00-.464-.807L2.112 9.779A1.404 1.404 0 000 10.991v2.591c0 .334.178.643.467.81l7.806 4.518a1.403 1.403 0 002.106-1.215zM10.4 22.106v-2.544c0-.332.176-.64.463-.807l7.812-4.568a1.404 1.404 0 012.112 1.207l.01 2.58a.936.936 0 01-.466.813l-7.824 4.535a1.404 1.404 0 01-2.108-1.215zM9.202 22.711l.748.455c.28.17.45.473.45.8v2.628a1.404 1.404 0 01-2.11 1.213l-.756-.44a.935.935 0 01-.465-.809V23.91a1.404 1.404 0 012.133-1.199z"
        fill="#389F58"
      ></path>
      <path
        d="M71.6 4.965h-3.494l2.954 13.64h6.847l2.955-13.64h-3.449L74.9 16.59c-.092.42-.695.42-.786 0L71.6 4.965z"
        fill="#fff"
      ></path>
      <path
        clipRule="evenodd"
        d="M67.836 11.788c0 3.766-3.066 6.82-6.849 6.82-3.782 0-6.847-3.053-6.847-6.82 0-3.767 3.066-6.82 6.847-6.82 3.783 0 6.85 3.053 6.85 6.82zm-3.174.03a3.637 3.637 0 01-3.645 3.628 3.638 3.638 0 01-3.645-3.628 3.638 3.638 0 013.645-3.63 3.637 3.637 0 013.645 3.63z"
        fill="#fff"
        fillRule="evenodd"
      ></path>
      <path
        d="M49.529 10.514v8.107H46.16V8.985c0-2.21 1.799-4 4.017-4h3.962V8.34l-4.813-.024a.317.317 0 00-.29.454l.182.377c.205.427.31.893.31 1.367z"
        fill="#fff"
      ></path>
      <path
        clipRule="evenodd"
        d="M44.01 4.968h-3.369v1.668c0 .188-.243.277-.375.144a6.111 6.111 0 00-4.352-1.811c-3.379 0-6.117 2.727-6.117 6.09 0 3.365 2.738 6.092 6.116 6.092a6.11 6.11 0 004.353-1.812c.132-.133.375-.043.375.144v3.599a.6.6 0 01-.602.6h-8.321v3.354h8.276a4.009 4.009 0 004.017-4V4.968h-.001zm-6.984 9.782c2.072 0 3.644-1.569 3.644-3.632a3.746 3.746 0 00-3.753-3.738 3.745 3.745 0 00-3.753 3.738c0 2.063 1.789 3.632 3.862 3.632z"
        fill="#fff"
        fillRule="evenodd"
      ></path>
      <path
        d="M94.278 12.12a.46.46 0 00.47-.46 6.69 6.69 0 00-.15-1.264c-.663-3.053-3.429-5.428-6.698-5.428a6.839 6.839 0 00-3.384.89 6.833 6.833 0 00-3.318 4.526 6.89 6.89 0 00-.145 1.404c0 3.766 3.066 6.82 6.849 6.82a6.85 6.85 0 006.446-4.51h-3.574a3.658 3.658 0 01-2.873 1.386 3.657 3.657 0 01-3.65-3.361h7.805l2.224-.002h-.002zm-3.26-1.724h-4.32a3.19 3.19 0 00-1.371.311l-.38.18a.32.32 0 01-.456-.282c.002-.114.027-.265.149-.489.078-.133.165-.263.26-.387v-.002c.693-.904 1.809-1.536 3-1.536a3.663 3.663 0 013.364 2.207l-.246-.002z"
        fill="#fff"
      ></path>
    </svg>
  )
}

export default GroveLogo

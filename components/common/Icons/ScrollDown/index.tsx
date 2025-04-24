import { SVGProps } from 'react'

export default function ScrollDown({
  currentColor,
  ...svgProps
}: { currentColor: string } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 367 360"
      fill="none"
      stroke={currentColor}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...svgProps}
    >
      <rect
        x="19.5"
        y="14.5"
        width="227"
        height="331"
        rx="112.5"
        strokeWidth="15"
      />
      <path d="M318 96L318 298" strokeWidth="15" strokeLinecap="round" />
      <path
        d="M347 272.5L319.914 299.586C319.133 300.367 317.867 300.367 317.086 299.586L290 272.5"
        strokeWidth="15"
        strokeLinecap="round"
      />
      <rect x="106" y="65" width="54" height="80" rx="27" strokeWidth="15" />
    </svg>
  )
}

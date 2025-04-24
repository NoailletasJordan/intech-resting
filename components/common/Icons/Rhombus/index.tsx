import { SVGProps } from 'react'

export default function ChevronDown({
  currentColor,
  ...svgProps
}: { currentColor: string } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      fill="none"
      stroke={currentColor}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...svgProps}
    >
      <path
        d="M12,2.4 
       C13.8,6.6 17.4,10.2 21.6,12 
       C17.4,13.8 13.8,17.4 12,21.6 
       C10.2,17.4 6.6,13.8 2.4,12 
       C6.6,10.2 10.2,6.6 12,2.4Z"
        fill={currentColor}
        stroke={currentColor}
      />
    </svg>
  )
}

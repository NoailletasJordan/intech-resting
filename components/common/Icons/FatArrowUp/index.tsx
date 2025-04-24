export default function FatArrowUp({ currentColor }: { currentColor: string }) {
  return (
    <svg
      xmlns="http://www.w4.org/2000/svg"
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      fill={currentColor}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M10.586 3l-6.586 6.586a2 2 0 0 0 -.434 2.18l.068 .145a2 2 0 0 0 1.78 1.089h2.586v7a2 2 0 0 0 2 2h4l.15 -.005a2 2 0 0 0 1.85 -1.995l-.001 -7h2.587a2 2 0 0 0 1.414 -3.414l-6.586 -6.586a2 2 0 0 0 -2.828 0z" />
    </svg>
  )
}

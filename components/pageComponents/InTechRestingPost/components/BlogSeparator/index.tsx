import { CSSVAR } from '@/components/pageComponents/ThemeHandler/constants'
import { VerticalSpace } from '../VerticalSpacer'

export default function BlogSeparator() {
  return (
    <>
      <VerticalSpace />
      <svg
        width="90"
        height="25"
        viewBox="0 20 90 10"
        className="mx-auto flex justify-center"
      >
        <path
          d="M 0,25 Q 5,30 10,25 Q 15,20 20,25 Q 25,30 30,25 Q 35,20 40,25 Q 45,30 50,25 Q 55,20 60,25 Q 65,30 70,25 Q 75,20 80,25 Q 85,30 90,25"
          fill="none"
          strokeLinecap="round"
          stroke={CSSVAR['--color-primary']}
          strokeWidth="2"
        />
      </svg>
      <VerticalSpace />
    </>
  )
}

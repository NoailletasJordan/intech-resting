import Rocket from '@/components/common/Icons/Rocket'
import BlogH3 from '../../../BlogH3'

const iconConfig = {
  rocket: <Rocket />,
}

interface Props {
  icon: keyof typeof iconConfig
  title: string
}

export default function PortfolioTitleIcon({ title, icon }: Props) {
  return (
    <div className="mt-3 flex items-center gap-3">
      <div className="flex size-9 items-center justify-center">
        {iconConfig[icon]}
      </div>
      <BlogH3 content={title} preventMT />
    </div>
  )
}

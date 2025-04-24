import Button from '@/components/common/Button'
import ChevronDown from '@/components/common/Icons/ChevronDown'
import ThemeHandler from '@/components/pageComponents/ThemeHandler'
import { themeIntechResting } from '@/components/pageComponents/ThemeHandler/constants'
import * as Popover from '@radix-ui/react-popover'
import { HTMLAttributes, useState } from 'react'

interface BaseOption {
  label: React.ReactNode
  iconRight?: React.ReactNode
}

interface LinkOption extends BaseOption {
  isLink: true
  url: string
  samePage?: boolean
}

interface ButtonOption extends BaseOption {
  isLink?: false | undefined
  onClick: () => void
}

type Option = LinkOption | ButtonOption

interface Props {
  iconLeft?: React.ReactNode
  label: string
  options: Option[]
}

export default function DropDownMenu({ iconLeft, label, options = [] }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger>
        <Button onlyVisual>
          <div className="flex items-center gap-x-2">
            {iconLeft && <span className="size-4 scale-140">{iconLeft}</span>}
            <span>{label}</span>
            <span className="size-4">
              <ChevronDown currentColor={themeIntechResting['--color-text']} />
            </span>
          </div>
        </Button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="z-20 grid grid-cols-1 gap-1 rounded-md pt-1"
          style={{
            backgroundColor: themeIntechResting['--color-surface-light'],
            color: themeIntechResting['--color-text'],
            border: `1px solid ${themeIntechResting['--color-border']}`,
          }}
          sideOffset={5}
        >
          <ThemeHandler className="space-y-1" styleConfig={themeIntechResting}>
            {options.map((option, index) => {
              const { label, iconRight, isLink } = option
              const inner = (
                <>
                  <span>{label}</span>
                  {iconRight && <span className="size-4">{iconRight}</span>}
                </>
              )

              const className =
                'text-text flex w-full cursor-pointer items-center justify-between gap-x-2 rounded-md px-2 py-1 hover:outline-1 hover:outline-[var(--color-border-active)]'

              return isLink ? (
                <LinkOptionWrapper
                  key={index}
                  url={option.url}
                  samePage={option.samePage}
                  className={className}
                >
                  {inner}
                </LinkOptionWrapper>
              ) : (
                <ButtonOptionWrapper
                  onClick={option.onClick}
                  className={className}
                  key={index}
                >
                  {inner}
                </ButtonOptionWrapper>
              )
            })}
            <Popover.Arrow className="fill-[var(--color-border)]" />
          </ThemeHandler>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}

const LinkOptionWrapper = ({
  children,
  url,
  className,
  samePage,
}: {
  url: LinkOption['url']
  samePage?: LinkOption['samePage']
  children: React.ReactNode
  className?: HTMLAttributes<HTMLAnchorElement>['className']
}) => {
  return (
    <a
      href={url}
      target={samePage ? undefined : '_blank'}
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  )
}

const ButtonOptionWrapper = ({
  onClick,
  children,
  className,
}: {
  onClick: ButtonOption['onClick']
  children: React.ReactNode
  className?: HTMLAttributes<HTMLButtonElement>['className']
}) => {
  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  )
}

import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

interface IToggleGroupProps {
  options: { value: string; label: string }[]
  ariaLabel: string
  value: string
  onValueChange: (val: string) => void
}

const toggleGroupItemClasses: HTMLAttributes<HTMLDivElement>['className'] =
  'flex items-center justify-center border border-border px-2 py-[2px] first:rounded-l last:rounded-r hover:bg-surface-lighter active:bg-surface-light'

const selectedItemClasses: HTMLAttributes<HTMLDivElement>['className'] =
  'border-border-active  bg-[DCFF46] text-text-light'

export default function DynamicToggleGroup({
  options,
  value,
  ariaLabel,
  onValueChange,
}: IToggleGroupProps) {
  return (
    <ToggleGroup.Root
      className="inline-flex"
      type="single"
      value={value}
      aria-label={ariaLabel}
      onValueChange={(value) => {
        if (value) onValueChange(value)
      }}
    >
      {options.map((option) => (
        <ToggleGroup.Item
          key={option.value}
          className={twMerge(
            toggleGroupItemClasses,
            value === option.value ? selectedItemClasses : '',
          )}
          value={option.value}
          aria-label={option.label}
        >
          <div>{option.label}</div>
        </ToggleGroup.Item>
      ))}
    </ToggleGroup.Root>
  )
}

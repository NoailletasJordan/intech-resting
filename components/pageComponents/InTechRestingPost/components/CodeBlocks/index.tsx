import Separator from '@/components/common/Separator'
import Space from '@/components/common/Space'
import DynamicToggleGroup from '@/components/pageComponents/InTechRestingPost/components/CodeBlocks/components/DynamicToggleGroup'
import { CSSVAR } from '@/components/pageComponents/ThemeHandler/constants'
import { useElementSize } from '@mantine/hooks'
import { Highlight, themes } from 'prism-react-renderer'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props {
  text: string
  highlightConfig?: THighlightConfig
}

function parseCodeBlocks(text: string): { code: string; language: string }[] {
  const lines = text.split('\n')

  const parsed = lines.reduce<{ code: string; language: string }[]>(
    (acc, line) => {
      // If line contains '---', start a new code block
      if (line.includes('---')) {
        acc.push({
          language: line.replace(/---/g, '').trim(),
          code: '',
        })
        return acc
      }

      // If there's an existing code block, append the line to its code
      if (acc.length > 0) {
        const lastBlock = acc[acc.length - 1]
        lastBlock.code += (lastBlock.code ? '\n' : '') + line
      }

      return acc
    },
    [],
  )

  if (parsed.length === 0) {
    throw new Error(`CodeBlock error or empty on : 
     ${text}`)
  }

  return parsed
}

const CONFIG_LANGUAGE = {
  tsx: 'TypeScript',
  jsx: 'JavaScript',
  go: 'Golang',
}

type Lang = string
type NumberAsString = string | number
export type THighlightConfig = Record<Lang, Record<number, NumberAsString[]>>

export default function CodeBlock({ highlightConfig, text }: Props) {
  const parsedCodeBlocks = parseCodeBlocks(text)
  const [currentLanguage, setCurrentLanguage] = useState(
    parsedCodeBlocks[0].language,
  )
  const currentCodeBlock = parsedCodeBlocks.find(
    ({ language }) => language === currentLanguage,
  )!

  const selectedCode = currentCodeBlock.code
  const highlightConfigLanguage = highlightConfig
    ? highlightConfig[currentLanguage]
    : {}

  const { ref } = useElementSize()

  return (
    <Highlight
      code={selectedCode.trim() || ''}
      language={currentCodeBlock.language}
      theme={{ ...themes.jettwaveDark, plain: {} }}
    >
      {({ style, tokens, getLineProps, getTokenProps, className }) => {
        return (
          <div className="border-border bg-surface-light rounded-lg border pt-2 pb-3">
            <div className="ml-4 flex gap-2 text-[14px]">
              <DynamicToggleGroup
                options={parsedCodeBlocks.map(({ language }) => {
                  const languageLabel =
                    CONFIG_LANGUAGE[language as keyof typeof CONFIG_LANGUAGE] ||
                    language
                  return {
                    value: language,
                    label: languageLabel,
                  }
                })}
                ariaLabel="Toggle options"
                value={currentLanguage}
                onValueChange={(value) => {
                  setCurrentLanguage(value)
                }}
              />
            </div>
            <Space className="h-2" />
            <Separator />
            <Space className="h-3" />
            <div
              style={{
                scrollbarColor: `${CSSVAR['--color-text']} ${CSSVAR['--color-surface-light']}`,
              }}
              className={twMerge(
                'max-w-[calc(100cqw_-_10px)] overflow-x-auto text-[16px] leading-[1.5]',
                className,
              )}
              ref={ref}
            >
              <pre
                style={{
                  ...style,
                }}
              >
                {tokens.map((line, lineIndex) => {
                  const isHighlightedLine = lineIndex in highlightConfigLanguage
                  const lineProps = getLineProps({
                    line,
                    className: twMerge('relative px-4'),
                    style: { width: '100%', minWidth: 'fit-content' },
                  })

                  return (
                    <div key={lineIndex} {...lineProps}>
                      {isHighlightedLine && (
                        <div
                          className="bg-text-light pointer-events-none absolute top-0 right-0 bottom-0 left-0 h-full opacity-[0.05]"
                          style={{
                            width: Number(ref.current?.scrollWidth || 0) - 1,
                          }}
                        />
                      )}
                      {line.map((token, tokenIndex) => {
                        let isHighlightedWord = false
                        if (isHighlightedLine) {
                          isHighlightedWord = highlightConfigLanguage[lineIndex]
                            .map(Number)
                            .includes(tokenIndex)
                        }

                        const { children, className, style } = getTokenProps({
                          token,
                          style: isHighlightedWord
                            ? {
                                backgroundColor: 'rgb(119, 119, 119, 0.35)',
                                borderRadius: 4,
                                display: 'relative inline-block',
                              }
                            : undefined,
                        })

                        return (
                          <span
                            key={tokenIndex}
                            className={className}
                            style={style}
                          >
                            {children}
                          </span>
                        )
                      })}
                    </div>
                  )
                })}
              </pre>
            </div>
          </div>
        )
      }}
    </Highlight>
  )
}

import { TLOCALE } from '@/constants'
import {
  documentToReactComponents,
  Options,
} from '@contentful/rich-text-react-renderer'
import {
  Block,
  BLOCKS,
  Document,
  INLINES,
  MARKS,
} from '@contentful/rich-text-types'
import BlockQuote from './components/BlockQuote'
import BlogH2 from './components/BlogH2'
import BlogH3 from './components/BlogH3'
import BlogImage from './components/BlogImage'
import BlogLink from './components/BlogLink'
import BlogSeparator from './components/BlogSeparator'
import CodeBlock from './components/CodeBlocks'
import CustomComponents from './components/CustomComponents'
import Emphasis from './components/Emphasys'
import InlineCode from './components/InlineCode'
import { OrderedList, UnorderedList } from './components/Lists'
import { VerticalSpaceContainer } from './components/VerticalSpacer'

type TEmbeddedContentTypes =
  | 'codeJavascript'
  | 'custom-blockquote'
  | 'customComponent'

export const renderOption: Options = {
  renderMark: {
    [MARKS.CODE]: (content) => <InlineCode content={content} />,
    [MARKS.BOLD]: (content) => <Emphasis content={content} />,
  },
  renderNode: {
    // Handled by ul / ol
    [BLOCKS.LIST_ITEM]: (_node, children) => children,
    [BLOCKS.OL_LIST]: (node) => <OrderedList node={node} />,
    [BLOCKS.UL_LIST]: (node) => <UnorderedList node={node} />,
    [BLOCKS.HR]: () => <BlogSeparator />,
    [INLINES.HYPERLINK]: (node, text) => (
      <BlogLink url={node.data.uri} content={text} />
    ),
    [BLOCKS.TABLE]: (node) => (
      <div className="max-w-[100vw_-_2rem] overflow-auto">
        <div
          style={{
            gridTemplateColumns: `repeat(${((node as Block).content[0] as Block).content.length}, 1fr)`,
          }}
          className="grid gap-px rounded-lg bg-border p-px"
        >
          {node.content.flatMap((line, lineIndex) =>
            (line as Block).content.map((item, itemIndex) => (
              <div
                key={`l-${lineIndex}-i-${itemIndex}`}
                className="bg-background p-1"
              >
                {documentToReactComponents(item as Document, renderOption)}
              </div>
            )),
          )}
        </div>
      </div>
    ),
    [BLOCKS.TABLE_CELL]: (node) => (
      <div>
        {node.content.map((item) =>
          documentToReactComponents(item as Document, renderOption),
        )}
      </div>
    ),
    [BLOCKS.TABLE_HEADER_CELL]: (node) => (
      <div className="flex justify-center">
        {node.content.map((item) =>
          documentToReactComponents(item as Document, renderOption),
        )}
      </div>
    ),
    [BLOCKS.HEADING_2]: (node, children) => (
      <BlogH2 id={node.data.id} content={children} />
    ),
    [BLOCKS.HEADING_3]: (node, children) => (
      <BlogH3 id={node.data.id} content={children} />
    ),
    [BLOCKS.PARAGRAPH]: (node, children) => {
      const isEmptyParagraph =
        node.content.length === 1 &&
        'value' in node.content[0] &&
        node.content[0].value === ''

      if (isEmptyParagraph) return null
      return <p>{children}</p>
    },
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const fields = node.data.target.fields
      const url = `https://${fields.file.url}`
      const filename = fields.file.fileName
      return <BlogImage alt={filename} url={url} />
    },
    [BLOCKS.EMBEDDED_ENTRY]: (node) => {
      const contentType = node.data.target.sys.contentType.sys
        .id as TEmbeddedContentTypes

      switch (contentType) {
        case 'custom-blockquote': {
          const { type, title, content } = node.data.target.fields

          const renderedBody = (
            <VerticalSpaceContainer>
              {documentToReactComponents(content, renderOption)}
            </VerticalSpaceContainer>
          )

          return <BlockQuote type={type} title={title} content={renderedBody} />
        }

        case 'codeJavascript': {
          const { content, highlightConfig } = node.data.target.fields
          return <CodeBlock text={content} highlightConfig={highlightConfig} />
        }

        case 'customComponent': {
          const {
            componentName,
            componentFolder,
            props = {},
          } = node.data.target.fields

          let Component = () => <div>Custom element not found</div>
          if (componentFolder in CustomComponents) {
            if (
              componentName in
              CustomComponents[componentFolder as keyof typeof CustomComponents]
            ) {
              // @ts-expect-error: TypeScript cannot infer the type of the component dynamically
              Component = CustomComponents[componentFolder][componentName]
            }
          }

          return <Component {...props} />
        }
      }
    },
  },
}

export function formatDate(rawDate: string, currentLocale: TLOCALE) {
  const date = rawDate && new Date(rawDate)
  if (date === '') return null

  const formattedLocale = currentLocale === 'fr' ? 'fr-FR' : 'en-US'
  const monthFormatter = new Intl.DateTimeFormat(formattedLocale, {
    month: 'long',
  })
  const yearFormatter = new Intl.DateTimeFormat(formattedLocale, {
    year: 'numeric',
  })

  const month = monthFormatter.format(date)
  const year = yearFormatter.format(date)

  return `${month} ${year}`
}

export function hexToRgba(hex: string, alpha = 1): string {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
  hex = hex.replace(shorthandRegex, (_, r, g, b) => [r, r, g, g, b, b].join(''))

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) return ''

  const r = parseInt(result[1], 16)
  const g = parseInt(result[2], 16)
  const b = parseInt(result[3], 16)

  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

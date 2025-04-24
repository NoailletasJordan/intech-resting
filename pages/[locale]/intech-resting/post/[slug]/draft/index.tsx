import IntechRestingPost from '@/components/pageComponents/InTechRestingPost'
import { TLOCALE } from '@/constants'
import * as contentful from 'contentful'
import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const { locale, slug } = context.params as { slug: string; locale: TLOCALE }
  const client = contentful.createClient({
    space: process.env.CONTENTFUL_SPACE!,
    accessToken: process.env.CONTENTFUL_DRAFT_PREVIEW_TOKEN!,
    host: 'preview.contentful.com',
  })

  const data = await client.getEntries({
    content_type: 'blogPost',
    locale,
  })

  const singleArticleData = data.items.find(
    ({ fields }) => fields.slug === slug,
  )

  return {
    props: {
      sideArticles: [],
      pageData: singleArticleData,
      currentLocale: locale,
    },
  }
}

import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Default(props: any) {
  const router = useRouter()
  const currentUrl = router.asPath
  const otherUrl =
    props.currentLocale === 'en'
      ? currentUrl.replace('/en/', '/fr/')
      : currentUrl.replace('/fr/', '/en/')

  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div>
        <div className="flex justify-center gap-10 text-[20px] font-bold">
          <h1 className="tracking-widest text-red-300">DRAFT VERSION</h1>
          <Link href={otherUrl} className="text-blue-300">
            VISIT OTHER LANG (current {props.currentLocale})
          </Link>
        </div>
        <IntechRestingPost {...props} />
      </div>
    </>
  )
}

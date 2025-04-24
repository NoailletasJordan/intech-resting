// Redirecting to language's page
import {
  getLocaledIntechRestingPostUrl,
  getNONLocaledIntechRestingPostUrl,
  getPreferredLanguage,
} from '@/constants'
import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'

export const getServerSideProps = (context: GetServerSidePropsContext) => {
  const acceptLanguage = context.req.headers['accept-language'] ?? ''
  const preferredLanguage = getPreferredLanguage(acceptLanguage)
  const { slugPost } = context.params as { slugPost: string }

  return {
    redirect: {
      destination: getLocaledIntechRestingPostUrl(preferredLanguage, slugPost),
      permanent: true,
    },
    props: {
      slugPost,
    },
  }
}

export default function PlaceHolder({ slugPost }: { slugPost: string }) {
  return (
    <>
      <Head>
        <link
          rel="cannonical"
          hrefLang="en"
          href={getLocaledIntechRestingPostUrl('en', slugPost)}
        />
        <link
          rel="alternate"
          hrefLang="en"
          href={getLocaledIntechRestingPostUrl('en', slugPost)}
        />
        <link
          rel="alternate"
          hrefLang="en"
          href={getNONLocaledIntechRestingPostUrl({
            postId: slugPost,
          })}
        />
        <link
          rel="alternate"
          hrefLang="x-default"
          href={getLocaledIntechRestingPostUrl('en', slugPost)}
        />
        <link
          rel="alternate"
          hrefLang="fr"
          href={getLocaledIntechRestingPostUrl('fr', slugPost)}
        />
      </Head>
      <div />
    </>
  )
}

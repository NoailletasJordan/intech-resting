// Redirecting to language's page
import locales from '@/components/pageComponents/About/locales'
import {
  getLocaledIntechRestingHomeUrl,
  getNONLocalIntechRestingHomeUrl,
  getPreferredLanguage,
} from '@/constants'
import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'

export const getServerSideProps = (context: GetServerSidePropsContext) => {
  const acceptLanguage = context.req.headers['accept-language'] ?? ''
  const preferredLanguage = getPreferredLanguage(acceptLanguage)
  return {
    redirect: {
      destination: getLocaledIntechRestingHomeUrl(preferredLanguage),
      permanent: true,
    },
  }
}

export default function PlaceHolder() {
  return (
    <div>
      <Head>
        <title> Jordan Noailletas | Intech'Resting </title>
        <meta
          property="description"
          content={locales.en.work_intechresting_description}
          key="title"
        />

        <link
          rel="cannonical"
          hrefLang="en"
          href={getLocaledIntechRestingHomeUrl('en')}
        />
        <link
          rel="alternate"
          hrefLang="en"
          href={getLocaledIntechRestingHomeUrl('en')}
        />
        <link
          rel="alternate"
          hrefLang="x-default"
          href={getNONLocalIntechRestingHomeUrl()}
        />
        <link
          rel="alternate"
          hrefLang="fr"
          href={getLocaledIntechRestingHomeUrl('fr')}
        />
      </Head>
    </div>
  )
}

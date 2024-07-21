import Head from 'next/head'
import { StaticImageData } from 'next/image'

export const SeoMeta = ({ title, description, img }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:type" content="website" />
      <meta name="og:title" property="og:title" content={title} />
      <meta
        name="og:description"
        property="og:description"
        content={description}
      />
      {img ? <meta property="og:image" content={img} /> : null}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {img ? <meta name="twitter:image" content={img} /> : null}
    </Head>
  )
}

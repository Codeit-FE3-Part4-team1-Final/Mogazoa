import Head from 'next/head';

interface HeadTagInterface {
  title: string;
  description: string;
}

export default function HeadTag({ title, description }: HeadTagInterface) {
  return (
    <Head>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta property='og:type' content='website' />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:image' content='/images/logo-L.svg' />
      <meta property='og:url' content='https://mogazoa4-1.vercel.app/' />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content='/images/logo-L.svg' />
    </Head>
  );
}

import '../styles/globals.css'
import Layout from '../components/Layout'
import { useRouter } from 'next/router'
import Head from 'next/head'
import AuthStateChanged from '../helper/layout/AuthStateChanged'
import { AuthProvider } from '../helper/hooks/auth'
import '../helper/config/firebase.config'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Router from 'next/router'
import { Analytics } from '@vercel/analytics/react'

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const showLayout =
    router.pathname === '/login' ||
    router.pathname === '/signup' ||
    router.pathname === '/forgot_password' ||
    router.pathname === '/404'
      ? false
      : true
  return (
    <>
      <Head>
        <title>Camformant</title>
        <link rel="icon" href="/logo.png" />
        <meta property="og:title" content="Camformant" key="title" />
        <link
          href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;500;700&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <AuthProvider>
        <AuthStateChanged>
          {showLayout ? (
            <Layout>
              <Component {...pageProps} />
            </Layout>
          ) : (
            <Component {...pageProps} />
          )}
        </AuthStateChanged>
      </AuthProvider>
      <Analytics />
    </>
  )
}

export default MyApp

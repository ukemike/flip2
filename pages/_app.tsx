import '../styles/globals.scss'
import 'lightgallery/scss/lightgallery.scss';
import 'lightgallery/scss/lg-zoom.scss';
import type { AppProps } from 'next/app'
import store from '../src/redux/store'
import { Provider } from 'react-redux'
import Script from 'next/script'


function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-KDKEJXSEFQ" />

    <Script
      id="google-analytics"
      strategy="afterInteractive"
    >
      {
        `window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
  
        gtag('config', 'G-KDKEJXSEFQ');`
      }
    </Script>
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  </>
}

export default MyApp

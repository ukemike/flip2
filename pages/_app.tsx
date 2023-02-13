import '../styles/globals.scss'
import 'lightgallery/scss/lightgallery.scss';
import 'lightgallery/scss/lg-zoom.scss';
import type { AppProps } from 'next/app'
import store from '../src/redux/store'
import { Provider } from 'react-redux'


function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  </>
}

export default MyApp

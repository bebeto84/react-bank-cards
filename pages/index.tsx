import store from '@sdk/store';
import Head from 'next/head';
import { CardsMainContainer } from 'views/cards/CardsMain.container';
import { Provider } from 'react-redux';

export default function Home() {
  return (
    <Provider store={store}>
      <div>
        <Head>
          <title>Bank Cards with React</title>
          <link rel="icon" href="/favicon.ico" />
          <link
            rel="preload"
            href="/font/lineto-circular-pro-book.woff"
            as="font"
            crossOrigin=""
          />
        </Head>

        <main>
          <CardsMainContainer></CardsMainContainer>
        </main>

        <div id="portal"></div>
      </div>
    </Provider>
  );
}

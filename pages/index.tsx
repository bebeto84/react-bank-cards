import Head from 'next/head';
import styled from 'styled-components';
import { CardsMainContainer } from 'views/cards/CardsMain.container';

export default function Home() {
  return (
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

      <footer>
        <img src="/casumo-logo.svg" alt="Casumo Logo" />
      </footer>
      <div id="portal"></div>
    </div>
  );
}

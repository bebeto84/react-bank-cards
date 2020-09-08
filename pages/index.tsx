import Head from 'next/head';
import { CardListContainer } from '../components/card-list/card-list.container';
import styled from 'styled-components';

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
        <CardListContainer></CardListContainer>
      </main>

      <footer>
        <img src="/casumo-logo.svg" alt="Casumo Logo" />
      </footer>
      <div id="portal"></div>
    </div>
  );
}

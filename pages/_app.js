import '../styles/globals.scss'


function MyApp({ Component, pageProps }) {
  return <>

   {/* TODO: change to styled components */}
    <style jsx global>{`
      @font-face {
        font-family: 'circular-pro';
        src: url('font/lineto-circular-pro-book.woff'); 
        src: url('font/lineto-circular-pro-book.woff2') format('woff2'), 
             url('font/lineto-circular-pro-book.ttf')  format('truetype')
      }
    `}</style>
    <Component {...pageProps} />
  </>
}

export default MyApp

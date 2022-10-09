import { Head, Html, Main, NextScript } from 'next/document'
import { getCssText, globalCss } from '../stitches.config'

const globalStyles = globalCss({
  'html, body': { margin: 0, padding: 0 },
})

export default function MyDocument() {
  globalStyles()

  return (
    <Html lang="en">
      <Head>
        <meta
          name="description"
          content="Out-of-the-box Responsive StyleSheets for React Native."
        />
        <link rel="icon" href="/favicon.ico" />
        <style id="stitches" dangerouslySetInnerHTML={{ __html: getCssText() }} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

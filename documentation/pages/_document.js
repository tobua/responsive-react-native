import { Head, Html, Main, NextScript } from 'next/document'
import { getSandpackCssText } from '@codesandbox/sandpack-react'
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
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <style
          key="stitches-css"
          id="stitches"
          dangerouslySetInnerHTML={{ __html: getCssText() }}
        />
        <style
          key="sandpack-css"
          id="sandpack"
          dangerouslySetInnerHTML={{ __html: getSandpackCssText() }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

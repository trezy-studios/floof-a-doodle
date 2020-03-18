// Module imports
import Document, {
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document'
import React from 'react'





class MyDocument extends Document {
  render () {
    return (
      <Html>
        <Head>
          <script src="https://extension-files.twitch.tv/helper/v1/twitch-ext.min.js" />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}





export default MyDocument

import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head>
          <link rel='preconnect' href='https://fonts.gstatic.com' />
          <link rel='shortcut icon' href='/favicon.png' type='image/png' />
          <link rel='shortcut icon' href='/logo.png' type='image/x-icon' />
          <link
            href='https://fonts.googleapis.com/css2?family=Roboto:wght@400;700;900&display=swap'
            rel='stylesheet'
          />
          <link
            href='https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;600&display=swap'
            rel='stylesheet'
          />
          <meta name="description" content="Nesse site você pode acessar suas finanças e visualizar elas com o usuo de gráficos" />
          <link rel="manifest" href="/manifest.json" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

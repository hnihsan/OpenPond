import Document, { Html, Head, Main, NextScript } from 'next/document';

class KolekioDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html className="">
        <Head>
          <link
            rel="shortcut icon"
            href={`${process.env.PUBLIC_BASE_URL}/images/logo.png `}
          />
        </Head>
        <body className="dark:bg-gray-600">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default KolekioDocument;

import Document, { Head, Html, Main, NextScript } from "next/document";

export default class _Document extends Document {
  override render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

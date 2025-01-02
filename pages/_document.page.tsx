import Document, { DocumentContext, Head, Html, Main, NextScript } from "next/document";

import { ELocale } from "@/shared/components/LanguageSelector";

export default class _Document extends Document {
  static override async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  override render() {
    const locale = this.props.__NEXT_DATA__.locale;

    const languageDirection = locale === ELocale.ARABIC ? "rtl" : "ltr";

    return (
      <Html dir={languageDirection}>
        <Head>
          {/* eslint-disable-next-line @next/next/no-sync-scripts */}
          <script src="/__ENV.js" />
          <link rel="manifest" href="/manifest.json" />
          <meta name="theme-color" content="#000000" />
          <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content="NextJS App" />
        </Head>
        <body dir={languageDirection}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

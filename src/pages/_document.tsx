import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script
          async
          defer
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_APP_GOOGLE_AP_KEY}&libraries=places`}
          type="text/javascript"
        ></script>
      </Head>
      <body>
        <Main />
        <NextScript />
        <div id="start"></div>
        <div id="end"></div>
        <div id="map"></div>
      </body>
    </Html>
  );
}

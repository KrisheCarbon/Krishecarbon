// pages/_app.jsx
import "@/styles/globals.css";
import Head from "next/head";
import { DM_Serif_Display } from "next/font/google";
import { Inter } from "next/font/google";

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  variable: "--font-dm-serif",
  weight: ["400"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300","400","500","600","700"],
});

const SITE_NAME = "KriSHE Carbon";
const SITE_DESCRIPTION =
  "KriSHE Carbon improves soil health for smallholder farmers with biochar, funded by verified carbon credits so farmers earn twice: healthier soil and carbon income.";

// Tells Google the site's name for search results.
const siteNameJsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: "https://krishecarbon.com/",
});

export default function App({ Component, pageProps }) {
  return (
    <div className={`${dmSerifDisplay.variable} ${inter.variable}`}>
      {/* Site-wide defaults; a page's own <title> overrides this one. */}
      <Head>
        <title>{SITE_NAME}</title>
        <meta name="description" content={SITE_DESCRIPTION} key="description" />
        <meta property="og:site_name" content={SITE_NAME} key="og:site_name" />
        <meta property="og:title" content={SITE_NAME} key="og:title" />
        <meta property="og:description" content={SITE_DESCRIPTION} key="og:description" />
        <meta name="application-name" content={SITE_NAME} key="application-name" />
        <script
          type="application/ld+json"
          key="site-name"
          dangerouslySetInnerHTML={{ __html: siteNameJsonLd }}
        />
      </Head>

      {/* Global font setup */}
      <style jsx global>{`
        :root {
          --font-heading: var(--font-dm-serif);
          --font-body: var(--font-inter);
        }

        /* Default body = Inter */
        html, body {
          font-family: var(--font-body), system-ui, -apple-system, "Segoe UI",
            Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji";
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        /* Headings use DM Serif Display, per the KriSHE Carbon brand sheet */
        h1, h2, h3, h4, h5, h6, strong, .font-heading {
          font-family: var(--font-heading), system-ui, sans-serif;
        }

        /* Utility if you ever need to force Inter on an element */
        .font-body {
          font-family: var(--font-body), system-ui, sans-serif !important;
        }
      `}</style>

      <Component {...pageProps} />
    </div>
  );
}


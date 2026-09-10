// pages/_app.jsx
import "@/styles/globals.css";
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

export default function App({ Component, pageProps }) {
  return (
    <div className={`${dmSerifDisplay.variable} ${inter.variable}`}>
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


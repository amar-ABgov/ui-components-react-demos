"use client";

import dynamic from "next/dynamic";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import Script from "next/script";

const Nav = dynamic(() => import("./components/nav"), { ssr: false });
const GoAAppFooter = dynamic(
  () => import("@abgov/react-components").then((module) => module.GoAAppFooter),
  {
    ssr: false,
  }
);
const GoAAppHeader = dynamic(
  () => import("@abgov/react-components").then((module) => module.GoAAppHeader),
  {
    ssr: false,
  }
);
const GoAMicrositeHeader = dynamic(
  () =>
    import("@abgov/react-components").then(
      (module) => module.GoAMicrositeHeader
    ),
  {
    ssr: false,
  }
);

const GoAOneColumnLayout = dynamic(
  () =>
    import("@abgov/react-components").then(
      (module) => module.GoAOneColumnLayout
    ),
  {
    ssr: false,
  }
);

export const MAX_CONTENT_WIDTH = "1500px";

export default function RootLayout({ children }) {
  return (
    <SessionProvider>
      <html lang="en">
        <head>
          <title>Design System Demos</title>
          <Script
            strategy="afterInteractive"
            src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"
          ></Script>
          <Script
            strategy="afterInteractive"
            src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"
          ></Script>
          <Script
            strategy="lazyOnload"
            src="@abgov/web-components/web-components.es.js"
          ></Script>
        </head>
        <body>
          <GoAOneColumnLayout>
            <section className="header" slot="header">
              <GoAMicrositeHeader
                type={"alpha"}
                feedbackUrl="https://github.com/GovAlta/ui-components/discussions"
                maxContentWidth={MAX_CONTENT_WIDTH}
              />
              <GoAAppHeader
                heading="Design system demos"
                maxContentWidth={MAX_CONTENT_WIDTH}
              ></GoAAppHeader>
            </section>
            <section className="content">
              <Nav />
              <main className="main">{children}</main>
            </section>

            <section slot="footer">
              <GoAAppFooter maxContentWidth={MAX_CONTENT_WIDTH}></GoAAppFooter>
            </section>
          </GoAOneColumnLayout>
        </body>
      </html>
    </SessionProvider>
  );
}

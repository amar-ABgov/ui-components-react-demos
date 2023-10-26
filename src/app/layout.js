"use client";
import {
  GoAAppFooter,
  GoAAppHeader,
  GoAMicrositeHeader,
  GoAOneColumnLayout
} from "@abgov/react-components";
import "./globals.css";
import Nav from "./components/nav";
import { SessionProvider } from 'next-auth/react';
import Script from 'next/script'


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
            <Nav/>
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

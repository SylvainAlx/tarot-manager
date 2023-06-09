import Nav from "@/components/nav";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <header>
          <h1>Tarot Manager</h1>
          <Nav />
        </header>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

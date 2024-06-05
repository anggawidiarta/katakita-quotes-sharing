import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.scss";
import Nav from "@/components/Navbar/Navbar";
import Provider from "@/components/Provider";
import Footer from "@/components/Footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KataKita",
  icons: {
    icon: [
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        url: "/apple-touch-icon.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        url: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        url: "/favicon-16x16.png",
      },
    ],
  },
  description: "A Powerful Message App",
  authors: {
    name: "anggawidiarta",
    url: "https://github.com/anggawidiarta",
  },
  manifest: "/site.webmanifest",
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout(props: Props) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient "></div>
          </div>
          <main className="app pt-5 pb-10">
            <Nav />
            {props.children}
          </main>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}

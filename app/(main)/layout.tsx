import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.scss";
import Nav from "@/components/Navbar/Navbar";
import Feed from "@/components/Feed/Feed";
import Provider from "@/components/Provider";
import Footer from "@/components/Footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KataKita",
  icons: "/assets/icons/bad.png",
  description: "A Powerful Message App",
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

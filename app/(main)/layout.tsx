import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.scss";
import Nav from "@/components/Navbar/Navbar";
import Feed from "@/components/Feed/Feed";
import Provider from "@/components/Provider";

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
          <main className="app py-5">
            <Nav />
            {props.children}
          </main>
        </Provider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "@/styles/globals.scss";
import Provider from "@/components/Provider";

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
          <div>{props.children}</div>
        </Provider>
      </body>
    </html>
  );
}

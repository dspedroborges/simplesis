import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GlobalProvider } from "./components/providers/GlobalProvider";
import Footer from "./components/Footer";
import Whatsapp from "./components/Whatsapp";
import MenuWrapper from "./components/wrappers/MenuWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Simplesis",
  description: "Simplifique a gestão do seu negócio.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <GlobalProvider>
          <MenuWrapper />
          <Whatsapp />
          {children}
          <Footer />
        </GlobalProvider>
      </body>
    </html>
  );
}

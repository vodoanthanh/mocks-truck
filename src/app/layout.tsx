import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mocks Truck",
  description:
    "Mocks Truck provides a simple way for API mocks with customizations by each session.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="container mx-auto">
          <header className="flex justify-center items-center font-bold py-8 px-4 text-3xl text-white bg-gradient-orange">
            Mocks Truck
          </header>
          <main className="py-10">
            <Providers>{children}</Providers>
          </main>
        </div>
      </body>
    </html>
  );
}

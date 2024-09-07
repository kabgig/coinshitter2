
import type { Metadata } from "next";
import localFont from "next/font/local";
import NavBar from "./components/NavBar";
import "./globals.css";
import { Box, ChakraProvider } from '@chakra-ui/react'

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ChakraProvider>
          <NavBar />
          <main className="p-5">
            <Box>{children}</Box>
          </main>
        </ChakraProvider>
      </body>
    </html>
  );
}
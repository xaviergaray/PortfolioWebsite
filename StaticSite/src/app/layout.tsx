import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/ui/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Xavier Garay Portfolio",
  description: "Xavier Garay's Personal Portfolio. View many of my skills, projects, and credentials in this website!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
          <body className={inter.className}
                style={{display: "flex", justifyContent: "center", backgroundImage: "url('/pageBackground.webp')"}}>
            {children}
          </body>
      </html>
  );
}

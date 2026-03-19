import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Lumia Brief",
  description:
    "Premium creative brief builder for influencer marketing teams."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}

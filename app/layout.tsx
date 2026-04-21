import { ReactNode } from "react";


// Removed unknown font imports
// import { GeistMono } from 'next/font/google';
// import { Geist } from 'next/font/google';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}

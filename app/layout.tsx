import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Animation for the win",
  description: "Animation for the win",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.className}  h-full antialiased`}>
      <body
        className="flex flex-col min-h-full "
        style={{
          fontFamily: "Poppins",
        }}
      >
        {children}
      </body>
    </html>
  );
}

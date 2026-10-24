import { client, urlFor } from "@/lib/sanity";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export async function generateMetadata() {
  // Mengambil pengaturan dari Sanity
  const settings = await client.fetch(`*[_type == "pengaturanWeb"][0]`);

  return {
    title: settings?.judulWebsite || "Pemerintah Kabupaten Banyuwangi",
    icons: {
      icon: settings?.favicon ? urlFor(settings.favicon).url() : "/favicon.ico",
    },
  };
}

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

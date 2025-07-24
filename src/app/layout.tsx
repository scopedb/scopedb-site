import { AntdRegistry } from '@ant-design/nextjs-registry'
import { Inter, Roboto_Mono } from "next/font/google"
import "./globals.css"
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${robotoMono.variable} antialiased`}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="alternate" type="application/rss+xml" title="RSS Feed" href="/rss.xml" />
        <script async defer data-domain="scopedb.io" src="https://plausible.io/js/script.js" />
      </head>

      <body className="flex flex-col min-h-screen">
        <AntdRegistry>
          <header className="sticky top-0 z-50 bg-white/75 backdrop-blur-sm">
            <Header />
          </header>
          <main className="flex-1 overflow-x-hidden">
            {children}
          </main>
          <footer className="mt-auto">
            <Footer />
          </footer>
        </AntdRegistry>
      </body>
    </html>
  );
}

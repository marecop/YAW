import type { Metadata } from "next";
import "./globals.css";
import { CurrencyProvider } from "@/contexts/CurrencyContext";
import { AuthProvider } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Yellow Airlines - 黄色航空",
  description: "探索我们下次旅行的最佳目的地 | Discover your next best destination",
  icons: {
    icon: '/images/logoremovebkgnd.png',
    shortcut: '/images/logoremovebkgnd.png',
    apple: '/images/logoremovebkgnd.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-HK">
      <body className="antialiased">
        <AuthProvider>
          <CurrencyProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-1">{children}</main>
              <Suspense fallback={null}>
                <Footer />
              </Suspense>
            </div>
          </CurrencyProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

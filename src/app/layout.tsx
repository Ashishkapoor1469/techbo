
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import BottomNav from "@/components/layout/bottom-nav";
import MainLayout from "@/components/layout/main-layout";
import { ThemeProvider } from '@/providers/theme-provider';
import AuthProviders from '@/context/AuthProviders';
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Techbo',
  description: 'Discover and share dev tools, frameworks, and packages.',

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <AuthProviders>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}>
        <ThemeProvider
          defaultTheme="light"
          storageKey="devspot-theme"
        >
          <MainLayout>
            {children}
          </MainLayout>
          <BottomNav />
          <Toaster />
        </ThemeProvider>
      </body>
      </AuthProviders>
    </html>
  );
}

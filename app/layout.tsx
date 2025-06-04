import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from "@/components/providers/auth-provider";
import { ReduxProvider } from "@/components/providers/redux-provider";
import ClientHealthMonitor from "@/components/client-health-monitor";
import { SocketProvider } from "@/lib/socket/socket-context";
import GlobalNavbar from "@/components/navbar/GlobalNavbar";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Edu Matrix Interlinked | Educational Platform",
  description: "Comprehensive educational platform with multi-tenant support for institutions, students, and educators",
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
        <AuthProvider>
          <ReduxProvider>
            <SocketProvider>
              <GlobalNavbar />
              <ClientHealthMonitor />
              {children}
              <Toaster position="top-right" />
            </SocketProvider>
          </ReduxProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

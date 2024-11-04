import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/navigation/sidebar";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Acordo Terapêutico",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <div className="flex flex-col min-h-screen">
          <NavBar />
          <div className="flex flex-grow items-center justify-center">
            <div className="w-full max-w-4xl md:p-10 p-4">
              {children}
            </div>
          </div>
          <Toaster />
        </div>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/navigation/sidebar";

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
                <div className="flex flex-col h-screen">
                    <NavBar />
                    <div className="flex w-full p-4">
                        {children}
                    </div>
                </div>
            </body>
        </html>
    );
}

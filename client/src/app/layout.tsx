import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/providers/session-provider";
import { Toaster } from "@/components/ui/sonner";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Chat App",
    description: "Scalable Chat App",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <SessionProvider>
                <body suppressHydrationWarning className={outfit.className}>
                    {children}
                    <Toaster
                        richColors
                        duration={2000}
                        position="top-right"
                        toastOptions={{
                            style: {
                                color: "black",
                                backgroundColor: "white",
                            },
                        }}
                    />
                </body>
            </SessionProvider>
        </html>
    );
}

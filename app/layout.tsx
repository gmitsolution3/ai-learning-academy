import type { Metadata } from "next";
import { Inter, Anek_Bangla } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "react-hot-toast";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import AuthProvider from "@/lib/auth-provider";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const anekBangla = Anek_Bangla({
  weight: ["400", "700"],
  subsets: ["bengali", "latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AI Learning Academy",
  description:
    "বাংলায় ২১ শতকের ক্রিয়েটিভ স্কিল শেখার আধুনিক প্ল্যাটফর্ম",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <html
      lang="bn"
      className={`${inter.className} ${anekBangla.className} h-full antialiased`}
    >
      <body className="min-h-full">
        <AuthProvider session={session}>
          <TooltipProvider>{children}</TooltipProvider>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}

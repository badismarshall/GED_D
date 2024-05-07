import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getLoggedInUser } from "@/lib/appwrite/api";
import { redirect } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DCNSI",
  description: "DCNSI",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  const user = await getLoggedInUser();
  if(user) redirect('/dashboard')

  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
// import "@/app/globals.css";

// import AuthProvider from "@/context/AuthProvider";
// import { Toaster } from "@/components/ui/toaster"
// import Navbar from "@/components/Navbar";
// import { Inter } from "next/font/google";

// const inter = Inter({ subsets: ["latin"] });

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <AuthProvider>
//       <body className={inter.className}>
//           <Navbar />
//         {children}
//         <Toaster />
//       </body>
//       </AuthProvider>
//     </html>
//   );
// }
import Navbar from '@/components/Navbar';

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {children}
    </div>
  );
}

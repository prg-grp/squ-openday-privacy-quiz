import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Image from 'next/image';
import logo from '../public/logo.svg';
import students from '../public/students.png';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Data Privacy Quiz',
  description: 'Quiz, um das Wissen über Datenschutz zu testen',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-hsgGreen`}>
        <Image src={students} alt="Students" className="absolute bottom-4 left-4 w-auto h-auto max-h-[25%]" />
        <div className="bg-white absolute top-4 right-4 px-4 py-2 rounded-xl">
          <Image src={logo} alt="Universität St. Gallen Logo" className="w-60 h-auto" />
        </div>
        <div className="relative">{children}</div>
      </body>
    </html>
  );
}

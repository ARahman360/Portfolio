import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Md Abdur Rahman | Industrial Information Technology',
  description: 'Portfolio of Md Abdur Rahman, Industrial Information Technology student at LAB University of Applied Sciences.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

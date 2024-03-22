import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/sonner';
import './globals.css';

export const metadata: Metadata = {
  title: 'Best Internet',
  description: 'Revisa la mejor opción de Internet en tu zona.',
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang='es'>
      <body>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}

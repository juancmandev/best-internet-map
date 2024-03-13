import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Best Internet',
  description: 'Check the best option for your ISP!',
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang='en'>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}

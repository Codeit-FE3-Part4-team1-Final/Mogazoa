import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import '../styles/globals.scss';
import ReactQueryProvider from '../../providers/ReactQueryProvider';
import NavigationBar from '@/components/NavigationBar';
import { ModalStoreProvider } from '../../providers/ModalStoreProvider';
import ProgressBar from '@/components/Loading/Nprogress';
import Floating from '@/components/Floating';
import KakaoScript from '../../providers/KakaoScript';

declare global {
  interface Window {
    // eslint-disable-next-line
    Kakao: any;
  }
}

export const metadata: Metadata = {
  title: 'Mogazoa',
  description: 'Platform for reviewing products in various fields',
  icons: {
    icon: '/images/logo-L.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = cookies().get('accessToken');
  const isLoggedIn = !!token?.value;

  return (
    <html lang='ko'>
      <body>
        <ProgressBar />
        <ReactQueryProvider>
          <ModalStoreProvider>
            <NavigationBar isLoggedIn={isLoggedIn} />
            {children}
            {isLoggedIn && <Floating token={token.value} />}
          </ModalStoreProvider>
        </ReactQueryProvider>
      </body>
      <KakaoScript />
    </html>
  );
}

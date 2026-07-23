import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { profileData } from '@/data/profile';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata = {
  metadataBase: new URL('https://kibretai.vercel.app'),
  title: `${profileData.name} | AI Engineer & Computer Engineer`,
  description: profileData.bio.summary,
  keywords: [
    'Kibret Mulugeta',
    'AI Engineer',
    'Machine Learning Engineer',
    'Computer Engineer',
    'Deep Learning',
    'U-Net',
    'Medical Image Segmentation',
    'Brain MRI',
    'Python Developer',
    'FastAPI',
    'Computer Vision'
  ],
  authors: [{ name: profileData.name }],
  robots: 'index, follow',
  openGraph: {
    title: `${profileData.name} | AI Engineer & Computer Engineer`,
    description: profileData.bio.tagline,
    url: 'https://kibretai.vercel.app',
    siteName: 'Kibret Mulugeta Identity Platform',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-dark-bg text-brand-text min-h-screen flex flex-col antialiased selection:bg-brand-cyan/20 selection:text-brand-cyan">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

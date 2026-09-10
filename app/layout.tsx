import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'KKN Pop Journal - Desa Toapaya',
  description: 'Website Resmi KKN 27 Desa Toapaya 2026',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="bg-cream text-ink min-h-screen flex flex-col">
        {/* Responsive Navbar Component */}
        <Navbar />

        {/* Content Pages */}
        <main className="flex-grow">{children}</main>

        {/* Footer */}
        <footer className="bg-surface neo-border border-t-2 py-8 px-4 text-center mt-12 bg-pattern">
          <p className="label-caps text-xs">
            © 2026 KKN 27 DESA TOAPAYA — Orang Ganteng yang buat
          </p>
        </footer>
      </body>
    </html>
  );
}
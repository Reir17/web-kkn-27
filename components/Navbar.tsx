'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Beranda', href: '/' },
    { name: 'Profil Tim', href: '/tim' },
    { name: 'Program Kerja', href: '/proker' },
    { name: 'Buku Kenangan', href: '/kenangan' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-cream neo-border border-b-2 px-4 py-3 md:px-8 bg-pattern">
      {/* Container: Flex di Mobile & Grid 3-Kolom Presisi di Desktop */}
      <div className="max-w-6xl mx-auto flex justify-between items-center md:grid md:grid-cols-3">
        
        {/* Kolom 1: Logo & Branding Ciamik */}
        <div className="flex items-center justify-start">
          <Link href="/" className="group flex items-center gap-3 select-none">
            
            {/* Wrapper Logo Avatar Neo-Brutalism */}
            <div className="relative">
              <div className="w-12 h-12 md:w-12 md:h-12 bg-primary rounded-2xl neo-border neo-shadow-sm flex items-center justify-center p-1 overflow-hidden transition-all duration-300 group-hover:-rotate-6 group-hover:scale-105">
                <img 
                  src="/logo-kkn.png" 
                  alt="Logo KKN Desa Toapaya" 
                  className="w-full h-full object-contain drop-shadow-sm" 
                />
              </div>

              {/* Ornamen Bintang Mini Sparkle (Pop Effect) */}
              <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-secondary text-[9px] text-white font-extrabold neo-border animate-bounce">
                ✦
              </span>
            </div>

            {/* Typography KKN 27 & Desa Toapaya */}
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-black font-syne text-xl md:text-2xl text-ink tracking-tight leading-none group-hover:text-secondary transition-colors">
                  KKN
                </span>
                
                {/* Badge Stiker Angka 27 */}
                <span className="bg-primary text-ink text-xs font-black px-2 py-0.5 rounded-lg neo-border neo-shadow-sm -rotate-3 group-hover:rotate-6 transition-transform duration-300">
                  27
                </span>
              </div>

              {/* Tagline Desa Toapaya dengan Live Dot */}
              <div className="mt-1 flex items-center">
                <span className="bg-secondary/10 border border-secondary/30 text-secondary text-[9px] md:text-[10px] font-black label-caps px-2 py-0.5 rounded-full whitespace-nowrap flex items-center gap-1.5">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-secondary"></span>
                  </span>
                  DESA TOAPAYA
                </span>
              </div>
            </div>

          </Link>
        </div>

        {/* Kolom 2: Navigasi Utama (Single Line / 1 Baris) */}
        <div className="hidden md:flex items-center justify-center gap-2 lg:gap-3 label-caps text-xs font-bold">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3.5 py-2 rounded-full neo-border neo-shadow-sm neo-btn transition-colors whitespace-nowrap ${
                  isActive
                    ? 'bg-primary text-ink'
                    : 'bg-cream text-ink hover:bg-secondary hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Kolom 3: Tombol Posko & Burger Mobile */}
        <div className="flex items-center justify-end gap-2">
          <button className="hidden md:block bg-tertiary text-white label-caps text-xs px-4 py-2 rounded-full neo-border neo-shadow-sm neo-btn whitespace-nowrap">
            Posko Utama 📍
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden bg-primary text-ink w-9 h-9 rounded-xl neo-border neo-shadow-sm neo-btn font-extrabold text-lg flex items-center justify-center focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {isOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Menu Dropdown Mobile */}
      {isOpen && (
        <div className="md:hidden max-w-6xl mx-auto mt-3 bg-cream rounded-2xl neo-border neo-shadow p-4 space-y-2">
          <div className="flex flex-col gap-2 label-caps text-xs font-bold">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-2.5 rounded-xl neo-border flex items-center justify-between transition-all ${
                    isActive
                      ? 'bg-primary neo-shadow-sm text-ink'
                      : 'bg-white text-ink hover:bg-gray-100'
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && (
                    <span className="text-[10px] bg-secondary text-white px-2 py-0.5 rounded-full font-bold">
                      Aktif
                    </span>
                  )}
                </Link>
              );
            })}

            <button
              onClick={() => setIsOpen(false)}
              className="bg-tertiary text-white label-caps text-xs py-2.5 px-4 rounded-xl neo-border neo-shadow-sm neo-btn w-full mt-1"
            >
              Posko Utama 📍
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
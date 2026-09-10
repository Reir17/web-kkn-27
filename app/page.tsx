import Link from 'next/link';

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8 md:py-16 overflow-hidden">
      {/* Hero Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center mb-12 md:mb-16">
        <div>
          <div className="inline-block bg-primary px-3 py-1 rounded-full neo-border neo-shadow-sm label-caps text-xs mb-4">
            ✦ Periode Agustus 2026
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold leading-tight mb-4 md:mb-6">
            31 Hari Mengabdi, <br />
            <span className="text-secondary underline decoration-primary decoration-wavy">Seumur Hidup</span> <br />
            Menginspirasi!
          </h1>
          <p className="text-sm sm:text-base md:text-lg mb-6 md:mb-8 text-gray-800 leading-relaxed">
            Selamat datang di etalase arsip digital KKN Kita! Merangkum tawa posko, dedikasi warga desa, dan tak hingga proker nyata bersama warga Desa Toapaya.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="/proker" 
              className="bg-primary text-ink label-caps text-sm px-6 py-3 rounded-full neo-border neo-shadow neo-btn text-center inline-block"
            >
              Jelajahi Proker ➔
            </Link>
          </div>
        </div>

        {/* Hero Photo Collage */}
        <div className="relative h-[290px] sm:h-[350px] md:h-[380px] flex items-center justify-center mt-2 md:mt-0">
          <div className="polaroid absolute top-2 right-2 sm:top-4 sm:right-4 w-52 sm:w-64 md:w-72 rotate-3 neo-shadow-lg z-20">
            <div className="washi-tape"></div>
            <div className="bg-surface-dim h-36 sm:h-44 md:h-48 rounded neo-border flex items-center justify-center font-bold text-xs sm:text-sm">
              Foto Tim Posko
            </div>
            <p className="scrapbook-note text-center text-[11px] sm:text-xs mt-2 sm:mt-3">
              Hari Pertama di Desa Toapaya ❤️
            </p>
          </div>
          
          <div className="polaroid absolute bottom-2 left-2 sm:bottom-4 sm:left-4 w-48 sm:w-60 md:w-64 -rotate-6 neo-shadow-lg z-10">
            <div className="bg-tertiary/20 h-32 sm:h-38 md:h-40 rounded neo-border flex items-center justify-center font-bold text-xs sm:text-sm">
              Foto Proker
            </div>
            <p className="scrapbook-note text-center text-[11px] sm:text-xs mt-2 sm:mt-3">
              Mengajar Anak SD 📚
            </p>
          </div>
        </div>
      </div>

      {/* Grid Statistik */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-primary p-4 sm:p-6 rounded-2xl neo-border neo-shadow text-center">
          <h3 className="text-3xl md:text-4xl font-extrabold">31</h3>
          <p className="label-caps text-[10px] sm:text-xs mt-1">Hari Mengabdi</p>
        </div>
        <div className="bg-secondary text-white p-4 sm:p-6 rounded-2xl neo-border neo-shadow text-center">
          <h3 className="text-3xl md:text-4xl font-extrabold">♾️ + 1</h3>
          <p className="label-caps text-[10px] sm:text-xs mt-1">Program Kerja</p>
        </div>
        <div className="bg-tertiary text-white p-4 sm:p-6 rounded-2xl neo-border neo-shadow text-center">
          <h3 className="text-3xl md:text-4xl font-extrabold">1500+</h3>
          <p className="label-caps text-[10px] sm:text-xs mt-1">Warga Terlibat</p>
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-2xl neo-border neo-shadow text-center">
          <h3 className="text-3xl md:text-4xl font-extrabold">100%</h3>
          <p className="label-caps text-[10px] sm:text-xs mt-1">Selesai Tuntas</p>
        </div>
      </div>
    </div>
  );
}
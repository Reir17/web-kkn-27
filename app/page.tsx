'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

// ----------------------------------------------------------------------
// TYPES & INTERFACES
// ----------------------------------------------------------------------
interface Quote {
  name: string;
  role: string;
  quote: string;
}

interface Track {
  id: number;
  title: string;
  desc: string;
  duration: string;
  audioUrl: string;
}

interface SoundtrackPoskoProps {
  isPlaying: boolean;
  isMuted: boolean;
  activeTrackId: number;
  onTogglePlay: () => void;
  onToggleMute: () => void;
  onSelectTrack: (id: number) => void;
}

// ----------------------------------------------------------------------
// DATA KATA-KATA IKONIK (19 ANGGOTA)
// ----------------------------------------------------------------------
const KKN_QUOTES: Quote[] = [
  { name: 'Hendy Prayudha', role: 'Ketua (Kordes)', quote: 'Ok, jadi intinya......!' },
  { name: 'Siti Salamah', role: 'Wakil Ketua', quote: 'Kimbekkkk! Teloorr!' },
  { name: 'Renaldi', role: 'Sekretaris 1', quote: 'Eiii... dah pandai yee' },
  { name: 'Agustina Puji Anggraeni', role: 'Sekretaris 2', quote: 'Siti semalam aku ngorok ga...?' },
  { name: 'Najwa Anisa', role: 'Bendahara', quote: 'Hayooo....!' },
  { name: 'Arizal Akbar', role: 'Koor Acara', quote: 'Proker yang baik adalah proker yang selesai' },
  { name: 'Nazira', role: 'Anggota Acara', quote: '76 apel....!' },
  { name: 'Delvi Natalia Panjaitan', role: 'Anggota Acara', quote: 'Weeei bisa masak air hangat ga...?' },
  { name: 'Irpan Haris', role: 'Koor Humas', quote: 'Aman ajaa....!' },
  { name: 'Aldina Cipta Lila Wangsa', role: 'Anggota Humas', quote: 'Kenapa sihht...... marah marah terus?' },
  { name: 'Etha Sheril Siagian', role: 'Anggota Humas', quote: 'Weehh...Hairdryer aku mana?' },
  { name: 'Dea Lestari', role: 'Koor Konsumsi', quote: 'Wee sapa yang belum makann nii...!' },
  { name: 'Sintia', role: 'Anggota Konsumsi', quote: 'Wee...Kalian tau tak...!' },
  { name: 'Tri Rahmawati', role: 'Anggota Konsumsi', quote: 'Ecobrick...Ecobrick...Ecobrick!' },
  { name: 'Muhammad Fauzan Hakim', role: 'Koor Perlengkapan', quote: 'bau Cungutzz!' },
  { name: 'Misko Ferdyansya Purba', role: 'Anggota Perlengkapan', quote: 'Ko dengar tak...?' },
  { name: 'Suhaeni', role: 'Anggota Perlengkapan', quote: 'ihh kau ni Misko...!' },
  { name: 'Selvia Dwinanda', role: 'Koor PDD', quote: 'Woi cepatlahh...! Kata nak foto...!' },
  { name: 'Siti Wela Aliza', role: 'Anggota PDD', quote: 'aku minta maaf guys....pokoknya...pokoknya...!' },
  { name: 'Sherlina Sonia Putri', role: 'Anggota PDD', quote: 'Gerrodd.....!' },
];

// ----------------------------------------------------------------------
// DATA PLAYLIST SOUNDTRACK POSKO
// ----------------------------------------------------------------------
const PLAYLIST_DATA: Track[] = [
  {
    id: 1,
    title: 'Sheila On 7 - Melompat Lebih Tinggi',
    desc: 'Lagu wajib pas senam pagi warga',
    duration: '03:15',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  },
  {
    id: 2,
    title: 'Denny Caknan - Kartonyono Medot Janji',
    desc: 'Karaoke bapak-bapak ronda malam',
    duration: '04:22',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  },
  {
    id: 3,
    title: 'Hindia - Rumah Ke Rumah',
    desc: 'Theme song anak-anak rindu kasur rumah',
    duration: '03:55',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
  },
  {
    id: 4,
    title: 'Fiersa Besari - Celengan Rindu',
    desc: 'Gitaran jam 1 subuh di balai bambu',
    duration: '04:02',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
  },
];

// ----------------------------------------------------------------------
// KOMPONEN SOUNDTRACK POSKO
// ----------------------------------------------------------------------
function SoundtrackPosko({
  isPlaying,
  isMuted,
  activeTrackId,
  onTogglePlay,
  onToggleMute,
  onSelectTrack,
}: SoundtrackPoskoProps) {
  const currentTrack = PLAYLIST_DATA.find((t) => t.id === activeTrackId) || PLAYLIST_DATA[0];

  return (
    <div className="max-w-5xl mx-auto bg-[#FFFDF9] p-5 sm:p-8 rounded-3xl border-[3px] border-[#1E1B4B] shadow-[8px_8px_0px_0px_#1E1B4B] font-sans">
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b-2 border-dashed border-gray-300">
        <div>
          <span className="bg-[#E11D48] text-white text-[10px] sm:text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5 border border-[#1E1B4B] shadow-[2px_2px_0px_0px_#1E1B4B]">
            <span>✦</span> AUDIO CASSETTE 1990s
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#1E1B4B] tracking-tight flex items-center gap-2 mt-2">
            Soundtrack Posko <span className="text-xl">🎵 📻</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed mt-0.5">
            Playlist lagu wajib yang diputar tiada henti di speaker bluetooth posko.
          </p>
        </div>

        {/* Global Controls */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={onTogglePlay}
            className={`px-4 py-2.5 rounded-2xl border-2 border-[#1E1B4B] font-black text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer active:translate-x-0.5 active:translate-y-0.5 ${
              isPlaying
                ? 'bg-[#FF597B] text-white shadow-[3px_3px_0px_0px_#1E1B4B]'
                : 'bg-[#38E54D] text-[#1E1B4B] shadow-[3px_3px_0px_0px_#1E1B4B]'
            }`}
          >
            <span>{isPlaying ? '⏸️ Pause' : '▶️ Putar Musik'}</span>
          </button>

          <button
            type="button"
            onClick={onToggleMute}
            className="p-2.5 bg-white hover:bg-gray-100 rounded-2xl border-2 border-[#1E1B4B] shadow-[3px_3px_0px_0px_#1E1B4B] text-sm transition-all cursor-pointer active:translate-x-0.5 active:translate-y-0.5"
            title={isMuted ? 'Nyalakan Suara' : 'Matikan Suara'}
          >
            {isMuted ? '🔇' : '🔊'}
          </button>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
        
        {/* CASSETTE PLAYER (5 KOLOM DESKTOP) */}
        <div className="lg:col-span-5 bg-[#1C1D38] text-white rounded-3xl p-5 border-[3px] border-[#1E1B4B] shadow-[6px_6px_0px_0px_#1E1B4B] space-y-4 relative overflow-hidden">
          
          <div className="flex items-center justify-between text-[10px] sm:text-xs font-extrabold tracking-widest uppercase">
            <span className="text-[#F59E0B] flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${isPlaying && !isMuted ? 'bg-red-500 animate-ping' : 'bg-gray-500'}`}></span>
              SIDE A • STEREO MEMORIES
            </span>
            <span className="bg-[#EF4444] text-white px-2.5 py-0.5 rounded-full text-[9px] font-black border border-black">
              C-60
            </span>
          </div>

          {/* Visual Pita Kaset Analog */}
          <div className="bg-[#121327] rounded-2xl p-4 border border-white/20 flex items-center justify-between px-6 sm:px-8 relative my-2">
            <div
              className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-dashed border-white/50 flex items-center justify-center ${
                isPlaying && !isMuted ? 'animate-[spin_4s_linear_infinite]' : ''
              }`}
            >
              <div className="w-4 h-4 bg-white/90 rounded-full border border-gray-900"></div>
            </div>

            <div className="bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/20 text-center">
              <span className="text-[10px] sm:text-xs font-black text-white/90 tracking-widest uppercase block">
                KKN 27 TOAPAYA
              </span>
            </div>

            <div
              className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-dashed border-white/50 flex items-center justify-center ${
                isPlaying && !isMuted ? 'animate-[spin_4s_linear_infinite]' : ''
              }`}
            >
              <div className="w-4 h-4 bg-white/90 rounded-full border border-gray-900"></div>
            </div>
          </div>

          {/* Status Now Playing */}
          <div className="flex items-center justify-between text-xs font-semibold text-gray-300 pt-1">
            <span className="truncate max-w-[210px]">
              <strong className="text-white font-bold">Now Playing:</strong>{' '}
              <span className="text-[#FFD15C] font-extrabold">
                {currentTrack.title.split(' - ')[1] || currentTrack.title}
              </span>
            </span>
            <span className="text-gray-400 font-mono text-xs">
              {currentTrack.duration}
            </span>
          </div>

        </div>

        {/* DAFTAR TRACK (7 KOLOM DESKTOP) */}
        <div className="lg:col-span-7 space-y-3">
          {PLAYLIST_DATA.map((track) => {
            const isActive = track.id === activeTrackId;
            return (
              <div
                key={track.id}
                onClick={() => onSelectTrack(track.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && onSelectTrack(track.id)}
                className={`p-3.5 sm:p-4 rounded-2xl transition-all cursor-pointer flex items-center justify-between gap-3 border-2 border-[#1E1B4B] ${
                  isActive
                    ? 'bg-[#FFF9C4] shadow-[4px_4px_0px_0px_#1E1B4B] translate-x-1'
                    : 'bg-white hover:bg-gray-50 shadow-[2px_2px_0px_0px_#1E1B4B]'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0">
                    {isActive ? (
                      <div className="w-6 h-6 rounded-full bg-[#F59E0B] text-white flex items-center justify-center text-xs font-bold border border-[#1E1B4B]">
                        {isPlaying && !isMuted ? '▶' : '⏸'}
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">🎵</span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-xs sm:text-sm font-black text-[#1E1B4B] leading-tight">
                      {track.id}. {track.title}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-gray-600 font-medium mt-0.5">
                      {track.desc}
                    </p>
                  </div>
                </div>

                <span className="text-xs font-bold text-gray-500 font-mono shrink-0">
                  {track.duration}
                </span>
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
}

// ----------------------------------------------------------------------
// KOMPONEN UTAMA BERANDA
// ----------------------------------------------------------------------
export default function Home() {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [fadeState, setFadeState] = useState<'in' | 'out'>('in');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Audio State
  const [activeTrackId, setActiveTrackId] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = PLAYLIST_DATA.find((t) => t.id === activeTrackId) || PLAYLIST_DATA[0];

  // Sync state dengan elemen Audio bawaan
  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {});
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const selectTrack = (id: number) => {
    setActiveTrackId(id);
    setIsPlaying(true);
  };

  // Play audio otomatis jika track berganti dan state isPlaying true
  useEffect(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.play().catch(() => {});
    }
  }, [activeTrackId]);

  // Rotasi Kata-Kata Ikonik
  useEffect(() => {
    const interval = setInterval(() => {
      setFadeState('out');
      setTimeout(() => {
        setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % KKN_QUOTES.length);
        setFadeState('in');
      }, 350);
    }, 3800);

    return () => clearInterval(interval);
  }, []);

  // Canvas Confetti Engine (Safe Animation Frame)
  const triggerConfetti = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#FF597B', '#FFD15C', '#38E54D', '#10B981', '#6366F1', '#EC4899'];
    const particles = Array.from({ length: 90 }).map(() => ({
      x: canvas.width / 2 + (Math.random() * 240 - 120),
      y: canvas.height / 3,
      size: Math.random() * 10 + 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 18,
      vy: Math.random() * -15 - 6,
      rotation: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 12,
      opacity: 1,
    }));

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let activeCount = 0;

      particles.forEach((p) => {
        if (p.opacity > 0) {
          activeCount++;
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.42;
          p.vx *= 0.98;
          p.rotation += p.vRot;
          p.opacity -= 0.012;

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.globalAlpha = Math.max(0, p.opacity);
          ctx.fillStyle = p.color;
          ctx.strokeStyle = '#1E1B4B';
          ctx.lineWidth = 1.5;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
          ctx.strokeRect(-p.size / 2, -p.size / 2, p.size, p.size);
          ctx.restore();
        }
      });

      if (activeCount > 0) {
        animationFrameId = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    render();
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      triggerConfetti();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const activeQuote = KKN_QUOTES[currentQuoteIndex];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 md:py-14 space-y-12 sm:space-y-16 overflow-hidden relative font-sans">
      
      {/* Audio Element Tersembunyi (Aman dari Bug Hydration) */}
      <audio
        ref={audioRef}
        src={currentTrack.audioUrl}
        loop
        muted={isMuted}
      />

      {/* Canvas Confetti Layer */}
      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 pointer-events-none z-50 w-full h-full"
      />

      {/* FLOATING STICKY SOUND TOGGLE BUTTON */}
      <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2 bg-[#FFFDF9] border-2 border-[#1E1B4B] p-2 pr-4 rounded-full shadow-[4px_4px_0px_0px_#1E1B4B] transition-transform hover:scale-105">
        <button
          type="button"
          onClick={toggleMute}
          className="w-10 h-10 bg-[#FF597B] text-white rounded-full border border-[#1E1B4B] flex items-center justify-center font-bold text-base cursor-pointer shrink-0 active:scale-95 transition-transform"
        >
          {isMuted ? '🔇' : isPlaying ? '🎵' : '⏸️'}
        </button>
        <div className="text-left hidden sm:block">
          <p className="text-[10px] font-black uppercase text-[#1E1B4B] leading-none">
            {isMuted ? 'Suara Dimatikan' : isPlaying ? 'Soundtrack Posko' : 'Musik Pause'}
          </p>
          <p className="text-[11px] font-bold text-gray-600 truncate max-w-[120px]">
            {currentTrack.title.split(' - ')[0]}
          </p>
        </div>
      </div>

      {/* HERO SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* SISI KIRI: INFO UTAMA & QUOTE WIDGET */}
        <div className="lg:col-span-7 space-y-6 text-left">
          
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="bg-[#FFD15C] border-2 border-[#1E1B4B] shadow-[2px_2px_0px_0px_#1E1B4B] px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider text-[#1E1B4B]">
              ✦ KKN 27 DESA TOAPAYA
            </span>
            <button
              type="button"
              onClick={triggerConfetti}
              className="bg-[#FF597B] hover:bg-[#ff3b63] text-white border-2 border-[#1E1B4B] shadow-[2px_2px_0px_0px_#1E1B4B] px-3.5 py-1 rounded-full text-xs font-black transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
            >
              <span>🎉</span>
              <span>Rayakan!</span>
            </button>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#1E1B4B] leading-[1.15] tracking-tight">
            31 Hari Mengabdi, <br className="hidden sm:inline" />
            <span className="text-red-600 underline decoration-[#FFD15C] decoration-wavy decoration-4 sm:decoration-8">
              Seumur Hidup
            </span>{' '}
            <br className="hidden sm:inline" />
            Menginspirasi!
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-gray-700 font-medium leading-relaxed max-w-2xl">
            Selamat datang di etalase arsip digital KKN 27! Merangkum tawa posko, dedikasi warga desa, dan tak hingga proker nyata di Desa Toapaya.
          </p>

          {/* WIDGET QUOTE BERGANTIAN */}
          <div className="bg-[#FFFDF9] rounded-2xl sm:rounded-3xl border-2 sm:border-[3px] border-[#1E1B4B] shadow-[4px_4px_0px_0px_#1E1B4B] sm:shadow-[6px_6px_0px_0px_#1E1B4B] p-4 sm:p-6 space-y-3 relative overflow-hidden">
            
            <div className="flex items-center justify-between border-b-2 border-dashed border-gray-300 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#FF597B] border border-[#1E1B4B]"></span>
                <span className="w-3 h-3 rounded-full bg-[#FFD15C] border border-[#1E1B4B]"></span>
                <span className="w-3 h-3 rounded-full bg-[#38E54D] border border-[#1E1B4B]"></span>
                <span className="text-xs font-black uppercase text-[#1E1B4B] ml-1 tracking-wider">
                  Suara Anak Posko
                </span>
              </div>
              <span className="bg-[#1E1B4B] text-white text-[10px] sm:text-xs font-black px-2.5 py-0.5 rounded-full">
                #{currentQuoteIndex + 1} / {KKN_QUOTES.length}
              </span>
            </div>

            <div className="min-h-[85px] sm:min-h-[90px] flex flex-col justify-center">
              <div
                className={`transition-all duration-300 transform ${
                  fadeState === 'in'
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 -translate-y-2 scale-95'
                }`}
              >
                <blockquote className="scrapbook-note text-base sm:text-xl font-extrabold text-[#1E1B4B] italic leading-snug">
                  "{activeQuote.quote}"
                </blockquote>

                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs sm:text-sm font-black text-[#1E1B4B]">
                      — {activeQuote.name}
                    </h4>
                    <p className="text-[10px] sm:text-xs font-bold text-gray-500">
                      {activeQuote.role}
                    </p>
                  </div>

                  <div className="hidden sm:flex items-center gap-1">
                    {KKN_QUOTES.slice(0, 8).map((_, idx) => (
                      <div
                        key={idx}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          idx === currentQuoteIndex % 8
                            ? 'w-5 bg-[#FF597B] border border-[#1E1B4B]'
                            : 'w-2 bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* CTA Buttons */}
          <div className="grid grid-cols-1 sm:flex sm:items-center gap-3.5 pt-2">
            <Link
              href="/proker"
              className="bg-[#FFD15C] hover:bg-[#f3be3a] text-[#1E1B4B] text-xs sm:text-sm font-black uppercase tracking-wider px-6 py-4 rounded-2xl border-2 border-[#1E1B4B] shadow-[4px_4px_0px_0px_#1E1B4B] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_0px_#1E1B4B] text-center transition-all flex items-center justify-center gap-2"
            >
              <span>🚀 Lihat Program Kerja</span>
            </Link>
            <Link
              href="/profil"
              className="bg-white hover:bg-gray-100 text-[#1E1B4B] text-xs sm:text-sm font-black uppercase tracking-wider px-6 py-4 rounded-2xl border-2 border-[#1E1B4B] shadow-[4px_4px_0px_0px_#1E1B4B] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_0px_#1E1B4B] text-center transition-all flex items-center justify-center gap-2"
            >
              <span>👥 Our Team</span>
            </Link>
          </div>

        </div>

        {/* SISI KANAN: SCRAPBOOK POLAROID COLLAGE */}
        <div className="lg:col-span-5 relative h-[360px] sm:h-[420px] lg:h-[460px] flex items-center justify-center mt-4 lg:mt-0">
          
          <div className="absolute inset-0 bg-[#FF597B]/10 rounded-3xl border-2 border-dashed border-[#1E1B4B] -rotate-1 pointer-events-none"></div>

          {/* Polaroid Card 1 */}
          <div className="polaroid absolute top-3 right-2 sm:top-6 sm:right-6 w-56 sm:w-64 lg:w-72 rotate-3 hover:rotate-0 hover:scale-105 transition-all duration-300 shadow-[6px_6px_0px_0px_#1E1B4B] z-20 cursor-pointer">
            <div className="washi-tape"></div>
            <div className="bg-[#38E54D]/30 h-36 sm:h-44 rounded-xl border-2 border-[#1E1B4B] flex flex-col items-center justify-center font-black text-xs text-[#1E1B4B] relative overflow-hidden p-2 text-center">
              <span className="text-4xl mb-1 animate-bounce">📸</span>
              <span className="bg-white px-2 py-0.5 rounded border border-[#1E1B4B] text-[10px] font-extrabold">
                Desa Toapaya 2026
              </span>
            </div>
            <p className="scrapbook-note text-center text-xs sm:text-sm mt-3 font-bold text-[#1E1B4B]">
              Keluarga Besar Posko 27 ❤️
            </p>
          </div>

          {/* Polaroid Card 2 */}
          <div className="polaroid absolute bottom-3 left-2 sm:bottom-6 sm:left-6 w-52 sm:w-60 lg:w-64 -rotate-6 hover:rotate-0 hover:scale-105 transition-all duration-300 shadow-[6px_6px_0px_0px_#1E1B4B] z-10 cursor-pointer">
            <div className="bg-[#FFD15C]/40 h-32 sm:h-40 rounded-xl border-2 border-[#1E1B4B] flex flex-col items-center justify-center font-black text-xs text-[#1E1B4B] relative overflow-hidden p-2 text-center">
              <span className="text-3xl mb-1">📚</span>
              <span className="bg-white px-2 py-0.5 rounded border border-[#1E1B4B] text-[10px] font-extrabold">
                Mengajar SD
              </span>
            </div>
            <p className="scrapbook-note text-center text-xs sm:text-sm mt-2 sm:mt-3 font-bold text-[#1E1B4B]">
              Senyum Adik-Adik Desa 🎒
            </p>
          </div>

          <div className="absolute -bottom-2 right-4 sm:bottom-2 sm:right-2 bg-[#FF597B] text-white text-[10px] sm:text-xs font-black px-3.5 py-1.5 rounded-full border-2 border-[#1E1B4B] shadow-[2px_2px_0px_0px_#1E1B4B] rotate-12 z-30 uppercase tracking-widest">
            ✦ Full Memori!
          </div>

        </div>

      </div>

      {/* GRID STATISTIK NEO-BRUTALISM */}
      <div className="space-y-4">
        
        <div className="flex items-center justify-between border-b-2 border-[#1E1B4B] pb-2">
          <h2 className="text-sm sm:text-base font-black uppercase tracking-wider text-[#1E1B4B] flex items-center gap-2">
            <span>📊</span>
            <span>Rangkuman Pencapaian Posko</span>
          </h2>
          <span className="text-xs font-bold text-gray-500">Agustus 2026</span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          
          <div className="bg-[#FFD15C] p-4 sm:p-6 rounded-2xl border-2 border-[#1E1B4B] shadow-[4px_4px_0px_0px_#1E1B4B] hover:-translate-y-1 transition-transform cursor-pointer flex flex-col justify-between">
            <span className="text-2xl sm:text-3xl">📅</span>
            <div className="mt-3">
              <h3 className="text-3xl sm:text-4xl font-black text-[#1E1B4B]">31</h3>
              <p className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-[#1E1B4B] mt-0.5">
                Hari Mengabdi
              </p>
            </div>
          </div>

          <div className="bg-[#6366F1] text-white p-4 sm:p-6 rounded-2xl border-2 border-[#1E1B4B] shadow-[4px_4px_0px_0px_#1E1B4B] hover:-translate-y-1 transition-transform cursor-pointer flex flex-col justify-between">
            <span className="text-2xl sm:text-3xl">🎯</span>
            <div className="mt-3">
              <h3 className="text-3xl sm:text-4xl font-black">♾️ + 1</h3>
              <p className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-white/90 mt-0.5">
                Program Kerja
              </p>
            </div>
          </div>

          <div className="bg-[#38E54D] p-4 sm:p-6 rounded-2xl border-2 border-[#1E1B4B] shadow-[4px_4px_0px_0px_#1E1B4B] hover:-translate-y-1 transition-transform cursor-pointer flex flex-col justify-between text-[#1E1B4B]">
            <span className="text-2xl sm:text-3xl">🤝</span>
            <div className="mt-3">
              <h3 className="text-3xl sm:text-4xl font-black">1500+</h3>
              <p className="text-[10px] sm:text-xs font-black uppercase tracking-wider mt-0.5">
                Warga Terlibat
              </p>
            </div>
          </div>

          <div className="bg-[#EC4899] text-white p-4 sm:p-6 rounded-2xl border-2 border-[#1E1B4B] shadow-[4px_4px_0px_0px_#1E1B4B] hover:-translate-y-1 transition-transform cursor-pointer flex flex-col justify-between">
            <span className="text-2xl sm:text-3xl">🏆</span>
            <div className="mt-3">
              <h3 className="text-3xl sm:text-4xl font-black">100%</h3>
              <p className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-white/90 mt-0.5">
                Selesai Tuntas
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* SECTION SOUNDTRACK POSKO */}
      <div className="pt-6 border-t-2 border-dashed border-[#1E1B4B]">
        <SoundtrackPosko
          isPlaying={isPlaying}
          isMuted={isMuted}
          activeTrackId={activeTrackId}
          onTogglePlay={togglePlay}
          onToggleMute={toggleMute}
          onSelectTrack={selectTrack}
        />
      </div>

    </div>
  );
}
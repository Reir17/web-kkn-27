'use client';

import React, { useState, useRef, useEffect } from 'react';

// ----------------------------------------------------------------------
// TYPES & INTERFACES
// ----------------------------------------------------------------------
export interface Track {
  id: number;
  title: string;
  desc: string;
  duration: string;
  audioUrl: string;
}

// ----------------------------------------------------------------------
// DATA PLAYLIST LAGU POSKO
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

export default function SoundtrackPosko() {
  const [activeTrackId, setActiveTrackId] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = PLAYLIST_DATA.find((t) => t.id === activeTrackId) || PLAYLIST_DATA[0];

  // Kontrol Play / Pause
  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  // Kontrol Mute / Unmute
  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  // Pilih Lagu
  const selectTrack = (id: number) => {
    setActiveTrackId(id);
    setIsPlaying(true);
  };

  // Otomatis Play saat ganti lagu
  useEffect(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.play().catch(() => {});
    }
  }, [activeTrackId]);

  return (
    <div className="max-w-4xl mx-auto bg-[#FFFDF9] p-5 sm:p-8 rounded-3xl border-[3px] border-[#1E1B4B] shadow-[8px_8px_0px_0px_#1E1B4B] font-sans">
      
      {/* Audio Element Tersembunyi */}
      <audio
        ref={audioRef}
        src={currentTrack.audioUrl}
        loop
        muted={isMuted}
      />

      {/* HEADER SECTION */}
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

        {/* Tombol Kontrol Utama */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={togglePlay}
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
            onClick={toggleMute}
            className="p-2.5 bg-white hover:bg-gray-100 rounded-2xl border-2 border-[#1E1B4B] shadow-[3px_3px_0px_0px_#1E1B4B] text-sm transition-all cursor-pointer active:translate-x-0.5 active:translate-y-0.5"
            title={isMuted ? 'Nyalakan Suara' : 'Matikan Suara'}
          >
            {isMuted ? '🔇' : '🔊'}
          </button>
        </div>
      </div>

      {/* CASSETTE PLAYER (DARK NAVY CARD) */}
      <div className="bg-[#1C1D38] text-white rounded-3xl p-5 border-[3px] border-[#1E1B4B] shadow-[6px_6px_0px_0px_#1E1B4B] mb-6 space-y-4 relative overflow-hidden">
        
        {/* Header Kaset */}
        <div className="flex items-center justify-between text-[10px] sm:text-xs font-extrabold tracking-widest uppercase">
          <span className="text-[#F59E0B] flex items-center gap-1.5">
            <span className={`w-2.5 h-2.5 rounded-full ${isPlaying && !isMuted ? 'bg-red-500 animate-ping' : 'bg-gray-500'}`}></span>
            SIDE A • STEREO MEMORIES
          </span>
          <span className="bg-[#EF4444] text-white px-2.5 py-0.5 rounded-full text-[9px] font-black border border-black">
            C-60
          </span>
        </div>

        {/* Visual Pita Kaset Analog */}
        <div className="bg-[#121327] rounded-2xl p-4 border border-white/20 flex items-center justify-between px-6 sm:px-12 relative my-2">
          
          {/* Reel Kiri (Berputar hanya saat playing) */}
          <div
            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-dashed border-white/50 flex items-center justify-center ${
              isPlaying && !isMuted ? 'animate-[spin_4s_linear_infinite]' : ''
            }`}
          >
            <div className="w-4 h-4 bg-white/90 rounded-full border border-gray-900"></div>
          </div>

          {/* Label Tengah Kaset */}
          <div className="bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/20 text-center">
            <span className="text-[10px] sm:text-xs font-black text-white/90 tracking-widest uppercase block">
              KKN 27 TOAPAYA
            </span>
          </div>

          {/* Reel Kanan (Berputar hanya saat playing) */}
          <div
            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-dashed border-white/50 flex items-center justify-center ${
              isPlaying && !isMuted ? 'animate-[spin_4s_linear_infinite]' : ''
            }`}
          >
            <div className="w-4 h-4 bg-white/90 rounded-full border border-gray-900"></div>
          </div>
        </div>

        {/* Bar Status 'Now Playing' */}
        <div className="flex items-center justify-between text-xs font-semibold text-gray-300 pt-1">
          <span className="truncate max-w-[240px]">
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

      {/* DAFTAR PLAYLIST LAGU */}
      <div className="space-y-3">
        {PLAYLIST_DATA.map((track) => {
          const isActive = track.id === activeTrackId;
          return (
            <div
              key={track.id}
              onClick={() => selectTrack(track.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && selectTrack(track.id)}
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
  );
}
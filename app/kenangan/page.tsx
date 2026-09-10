'use client';

import { useState, useEffect, useRef } from 'react';

const API_URL = "https://script.google.com/macros/s/AKfycbxv8GKj4AyjvLUszjjrUmQO831O0hAb-SUR_KBRHZQT5S-QrFa14flLm5TKR3gnYFEilw/exec";

interface MediaItem {
  id: string;
  day: string;
  type: string; // 'photo' | 'video'
  url: string;
  caption: string;
}

export default function BukuKenangan() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [selectedDay, setSelectedDay] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<'all' | 'photo' | 'video'>('all');
  const [loading, setLoading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<string>('');

  // Form State (Mendukung Banyak File)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [day, setDay] = useState<string>('Day 1');
  const [caption, setCaption] = useState<string>('');
  
  // Reference untuk Reset Input File
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const text = await res.text();
      
      let data;
      try {
        data = JSON.parse(text);
      } catch (parseError) {
        console.error("Respon server bukan JSON yang valid:", text);
        return;
      }

      if (Array.isArray(data)) {
        setItems(data);
      } else if (data && data.error) {
        console.error("Error dari Apps Script Backend:", data.error);
      }
    } catch (err) {
      console.error("Gagal mengambil data galeri:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  // Helper Konversi File ke Base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const res = (e.target?.result as string).split(',')[1];
        resolve(res);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // Handler Upload Banyak File
  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFiles.length === 0) return alert('Pilih minimal satu foto atau video terlebih dahulu!');

    setLoading(true);
    let successCount = 0;

    for (let i = 0; i < selectedFiles.length; i++) {
      const currentFile = selectedFiles[i];
      setUploadProgress(`Mengunggah (${i + 1}/${selectedFiles.length}): ${currentFile.name}...`);

      try {
        const base64 = await fileToBase64(currentFile);
        const mimeType = currentFile.type;
        const isVideo = mimeType.startsWith('video');

        const payload = {
          action: 'CREATE',
          base64,
          mimeType,
          fileName: currentFile.name,
          day,
          type: isVideo ? 'video' : 'photo',
          caption: caption || currentFile.name
        };

        const res = await fetch(API_URL, {
          method: 'POST',
          body: JSON.stringify(payload)
        });

        const text = await res.text();
        const data = JSON.parse(text);

        if (data.status === 'success') {
          successCount++;
        } else {
          console.error(`Gagal mengunggah ${currentFile.name}:`, data.error);
        }
      } catch (err) {
        console.error(`Error mengunggah ${currentFile.name}:`, err);
      }
    }

    alert(`Selesai! ${successCount} dari ${selectedFiles.length} media berhasil ditambahkan ke scrapbook.`);
    setSelectedFiles([]);
    setCaption('');
    setUploadProgress('');
    if (fileInputRef.current) fileInputRef.current.value = '';
    fetchMedia();
    setLoading(false);
  };

  // Handler Download HD
  const handleDownload = async (url: string, fileName: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = fileName || 'kenangan-kkn-hd';
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      window.open(url, '_blank');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus kenangan ini?')) return;
    setLoading(true);
    try {
      await fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify({ action: 'DELETE', id })
      });
      fetchMedia();
    } catch (err) {
      alert('Gagal menghapus media.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Logika Penyaringan Ganda (Hari + Tipe Media)
  const filteredItems = items.filter(item => {
    const matchesDay = selectedDay === 'All' || item.day === selectedDay;
    const matchesType = selectedType === 'all' || item.type === selectedType;
    return matchesDay && matchesType;
  });

  // Perhitungan Jumlah Media
  const totalPhotos = items.filter(i => i.type === 'photo').length;
  const totalVideos = items.filter(i => i.type === 'video').length;

  const rotations = ['rotate-1', '-rotate-2', 'rotate-2', '-rotate-1', 'rotate-3', '-rotate-3'];

  return (
    <main className="max-w-6xl mx-auto px-4 py-8 md:py-12">
      {/* Header Judul & Ringkasan */}
      <div className="text-center mb-8">
        <span className="bg-primary px-4 py-1.5 rounded-full neo-border label-caps text-xs font-extrabold neo-shadow-sm inline-block">
          ✦ Live Posko Gallery
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold mt-3 text-[#1E1B4B]">
          Buku Kenangan & Scrapbook 📸
        </h1>
        <p className="text-sm md:text-base text-gray-700 mt-2 max-w-lg mx-auto font-medium">
          Arsip dokumentasi kegiatan harian KKN 27 Desa Toapaya dalam bentuk foto dan video interaktif.
        </p>

        {/* Counter Badge Ringkasan Media */}
        <div className="flex flex-wrap justify-center gap-3 mt-4">
          <div className="bg-white px-3 py-1 rounded-xl neo-border neo-shadow-sm text-xs font-bold text-[#1E1B4B] flex items-center gap-1.5">
            <span>📦 Total:</span>
            <span className="bg-primary px-2 py-0.5 rounded-md">{items.length}</span>
          </div>
          <div className="bg-white px-3 py-1 rounded-xl neo-border neo-shadow-sm text-xs font-bold text-[#1E1B4B] flex items-center gap-1.5">
            <span>🖼️ Foto:</span>
            <span className="bg-emerald-300 px-2 py-0.5 rounded-md">{totalPhotos}</span>
          </div>
          <div className="bg-white px-3 py-1 rounded-xl neo-border neo-shadow-sm text-xs font-bold text-[#1E1B4B] flex items-center gap-1.5">
            <span>🎬 Video:</span>
            <span className="bg-pink-300 px-2 py-0.5 rounded-md">{totalVideos}</span>
          </div>
        </div>
      </div>

      {/* Form Upload Gaya Neo-Brutalism Clipboard */}
      <form onSubmit={handleUpload} className="bg-[#FFFDF9] p-5 md:p-6 rounded-2xl mb-12 neo-border neo-shadow space-y-4 relative">
        <div className="flex justify-between items-center border-b-2 border-[#1E1B4B] pb-3">
          <h2 className="text-base md:text-xl font-extrabold text-[#1E1B4B] flex items-center gap-2">
            <span>📌</span>
            <span>Tambah Momen Baru (Bisa Banyak File)</span>
          </h2>
          {selectedFiles.length > 0 && (
            <span className="bg-primary px-3 py-1 rounded-full text-xs font-black neo-border animate-pulse">
              {selectedFiles.length} File Dipilih 📁
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-extrabold label-caps text-gray-600">Pilih File (Foto/Video):</label>
            <input 
              ref={fileInputRef}
              type="file" 
              accept="image/*,video/*"
              multiple
              onChange={(e) => setSelectedFiles(Array.from(e.target.files || []))}
              className="text-xs md:text-sm file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-2 file:border-[#1E1B4B] file:bg-primary file:font-bold file:text-[#1E1B4B] hover:file:translate-y-[-2px] file:transition-all cursor-pointer"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-extrabold label-caps text-gray-600">Pilih Hari:</label>
            <select 
              value={day} 
              onChange={(e) => setDay(e.target.value)}
              className="bg-white p-2.5 rounded-xl neo-border neo-shadow-sm outline-none font-bold text-sm text-[#1E1B4B]"
            >
              {Array.from({ length: 31 }, (_, i) => `Day ${i + 1}`).map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-extrabold label-caps text-gray-600">Caption / Catatan:</label>
            <input 
              type="text" 
              placeholder="Tulis caption seru... (Opsional)" 
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="bg-white p-2.5 rounded-xl neo-border neo-shadow-sm outline-none font-medium text-sm text-[#1E1B4B]"
            />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading || selectedFiles.length === 0}
          className="w-full bg-secondary text-white py-3.5 rounded-xl font-extrabold neo-border neo-shadow neo-btn disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base transition-all flex items-center justify-center gap-2"
        >
          {loading ? (
            <span>⌛ {uploadProgress || 'Sedang Memproses...'}</span>
          ) : (
            <span>🚀 Tempel {selectedFiles.length > 0 ? `${selectedFiles.length} File` : ''} ke Scrapbook</span>
          )}
        </button>
      </form>

      {/* TAMPILAN FOLDER & SELEKSI TIPE MEDIA */}
      <div className="space-y-6">
        
        {/* Tab Folder Kategori Media */}
        <div className="flex items-end gap-2 border-b-2 border-[#1E1B4B] pt-2 px-2 overflow-x-auto scrollbar-hide">
          <button
            onClick={() => setSelectedType('all')}
            className={`px-4 md:px-6 py-2.5 rounded-t-2xl font-extrabold text-xs md:text-sm neo-border border-b-0 transition-all flex items-center gap-2 whitespace-nowrap ${
              selectedType === 'all'
                ? 'bg-primary text-[#1E1B4B] -translate-y-1 z-10 neo-shadow-sm'
                : 'bg-white/80 text-gray-600 hover:bg-white hover:text-black'
            }`}
          >
            <span>📁 Semua Media</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] ${selectedType === 'all' ? 'bg-[#1E1B4B] text-white' : 'bg-gray-200 text-gray-700'}`}>
              {items.length}
            </span>
          </button>

          <button
            onClick={() => setSelectedType('photo')}
            className={`px-4 md:px-6 py-2.5 rounded-t-2xl font-extrabold text-xs md:text-sm neo-border border-b-0 transition-all flex items-center gap-2 whitespace-nowrap ${
              selectedType === 'photo'
                ? 'bg-emerald-300 text-[#1E1B4B] -translate-y-1 z-10 neo-shadow-sm'
                : 'bg-white/80 text-gray-600 hover:bg-white hover:text-black'
            }`}
          >
            <span>🖼️ Galeri Foto</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] ${selectedType === 'photo' ? 'bg-[#1E1B4B] text-white' : 'bg-gray-200 text-gray-700'}`}>
              {totalPhotos}
            </span>
          </button>

          <button
            onClick={() => setSelectedType('video')}
            className={`px-4 md:px-6 py-2.5 rounded-t-2xl font-extrabold text-xs md:text-sm neo-border border-b-0 transition-all flex items-center gap-2 whitespace-nowrap ${
              selectedType === 'video'
                ? 'bg-pink-300 text-[#1E1B4B] -translate-y-1 z-10 neo-shadow-sm'
                : 'bg-white/80 text-gray-600 hover:bg-white hover:text-black'
            }`}
          >
            <span>🎥 Galeri Video</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] ${selectedType === 'video' ? 'bg-[#1E1B4B] text-white' : 'bg-gray-200 text-gray-700'}`}>
              {totalVideos}
            </span>
          </button>
        </div>

        {/* Filter Hari (Sub-Filter) */}
        <div className="bg-[#FFFDF9] p-3 rounded-2xl neo-border neo-shadow-sm flex items-center gap-2 overflow-x-auto scrollbar-hide">
          <span className="text-xs font-black label-caps px-2 text-[#1E1B4B] shrink-0">
            📅 Pilih Hari:
          </span>
          <button 
            onClick={() => setSelectedDay('All')}
            className={`px-3 py-1 rounded-full font-bold text-xs whitespace-nowrap neo-border transition-all ${
              selectedDay === 'All' ? 'bg-primary text-[#1E1B4B] neo-shadow-sm' : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Semua Hari
          </button>
          {Array.from({ length: 31 }, (_, i) => `Day ${i + 1}`).map((d) => (
            <button 
              key={d}
              onClick={() => setSelectedDay(d)}
              className={`px-3 py-1 rounded-full font-bold text-xs whitespace-nowrap neo-border transition-all ${
                selectedDay === d ? 'bg-primary text-[#1E1B4B] neo-shadow-sm' : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {d}
            </button>
          ))}
        </div>

        {/* Media Grid Scrapbook */}
        {loading && items.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl neo-border neo-shadow">
            <div className="text-4xl mb-2 animate-bounce">📖</div>
            <p className="font-extrabold text-base text-[#1E1B4B]">Membuka album kenangan...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl neo-border neo-shadow">
            <div className="text-4xl mb-2">🍃</div>
            <p className="font-extrabold text-base text-[#1E1B4B]">
              Belum ada {selectedType === 'photo' ? 'foto' : selectedType === 'video' ? 'video' : 'media'} di {selectedDay === 'All' ? 'semua hari' : selectedDay}.
            </p>
            <p className="text-xs text-gray-500 mt-1">Jadilah yang pertama mengunggah momen ini!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 pt-2">
            {filteredItems.map((item, index) => {
              const randomRotation = rotations[index % rotations.length];
              const isVideo = item.type === 'video';
              
              return (
                <div key={item.id} className={`polaroid ${randomRotation} hover:rotate-0 transition-transform duration-300`}>
                  <div className="washi-tape"></div>
                  
                  {/* Kontainer Media Utama */}
                  <div className="bg-[#1E1B4B] h-52 md:h-60 rounded neo-border flex items-center justify-center overflow-hidden relative group">
                    
                    {/* Badge Hari (Pojok Kiri Atas) */}
                    <span className="absolute top-2 left-2 bg-primary text-[#1E1B4B] text-[10px] font-black px-2.5 py-0.5 rounded-md neo-border z-10 label-caps">
                      {item.day}
                    </span>

                    {/* Badge Pembeda Jenis Media (Pojok Kanan Atas) */}
                    <span className={`absolute top-2 right-2 text-[10px] font-black px-2.5 py-0.5 rounded-md neo-border z-10 label-caps flex items-center gap-1 ${
                      isVideo 
                        ? 'bg-pink-400 text-white' 
                        : 'bg-emerald-300 text-[#1E1B4B]'
                    }`}>
                      {isVideo ? '🎬 VIDEO' : '📸 FOTO'}
                    </span>

                    {/* Konten Gambar / Video */}
                    {isVideo ? (
                      <div className="w-full h-full relative flex items-center justify-center bg-black">
                        <video 
                          src={item.url} 
                          controls 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                    ) : (
                      <img 
                        src={item.url} 
                        alt={item.caption} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                    )}
                  </div>

                  {/* Caption & Tombol Aksi */}
                  <div className="mt-3 flex flex-col justify-between min-h-[85px]">
                    <p className="scrapbook-note text-center text-xs md:text-sm line-clamp-2 text-[#1E1B4B] font-semibold">
                      {item.caption || 'Kenangan tanpa kata-kata...'}
                    </p>
                    
                    {/* Tombol Aksi: Download HD & Hapus */}
                    <div className="mt-3 flex gap-2 justify-center">
                      <button 
                        onClick={() => handleDownload(item.url, `${item.day}-${item.caption || 'kenangan'}`)}
                        className="text-[11px] font-extrabold bg-primary text-[#1E1B4B] px-3 py-1 rounded-full neo-border neo-shadow-sm neo-btn flex items-center gap-1"
                        title="Download Kualitas Original HD"
                      >
                        <span>⬇ HD</span>
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="text-[11px] font-bold bg-white text-red-600 px-3 py-1 rounded-full neo-border hover:bg-red-50 transition-colors"
                      >
                        🗑 Hapus
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </main>
  );
}